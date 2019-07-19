使用PHP PDO 连接

```php
<?php

/**
 * PHP实现数据库连接类
 * 使用单例模式
 */
final class DB
{   //私有静态的 实例
    private static $instance = NULL ;//实例
	//私有的成员属性
	private $db_type = 'mysql';	//数据库类型
	private $db_host = '127.0.0.1';	//主机名
	private $db_port = '3306';	//端口号
	private $db_user = 'root';	//用户名
	private $db_pass = '123456';	//密码
	private $db_name = 'company';	//数据库名
	private $charset = 'utf8';	//字符集
	private  $pdo = NULL;//PDO对象

	//构造方法
	private function __construct(){
		$this->createPDO(); //创建PDO对象
		$this->setErrMode(); //设置PDO报错的模式
	}
    private function __clone(){}
    //同意实例访问入口
    public static function getInstance(){
        //判断类实付实例化
    if(!(self::$instance instanceof self)){
    	  self::$instance = new self;    
		  return self::$instance;
    	}
         return self::$instance;
    	
    }
	//私有的创建PDO对象的方法
	private  function createPDO()
	{
		try{
			//构建连接数据库的基本信息
			$dsn = "{$this->db_type}:host={$this->db_host};port={$this->db_port};";
			$dsn .= "dbname={$this->db_name};charset={$this->charset}";
			//创建PDO对象并赋值
			$this->pdo = new PDO($dsn,$this->db_user,$this->db_pass); 
		}catch(PDOException $e)
		{
			echo "<h2>创建PDO对象失败！</h2>";
			echo "错误编号：".$e->getCode();
			echo "<br>错误行号：".$e->getLine();
			echo "<br>错误文件：".$e->getFile();
			echo "<br>错误信息：".$e->getMessage();
		}
	}

	//私有的设置PDO报错模式的方法
	private function setErrMode()
	{
		//设置PDO的报错模式为异常模式
		$this->pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
	}


	//公共的获取单行数据方法
	public function fetchOne($sql)
	{
		try{
			//执行SQL语句，并返回结果集对象PDOStatement
			$PDOStatement = $this->pdo->query($sql);
			//从结果集对象中取出单行数据，并返回
			return $PDOStatement->fetch(PDO::FETCH_ASSOC);
		}catch(PDOException $e)
		{
			$this->showMessage($e);
		}
	}

	//公共的获取多行数据方法
	public function fetchAll($sql)
	{
		try{
			//执行SQL语句，并返回结果集对象PDOStatement
			$PDOStatement = $this->pdo->query($sql);
			//从结果集对象中取出多行数据，并返回
			return $PDOStatement->fetchAll(PDO::FETCH_ASSOC);
		}catch(PDOException $e)
		{
			$this->showMessage($e);
		}
	}

	//公共的执行其它SQL语句的方法：insert、update、delete、set、create、alter等
	public function exec($sql)
	{
		try{
			return $this->pdo->exec($sql);
		}catch(PDOException $e)
		{
			$this->showMessage($e);
		}
	}

	//公共的获取记录数
	public function rowCount($sql)
	{
		try{
			//执行SELECT语句，并返回结果集对象
			$PDOStatement = $this->pdo->query($sql);
			//返回记录数
			return $PDOStatement->rowCount();
		}catch(PDOException $e)
		{
			$this->showMessage($e);
		}
	}

	//私有的错误处理的方法
	private function showMessage($e)
	{
		echo "<h2>SQL语句有问题！</h2>";
		echo "错误编号：".$e->getCode();
		echo "<br>错误行号：".$e->getLine();
		echo "<br>错误文件：".$e->getFile();
		echo "<br>错误信息：".$e->getMessage();
	}
}
```



