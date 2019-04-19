mysql 执行步骤

![](https://github.com/wulimax/blogs/blob/master/img/mysql_log_1.png)

MySQL 可以分为 Server 层和存储引擎层两部分

Server 层包括连接器、查询缓存、分析器、优化器、执行器等，涵盖 MySQL 的大多数核心服 务功能，以及所有的内置函数（如日期、时间、数学和加密函数等），所有跨存储引擎的功能都 在这一层实现，比如存储过程、触发器、视图等

而存储引擎层负责数据的存储和提取。其架构模式是插件式的，支持 InnoDB、MyISAM、 Memory 等多个存储引擎。现在最常用的存储引擎是 InnoDB，它从 MySQL 5.5.5 版本开始成 为了默认存储引擎

我们这次重点讲解的mysql中的日志

日志：

查询日志：general_log

慢查询日志：log_slow_queries

错误日志：log_error， log_warnings

二进制日志：binlog

中继日志：relay_log

事务日志：innodb_log



```
1、查询日志
    记录查询语句，日志存储位置：
      文件：file
      表：table (mysql.general_log)
      
    general_log={ON|OFF}
    general_log_file=HOSTNAME.log 
    log_output={FILE|TABLE|NONE}
    
  2、慢查询日志
    慢查询：运行时间超出指定时长的查询；
      long_query_time
    存储位置：
      文件：FILE
      表：TABLE，mysql.slog_log
      
    log_slow_queries={ON|OFF}
    slow_query_log={ON|OFF}
    slow_query_log_file=
    log_output={FILE|TABLE|NONE}
    log_slow_filter=admin,filesort,filesort_on_disk,full_join,full_scan,query_cache,query_cache_miss,tmp_table,tmp_table_on_disk
    log_slow_rate_limit
    log_slow_verbosity
    
  3、错误日志
    记录信息：
      (1) mysqld启动和关闭过程 输出的信息； 
      (2) mysqld运行中产生的错误信息； 
      (3) event scheduler运行时产生的信息；
      (4) 主从复制架构中，从服务器复制线程启动时产生的日志；
      
    log_error=
      /var/log/mariadb/mariadb.log|OFF
    log_warnings={ON|OFF}
    
  4、二进制日志
    用于记录引起数据改变或存在引起数据改变的潜在可能性的语句（STATEMENT）或改变后的结果（ROW），也可能是二者混合；
    功用：“重放”
    
    binlog_format={STATEMENT|ROW|MIXED}
      STATEMENT：语句；
      ROW：行；
      MIXED：混编；
      
    查看二进制日志文件列表：
       SHOW MASTER|BINARY LOGS;
       
    查看当前正在使用的二进制日志文件：
      SHOW MASTER STATUS；
      
    查看二进制 日志文件中的事件：
      SHOW BINLOG EVENTS   [IN 'log_name'] [FROM pos] [LIMIT [offset,] row_count]
      
    服务器变量：
      log_bin=/PATH/TO/BIN_LOG_FILE
        只读变量；
      session.sql_log_bin={ON|OFF}
        控制某会话中的“写”操作语句是否会被记录于日志文件中；
      max_binlog_size=1073741824
      sync_binlog={1|0}
      
    mysqlbinlog：
        YYYY-MM-DD hh:mm:ss
      
       --start-datetime=
       --stop-datetime=
       
       -j, --start-position=#
        --stop-position=#
        
        --user, --host, --password
      
    二进制日志事件格式：
      # at 553
      #160831  9:56:08 server id 1  end_log_pos 624   Query   thread_id=2     exec_time=0     error_code=0
      SET TIMESTAMP=1472608568/*!*/;
      BEGIN
      /*!*/;
      
      事件的起始位置：# at 553
      事件发生的日期时间：#160831  9:56:08
      事件发生的服务器id：server id 1
      事件的结束位置：end_log_pos 624
      事件的类型：Query
      事件发生时所在服务器执行此事件的线程的ID： thread_id=2 
      语句的时间戳与将其写入二进制日志文件中的时间差：exec_time=0
      错误代码：error_code=0
      事件内容：SET TIMESTAMP=1472608568/*!*/;
      
  中继日志：
    从服务器上记录下来从主服务器的二进制日志文件同步过来的事件；
    
    
  事务日志：
    事务型存储引擎innodb用于保证事务特性的日志文件：
      
      redo log 
      undo log
```

这里主要讲解两个日志redo log 跟 bing log