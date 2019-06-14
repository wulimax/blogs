## 记一次死锁分析

```json
EST DETECTED DEADLOCK
------------------------
2019-06-14 01:11:44 0x7f78289c5700
*** (1) TRANSACTION:
TRANSACTION 130109184, ACTIVE 55 sec inserting
mysql tables in use 1, locked 1
LOCK WAIT 7 lock struct(s), heap size 1136, 2 row lock(s), undo log entries 1
MySQL thread id 10266131, OS thread handle 140153815938816, query id 438031982 10.10.65.131 app_ark1_rw update
INSERT INTO order22
   ( biz_source,
    order_id,
    biz_order_id,
    order_type,
    order_status,
    shop_id,
    user_id,
    pay_type,
    total_fee,
    pay_fee,
    expire_time,
    ext_json,
    created_time,
    user_type, 
   sale_model,
   pss_owner ) 
   values ( 30,
    '1906140110476743150',
    '19061401100000045150',
    10,
    10,
    'BLDSZ2103737',
    '3145150',
    14,
    590,
    590,
    '2019-06-14 01:16:47',
    '{}',
    '2019-06-14 01:10:47',
    0,
   0,
   '' )
*** (1) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 528 page no 5194 n bits 136 index order_id of table `ark1`.`order22` trx id 130109184 lock_mode X insert intention waiting
Record lock, heap no 1 PHYSICAL RECORD: n_fields 1; compact format; info bits 0
 0: len 8; hex 73757072656d756d; asc supremum;;

*** (2) TRANSACTION:
TRANSACTION 130109398, ACTIVE 45 sec inserting, thread declared inside InnoDB 1
mysql tables in use 1, locked 1
4 lock struct(s), heap size 1136, 2 row lock(s), undo log entries 1
MySQL thread id 10266154, OS thread handle 140154054137600, query id 438032102 10.10.65.131 app_ark1_rw update
INSERT INTO order22
   ( biz_source,
    order_id,
    biz_order_id,
    order_type,
    order_status,
    shop_id,
    user_id,
    pay_type,
    total_fee,
    pay_fee,
    expire_time,
    ext_json,
    created_time,
    user_type,
   sale_model,
   pss_owner ) 
   values ( 30,
    '1906140110576746150',
    '19061401100000075150',
    10,
    10,
    'BLDSZ2103737',
    '3145150',
    14,
    590,
    590,
    '2019-06-14 01:16:57',
    '{}',
    '2019-06-14 01:10:57',
    0,
   0,
   '' )
*** (2) HOLDS THE LOCK(S):
RECORD LOCKS space id 528 page no 5194 n bits 136 index order_id of table `ark1`.`order22` trx id 130109398 lock mode S
Record lock, heap no 1 PHYSICAL RECORD: n_fields 1; compact format; info bits 0
 0: len 8; hex 73757072656d756d; asc supremum;;

*** (2) WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 528 page no 5194 n bits 136 index order_id of table `ark1`.`order22` trx id 130109398 lock_mode X insert intention waiting
Record lock, heap no 1 PHYSICAL RECORD: n_fields 1; compact format; info bits 0
 0: len 8; hex 73757072656d756d; asc supremum;;
```

从上面我们可以看出 

全局 ID130109184 首先对 要锁定了两条数据  等待加锁 发现占用 等待

全局 ID130109398 后一条记录先于前一天记录 添加成功

上一个事物发现下一个事物已经完成 ,申请锁发现我要插入的位置被占用了 ,死锁就发生了

常用锁等待相关命令：

**通过 SHOW ENGINE INNODB STATUS; 来查看死锁日志：**

当前是否有锁等待：SHOW OPEN TABLES WHERE In_use > 0;

列出当前用户所有进程：SHOW PROCESSLIST（SUPER权限可看到所有用户进程）

当前事务：SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX（kill掉trx_mysql_thread_id）

当前锁：SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS; 

锁等待相关信息：SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS; 

更改锁等待时间参数：SET innodb_lock_wait_timeout=100；