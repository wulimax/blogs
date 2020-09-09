# 探索爬虫
  使用到的技术 ：python  BeautifulSoup

## 入口类
```python
   
   # -*- coding: UTF-8 -*- 

import requests
import FileUtlis 
import Parsing
import RedisUtil
import json
import sys


class Tapd:
    def gettapd(self):
        headers = {'cookie': self.getcookie()}
        count = 1
        while (count != 0 ):
          res=requests.get(self.getLsitUrl(count),headers=headers)
          count = self.getParsing(res)

        
    def getcookie(self):
       return  FileUtlis.File().getAll('./cookie')

    def getLsitUrl(self,page):
        return "连接" + str(page)
    
    def getParsing(self,res):
        # res = FileUtlis.File().getAll('./test.html')
        re = Parsing.ParsingHtml().getListUrl(res)
        return re

if __name__ == "__main__":
    # rese = FileUtlis.File().getline('./temp.log')
    # for item in rese:
    #     print(json.loads(item))
    #     sys.exit()
    # tapd = Tapd()
    # tapd.gettapd()
    # Parsing.ParsingHtml().getEdittest()

```

### 实际解析操作类
```python
   
    # -*- coding: UTF-8 -*- 

from bs4 import BeautifulSoup
import sys
import FileUtlis
import RedisUtil
import requests
import re
import time
import json

class ParsingHtml:

    def getListUrl(self,data):
        soup=BeautifulSoup(data.content,'lxml',from_encoding='utf-8') #具有容错功能
        res=soup.prettify() #处理好缩进，结构化显示
        pagenums = soup.find('div',class_='stories-list-footer-pager').find('ul',class_='webkit-scrollbar').find('li',class_='current').span.get_text()
        soup = soup.tr.td.table.tbody
        for tr in soup.find_all('tr'):
            if tr['id'] == 'quickly-add-tr':
              continue
            self.getTrData(tr)
        pagelist = pagenums.split('/')
        if (int(pagelist[0])+1) > int(pagelist[1]):
            return 0
        else:
            return int(pagelist[0])+1

    def getTrData(self,data):
        for td in data.find_all('td',class_='td-editable-dropdown'):
            dict ={ 
                'url': td.a.get("href"),
                'title': td.a.get("title"),
                'order': td.a.string.strip()
                }  
            if 'None' == dict['url']:
                continue
            if  ''  == dict['title']:
                continue
            if '--' == dict['order']:
                continue
            print(dict) 
            dict['right'] = self.getEditUrl(td.a.get("href"))
            dict['left'] = self.getEditLeft(td.a.get("href"))
            j = json.dumps(dict)
            FileUtlis.File().setfile('./testee.log',j)
            # RedisUtil.RedisClient().setString('ty:order:'+dict['order'],j,72000)

    def getcookie(self):
       return  FileUtlis.File().getAll('./cookie')  
    
    def getEditLeft(self,urlpath):
        if urlpath.strip()=='':
            return ''
        urllist = urlpath.split('/')
        orderid = urllist[7].split('?')[0]
        url = '子请求'+ orderid +'&time='+str(int(round(time.time() * 1000)))
        headers = {'cookie': self.getcookie()}
        res = requests.get(url,headers=headers)
        soup=BeautifulSoup(res.content,'lxml',from_encoding='utf-8') #具有容错功能
        teng = {}
        for item in soup.find('div',class_='description_div').prettify().split('<br/>'):
            if ':' in item:
                if '</a>' in item:
                    continue
                if '更新时间' in item:
                    tmp = item.split('：')
                    teng[tmp[0].strip()] = tmp[1].strip()
                    continue
                tmp = item.split(':')
                if tmp[1].strip() == '':
                    continue
                teng[tmp[0].strip()] = tmp[1].strip()  
            else:
                continue
        teng['msg'] = '项目基本信息'
        return teng

    def getEditUrl(self,url):
        if url.strip()=='':
            return ''
        headers = {'cookie': self.getcookie()}
        res = requests.get(url,headers=headers)
        soup=BeautifulSoup(res.content,'lxml',from_encoding='utf-8') #具有容错功能
        res=soup.prettify() #处理好缩进，结构化显示
        teng = {}
        for div in soup.find_all('div',class_='left_3_col'):
            key = div.find('div',class_='tapd-view-title').get_text().strip()
            value = ''
            if key == '状态':
               value = div.find('div',class_='tapd-view-content').a.string.strip()
            else:
               value = div.find('div',class_='tapd-view-content').span.get_text().strip()
            if value == '--':
               value = ''
            teng[key] = value
        return teng 
    
    def getEdittest(self,res):
        soup=BeautifulSoup(res,'lxml') #具有容错功能
        teng = {}
        for item in soup.find('div',class_='description_div').get_text().split('        '):
            if ':' in item:
                tmp = item.split(':')
                if tmp[1].strip() != '':
                   teng[tmp[0].strip()] = tmp[1].strip()  
            else:
                continue
        teng['msg'] = '项目基本信息'
        return teng
        

```

