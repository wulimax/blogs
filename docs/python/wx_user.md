## 微信实现自动聊天机器人

python  -V 查看当前python版本 

centos 7 安装pip

yum -y install epel-release

yum -y install python-pip

yum clean all

使用 itchat 实现 安装 itchat   pip install itchat

[itchat](https://itchat.readthedocs.io/zh/latest/)是一个开源的微信个人号接口，可以使用该库进行微信网页版中的所有操作，比如：所有好友、添加好友、拉好友群聊、微信机器人等等。详细用户请看文档介绍，[在这里](https://itchat.readthedocs.io/zh/latest/)

```python
#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import itchat
import requests
import json


# 调用图灵机器人的api，采用爬虫的原理，根据聊天消息返回回复内容
def get_data(text):
    userId = '363282'
    inputText = {'text': text}
    key = '238061b41e4b4d7cbba29f2fac58173c'
    userInfo = {'apiKey': key, 'userId': userId}
    perception = {'inputText': inputText}
    data = {'perception': perception, 'userInfo': userInfo}
    return data
def get_answer(text):
    data = get_data(text)
    url = 'http://openapi.tuling123.com/openapi/api/v2'
    response = requests.post(url=url, data=json.dumps(data))
    response.encoding = 'utf-8'
    result = response.json()
    answer = result['results'][0]['values']['text']
    return answer

@itchat.msg_register(itchat.content.TEXT)
def text_reply(msg):
    myself = itchat.get_friends(update=True)[0]['NickName']
    content = msg['Content']
    friend = msg['User']['NickName']
    print(msg)
    print(friend)
    print('-------')
    answer = get_answer(msg['Text'])
    print(answer)
    print('++++++++++++++')
    itchat.send(answer, msg['FromUserName'])

itchat.auto_login(enableCmdQR=2)
itchat.run()

```

