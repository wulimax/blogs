### 使用Elastsearch 实现聚合分析

把sql  :

```sql
SELECT  字段1,字段2,字段3,( sum(字段4) -sum(字段5)   ) as  字段7   FROM tablname ORDER 字段7 
```

```json
{
   "aggs": {
   "gropby_paytype": {
     "terms": {
       "field": "paytype",
       "order": {
         "sum_money": "desc"
       }
     },
     "aggs": {
       "字段4": {
         "sum": {
           "field": "real_money"
         }
       },
       "字段5": {
         "sum": {
           "field": "back_money"
         }
       },
       "字段7": {
         "bucket_script": {
           "buckets_path": {
             "event_a": "字段4",
             "event_b": "字段5"
           },
           "script": "params.event_a - params.event_b"
         }
       }
     }
   }
 },
 "_source":["字段1","字段2","字段3"]   
 "size": 1
}
```

ES 从6.3版本开始支持SQL语法 我们可以直接在用SQL查询索引  [ES SQL](https://www.elastic.co/cn/blog/elasticsearch-6-3-0-released)

