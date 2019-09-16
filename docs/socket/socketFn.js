module.exports = client =>{
	//接收前端坐标
	client.on('fedmsg',data=>{
		
		//将数据坐标发个其他人
		client.broadcast.emit('bedmsg',data)
	})
}