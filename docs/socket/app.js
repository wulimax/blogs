var socketUrl = 'ws://127.0.0.1:3000' //连接
var socket = io(socketUrl) 			  

var oCanvas = document.querySelector('canvas')
var ctx = oCanvas.getContext("2d") //创建画笔 
var isDown = false //标记鼠标状态 true是按下时状态
 // 随机颜色
  var a = Math.floor(Math.random() * 255)
  var b = Math.floor(Math.random() * 255)
  var c = Math.floor(Math.random() * 255)
  var color = 'rgb('+a+','+b+', '+c+')'

  
//接收后端消息
socket.on('bedmsg',function(data){
  console.log(data)
  if(data.type == 'moveTo'){
  	ctx.beginPath()
  	ctx.strokeStyle = color
  	ctx.moveTo(data.x,data.y)
  }else{
  	ctx.lineTo(data.x,data.y)
  	ctx.stroke()
  }
})

//发给后端
//不希望服务器在发给我自己
//socket.emit('fedmsg',{a:1,b:3})

//通过canvas绘制的界面上的所有的点(moveTO,lineTo)
//收到消息后将坐标绘制到canvas中



//鼠标按下时放
oCanvas.onmousedown = function(e){

	isDown = true
	ctx.beginPath() //清洗画笔
	ctx.strokeStyle = color
	ctx.moveTo(e.offsetX,e.offsetY)
	socket.emit('fedmsg',{color:color,x:e.offsetX,y:e.offsetY,type:'moveTo'})
}
oCanvas.onmousemove = function(e){
  if(isDown){
  	ctx.lineTo(e.offsetX,e.offsetY)
  	ctx.stroke()
  	socket.emit('fedmsg',{x:e.offsetX,y:e.offsetY,type:'lineTo'})
  }
}

oCanvas.onmouseup = function (e){
    isDown = false
}