### 文件操作类
```python
 
  # -*- coding: UTF-8 -*- 
import os

class File:

    def getAll(self, filePath):
        file = open(filePath,'r',encoding='utf-8')
        filedata = ""
        for line in file.readlines():  
             line=line.strip('\n')
             filedata += line 
        file.close()   
        return filedata  
        
    def getline(self, filePath):
        file = open(filePath,'r',encoding='utf-8')
        filedata = []
        for line in file.readlines():  
             filedata.append(line) 
        file.close()   
        return filedata  

    def setfile(self,path,data):
        file2 = open(path,"a+",encoding='utf-8')
        file2.write(data)
        file2.write('\n')
        file2.close()
    

```

### redis操作类
```python
   
    # -*- coding: UTF-8 -*-
 
import time
from redis import StrictRedis

class RedisClient(object):
    def __init__(self):
        self.redis = StrictRedis(host='140.143.168.127', port=6379, db=0, password='d1a13d4490ebe93001c461157e4f23d2e03498a74c93f262f50a9aa65f696cd2')

        
    #保证单例，减少连接数
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '__instance'):
            cls.__instance = object.__new__(cls)
        return cls.__instance
    #插入字符串
    def setString(self,key,value,t=600):
        self.redis.set(key,value)
        self.redis.expire(key,t)
    #获取字符串
    def getString(self,key):
        return self.bytes_to_str(self.redis.get(key))
    

    # 遍历队列，获取所有keys，用cursor在keys量大时不会堵塞redis
    def get_all_keys(self, match=None, cursor=0):
        result_list = []
        while True:
            iter_result = self.redis.scan(match=match, cursor=cursor)
            cursor = iter_result[0]
            result_list.extend(iter_result[1])
            if cursor == 0:
                return map(self.bytes_to_str, result_list)

    # 获取队列长度，兼容不同类型的获取长度，同时可以批量检测
    def get_len(self, args):
        len_dict = dict()
        val = None
        if not isinstance(args, str):
            for key in args:
                kind = self.get_kind(key)
                if kind == 'hash':
                    val = self.redis.hlen(key)
                elif kind == 'zset':
                    val = self.redis.zcard(key)
                elif kind == 'list':
                    val = self.redis.llen(key)
                elif kind == 'set':
                    val = self.redis.scard(key)
                len_dict[key] = val
            return len_dict
        else:
            dict_len = self.get_len([args])
            return dict_len[args]

    # 获取队列类型，同时兼容批量检测类型
    def get_kind(self, args):
        if isinstance(args, str):
            return self.bytes_to_str(self.redis.type(args))
        else:
            kind_dict = dict()
            for item in args:
                kind_dict[item] = self.bytes_to_str(self.redis.type(item))
            return kind_dict
    #批量取，因为保证进程安全，采取迭代弹出，如果是单进程可以批量查然后批量删
    def batch_fetch(self, name, count=1, kind=None):
        if not kind:
            kind = self.get_kind(name)
        pipe = self.redis.pipeline()
        if kind == 'set':
            while True:
                [pipe.spop(name=name) for i in range(count)]
                result = pipe.execute()
                clean_result = set(result) - set([None])
                if clean_result:
                    yield clean_result
                else:
                    break

        elif kind == 'list':
            while True:
                [pipe.lpop(name=name) for i in range(count)]
                result = pipe.execute()
                clean_result = set(result) - set([None])
                if clean_result:
                    yield clean_result
                else:
                    break

    # 批量查找
    def batch_find(self, name, count, kind=None, cursor=0):
        if not kind:
            kind = self.get_kind(name)
        if kind == 'set':
            cursor, result = self.redis.sscan(name=name, count=count, cursor=cursor)
            yield result
            while cursor:
                cursor, result = self.redis.sscan(name=name, count=count, cursor=cursor)
                yield result
                if not cursor:
                    break

        elif kind == 'list':
            while True:
                start = 0
                end = count - 1
                result = self.redis.lrange(name=name, start=start, end=end)
                yield result
                if not result:
                    break

    # 批量删除
    def batch_delete(self, name, value, kind=None, count=None):
        if not kind:
            kind = self.get_kind(name)

        if kind == 'set':
            self.redis.srem(name, *value)

        elif kind == 'list':
            self.redis.ltrim(name=name, start=count, end=-1)

    # 批量插入
    def batch_insert(self, name, value, kind=None):
        if not kind:
            kind = self.get_kind(name)
        insert_num = 0
        if kind == 'set':
            insert_num = self.redis.sadd(name, *value)
        elif kind == 'list':
            insert_num = self.redis.rpush(name, *value)
        return insert_num

    def bytes_to_str(self, s, encoding='utf-8'):
        if isinstance(s, bytes):
           return s.decode(encoding)
        return s
  
 

```