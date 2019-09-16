## 此方法基于sphinx_client.class封装sphinx版本在2.0以上



$where = arrray();

$whrer['index'] = String    						      --查询索引名

$where['search_key'] = 	String					       --模糊查询			

$where['field'] = String      						       --查询返回字段

$where['key']   = ['字段1'=>[值1,值2,],'字段2'=>[值1,值2,]]      --等量查询多维数组

$where['not_key']  = ['字段1'=>[值1,值2,],'字段2'=>[值1,值2,]]  --取反查询

$where['or_key'] =  String   							--范围查询

$where['or_min']  = int								-- 范围查询起点

$where['or_max']  = int								-- 范围查询终点

$where['or_key_arr']  = array						          --多条范围查询		

$where['where_or']  =  String    					            --或操作 a OR b

$where['sorting']  = String             					          --排序id  DESC/ASC

$where['group_key'] = String							  --分组查询

$where['group_key_order'] = String					  --	分组查询排序方式  DESC ASC

$where['start'] = int									  -- 分页偏移开始

$where['limit'] = int								          --获取数据条数   			



```php
/**使用构造器初始化sphinx配置*/
$this->ci = & get_instance();
$this->ci->config->load('sphinx');
$this->ci->load->library('sphinx_client');
$this->ci->sphinx_client->setServer($this->ci->config->item('hostname'), $this->ci->config->item('port'));
$this->ci->sphinx_client->setMatchMode(SPH_MATCH_ALL);
$this->ci->sphinx_client->setMaxQueryTime(200);
```

```php
/**sphinx查询
     * @param $where
     */
    public function get_sphinx($where){
        $this->ci->sphinx_client->ResetFilters();
        $this->ci->sphinx_client->ResetGroupBy();
        if (array_key_exists("field",$where)) {
            if(array_key_exists("where_or",$where) && !empty($where['where_or'])){
                $where['field']=$where['field'].',if(('.$where['where_or'].'),1,0) as or_filter';
                $this->ci->sphinx_client->SetFilter('or_filter', [1]);
            }
            $this->ci->sphinx_client->SetSelect($where['field']);
        }else{
            $where['field'] = '*';
            if(array_key_exists("where_or",$where) && !empty($where['where_or'])){
                $where['field']=$where['field'].',if('.$where['where_or'].',1,0) as or_filter';
                $this->ci->sphinx_client->SetFilter('or_filter', [1]);
            }
            $this->ci->sphinx_client->SetSelect($where['field']);
        }

        if (array_key_exists("sorting",$where)) {
            $this->ci->sphinx_client->SetSortMode(SPH_SORT_EXTENDED, $where['sorting']);
        }

        if (array_key_exists("key",$where) && is_array($where['key'])) {
            foreach ($where['key'] as $key=>$value) {
                $this->ci->sphinx_client->SetFilter($key, $value);
            }
        }

        if (array_key_exists("not_key",$where) && is_array($where['not_key'])) {
            foreach ($where['not_key'] as $key=>$value) {
                $this->ci->sphinx_client->SetFilter($key, $value,true);
            }
        }

        if (array_key_exists("or_key",$where)) {
            $this->ci->sphinx_client->SetFilterRange($where['or_key'], $where['or_min'], $where['or_max']);
        }
        if(array_key_exists('group_key',$where)) {
            if (array_key_exists('group_key_order',$where)) {
                $this->ci->sphinx_client->SetGroupBy($where['group_key'], SPH_GROUPBY_ATTR,$where['group_key_order']);
            }else{
                $this->ci->sphinx_client->SetGroupBy($where['group_key'], SPH_GROUPBY_ATTR);
            }
        }

//        if(array_key_exists('group_distinct',$where)){
////            var_dump("xx");
//            $this->ci->sphinx_cli->SetGroupDistinct("site_id");
//        }

        if(array_key_exists("limit",$where) && array_key_exists("start",$where)){
            $this->ci->sphinx_client->SetLimits($where["start"],$where['limit'],15000);
        }

//        if(!empty($where['offset'])){
//            $this->ci->sphinx_api->SetLimits(0,2);
//        }
//        echo $where['index'];
//        print_r($where);
//        var_dump($this->ci->sphinx_client);
        if (!array_key_exists("search_key",$where)) {
            $where['search_key'] = '';
        }
        if (!array_key_exists("index",$where)) {
            return false;
        }

        $res=$this->ci->sphinx_client->query($where['search_key'],$where['index']);
//        print_r($res);
        $error = $this->ci->sphinx_client->GetLastError();
        if(!empty($error)){
//            var_dump($error);
        }
        if($res['total']==0){
            return false;
        }
        if($res){
            $arr['matches'] = $res["matches"];
            $arr['total'] = (int)$res['total'];
            return $arr;
        }else{
            return false;
        }

    }
```