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

共享锁、排他锁与意向锁的兼容矩阵如下

|      |   X    |   IX   |   S    |   IS   |
| :--: | :----: | :----: | :----: | :----: |
|  X   | `冲突` | `冲突` | `冲突` | `冲突` |
|  IX  | `冲突` |  兼容  | `冲突` |  兼容  |
|  S   | `冲突` | `冲突` |  兼容  |  兼容  |
|  IS  | `冲突` |  兼容  |  兼容  |  兼容  |

#### 事务执行时序表

|        T1(130109184)        |            T2()             |                        T3(130109398)                         |
| :-------------------------: | :-------------------------: | :----------------------------------------------------------: |
|           begin;            |           begin;            |                            begin;                            |
| insert into table values(); |                             |                                                              |
|                             | insert into table values(); |                                                              |
|                             |                             |                 insert into table values();                  |
|          rollback;          |                             |                                                              |
|                             |                             | ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction |
|                             |  Query OK, 1 row affected   |                                                              |

#### 死锁成因

事务T1成功插入记录，并获得索引的排他记录锁(LOCK_X | LOCK_REC_NOT_GAP)。
紧接着事务T2、T3也开始插入记录，请求排他插入意向锁(LOCK_X | LOCK_GAP | LOCK_INSERT_INTENTION)；但由于发生重复唯一键冲突，各自请求的排他记录锁(LOCK_X | LOCK_REC_NOT_GAP)转成共享记录锁(LOCK_S | LOCK_REC_NOT_GAP)。

T1回滚释放索引i的排他记录锁(LOCK_X | LOCK_REC_NOT_GAP)，T2和T3都要请求索引的排他记录锁(LOCK_X | LOCK_REC_NOT_GAP)。
由于X锁与S锁互斥，T2和T3都等待对方释放S锁。
于是，死锁便产生了。

如果此场景下，只有两个事务T1与T2或者T1与T3，则不会引发如上死锁情况产生。

### 思考

​     对于大量插入的场景应该减少上锁次数,提高单次插入的量 ,也就是说  把一条插入 合并成一组插入





常用锁等待相关命令：

**通过 SHOW ENGINE INNODB STATUS; 来查看死锁日志：**

当前是否有锁等待：SHOW OPEN TABLES WHERE In_use > 0;

列出当前用户所有进程：SHOW PROCESSLIST（SUPER权限可看到所有用户进程）

当前事务：SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX（kill掉trx_mysql_thread_id）

当前锁：SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS; 

锁等待相关信息：SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS; 

更改锁等待时间参数：SET innodb_lock_wait_timeout=100；