1. 方案一

   mysql 通过binlog  同步给 maxwell  

   -> maxwell解析binlog日志 同步给kafka 

   -> 使用php swoole的定时功能 通过定时器 获取kafka的数据

   -> 获取出来的数据 导入到elasticsearch

   -> 创建索引 创建文档 对数据进行操作

   ***

   

   <?php 

   require './es/vendor/autoload.php';
   use Elasticsearch\ClientBuilder;

   class  moaili{

   ```
   public $broker_list = 'spark1:9092,spark2:9092,spark4:9092';//配置kafka，可以用逗号隔开多个kafka
   public $topic = 'test';
   public $partition = 0;
   protected $producer = 2;
   protected $consumer = 1;
   protected $kafkaObj = null;
   protected $client = null;
   ```
      public function __construct(){
      	  $this->esinit();
      }

      /**kafka消费端**/
      public function tokpic()
      {    
      	    /************连接kafka******************/
           $conf = new \RdKafka\Conf();
           $conf->set('group.id', 0);
           $conf->set('metadata.broker.list', $this->broker_list);
           $topicConf = new \RdKafka\TopicConf();
           $topicConf->set('auto.offset.reset', 'smallest');
           $conf->setDefaultTopicConf($topicConf);
           $consumer = new \RdKafka\KafkaConsumer($conf);
           $consumer->subscribe([$this->topic]); 
           /*************************************/
           $this->kafkaObj = $consumer;
           
   ```
         //每隔2000ms触发一次
       swoole_timer_tick(2000, function ($timer_id) {
          echo date('Y-m-d H:i:s',time());
          echo '运行后内存：'.round(memory_get_usage()/1024/1024, 2) .' MB'.PHP_EOL ;
         
           $message = $this->kafkaObj->consume(120*1000);
           switch ($message->err) {
   
               case RD_KAFKA_RESP_ERR_NO_ERROR:
                   $this->czes($message);
                   break;
               case RD_KAFKA_RESP_ERR__TIMED_OUT:
                   var_dump('异常');
                    swoole_timer_clear($timer_id);
                   break; 
   
           }
   	});
   
       //=====
   ```
      }
       /*获取数据操作es 
       */
      public function  czes(&$data){
      	var_dump($data);

      }

      /**创建mysql链接**/
      public function msyqlpdo(){
          //1.建立连接
           $connect=mysqli_connect('spark1','root','123456','company','3306');
           mysqli_query($connect,'set names utf8');
           var_dump($connect);
      }

      /**创建es链接**/
      public function esinit(){
      	if($this->client == null){
      		$params = array(
               'spark2:9200',
               'spark3:9092',
               'spark4:9092'
           );
      		$this->client = ClientBuilder::create()->setHosts($params)->build();
      	}

      }

      // 创建索引
       public function create_index($index_name = '') { // 只能创建一次
       	if(empty($index_name)){ return false;}
       	$this->esinit();
           $params = [
               'index' => $index_name,
               'body' => [
                   'settings' => [
                       'number_of_shards' => 1, //是数据备份数，如果只有一台机器，设置为0
                       'number_of_replicas' => 1 //是数据分片数，默认为5，有时候设置为3
                   ]
               ]
           ];

   ```
       try {
           return $this->client->indices()->create($params);
       } catch (Elasticsearch\Common\Exceptions\BadRequest400Exception $e) {
           $msg = $e->getMessage();
           $msg = json_decode($msg,true);
           return $msg;
       }
   }
   
   // 删除索引
   public function delete_index($index_name = 'test_ik') {
       $params = ['index' => $index_name];
       $response = $this->client->indices()->delete($params);
       return $response;
   }
   ```

     

   ```
   // 创建文档模板
   public function create_mappings($index_name = '',$type_name = 'goods') {
   	if(empty($index_name)){ return false; }
      $this->esinit();
       $params = [
           'index' => $index_name,
           'type' => $type_name,
           'body' => [
               $type_name => [
                   '_source' => [
                       'enabled' => true
                   ],
                   'properties' => [
                       'id' => [
                           'type' => 'integer', // 整型
                       ],
                       'name' => [
                           'type' => 'text', // 字符串型
                       ],
                       'age' => [
                           'type' => 'integer',
                       ]
                   ]
               ]
           ]
       ];
   
       $response = $this->client->indices()->putMapping($params);
       return $response;
   }
   
   // 查看映射
   public function get_mapping($index_name = '',$type_name = 'goods') {
   	if(empty($index_name)){ return false; }
   	 $this->esinit();
       $params = [
           'index' => $index_name,
           'type' => $type_name
       ];
       $response = $this->client->indices()->getMapping($params);
       return $response;
   }
   
   // 添加文档
   public function add_doc($index_name = '',$doc,$id,$type_name = 'goods') {
   	
       $params = [
           'index' => $index_name,
           'type' => $type_name,
           'body' => $doc
       ];
        if($id != ''|| isset($doc['id'])){ $params['id'] = $id !=''?$id:$doc['id'];}
       $response = $this->client->index($params);
       return $response;
   }
   
   // 判断文档存在
   public function exists_doc($index_name = '',$id = '',$type_name = 'goods') {
   	if(empty($index_name)){ return false; }
       $params = [
           'index' => $index_name,
           'type' => $type_name
       ];
       if($id != ''){ $params['id'] = $id;}
       $response = $this->client->exists($params);
       return $response;
   }
   ```


   ```
   // 获取文档
   public function get_doc($index_name = '',$id = '',$type_name = 'goods') {
       if(empty($index_name)){ return false; }
       $params = [
           'index' => $index_name,
           'type' => $type_name,
       ];
       if($id != ''){ $params['id'] = $id;}
       $response = $this->client->get($params);
       return $response;
   }
   
   // 更新文档
   public function update_doc($index_name = '',$data= '',$id = '',$type_name = 'goods') {
       if(empty($index_name) || empty($data)){ return false; }
       // 可以灵活添加新字段,最好不要乱添加
       $params = [
           'index' => $index_name,
           'type' => $type_name,
           'body' => [
               'doc'=> $data //这里的data是个一维关联数组，和常用的ORM更新方法参数一致。
           ]
       ];
       if($id != ''|| isset($data['id'])){ $params['id'] = ($id ==''?$data['id']:$id);}
       try{
       $response = $this->client->update($params);
       return $response;
        } catch (Elasticsearch\Common\Exceptions\BadRequest400Exception $e) {
           $msg = $e->getMessage();
           $msg = json_decode($msg,true);
           return $msg;
       }
   
   }
   
   // 删除文档
   public function delete_doc($index_name = '',$id = '',$type_name = 'goods') {
       if(empty($index_name) || empty($id)){ return false; }
      $params = [
           'index' => $index_name,
           'type' => $type_name,
           'id' => $id
       ];
   
       $response = $this->client->delete($params);
       return $response;
   }
   
   // 查询文档 (分页，排序，权重，过滤)
   public function search_doc($index_name = "",$keywords = "",$type_name = "goods",$from = 0,$size = 2) {
       if(empty($index_name)){ return false; }
   
      $params = [
           'index' => $index_name,
           'type' => $type_name,
           'body' => [
               'query' => [
                   'bool' => [
                       'should' => [
                           [ 'match' => [ 'name' => [
                               'query' => $keywords,
                               'boost' => 3, // 权重大
                           ]]],
   ```
   //                            [ 'match' => [ 'content' => [
   //                                'query' => $keywords,
   //                                'boost' => 2,
   //                            ]]],
                           ],
                       ],
                   ],
   //                'sort' => ['price'=>['order'=>'desc']],
                    'from' => $from, 'size' => $size
               ]
           ];

   ```
       $results = $this->client->search($params);
   ```
   //        $maxScore  = $results['hits']['max_score'];
   //        $score = $results['hits']['hits'][0]['_score'];
   //        $doc   = $results['hits']['hits'][0]['_source'];
           return $results;
       }

   }
   $a = new moaili();
   // $a->tokpic();
   // 创建索引
   //$res = $a->create_index('test');

   //创建文档模板
   // $res = $a->create_mappings('test');

   //添加文档
   $data = array('name'=>'李四五');
   //$res = $a->add_doc('test',$data);

   //查看映射
   //$res = $a->get_mapping('test');

   //查看文档是否存在
   //$res = $a->exists_doc('test','9KRExWoBrmEreIfCCd2g');

   //更新文档
   //$res = $a->update_doc('test',$data,1);

   //删除文档


   //搜索文档
   //$res = $a->search_doc('test','李');

   //链接数据库
   $a->msyqlpdo();

   // var_dump($res);