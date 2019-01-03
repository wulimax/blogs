Explain是什么 

1	SIMPLE	dlc_device	index	index_siteid	index_siteid	4		7391	Using where

使用Explain关键字可以模拟优化器执行SQL查询语句,从而知道MySQL是如何处理你的SQL语句的。分徐你的查询语句或是表结构的性能瓶颈

Explain能干嘛 

表的读取顺序 

数据读取操作的操作类型 

哪些索引可以使用 

哪些索引可以被实际使用 

表之间的引用 

每张表有多少航被优化器查询 

Explain如何使用 

Explain + SQL语句

执行计划包含的信息 

| id   | select_type | table      | type  | possible_keys | key          | key_len | ref  | rows | Extra       |
| ---- | ----------- | ---------- | ----- | ------------- | ------------ | ------- | ---- | ---- | ----------- |
| 1    | SIMPLE      | dlc_device | index | index_siteid  | index_siteid | 4       |      | 7391 | Using where |

id 

select查询的序列号,表示查询中执行select子句或操作表的顺序
id相同,执行顺序由上至下
id不同,如果是子查询,id的序号会递增,id值越大优先级越高,越先被执行

select_type 

主要有以下6种

SIMPLE 

简单的SELECT查询,查询中不包含子查询或者UNION 

PRIMARY 

查询中若包含任何复杂的子部分,最外层查询则被标记为PRIMARY 

SUBQUERY 

在SELECT或WHERE列表中包含了子查询 

DERIVED 

在FROM列表中包含的子查询被标记为DERIVED(衍生),MySQL会地柜执行这些子查询,把结果放在临时表里 

UNION 

若第二个SELECT出现在UNION之后,则被标记为UNION;若UNION包含在FROM子句的子查询中,外层SELECT将被标记为DERIVED 

UNION RESULT 

从UNION表获取结果的SELECT 

table 

显示一行的数据是关于哪张表的

type 

主要有以下8种

ALL 

Full Table Scan,将遍历全表以找到匹配行 

index 

Full Index Scan,index与ALL的区别为index类型之便利索引树,这通常要ALL快,因为索引文件通常比数据文件小 

range 

只检索给定范围的行,使用一个索引来选择行。key列显示使用了哪个索引。一般就是在你的where语句中出现了between,<,>,in等的查询,这种扫描索引比扫描权标要好,因为只需要开始于索引的某一点,二结束于另一点,不用扫描全部索引。 

ref 

非唯一性索引扫描,返回匹配某个单独值的所有行。本质上也是一种索引访问,它返回所有匹配某个单独值的行,然而它可能会找到多个符合条件的行,所以他应该属于查找和扫描的混合体 

eq_ref 

唯一性索引扫描,对于每个索引健,表中只有一条记录与之匹配。常见主键或唯一主键扫描 

const 

表示通过索引一次就找到了,const用于比较primary key或者unique索引。因为只匹配一行数据,所以很快 

system 

表只有一行记录(等于系统表),这是const类型的特例,平时不会出现,这个也可以忽略不计 

NULL 

显示查询了何种类型 

从最好到最差依次是:system>const>eq_ref>ref>range>index>ALL 

一般来说,得保证查询至少达到range级别,最好能达到ref 

possible_keys 

显示可能引用在这张表中的索引,一个或多个,查询涉及到字段上若存在索引,则该索引将被列出,但不一定查询实际使用

key 

实际使用的索引,如果为NULL,则没有使用索引
查询中若使用了覆盖索引(查询的字段和索引字段符合),则该索引仅出现在key列表中

key_len 

表示索引中使用的字节数,可通过高该列计算查询中使用的索引长度。在不损失精确性的情况下,长度越短越好。key_len显示的值为索引字段的最大可能长度,并非实际使用长度,即key_len是根据表定义计算而得,不是通过表内检索出的

ref 

表示索引的哪一列被使用了,如果可能的话,是一个常数,哪些列或常量被用于查找索引列上的值

rows 

根据表的统计信息及索引选用情况,大致估算出找到所需的记录所需要读取的行数

Extra 

包含不适合在其他列中显示但十分重要的额外信息,其中前三个比较常见

Using filesort 

说明MySQL会对数据使用一个外部的索引排序,而不是按照表内的索引顺序进行读取。MySQL中无法利用索引完成的排序操作称为“文件排序” 

Using temporary 

使用了临时表保存中间结果,MySQL在对查询结果排序时使用临时表。常见于order by和分组查询group by 

Using index 

表示相应的select操作中使用了覆盖索引,避免访问了表的数据航,效率不错! 

如果同时出现Using where,表明索引 

Using where 

表示使用了where过滤 

Using join buffer 

表示使用了连接缓存 

impossible where 

where子句的值总是false,不能用来获取任何元祖 

select tables optimized away 

在没有group by子句的情况下,基于索引优化min/max操作或者对于MyISAM存储引擎优化COUNT(*)操作,不必等到执行阶段再进行计算,查询执行计划生成的阶段即完成优化 

distinct 

优化distinct操作,在找到第一匹配的元祖后即停止找同样的动作 