一.系统安装
	安装一个英文的操作系统(下午作业)
二.基本命令
	命令使用方法： 命令 +  [选项] + [参数]
	命令：做一件事的动作本身
	选项：是命令的修正，更加细化的描述
		选项分类： 长选项、短选项
		长选项：--开头，后面通常都是跟的一个完整的单词
			特点：可以多个同时使用
			      通常是不可以组合使用
				  通常是不分先后顺序
		短选项：-开头，后面都是单词的缩写，一个字母
			特点：可以多个同时使用
			      通常可以组合使用
				  通常也不分先后顺序
	常见命令：
		pwd: 显示当前的工作目录
		cd:  切换工作目录
		ls:  列表(可以列出目录下的文件；显示文件的属性)
	
三.文件管理   ***
	（一）.普通文件
		增：创建文件
		1.1touch 
		  #touch   file_name    创建单个文件
		  #touch   file_name1  file_name2 ...  同时创建多个文件
		  特殊用法： 使用输出重定向方式创建文件
		  #echo  hello  >  d.txt    
			注：创建一个d.txt文件，里面有hello
		  #echo  > e.txt   生成一个空的文件
		删:rm  
		  #rm  a.txt     删除单个文件 
		  #rm  b.txt   c.txt    删除多个文件 
		  注意：默认每次删除前都会交互询问，但是又没指定选项，别名决定的
		  插播： 别名的使用，如果命令有别名，在使用的时候，会优先引用别名
		  查看别名：#alias  
		  设定别名：#alias   别名="命令+[选项]+[参数]"
					例：#alias   ding='rm' 
					注意：临时设定
		   取消别名：#unalias   别名  
		            例： #unalias   rm    
		改: 利用文件编辑器(vi-->vim)
			#vim   文件名   
			例：#vim  a.txt  
			注意：如果a.txt存在了，直接编辑；如果不存在，会创建个新文件
			工作模式：命令模式、插入模式、末行模式、视图模式
				命令模式：
					yy:复制
					dd：剪切（如果不粘贴，就是删除）
					p：粘贴
					G：回到文件末行
					gg：回到文件行首  
				插入模式：编辑文件内容
				末行模式： 保存、退出
					w  q  !   wq  w!  q!   wq!  			
		查：
			cat  tac  head  tail  more  less  
			cat: 正向查看，查看文件所有内容（不适合查看大文件）
				-n:显示行号
				例：#cat  -n  /etc/passwd  
				注意：cat后可以同时去查看多个文件，显示行号是叠加的	
			tac: 反向查看
			head: 查看文件首部，默认前十行
				-数字：head  -3  /etc/passwd  查看前三行
			tail: 查看文件尾部，默认尾十行
				-数字： tail  -5  /etc/passwd   查看尾5行
			more: 向下翻页，不能回看；回车翻一行，空格翻一页
			less: 可以上下翻页，上下左右箭头，回车和空格
		1.2查看文件的属性和状态：
			查看文件的基本属性：
				#ls  -l   文件名  
				例：#ls  -l   a.txt  
				-rw-r--r--. 1 root root 0 Jan 23 11:06 a.txt
				第一段：文件类型和基本权限
					10个位置：
					第1位： 文件类型 
					  -：普通文件  d:目录  l:链接文件  c:字符设备 b:块设备  p:管道设备
					第2-10位： 基本权限
				第二段：文件的硬链接数量
				第三段：文件的所有者
				第四段：文件的所属组
				第五段：文件的大小
				第六段：文件的创建时间
				第七段：文件名
				注意：如果是块设备或者字符设备，那么第五段，放的是设备号（主设备号，次设备号）
				主设备号：来表示各个设备，是否为同类设备；如果两个设备主设备号一样，那么就是同一类设备
				次设备号：来标识不同的设备；主设备号一样，但是次设备号不一致，代表是同一类的不同设备
						
			查看文件的状态（属性）：stat
				#stat   /etc/passwd   
				  注意： Context: system_u:object_r:passwd_file_t:s0
				    是文件的扩展标签，标识文件的扩展属性
				  三个时间： 
				  access:文件的访问时间，查看文件时会发生改变
				  modify:文件的修改时间，修改了文件内容时发生改变
				  change:文件的改变时间，修改文件的属性时发生改变
			查看文件内容的类型：
				#file   文件名
				例：
				#file   /etc/passwd  
					/etc/passwd: ASCII text   纯文本的
				#file   /bin/ls  	
					/bin/ls: ELF 64-bit LSB executable  使用LSB加密
				#file  /var/lib/mysql/ibdata1
					ibdata1: data    数据库文件
	（二）.目录管理
		1.创建目录： mkdir  
			#mkdir    目录名   
			#mkdir    目录名1  目录名2 ...   
			例： #mkdir   abc    创建一个目录，名称为abc 
			     #mkdir    tom   jerry    同时创建两个目录   
			#mkdir  -p   a/b/c/d/e/f/g
				-p: 可以同时创建多级子目录
		2.删除目录： 
			#rmdir   目录名     
			例： #rmdir   abc   、
			注意： rmdir默认只能删除空目录
			#rm   -r   a
			#rm  -rf  a     不再交换询问
			可以去删除一个非空的目录
		3.修改目录： 复制、移动
			复制：cp  
				#cp  -r  原目录   目标目录  
				例： #cp  -r    jerry   zhangsan
			移动：mv  	
				#mv    原目录    目标目录  
				例： #mv   tom    tom999   
				注意：mv在某种层次上，可以理解成给文件或者目录改名
		4.查看：ls   
			#ls 
				-a: 显示所有文件，包括以.开头的文件，也包括.和..
					.  代表当前目录  
					..  代表上级目录  
				-A:显示所有文件，包括以.开头的文件，但是不包括.和..
				-l:长格式显示文件，显示文件或者目录的基本属性 
				-h:通常和-l一起使用，以人类可读的方式显示文件大小
				-d:只显示目录本身，而不显示目录里面的内容，通常也是跟-l一起使用，代表去查看一个目录的基本属性
				-r: 文件名逆序显示	
				-R: 递归显示目录下面的文件
				-i: 显示文件的inode号(inode每个文件只能有一个)
				-s: 显示文件的大小
				-Z: 显示文件的扩展标签
			查看目录下面的内容：
				#ls    目录名  
				例：#ls  /root    
				
			插播：硬链接  
				#ln   原文件    链接文件   
				例： 
					#mkdir   /loring  
					#cd  /loring  
					#cp   /var/log/messages   .  
					#ls  -l  -i     硬链接数量为1  
					#ln   messages   ding    创建硬链接
					#ls   -l  -i      硬链接数量为2，两个文件inode一样
			软链接：类似windows的快捷方式
				#ln  -s   原文件   链接文件  
				例：
					#ln  -s   messages   tom.txt  
					#ln  -s   messages   jerry.txt  
				注意：链接文件中，只存放原文件名 ；原文件最好使用绝对路径
				
	（三）.文件搜索：
		1.locate:是从本地的数据库中查找，检索速度快，但是不是实时
			用法： locate  文件名  
			例1：#locate  ifconfig 
			注意：locate搜索文件，是按照文件名，去进行模糊匹配
			例2： 
				#touch  loring.txt  
				#locate  loring.txt     发现检索不到  
				#updatedb  
				#locate  loring.txt   
		2.find：遍历整个文件系统，是实时的，但是检索的速度慢
			准备文件： 
				#ls  /loring  
					-rw-r--r--. 1 root   loring      0 1月  26 09:22 a.txt
					-rw-r--r--. 1 loring root        0 1月  26 09:22 b.txt
					drwxr-xr-x. 2 root   root        6 1月  26 09:22 ding
					-rw------x. 1 root   root        0 1月  26 09:14 loring.txt
					-rw-------. 1 root   root   740006 1月  26 09:22 messages
			用法：  #find   搜索路径    表达式
					表达式： 搜索条件  参数  
			2.1按照文件类型查找：-type   
				搜索普通文件： #find   /loring   -type   f     
				搜索目录： #find   /loring  -type  d  
					b:块设备   c:字符设备     p:管道  l:链接文件  
			2.2按照文件的全新的查找： 
				#find   /loring    -perm   644(权限)
			2.3按照文件的所有者去查找： 
				#find   /loring  -user    loring(用户名)
			2.4按照文件所属组查找： 
				#find   /loring  -group   loring(组)
			2.5按照文件的大小查找： 
				#find   /loring  -size   大小
				例：
				#find   /loring  -size   5M    搜索文件大小等于5M
					(单位：k  M  G)
				#find  /loring   -size   -5M   搜索小于5M大小的文件
				#find  /loring   -size   +100k  搜索大于100k的文件
				注意：文件大小的数字不能为1，如果为1，就代表查看0大小的文件
			2.6按照文件名查找： 
				#find  /loring  -name  文件名(支持通配)
				例： 
				#find  /loring  -name  tom.txt   
				注意：默认文件名，是做精准匹配的
				#find  /loring  -name   tom\*   
					*:代表任意字符，意味查找的是tom开头的，后面任意
					?:代表的任意单个字符
					[]: 代表要从扩号中，任选一个值；例[abc],必须从a b c中选一个字母
			2.7按照时间去查找： 不是按文件创建的时间查找
				按：access time ;  modify  time ; change time 查找
				#stat   文件名   可以去查看文件的三个时间
				-atime  -mtime  -ctime     代表单位是天 
				-amin   -mmin   -cmin      代表单位是分钟  
				例：
				#find   /loring  -atime  3
				#find   /loring  -atime  +3
				#find   /loring  -atime  -3  
			2.8多个搜索条件可以同时使用：
				例：将最近三天创建的文件，大小如果是0，并且所属组为loring的文件搜索出来 
				#find   /   -mtime  -3  -size  0  -group  loring  
			2.9搜索后的处理：  -exec实现  
				#find   /loring  -user  loring  -exec  动作  \;
				例： 
				#find  /loring  -user  loring -exec  rm -rf  {}  \;
				注释： {}代表引用前面find查找出来的结果
				
				#find  /loring  -group  loring  -exec  cp  {}  /tmp   \;
				
	（四）.压缩、解压缩、打包(归档)：zip       gzip  bzip2  xz  
		1.zip：默认既可以压缩，又可以打包
			使用格式： #zip  压缩后文件名   原文件1  原文件2 ...  
			
			压缩：例：
				准备： 
				#cp   /var/log/messages   /loring 
				#cd  /loring  
				#cp   messages  messages1  
				实验：
				#zip   loring.zip   messages  messages1
				
			解压： 
				#unzip   loring.zip     
			注意：  压缩、解压缩，原文件不会丢失  
			解压文件，同时制定解压路径：
				#unzip  loring.zip  -d    /tmp  
				要将文件解压到/tmp目录下
			
			压缩比=（原文件-压缩后的文件）/原文件
			a =  （10-b）/10
			注意：压缩比不是固定的;但是，压缩比越大，压缩后的文件越小，压缩时间越长；压缩比越小，压缩后文件越大，压缩时间越短
			
			压缩级别：是可以固定的，默认有9个压缩级别，压缩级别越高，压缩比越大
			9个级别用：1-9数值来表示，数字越大，压缩级别越高
			
		2.gzip:  没有打包功能
			使用格式： #gzip   原文件   
			压缩：
				#gzip  messages     
				#ll  -h   
				注意：用gzip压缩文件，原文件会丢失 
			解压：  
				#gunzip   messages.gz  
				注意:解压后，压缩文件会丢失  
			指定压缩级别：
				#gzip   -9  messages   
				#gzip   -1  messages1  
				#ll  -h  
				查看文件大小，可以验证压缩级别的作用
			不解压查看压缩文件：
				#zcat   messages.gz     
			
		3.bzip2:
			使用格式： #bzip2  原文件  
			压缩： 
				#bzip2   messages2  
				压缩后的文件以.bz2做后缀 ， 用bzip2压缩文件，原文件会丢失
			解压缩： 
				#bunzip2   messages2.bz2  
				解压后，压缩文件会丢失
			指定压缩级别：
				#bzip2   -9   messages2
				注意：如果没有指定压缩级别，默认在6级别 
			不解压查看： 
				#bzcat    messages2.bz2  
			在压缩、解压的时候，保留原文件： 
				#bzip2   -k  messages2    
				-k: keep,可以保留原文件 
			解压缩到新的文件，并保留压缩文件： 
				#bunzip2  -c  messages2.bz2  >  ding.txt(新的文件名)
		4.xz:
			使用格式： #xz  原文件 
			压缩：
				#xz  messages2   
				压缩后的文件以.xz做后缀 ， 用xz压缩文件，原文件会丢失
			解压缩：
				#unxz  messages2.xz   
				解压后，压缩文件会丢失
			指定压缩级别： 
				#xz  -9  messages2
			不解压查看： 
				#xzcat  messages2.xz  
			压缩、解压时保留原文件：
				#xz   -k  messages2  
			解压缩到新的文件，并保留压缩文件： 
				#unxz  -c  messages2.xz   >  ding.txt(新的文件名)
		5.总结： 
			1）.压缩文件应用场景：
				a.本地：为了节省本地磁盘空间
				b.官网上的软件包：完整显示软件包(归纳)
				c.网络传输：节约带宽，加快传输速度，安全***
	（五）.打包： tar  
		使用格式： #tar   选项     打包文件名    文件名1   文件名2  ...  
			-c: 创建归档文件、创建打包文件  
			-v: 显示打包的过程
			-f: 操作的归档文件，该选项必须放在所有选项的最后 
			-r: 向归档文中追加文件，归档文件不能被压缩
			-t: 不展开归档，查看里面的文件 
			-x: 展开归档文件
		例： 
			#cd   /loring  
			#cp   /var/log/messages    /loring   
			#cp   messages   messages1   
			#cp   messages   messages2
			
			#tar  -cvf   loring.tar    messages   messages1 
			#ll   -h     
			注意：打包过程中，原文件不会丢失；而且默认打包没有压缩功能
			#tar  -tf   loring.tar 
				messages    messages1
			
			#tar   -rf   loring.tar   messages2  
			#tar   -tf   loring.tar    
				messages  messages1   messages2   
			实验： 将/usr/local的所有文件打包，然后以tom.tar命名   
				#tar  -cvf   tom.tar    /usr/local/*    
				注意：开头的"/"代表的是根的意思，是不能被打包的 
				
		调用压缩工具：实现打包的同时，再进行压缩
			默认tar是没有压缩功能的，但是可以去调用gzip、bzip2、xz等压缩工具
			-z:  调用gzip  
			-j:  调用bzip2  
			-J:  调用xz   
			
			打包并压缩： 
				#tar   -zcvf   loring.tar.gz  messages  messages1  messages2 
				#ll  -h     发现即打包，又压缩  
				
				等于如下分步执行： 
				#tar   -cvf   ding.tar   messages  messages1  messages2
				#gzip   ding.tar      将上述一个打包文件，单独压缩了
			解包并解压： 
				#tar  -xzvf    loring.tar.gz    
				#ll  -h     发现包被解压展开了 
			展开归档，指定路径： 
				#tar  -xzvf  loring.tar.gz    -C   /tmp   
				会将展开的文件，存在/tmp目录中  
			
	（六）.	排序、去重、切割、过滤： 
		1.排序： sort  
		  使用格式：#sort  文件名   
		  #sort   /etc/passwd    
		  注意：默认的排序规则，按照每行首字母进行排序，是按ASCII码排序
		  
		  #sort  -t  ":"   -k  4   passwd(文件名)
		  代表要以:来对文件做切割，然后安装切割后的第4段进行排序
		  注意：如果哪些列的值还一样的话，还去比较首字母 
		
		  #sort  -t  ":"   -k  4   -n   passwd   
		  依然按第4列排序，但是按照第4列数值的大小进行排序 
		  
		  #sort   -r   /etc/passwd     
		  逆序排序   
		  
		  -t:  来指定文件的分隔符 
		  -k:  按第几列进行排序 
		  -n:  按数值大小进行排序  
		  -r:  逆序排序  
		  -u:  排序同时，进行去重 
		2.去重：uniq  
			使用格式： #uniq   文件名   
			例：准备文件
				#cat  b.txt   
					abc
					123
					abc
					abc
					abc
					123
					123
				#uniq    b.txt    
					abc
					123
					abc
					123
				注意：默认uniq只会去掉相邻的重复行 
			去重的同时，去统计都有多少个重复行：
				#uniq  -c    b.txt     
			
			排序的同时，进行去重：去掉所有的重复行
				#sort   b.txt    |    uniq   -c  
				先排序，在去重，还去统计重复行的数量  
			对比： sort  -u   
				sort -u也能实现，排序的同时去重，但是无法统计重复行***
		
		3.切割： cut    
			使用格式：  #cut  -d  ":"  -f  3   文件名   
			例：  
				#head  /etc/passwd  >  /loring/pass.txt  
				#cut  -d  ":"  -f  3   /loring/pass.txt  
				要将pass.txt文件，以:当作输入分隔符，切出第3段  
				
				#cut  -d  ":"  -f  1,3   /loring/pass.txt   
				切出第1段和第3段   
				
				#cut  -d  ":"   -f  1-4  /loring/pass.txt  
				切出第1到第4段，这是连续的 
				
				注意：默认如果没有指定输出分隔符，则输出分隔符跟输入分隔符相等
				
				指定输出分隔符： --output-delimiter    
				#cut  -d  ":"  -f  1,3  --output-delimiter="-->"  /loring/pass.txt    
				
				常用选项： 
					-d:指定输入分隔符
					-f:指定输出哪些列
					--output-delimiter: 指定输出分隔符 
				实验:统计apache服务的用户访问量
					日志文件： /etc/httpd/logs/access_log  
					统计访问次数排名前三的人，以及访问的次数：
					#cut  -d  " "  -f 1  /etc/httpd/logs/access_log  | sort | uniq  -c  |  sort -n  -r  |  head -3 
				
		4.过滤： grep   
			使用格式：  #grep   选项   字符串(表达式)    文件名  
			#grep   "root"   /etc/passwd    
			注意：grep是行级过滤器，会将匹配到的行打印出来
			
			常用选项：  
				-i:在过滤的时候，不区分大小写     
				-v:取反，匹配到的反而不显示
				-A：在匹配到行之后，再先后多显示几行
				-B：在匹配到行之前，再多显示几行
				-C：在匹配到行上下，各多显示几行
				-rl, -R:按文件中的内容，查找文件名
			#useradd  ROOT   
			#grep   -i   "root"   /etc/passwd 
			
			#grep   -v   "root"   /etc/passwd   
			
			#grep  -A  2  "root"   /etc/passwd   
			#grep  -B  2  "root"   /etc/passwd   
			#grep  -C  2  "root"   /etc/passwd   
			
			-rl:使用格式  
				#grep  -rl   "字符串"   目录名   
				#grep  -rl "hello"  /loring    
				代表查找，在/loring目录下，都哪些文件中，含有hello这个字符串
			-R:按照文件中内容去搜索文件位置，是递归查找
				#grep  -R   "hello"    /loring  
				#grep  -R   "hello"    / 


​			
​			
			实验：查找本机的ip地址，只要ip地址
				#ip  a s    |  grep global  | cut -d "/"  -f 1 | cut -d "t" -f 2 | cut -d " " -f 2
				
				#ifconfig  |  grep broadcast  |  cut  -d "t" -f 2  | cut -d " " -f 2
			
			行首、行尾锚定：
			查看以什么内容开头的行：^
				#grep  "^root"   /etc/passwd  
				查看哪些行，是以root开头的
			查看以什么内容结尾的行：$	
				#grep   "bash$"   /etc/passwd   
			查看空行：
				#grep  "^$"    /etc/passwd    
			查看一行中，只包含了某个字符串的行：
				#grep   "^root$"   /etc/passwd   
				代表查找，整个行中，只有一个root的行
				
			词首、词尾锚定：
				词首锚定： 
					#grep  "\<root"   /etc/passwd   
					注意：在一行中，必须有个单词，是以root开头的
				
				词尾锚定： 
					#grep  “root\>"   /etc/passwd   
					注意：在一行中，必须有个单词，是以root结尾的
				词首+词尾锚定：
					#grep  "\<root\>"   /etc/passwd   
		  
		5.统计：wc  
			使用格式：  #wc  [选项]  文件名   
			#wc     /etc/passwd   
				43   81 2198 /etc/passwd
				43位置：有多少行  
				81：有多少个单词
				2198：有多个字节 
			#wc  -l    /etc/passwd   
				43      行查看   
			#wc  -w   /etc/passwd   
				81      单词查看  
			#wc   -c     /etc/passwd   
				2198     字节查看  				


​				
四.用户、组管理  （本地用户和组的管理）
​	（一）.用户管理
​		1.创建用户：useradd    (adduser)
​			#useradd   [选项]  用户名  
​			#useradd   tom  
​			创建用户时，指定用户的基本属性： 
​				#useradd  -u  1500   ding1    指定用户的uid为1500
​				#useradd  -g  1500   ding2    指定用户的gid为1500  
​				#useradd  -c  hello  ding3    指定描述信息为hello
​				#useradd  -d  /home/haha  ding4  指定用户的家目录为/home/haha
​				#useradd  -s  /sbin/nologin   ding5   指定用户为不可登录
​				注意：多个选项可以一起使用，同时指定了多个属性
​			创建用户时，不创建家目录：
​				#useradd   -M   ding6  
​			创建一个系统用户：
​				rhel6: uid为0-499，是系统用户；剩下的叫普通用户
​				rhel7: uid为0-999，是系统用户 ；剩下的是普通用户
​				#useradd  -r   ding7   
​				#id  ding7   
​			创建用户的同时，指定用户的附加组：
​				#useradd   -g  3000   ding8      指定用户的主要组是3000
​				#useradd   -G  4000   ding9      指定用户的附加为4000  
​				主要组： 是一个用户必须要有的，而且只能有一个 
​				附属组： 可以没有，也可以有多个   
​				#usermod   -G  5000    loring    修改loring的附加组为5000
​				注意：如果只使用-G，那么原来的附加组都会被替换掉
​				#usermod   -a   -G  6000  loring   增加一个附加组为6000  
​		2.删除用户: userdel  
​			#userdel  -r   用户名  
​			#userdel  -r   tom    
​			#id  tom      用户已经被删除了 
​		3.查看用户:
​			3.1验证用户是否存在： id  
​				#id   用户名 
​				#id   tom 
​					uid=1004(tom) gid=1004(tom) group=1004(tom)
​					uid:  user  id  用户的id号，全系统唯一，范围0-65535
​						  注意：uid为0的人，是系统的超级用户
​					gid:  group id  组的id号 
​				#id   jerry   
​					no  such  user     这代表系统中没有该用户 
​			3.2查看用户的基本信息(属性)：
​				每个用户的基本信息存在了/etc/passwd文件中 
​				#tail   -2  /etc/passwd  
​					loring:x:1000:1000::/home/loring:/bin/bash
​					tom:x:1004:1004::/home/tom:/bin/bash
​				该文件用:分隔七段： 
​				第一段：用户名 
​				第二段：密码，占位符
​				第三段：用户的uid
​				第四段：用户的gid，主要组的ID号
​				第五段：描述信息，描述用户的作用
​				第六段：家目录 
​				第七段：登录shell，/bin/bash可登陆系统，/sbin/nologin不可登录
​		4.修改用户属性: usermod 
​			#usermod  -u  1502  ding1     修改ding1用户的uid为1502   
​			#usermod  -g  1503  ding1     修改ding1用户的gid为1503   
​			#usermod  -c  welcome  ding1     修改ding1用户的描述信息为welcome   
​			#usermod  -d  /home/hehe  ding1     修改ding1用户的家目录为hehe
​				注意：如果修改了家目录，以前目录不存在，要手动创建目录
​			#usermod  -s  /sbin/nologin  ding1     修改ding1用户为不可登录   
​			多个选项可以一起使用，同时修改多个属性
​		5.用户的家目录： 
​			#ls  /home/ding2      发现没有内容 
​			#ls  -a   /home/ding2   	 发现有内容
​				.bash_logout  .bash_profile  .bashrc  .mozilla
​			注意：用户的家目录中，默认是有文件的，都是一些隐藏文件 
​				.bash_logou:   用户的登录，退出相关
​				.bash_profile:  存用户的环境变量
​				.bashrc:    通常是存放用户的命令别名，可以让别名永久生效
​				.mozalla:   用户的图形化  
​			插播： usermod  -d   /home/hehe   ding1   
​				   注意：自己创建家目录的时候，要记得复制以上隐藏文件
​		6.用户的登录和切换：
​			6.0验证当前登录的用户： 
​				#whoami     
​			6.1用户的登录
​				a.物理终端登录：tty1-tt7  
​					ctrl+alt+[F1-F7]   切换物理终端	
​					F1： 图形化终端   
​					F2-F7： 字符界面  
​					
				b.虚拟终端登录：
					在图形化系统中，鼠标右键，打开终端，这就是一个虚拟终端
					或是使用各种远程连接工具 
			6.2用户的切换：
				#su   用户名           （非完全切换）
				#su  -   用户名         （完全切换）
				#exit      退出登录   
				
				#su  -  ding1
				#whoami    
				#exit  
		7.验证当前使用的是哪个终端：
			#tty    
				/dev/pts/0             这是虚拟终端  
			#tty   
				/dev/tty2              这是物理终端  
		8.查看当前系统都有哪些用户登录： 
			#users  
				loring root root root
			#who  
				root     :0           2018-01-30 10:24 (:0)
				root     pts/0        2018-01-30 09:01 (192.168.0.249)
				root     tty2         2018-01-30 10:27
				loring   tty3         2018-01-30 10:27
			#w     
		10:35:48 up  1:36,  4 users,  load average: 0.12, 0.06, 0.05
		USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
		root     :0       :0               10:24   ?xdm?  54.14s  0.14s gdm-session-worker 
		root     pts/0    192.168.0.249    09:01    4.00s  0.55s  0.05s w
		root     tty2                      10:27    5:24   0.06s  0.06s -bash
		loring   tty3                      10:27    8:04   0.04s  0.04s -bash	
		9.将用户从终端中踢出： 
			#pkill  -kill  -t  终端 
			#pkill  -kill  -t   tty3  
		10.修改用户的密码：
			#passwd    用户名       修改某个用户的密码  
			#passwd                 修改当前用户的密码 
			注意：只有超级用户，默认是可以修改其他用户密码
			密码设定规则:超过8位，要包含大写字母、小写字母、数值、特殊符号中的至少三种；生成服务中，root的密码一般都超过16位
			第一种修改方式：
				#passwd  ding2  
				#passwd  root  
			第二种修改方式： 
				#echo   密码     |  passwd  --stdin   用户名    
				#echo   redhat   |  passwd  --stdin   ding3   
		11.存放密码的文件：/etc/shadow  
			#tail  /etc/shadow  
				ding3:!!:17561:0:99999:7:::
				ding4:$6$UxLEene0$ct17Y3tZiV56oKaWxyPmr3LtmfBGhlGSTQOnHrEEjiObAQjd42B6cltL0GX7lPrPOihhuStr95AyJOxeglYcP1:17561:0:99999:7:::
			该文件用:分隔为9段： 
			第1段： 用户名  
			第2段： 密码，如果是!!代表还没有设定密码  
			第3段： 密码创建或者修改的时间点，是距离1970-1-1(数据元年)有多少天
			第4段： 密码的最小使用周期，0代表没有限定，随时可以修改密码
			第5段： 密码的最大使用周期，99999没有限定，永不过期
			第6段： 密码到期前几天，去提醒 
			第7段： 密码到期-->失效的时间
			第8段： 密码失效-->过期的时间 
			第9段： 未被使用 
	
			第2段： 又用$分隔了三段
				第一段： 代码密码的加密方式，1代表使用md5加密，6代表使用sha加密
				第二段： salt，杂质  
				第三段：加密内容(可以理解为密码，但是不是真正的密码)；是使用单向加密，无法破解  
				扩展： 
					md5sum命令的使用 
					#cp   /etc/passwd    /tmp  
					#md5sum    /tmp/passwd   
					#vim     /tmp/passwd     在文件最后，就添加一个.
					#md5sum   /tmp/passwd   
						发现，加密的字符串，跟原的一点都不一样 
						单向加密的雪崩效应  
						如果原文件没有变化，那么加密后的内容用远一样 
		（二）.组管理
			1.创建：groupadd  
				#groupadd    [选项]   组名  
				#groupadd    group1  
				#groupadd     -g   2000   group2     指定group2的id号为2000  
			2.删除: groupdel  
				#groupdel   group1   
				#tail   /etc/group    发现组已经被删除  
			3.查看: 
				#tail   /etc/group    
					group1:x:1506:
					group2:x:2000:
				用:分隔了4段： 
				第1段：组的名称  
				第2段：组的密码，用来占位
				第3段：组的id号 
				第4段：成员（要以该组当附加组的成员）
				
			4.修改: groupmod  
				#groupmod   -g  3000  group2    
				#tail   /etc/group      
			5.修改组的密码： 
				#gpasswd      组名   
				#gpasswd     group2         修改密码   
				#tail    /etc/gshadow       查看密码   
				ding7:!::
				group2:$6$biVag/lB6dy/X$qeUWlYo4kw3LNpGrbIgS/au8ApzWeuitWJdup925tRHRGQ7nm3xB0xRB5qhuG1me2YGAOO3KI/zejk34mDMX/.::
				用:分隔为了4段： 
				第1段： 组名  
				第2段： 密码  
				第3段： 组的管理员 
				第4段： 组成员 
			6.给组指定管理员：
				#gpasswd   -A   loring   group2   
				指定loring为group2这个组的管理员 
				#tail    /etc/gshadow 
				#gpasswd   -A    loring,ding2   group2   
				同时指定loring和ding2位group2组的管理员 
			7.使用管理员，向组中添加成员： 
				#su  -  loring  
				#gpasswd   -a    ding3   group2   
				#tail    /etc/group    


​				
		（三）.修改文件的所有者和所属组：
			准备工作：
				#mkdir  /loring  
				#cd    /loring   &&  cp  /etc/passwd   .   
				#ll   
			修改文件的所有者：chown      
				使用方法：  chown   用户名    文件名   
				例：
					#chown   loring   passwd  
					#ll   
			修改文件的所属组： chgrp   
				使用方法 ：  chgrp   组名     文件名   
				例 ： 
					#chgrp   group5     passwd   
					#ll   
			同时修改文件的所有者和所属组： 
				使用方法：  
					chown     用户名:组名      文件名   
					chown     用户名.组名      文件名   
				例：	
					#chown    ding2.group7      passwd  
					#chown    ding3:group6      passwd   
			使用chown命令，单独修改文件所属组： 
				使用方法：
					chown    .组名       文件名   
					chown    :组名       文件名   
				例： 
					#chown   .group2      passwd   
					#chown   :group5      passwd   
					
			注意：使用到组，必须是事先存在的 		
					
		扩展：修改主机名 
			rhel6: 
				临时修改：
					#hostname    主机名  
					#hostname   c1.loring.com       要将本机的主机名该为c1.loring.com  					
				永久修改：
					#vim   /etc/sysconfig/network  
						HOSTNAME=c2.loring.com     永久修改   
						
				查看主机名： 
					#hostname  
					#uname   -n     
			rhel7: 
				临时修改： 
					#hostname   主机名  
					#hostname   c1.loring.com    
				永久修改：  
					#vim   /etc/hostname 
						c1.loring.com       直接写主机名即可，不再需要加HOSTNAME=
					
					#hostnamectl  set-hostname   主机名  
					#hostnamectl  set-hostname   c1.loring.com     也是永久生效

五.权限管理 
	（一）.基本权限
		1.查看文件或者目录的基本权限：
			#ls  -l    文件名  
			#ls  -ld   目录名  
			
			例：  
			#cp    /etc/passwd   /loring  
			#cd   /loring 
			#ls  -l  
				-rw-r--r--. 1 root root 2475 1月  31 09:22 passwd
			第一段中，第2位到第10位为基本权限位，一共9个位置：
			文件使用者分类：共分为3类 
				第1类： 文件的所有者  
				第2类： 文件的所属组 
				第3类： 其他人 ，如果不是所有者也不是所属组，那么就是其他人
			将基本权限的9位，分别给了这三类用户：
				2-4：  是文件所有者，对该文件的权限 
				5-7：  是文件所属组，对该文件的权限 
				8-10： 是文件其他人，对该文件的权限  
		2.基本权限的分类：
			将基本权限分为了3类： 
				第1类： 读权限，用r表示  
				第2类： 写权限，用w表示 
				第3类： 执行权限，用x表示 
			在每段的基本权限位中，r,w,x最多只能出现一次，而且要在固定位置：
				基本权限的第1段，第2-4位： 
					-  -  -  三个位置
					第一个位置：只能出现r，或者不出现(-表示)
					第二个位置：只能出现w，或者不出现(-表示)
					第三个位置：只能出现x，或者不出现(-表示)
					
		3.修改文件的基本权限：chmod   
			3.1第一种修改方法： 
				#chmod    ugoa=权限      文件名  
					u:文件的所有者
					g:文件的所属组  
					o:文件的其他人 
					a:所有的三类用户  
				修改文件所有者的权限为：可读、可写、可执行
					#chmod   u=rwx     passwd   
					#ll   
				修改文件所属组的权限为： 可读、可写  
					#chmod   g=rw      passwd   
				修改文件其他人的权限为： 只有执行权限 
					#chmod   o=x      passwd   
					#ll   
				修改所有人的权限为只读：  
					#chmod   a=r      passwd   
					#ll  
				同时修改文件所有者和所属组的权限：可写、可执行  
					#chmod   ug=wx    passwd  
					#ll  
				同时修改文件所有者和所属组的权限： 所有者的权限为rwx，所属组的为r  
					#chmod   u=rwx,g=r   passwd  
				使用等于号给用户授权，不用考虑用户以前具有什么权限
			3.2第二种方式： 
				#chmod   ugoa[+-]权限    文件名文件   
				给所有者增加一个读权限：
					#chmod   u+r   passwd  
					#ll  
				给所有者和所属组，同时增加一个写权限和执行权限： 
					#chmod   ug+wx   passwd   
					#ll   
				给所有用户增加一个执行权限：
					#chmod    a+x     passwd  
					或者：
					#chmod    ugo+x   passwd  
					或者： 
					#chmod    +x      passwd  
				减去所有者的读权限：  
					#chmod   u-r    passwd   
				同时减去所有者和所属组的执行权限：  
					#chmod   ug-x   passwd   
				同时减去所有人的执行权限： 
					#chmod   a-x    passwd  
					或者 
					#chmod   -x     passwd   
				给所有者增加一个读权限，给所属组增加一个执行权限：  
					#chmod  u+r,g+x    passwd  
				给所有者减少一个读权限，给所属组减少一个执行权限：  
					#chmod  u-r,g-x    passwd  
			3.3第三种修改方式：以八进制方式修改 
				#chmo    八进制数值    文件名  
					r=4   w=2    x=1   
				实验：  
				#chmod   752     passwd   
				#ll    
					rwx r-x -w-  
				#chmod   643     passwd  
					rw-r---wx
				#chmod   561     passwd  
					r-xrw---x  


​			
		4.权限的作用：
			
			4.1针对普通文件：
				r: 可以使用特定的命令，查看文件中的内容 
				w: 可以编辑文件中的内容 
				x: 可以运行文件中的代码(内容)
					注意：在linux中，文件是否可以执行，就看文件是否就x权限
				
				权限的作用： 
				r: 单独具有读权限，只能查看文件内容，不可写，也不可执行 
				w: 单独具有写权限，不能查看，能强制写入，不能执行
				x: 单独具有执行权限，毫无意义  
				rw: 能查看内容，也能写(编辑)，不能执行 
				rx: 能查看内容，不能写，可以执行 
				wx: 不能查看内容，能强制写入，不能执行  
				rwx: 能查看内容，也能写，也能执行 
				注意： 如果一个用户，对文件没有写权限，但是对文件所在的目录具有写权限，那么该用户对文件也是可以强制写入的 
			4.2针对于目录：
				r:可以查看目录下面的文件，例如使用ls去查看
				w:可以在目录下创建和删除文件、拷贝文件   
				x:能够进入到目录 
				
				权限的作用： 
				r: 单独具有读权限，可以查看一级子目录，但是会报错，不能写，也不能进入 
				w: 单独具有写权限，毫无意义  
				x: 单独具有执行权限，不能查看，不能写，可以进入目录 
				rw: 能查看一级子目录，会报错，不能写，也不能进入，跟单独具有r一样
				rx: 能够正常查看，不能写，能进入 
				wx: 不能查看，可以写，能进入，但是进入之后也看不见内容
				rwx: 可以查看，可以写，也可以进入
			
				注意1：如果单独对目录具有执行权限，那么可以进入到目录，但是不能写，也不能查看；但是如果知道有哪些子目录，而且对子目录有权限的话，那么对子目录操作不受影响
				
				注意2: 如果对目录具有wx权限，可以删除目录下的文件，但是删除文件是，不支持通配（不支持* ? 等）
			
		5.创建文件或者目录的默认权限：
			5.1创建文件的默认权限：
				#touch   a.txt  b.txt  c.txt   
				#ll    
					rw-r--r--     默认权限都是644  
				#su  -  loring   
				$touch  aa.txt   bb.txt  cc.txt  
				$ll   
					rw-rw-r--     默认权限是664   
				注意：root用户创建文件的默认权限是644,普通用户创建文件的默认权限是664；创建普通文件，绝对不会给执行权限 
				
			5.2创建目录的默认权限：
				#mkdir   a   b  
				#ll  
					rwxr-xr-x      默认权限是755
				#su   -  loring  
				$mkdir   aa    bb  
				$ll  
					rwxrwxr-x       默认权限是775   
				注意：root用户创建文件的默认权限是755,普通用户创建文件的默认权限是775
			
			5.3umask反向掩码的作用：决定用户创建文件的默认权限 
				查看umask:
					#umask 
						022
					#su  -  loring   
					$umask 
						002  
				umask的作用：
					创建普通文件的默认权限=666-umask  
					创建目录的默认权限=777-umask   
					
				修改umask:
					#umask   掩码   
					例： 
					#umask  025   
					#touch   hello.txt
					理论上的权限： 666-025=641   
					#ll  
						rw-r---w-      权限是642，而不是641 
					注意：如果创建普通文件，绝对不会给执行权限；即使计算出来有执行权限，要自动加1 			
			
	（二）.特殊权限
		1.suid
			作用：一旦给文件赋予了suid权限，那么将来在文件执行的时候，以文件所有者的身份运行;一般该权限都是给二进制可执行文件(命令)
			#ll   /etc/shadow   
				----------. 1 root root 1623 1月  30 12:14 /etc/shadow
			准备两个终端： 
			第1个终端：
				#su  -  loring  
				$passwd   
			第2个终端： 
				#ps  -eo  ruser,euser,comm    |  grep  passwd 
					loring   root     passwd
				查看passwd命令执行的进程
				进程：程序运行时，在内存中的状态
				ruser:  进程的真实用户
				euser:  进程的有效用户
				comm:   执行的哪个命令产生进程 
			
			实验：  
			第1个终端：
				#cd  /loring  
				#echo  hello  ding   >  a.txt  
				#chmod  000    a.txt  
			第2个终端：
				#su  -  loring  
				$cat   /loring/a.txt  
			给cat命令增加一个suid权限： 
			第1个终端：  
				$which  cat      查看普通用户使用的cat命令的绝对路径    
				#chmod   u+s  /bin/cat  
			第2个终端：   
				$cat  a.txt  
			第1个终端：  
				#chmod  u-s    /bin/cat      减少suid权限  
			使用方式：  
				suid会占用所有者的基本权限位的最后一位，并且用[sS]来代表
				s: 代表原来所有者是具有执行权限
				S: 代表原来所有者是不具有执行权限 
				添加suid权限：  
					#chmod  u+s   文件名  
				减少权限： 
					#chmod  u-s   文件名    
			注意： suid作用在目录上，毫无意义 
		2.sgid
			作用：一旦给一个目录设定了sgid，将来在目录下创建的子目录，会继承父目录的所属组，而且每个子目录都会继承sgid权限   
			使用方式：  
				sgid会占用所属组的基本权限位的最后一位，并且用[sS]来代表
				s: 代表原来所有者是具有执行权限
				S: 代表原来所有者是不具有执行权限 
			增加sgid:  
				#chmod  g+s   文件名  
			减少权限： 
				#chmod  g-s   文件名 
			实验： 
				#mkdir    /test  
				#chown   .group2   /test  
				#chmod  g+s   /test  
				#mkdir  /test/{a,b,c}
				#ll  /test  
					发现所有目录的所属组都是group2  
		3.sticky
			作用： 一旦给一个目录设定了sticky权限，那么目录下的文件，只有文件的所有者和root有权力删除 
			使用方式：  
				sticky会占用其他人的基本权限位的最后一位，并且用[tT]来代表
				t: 代表原来所有者是具有执行权限
				T: 代表原来所有者是不具有执行权限
			增加sticky权限：  
				#chmod   o+t    文件名  
			减少sticky权限： 
				#chmod   o-t    文件名 
			实验：  
				第1个标签：
				#mkdir    /test1   
				#chmod  757   /test1  
				#su  -   loring  
				$touch  /test1/hello.txt  
				第2个标签：  
				#su  -  ding  
				$rm  -rf   /test1/hello.txt 
				
				使用root用户，去给/test1增加一个sticky权限  
				#chmod   o+t   /test1   
				
				再执行创建文件和删除的动作
		4.用数值的方式表示： 
		    suid    sgid    sticky    
			suid=4   sgid=2   sticky=1
			
			例：  
				#mkdir  /test2  
				#chmod   2770     /test2   
				代表给/test2设定一个sgid权限，基本权限是770
				
				#chmod   1755     /test2     
				代表给/test2设定以sticky权限，基本权限为755  
				
				#touch   /a.txt  
				#chmod  4600    /a.txt   
				代表给/a.txt设定一个suid权限，基本权限为600   
			
			注意：通常suid、sgid、sticky三个权限不会同时存在，即使同时存在了，必定有些权限是没有意义的 


​				
	（三）.acl访问控制列表：acess  control  list 
			acl作用：决定了用户是否就要响应的权限，如果一个文件系统没有设定特定的acl，也能使用 
			查看acl访问控制列表：
				#getfacl    文件名   
				#getfacl   /etc/passwd 
					# file: etc/passwd
					# owner: root
					# group: root
					user::rw-
					group::r--
					other::r--
				#getfacl   /test   
			设定acl访问控制列表：
				#setfacl   [选项]   权限列表      文件名 
				#chmod  000  a.txt   
				#setfacl  -m  u:loring:rwx   a.txt  
				#su  -  loring  
				$cat  a.txt   
				-m: 修改访问控制列表 
				u:修改针对用户的列表
				g:修改针对组的列表 
				mask::rwx   能够使用的最高权限
				#setfacl  -m   g:group2:rw   a.txt   
				#getfacl  a.txt  
			删除一个列表：
				#setfacl  -x  u:用户   文件名   
				#setfacl  -x  g:组名   文件名 
				
				#setfacl  -x  u:loring  a.txt  
				#getfacl   a.txt   
				
			清空所有特定的acl列表：	
				#setfacl  -b    文件名  
				#setfacl  -b    a.txt  
			注意： 在红帽6中，新创建的文件系统(新的分区)，默认是不支持acl设定的，在挂载的时候，必须要加上-o acl选项，才可以设定	
			
			设定默认acl权限： 
				#setfacl  -m    d:u:loring:rwx    文件名  
				#setfacl  -m    d:g:group2:rwx    文件名  
				
				清空默认权限列表：
				#setfacl  -k    文件名  
				
			设定目录的默认列表： 
				#setfacl  -d -m  u:loring:rwx   aaa
				#getfacl   aaa  
				#cd  aaa   &&  touch   c.txt  
				#getfacl  c.txt  
					user:loring:rwx			#effective:rw-
					effective:rw-  代表了有效的权限为rw-,也是最高权限
				
			实验：  
				#which  chmod  
					/usr/bin/chmod  
				#chmod  000  /usr/bin/chmod  
				#chmod  755  /usr/bin/chmod     权限拒绝了
				
				解决方案一： 
				#setfacl  -m  u:root:rwx  /usr/bin/chmod  
				#chmod   755  /usr/bin/chmod   
				#setfacl  -b  /usr/bin/chmod  
				
				解决方案二：
				重新安装提供该文件的软件包：coreutils-8.22-11.el7.x86_64
				
	（四）.系统权限：attr权限
		查看系统权限：
			#lsattr   文件名 
			#lsattr    a.txt  
		修改系统权限：
			#chattr   [+-]权限    文件名 
			i:完全锁定文件，不能修改(包括文件的基本属性)，也不能删除
			a:只能使用echo的方式，向文件中追加内容，不能删除，也不能改属性
			A:锁定文件的访问时间 
			
			实验：  
			#chmod   +a   a.txt  
			#vim   a.txt    发现修改的内容是不能保存的 
			#echo  hello   >  a.txt    执行不了 
			#echo  hello  >>  a.txt    可以追加  
			最常用的是在日志中
			#chattr  -a  a.txt  
			
			#chattr    +i   a.txt  
			#vim   a.txt    发现修改的内容是不能保存的 
			#echo  hello   >  a.txt    执行不了 
			#echo  hello  >>  a.txt    不可以追加 
			该文件被完全锁定，类似于/etc/passwd文件 
			
			#chattr  +A   a.txt  
			#cat  a.txt 
			#cat   a.txt  
			发现访问时间 不再会发生变化了 
			注意：如果使用了vim等编辑器修改了文件内容，时间依然会变
			通常在网页文件上，要给定该权限 
	（五）.sudo的使用：
		作用：通常来讲，都是要在执行命令的时候，以管理员的身份去执行
		通常都是做提权  
		使用方法：  
			想修改的sudo条目，要编辑配置文件(/etc/sudoers)
			#vim   /etc/sudoers   
				## Allow root to run any commands anywhere 
					root    ALL=(ALL)       ALL
			每一个生效的行，代表了一个sudo条目，定义的方式为上述方式
			实现的功能：
				一个人，要在哪些主机上，以另外哪个人的身份，去运行哪些命令  
			例：  
				loring    ALL=(root)      /usr/bin/passwd  
			这代表loring这个用户，可以在任何主机上，要以root的身份，去运行/usr/bin/passwd命令  
			
			客户端的使用：  
				#su  -  loring  
				$sudo    /usr/bin/passwd     ding   
				注意：普通用户要想使用sudo命令，必须在执行命令前，使用sudo
				
			上述都是去编辑的/etc/sudoers文件，一旦编写错误，会到时sudo无法使用：
				#vim    /etc/sudoers  
					loring   ALL=(roo   /usr/bin/passwd     添加一行错误信息
				$sudo  /usr/bin/passwd    ding   
				发现整个sudo不能用了 
			
			建议编辑配置文件的时候，不要使用vim  /etc/sudoers;最好直接使用visudo命令去编辑配置文件：
				#visudo   
				虽然配置文件没有颜色变化，但是带语法校验功能


​				
			注意：如果运行了一次sudo，那么sudo的密码会被记忆5分钟
			清除密码记忆： 
				$sudo  -k     
				每次用过sudo后，记得执行一遍该命令 
			
			查看当前用户，在本机上，都能运行哪些sudo命令：
				$sudo  -l   
				
			设定sudo的密码记忆时间：默认是5分钟  
				在配置文件中，添加如下一行
				Defaults:bravo timestamp_timeout=20          20的单位是分

六.磁盘管理  ***
	（一）.基本磁盘管理
		1.机械磁盘的构造：磁头，机械臂，盘片，停泊区，主轴，空气过滤器，永磁铁
		2.硬盘逻辑上的划分：
			磁道：磁盘划过的周长，磁盘是有宽度的，磁道大小不是固定的
			扇区：单位时间内划过的扇形区域，固定大小为512字节
			柱面：磁道延伸到多个磁盘上，就是柱面，固定大小为8MB
		3.硬盘名称的识别：
			IDE:并口  hd[a-z]   例如第一块硬盘就叫hda，第二块hdb，以此类推
				  第一块硬盘：第一个分区hda1,第二个分区hda2,以此类推
			串口硬盘：sata   iscci  
				sd[a-z]   例如第一块硬盘就叫sda，第二块sdb，以此类推
				  第一块硬盘：第一个分区sda1,第二个分区sda2,以此类推
		4.MBR:master  boot record 主引导记录
			MBR存放在硬盘的第一个扇区中，大小就为512字节
			低级格式化的时候，装载了MBR；一般都是出厂时设定
			MBR中的内容： 
				446: bootloader，是启动一个硬件，运行的第一段程序
					 硬件的型号不一样，或者出厂批次不一样，那么都要重写编写
					 它没有移植性，linux-c开发 
				64:  分区表，每个分区，要占用16个字节	
				2：  标志位，标识整个MBR是否可用
		5.基本分区： fdisk  
			基本分区的步骤：
				1.分区 
				2.通知内核去识别
				3.格式化（高级格式化）
					高级格式化：创建文件系统
					文件系统作用：文件的解析和结构
				4.挂载 
			5.1查看分区：
				#fdisk   -l     查看所有 
				#fdisk   -l    /dev/sda      查看单个硬盘  
					 设备 Boot      Start         End      Blocks   Id  System
				/dev/sda1   *        2048     1026047      512000   83  Linux
				/dev/sda2         1026048    63940607    31457280   83  Linux
	 
				#fdisk   /dev/sda       
				按p，也可以去查看分区表
	
			5.2.1分区： 
				增加一块新的硬盘
				#fdisk   /dev/sdb
					n 
						Partition type:
							p   primary (0 primary, 0 extended, 4 free)主分区
							e   extended，扩展分区 
						p  
						选择分区号(1-4): 	
						start  sector:    直接按回车 
						last  sector:   +100M      分一个100M的分区 
					p  查看分区表，发现分区成功了  
					w  保持退出  
			5.2.2刷新分区表：通知内核重读分区表  
				rhel6中： #partx  -a   /dev/sdb   
				rhel5或者rhel7中： #partprobe  
			5.2.3格式化：创建文件系统
				文件系统的作用：负责解析和结构，翻译官
				mkfs命令去格式化： 
					使用格式：   mkfs  -t  文件系统类型    分区  
							或者： mkfs.文件系统类型    分区  
				常见的文件系统类型：
					linux下： ext2  ext3  ext4  xfs  ...
					windows下：fat16  fat32   ntfs   
					
				#mkfs.ext4    /dev/sdb1       
				代表将/dev/sdb1格式化为ext4类型 
			5.2.4挂载使用：给分区找一个用户使用的接口(目录)
				使用格式： mount   设备(分区)    挂载点(目录)
				挂载： 
					#mkdir   /ds1    
					#mount   /dev/sdb1    /ds1     手动挂载   
				查看是否挂载成功：
					#mount    
					或者： 
					#df  -Th    
					扩展：要求查出本机，所有sda分区的挂载使用情况，并且找出每个分区的磁盘使用率 
					#df  -Th  |  grep  sda   |  awk  '{print $6}'
					
					#awk  -F  ":"  '{print  $1,$3}'  /etc/passwd
					验证-F的作用，指定切割的分隔符；默认的分隔符为空白(包括多个)
				给一个分区提供多个挂载点： 
					#mkdir   /ds2   /ds3  
					#mount  /dev/sdb1   /ds2  
					#mount   /dev/sdb1  /ds3  
					#mount   
					#df  -Th 
			5.2.5卸载文件系统： 
				#umount    挂载点  
				#umount    设备名  
				
				#umount    /ds1  
				#mount    发现/ds1被卸载了 
				
				#umount   /dev/sdb1    
				#mount     发现最后一个被挂载的/dev/sdb1被卸载了
				
				#pwd   
					/ds2  
				#umount  /ds2    
					device  busy    设备正忙 
				#lsof   |  grep  /ds2     查看都有哪些用户正在使用该分区
				#fuser  -k   /ds2      将用户从设备中踢出  
					注意：如果是线上服务器，别轻易执行
				#umount   /ds2    可以卸载了 
			5.2.6下次开机，能够自动挂载： 
				依靠/etc/fstab文件，或者可以使用/etc/rc.local文件 
				#vim    /etc/fstab    
				添加一行：
				/dev/sdb1    /ds1    ext4    defaults  0  0 
				设备名       挂载点  类型    挂载选项  是否检测  挂载的次序
				
				#mount  -a     手动挂载测试   
				#df  -Th  
				
				在设备    名的位置，可以使用三种方式：
					1.设备名称，例如/dev/sdb1  
					2.设备的UUID
					3.设备的卷标   
				使用UUID进行挂载： 建议使用该方式进行挂载 
					#blkid       查看所有设备的UUID
					#vim   /etc/fstab    
						UUID="57bc1f50-dcc2-4984-8cf7-b3264c7c3db6"   /ds2  ext4  defaults  0 0 
					#mount  -a  
					#df  -Th  
				使用卷标进行挂载： 
					#e2label    /dev/sdb5    查看卷标  
					#e2label    /dev/sdb5   loring    设定卷标名为loring 
					#vim   /etc/fstab    
						LABEL="loring"  /ds3   ext4   defaults  0 0 
					#mount   -a  
					#df  -Th
				安全等级排序： 
					UUID<--设备名<--卷标
	（二）.使用autofs实现自动挂载： 
		autofs是一个服务软件：
		1.软件的管理： 
			准备yum源： 
				#vim    /etc/yum.repos.d/local.repo 
					[local]
					name=loring
					baseurl=file:///mnt
					enabled=1
					gpgcheck=0
				#mount  /dev/cdrom     /mnt   
				#yum  repolist     验证yum是否好用
			安装软件：
				#yum    install  -y  autofs  
				#rpm  -q   autofs     验证软件是否被安装   
				#rpm  -ql  autofs     查看都安装了哪些文件，每次安装看一下
					/etc/auto.master       设定主要挂载配置
					/etc/auto.XXX          辅助配置文件，用来定义挂载选项
					/etc/autofs.conf       该服务的主配置文件
					/etc/sysconfig/autofs  该服务的辅助配置文件 
					/usr/lib64/autofs/lookup_dir.so   动态库文件 
							扩展：在windows中，动态库文件以.dll结尾
					/usr/share/doc        下面放的是共享文档
					/usr/share/man        下面放的是man手册
			服务管理： 
				rhel6:
					启动服务：#service  服务名    start  
							或者：#/etc/init.d/服务名   start  
					关闭服务：#service  服务名   stop  
							或者： /etc/init.d/服务名   stop  
					重启服务：#service  服务名   restart  
							或者： /etc/init.d/服务名   restart  
					查看服务的状态： #service   服务名   status  
							或者： /etc/init.d/服务名    status  
					下次开机自启：
						#chkconfig   服务名  on  
						#chkconfig   --list     查看所有服务
						#chkconfig   --list 服务名     查看某个服务 
							httpd          	0:off	1:off	2:on	3:on	4:on	5:on	6:off
						以上代表，在哪些启动级别下，是开启或者是关闭 
					关闭开机自启动： 
						#chkconfig   服务名   off   
					单独指定在哪些级别上，会自动启动： 
						#chkconfig   服务名  --level  35  on  
						只在第3和第5级别会自启动
				rhel7:
					启动服务：#systemctl    start    服务名  
					关闭服务：#systemctl    stop     服务名  
					重启服务：#systemctl    restart  服务名 
					查看服务状态：#systemctl   status  服务名  
					下次开机自启：#systemctl   enable  服务名   
					关闭开机自启：#systemctl   disable 服务名 
							或者：#systemctl   mask    服务名 
			2.实现自动挂载： 
				2.1编写/etc/auto.master文件：
					#vim   /etc/auto.master   
						挂载点的上级目录(绝对路径)     挂载辅助配置文件  
						例如： 
						/test          /etc/auto.loring
					注意：挂载点的上级目录，最好是自己建立新目录，或者是没有
						  挂载辅助配置文件，必须要以auto.开头，后面名称任意
 				2.2编写/etc/auto.XXX文件：挂载的辅助配置文件名
					#vim   /etc/auto.loring  
					挂载点   挂载文件系统类型和选项    设备名称(分区)  
					haha     -fstype=ext4,rw       :/dev/sdb5  
					
					注意：
						1.挂载点，必须是一个完整的名，而且是相对路径，以下是非法表示： 
							/haha      非法
							haha/abc   非法  
						2.在-fstype后，要先书写文件系统类型，用,分隔去写挂载选项
						3.在第三段设备名的位置，如果是本地设备，前面必须加:
						  如果不是本地设备，用IP:设备名去表示
				2.3例：  
					#vim   /etc/auto.master   
						/test/haha     /etc/auto.ding   
					#vim   /etc/auto.ding  
						douniwan    -fstype=ext4,rw    :/dev/sdb5   
					注意：将来/dev/sdb5就会被挂载到/test/haha/douniwan下 
					
					#systemctl   restart  autofs    重启服务 
					如果不是挂载点，默认10分就会被自动卸载
				2.4设定超时时间： 
					#vim  /etc/autofs.conf  
						timeout=60       一分钟后会被卸载
					#systemctl  restart  autofs    重启生效 
				2.5挂载点的上级目录，最好没有或者自己新建： 
					#mkdir  -p    /test1/haha1
					#echo  hello  loring > /test1/haha1/a.txt 
					以上是模拟一个被使用的目录，里面有个文件叫a.txt  
					
					#vim   /etc/auto.master  
						/test1/haha1     /etc/auto.ding1 
					#vim   /etc/auto.ding1  
						tom    -fstype=ext4,rw    :/dev/sdb5  
					#cd   /test1/haha1     &&   ls   tom  
					#ls   
						发现原来在/test1/haha1目录中的a.txt消失了  
					#touch   /test1/haha1/b.txt  	
						touch: 无法创建"b.txt": 权限不够
					注意：一旦成为了挂载点的上一级目录，被写在master中后，该目录就不能它用了 
	（三）.逻辑卷:lvm   
		作用：实现在线扩展(拉伸)
		制作逻辑卷过程： 
		1.创建分区：创建两个大小为100M的分区，名称为/dev/sdb6、/dev/sdb7 
		  注意：想要做逻辑卷，底层物理分区千万不能事先格式化
		
		2.创建物理卷：
			创建： 	
				#pvcreate    物理分区  
				#pvcreate   /dev/sdb6   /dev/sdb7  
					Physical volume "/dev/sdb6" successfully created
					Physical volume "/dev/sdb7" successfully created
			查看： 
				#pvs   
				#pvscan   
				#pvdisplay  
			删除物理卷：
				#pvremove    物理卷名  
				#pvremove    /dev/sdb7    
				#pvs   
		3.创建卷组： 	
			创建：
				#vgcreate   [-s size]   卷组名    物理卷   
				#vgcreate   -s  8M  loringvg    /dev/sdb6   /dev/sdb7  
				-s: 去指定PE块的大小，其大小默认为4M，如果单独指定，必须是2的整数倍
			查看： 
				#vgs  
				#vgscan  
				#vgdisplay
			删除：
				#vgremove    卷组名称 
				#vgremove  loringvg  
				#vgs   
				注意：卷组必须没有被使用时，才能去删除
			修改卷组名称： 
				#vgrename    旧名     新名  
				#vgrename    dingvg   loringvg   
		4.创建逻辑卷：
			创建：  
				#lvcreate  [-L  大小][-l PE数量]   -n   逻辑卷名   卷组名  
				#lvcreate  -L  110M   -n  loringlv   loringvg  
				#lvcreate  -l  60     -n  loringlv   loringvg  
			查看： 
				#lvs  
				#lvscan 
				#lvdisplay
			删除：
				#lvremove   卷组名      逻辑卷名 
				#lvremove   loringvg    loringlv  
			修改名称：
				#lvrename    旧名        新名   
				#lvrename    /dev/loringvg/loringlv     /dev/loringvg/testlv
				注意：逻辑卷使用绝对路径
		5.格式化挂载使用：
			#mkfs.ext4  /dev/loringvg/testlv     格式化  
			#mkdir     /examlvm  
			#mount   /dev/loringvg/testlv     /examlvm     挂载  
		
		扩展卷组： 
		1.分区、定义物理卷： 分一个100M的分区，名为/dev/sdb8  
			#pvcreate   /dev/sdb8   
			
		2.拉伸卷组：  
			#vgextend    卷组名    物理卷名   
			#vgextend    loringvg   /dev/sdb8  
			#vgs      发现卷组扩大了100M 	
		
		拉伸逻辑卷： 
		1.先要查看卷组：验证卷组是否有空间
			#vgs  
		2.拉伸逻辑卷： 
			#lvextend   -L  160M   /dev/loringvg/testlv  
			#lvs    大小改变了 
			#df  -Th      大小没有变化   
		3.刷新文件系统： 
			#resize2fs    /dev/loringvg/testlv    
			#df   -Th    大小已经改变了 
			
			注意： 如果文件系统类型为xfs，那么刷新就不能再用resize2fs了
			使用：#xfs_growfs   /dev/loringvg/testlv   	
		
	（四）.raid：独立冗余磁盘阵列
	（五）.swap分区：交换分区，类似windows的虚拟内存	
		作用：当内存不够时，临时充当内存角色
			  靠页面的换进、换出，来实现虚拟内存
		cpu:计算机的中央处理器，负责计算机所有的运算
			特点： 
			1.所有内存上的进程，必须要交给cpu去执行
			2.默认同一时间点，一颗cpu只能运行一个进程
			3.cpu在执行每个进程的时候，给每个进程的时间是一样
		内存：执行任何动作，在内存上的状态(进程)
			特点： 1.所有的进程是放在进程的页面上
				   2.页面就是内存划分出来，能存进程的最小单元
				   3.对于所有的进程而言，内存的用户空间，都是留给自己的
		磁盘：提供永久存储
		查看swap分区是否真在被使用： 
			#free  -m    
			#dstat   
		创建swap分区： 
			第一种方法：利用传统分区，创建swap
				1.分区
					#fdisk   /dev/sdb  
				2.通知内核 
					#partprobe  
				3.格式化：创建swap
					#mkswap    /dev/sdb9       
				4.开启使用：永久挂载  
					临时： #swapon    /dev/sdb9  
					永久： #vim  /etc/fstab    
							/dev/sdb9   swap  swap  defaults 0 0 
						   #mount  -a   
				5.关闭swap： 
					#swapoff   /dev/sdb9  
				6.查看swap状态：是否开启使用
					#swapon  -s     
			第二种方法：利用文件，创建swap	
				1.创建文件： 
+
					#dd  if=/dev/zero  of=/swapfile   bs=1M   count=1024  
					创建一个大小为1G的文件，名称为/swapfile  
				2.创建swap分区： 
					#mkswap   /swapfile     把一个文件当作磁盘用 
				3.开启使用 ：
					#swapon   /swapfile   
		
	（六）.磁盘配额
		1.准备分区
			#fdisk   /dev/sdb   
				n  ---> l  --->  回车  ---> +300M  ---> w  
		2.通知内核 
			#partx  -a   /dev/sdb    
		3.格式化
			#mkfs.ext4   /dev/sdb6   
		4.挂载：注意必须要去添加一些挂载选项(默认新创建的文件系统，不支持磁盘配额) 
			#mkdir   /testquota       创建挂载点 
			#mount  -o  grpquota,usrquota  /dev/sdb6    /testquota 
				-o:  该选项，是用来指定挂载选项 
					 注意：如果不使用-o去指定选项，则使用默认选项(defaults)
					 defaults代表的选项：#man   mount   
						rw, suid,  dev,  exec,  auto,nouser, async, and relatime.代表了8个选项
				grpquota: 该选项是用来做针对组的磁盘配额
				usrquota: 该选项是用来做针对于用户的磁盘配额
		5.数据库的初始化：(两个数据文件，负责记录配额)
			#quotacheck   -cugv    /testquota   
				-c:  create   创建数据文件  
				-u:  创建针对用户的数据文件 
				-g:  创建针对组的数据文件  
				-v:  显示创建过程 
		6.开启磁盘配额功能：
			#quotaon    /testquota  
		7.设定磁盘配额
			#useradd  loring     准备一个用户  
			#edquota   -u    loring   -f   /testquota 
				Filesystem  blocks  soft  hard  inodes  soft  hard
				/dev/sdb6     0     4096  10240     0    0    0
				filesystem:针对的文件系统 
				blocks: 针对块的限定，该标签下面的值，不需要手动设定
				inodes: 针对文件数量限定，该标签下面的值，也不需要手动设定
				soft：  软限定，一旦用户的使用量，超过软限定，就会发出警告
				hard:   硬限定，是一个用户的最大使用量
		8.查看和验证 
			查看： 
				#repquota  /testquota   
				
				* Report for user quotas on device /dev/sdb6
				Block grace time: 7days; Inode grace time: 7days
										Block limits                File limits
				User            used    soft    hard  grace    used  soft  hard  grace
				----------------------------------------------------------------------
				root      --      13       0       0              2     0     0    
			
			扩展：  dd命令，是在磁盘块层复制文件
					使用格式：  dd   if=   of=   bs=   seek=    count=   
							if:  infile，从哪个文件(设备)拷贝。if后面可以是一个设备文件
							of:  outfile，拷贝到哪个文件(设备)中。后面也可以是一个设备文件
							bs:  拷贝时，块的大小，可以自己定义
							count: 一共拷贝多少块(自己定义的块)
					例： #dd  if=/dev/sda    of=/loring/mbr.bak   bs=512  count=1  
						 将/dev/sda的前512字节，拷贝到/loring/mbr.bak中 
						
			验证：
				#chmod   777   /testquota      保证loring能在该目录下创建文件 
				#su  -   loring   
				#cd     /testquota   
				#dd   if=/dev/zero   of=a.txt    bs=1M  count=1   
					两个特殊的设备文件：  
						/dev/zero:  冲零，可以吐泡泡 
						/dev/null:  黑洞，只进不出
				#dd  if=/dev/zero   of=b.txt  bs=1M  count=4  
					sdb6: warning, user block quota exceeded.   超出软限定会警告  
				
				#dd  if=/dev/zero   of=c.txt  bs=1M  count=7  
					sdb6: write failed, user block limit reached.
					dd: writing `d.txt': Disk quota exceeded    超出了硬限定，限制使用
				
				#touch   d.txt   
					touch: cannot touch `d.txt': Disk quota exceeded   不允许创建文件了 
				 
			9.宽限时间的作用：grace time（宽限时间）	
				作用：
						1.一旦用户的使用量，超过了软限定，宽限时间开始倒计时
						2.当宽限时间为0时，软限定自动提升为硬限定(原来超出的文件不会删除)
						3.当用户将使用量降到软限定以下，宽限时间重新计算
						4.硬限定变为原来设定的值
				修改宽限时间： 
					#edquota  -t 
						默认为7天，可以按需求进行编辑  
			
			10.扩展实现：实现类似网盘的功能
			  10.1.dd命令中，seek的用法：
					seek是跳过的意思，代表跳过多少个块
				例： 
					#dd  if=/dev/zero  of=/loring/a.txt   bs=1M  count=100  
					#ll  -h      查看文件的大小  
						-rw-r--r--. 1 root root 100M Feb 27 07:59 a.txt
					#du  -h    /loring/a.txt    
						100M	/loring/a.txt      查看文件的真实大小  
					
					#dd   if=/dev/zero  of=/loring/b.txt   bs=1M  seek=1000  count=100 
					#ll  -h   /loring/b.txt  
					#du  -h   /loring/b.txt  
					
			  10.2.将dd的文件，当作一个磁盘去使用：
					#mkfs.ext4   /loring/b.txt        将dd出来的文件，进行格式化
						Proceed anyway? (y,n) y    输入y即可  
					#mkdir    /douniwan       创建挂载点  
					#mount  -o  loop   /loring/b.txt   /douniwan  
					#cd   /douniwan    
					#echo  hello  >  hello.txt  
					#dd   if=/dev/zero  of=c.txt   bs=300M  count=1  
					#du  -h  /loring/b.txt     发现大小增长了300M   
			  10.3.在对/douniwan去做配额，针对loring用户  
					#mkdir    /test2   
					#mount  -o  loop,usrquota,grpquota    /loring/b.txt   /test2  
					#quotacheck  -cugv   /test2  
					#quotaon     /test2  
					#edquota     -u  loring   -f   /test2  
						blocks     soft     hard   
						  0        102400   204800
		(七).raid: 独立冗余磁盘阵列  
			
			廉价磁盘阵列
			独立磁盘阵列
			独立冗余磁盘阵列：性能的提升，数据的安全 
			
			实现raid的方式： 
				1.硬件：硬raid 
					a.靠固化在主板上的程序来实现，速度比较快，但是价格高，而且不灵活
					b.靠raid卡来实现，速度比上一种略低，但是价格便宜，并且灵活(使用最多) 
				2.软件：软raid，只是在教学实验环境下使用 
			raid的级别：仅仅代表了不同的组成方式
			
			raid0:  
				条带化技术实现
				默认数据大小超过64KB就会做条带切割
				
				写的性能： 会提升，理论是2倍
				读的性能： 会提升，理论也是2倍 
				磁盘的利用率： 100% 
				冗余能力： 不具备  
				
				适用场景：前端用户的访问量较大时，而且会频繁的有写入、读取的场景
				
			raid1  
				镜像技术实现  
				
				写的性能： 不会提升，反而会略有下降 
				读的性能： 会提升，理论上也是2倍，但是远达不到，1.5-1.6
				磁盘的利用率： 50%
				冗余能力：  有，可以任意损坏一块磁盘 
				
				适用场景： 重要数据的位置，例如数据库文件
				
			raid5  
				类似条带化技术，但是又一块磁盘轮流做校验
				
				写的性能： 会提升，理论是2倍 
				读的性能： 会提升，理论也是2倍 
				磁盘的利用率： 2/3*100%（要比这高一些）
				冗余能力：  有 ，允许任意1块磁盘损坏
				
			raid6
				有两块磁盘，轮流做校验，至少用4块磁盘
				读写性能： 会提升  
				磁盘利用率：  50%  
				冗余能力：  有，可以任意损坏2块磁盘  
			raid10  
				先对硬盘做raid1，然后再做成raid0，至少用4块硬盘 
				
				读写性能：  会提升 
				磁盘利用率： 50%  
				冗余能力： 可以任意损坏2块；但是如果同时损坏2块，不能全是同组磁盘
				
				注意：一般企业都是使用raid10，而不使用raid01；raid10占用的I/O比raid01少
			raid01: 
				先对硬盘做raid0，然后再做成raid1，至少用4块硬盘
				
				读写性能：  会提升 
				磁盘利用率： 50%  
				冗余能力： 可以损坏左右各一块，但是不能是相同编号的硬盘；也可以损坏一组
			raid50  
				先做raid5，在做raid0，至少用6块磁盘  
	
				读写性能：  会提升   
				磁盘利用率：  2/3*100% 
				冗余能力：  可以左右各损坏一块磁盘 	
				
				注意： 表面上看，读写性能会比raid10高，但是在数据安全性上，没有raid10高


			软件raid：
				MD:multi disks 多磁盘，内核中的模块，可以读取配置文件，来实现软件raid，md要模拟一个假的raid设备（逻辑raid）/dev/md#（metadevice）
			mdadm 命令的使用：
			创建模式  -C 
				专用选项：
						-l：指定级别
						-n:设备个数
						-a:如果没有为其创建设备文件
						-c:chunk大小，默认为512k，(数据块)
						--rounding=条带大小   64K (默认)
	
						-x:指定空闲盘的个数（备盘）
	
				实验：fdisk /dev/sd#  进行分区  修改类型为fd
				raid0实验：2G   2:1G  
						创建raid设备：
						# mdadm -C /dev/md0（自己定义） -a yes -l 0 -n 2 /dev/sda{5,6} 创建
						#cat /proc/mdstat  查看内核中启动的raid信息
						#mkfs -t ext4 /dev/md0 格式化
						#mount 挂载使用
				raid1 2G   2:2G
						mdadm -C /dev/md1 -a yes -n 2 -l 1 /dev/sda# /dev/sda#
						cat /proc/mdstat
						mkfs -t ext4 /dev/md1
						mount 
						
				raid5实验：1.mdadm -Cv /dev/md0 -a yes -n4 -l5 /dev/sda1 /dev/sdb1
				-C (create)v  -a yes 创建过程中如果有设备没有，会帮着创建
				-n4(用了几块硬盘)  -l (级别) 
				2.cat /proc/mdstat 查看raid详细信息(启动中的raid)
				3.mkfs -t ext4 /dev/md0 
				4.mount 
				5.模拟损坏和修复
				1）mdadm -vDs (mdadm --detail --scan查看，数据，扫描) /dev/md0
				2)配置文件的设置/etc/mdadm.conf  (mdadm -vDs +DEVICE /dev/sdb1 /dev/sdc1...)
				停止：mdadm -S /dev/md0 启动：mdadm -A /dev/md0
				3）模拟磁盘损坏：mdadm /dev/md0 -f /dev/sda1(指定第一块盘坏掉)
				4）移除磁盘：cat /proc/mdstat >>  mdadm /dev/md0 -r /dev/sda1 
				5）添加磁盘：mdadm /dev/md0 -a /dev/sda2  cat /proc/mdstat 
	
				lsmod   列出内核模块
				mdadm --detail /dev/md#
	
				watch 'cat /proc/mdstat'  -n 指定刷新时间

七.软件管理  ***
	1.软件的类型： 
		源码包：程序开发的源代码和文件，没有进行过编译处理，是直接开发后就公布出来，通常都是比较新的软件包；对平台的依赖性较弱   
		rpm包：红帽独有的格式，同时也适用centos，都是以.rpm结尾的格式
			rpm:  redhat   package   manager红帽的包管理器 
		二进制包：可以直接解压适用，是在某个平台上，已经进行了编译安装的处理；对平台的依赖性就最高的；对软件的功能不能自定义
	2.软件获取的位置： 
		官网、个人网站：  fedora(搜索epel)、centos.org、163mirrors.com、阿里、清华 
		光盘  
		公司内部的存储 
		
		如何使用光盘： 
			1.挂载使用光盘： 在系统中，光盘设备的名称/dev/sr0（/dev/cdrom软链接）
				创建挂载点： 任意去创建 
					#mkdir   /mnt/cdrom   
				挂载： 
					#mount   /dev/cdrom   /mnt/cdrom   
				
				也可以不去创建挂载点，直接使用/mnt目录作为挂载点：
					#mount   /dev/cdrom   /mnt  
					#df   -Th  
						/dev/sr0       iso9660  3.6G  3.6G     0 100% /mnt
						iso9660是光盘的文件系统类型   
					#cd    /mnt   
					#ls   
						HighAvailability        高可用集群相关 
						ScalableFileSystem      集群文件系统相关
						LoadBalancer            负载均衡相关
						ResilientStorage        分布式存储相关
						images                  映像文件 
						isolinux				内核和启动文件 
						repodata                yum源文件，用来解决软件依赖关系
						Packages                软件包所在的位置
					#cd   Packages    
					#ls   |  wc  -l   
						3820    统计Packages中，一共有多少个软件包 
						
			2.使用光盘镜像文件： 
				将镜像文件rhel-server-6.7-x86_64-dvd.iso，拷贝到系统中，例如拷贝到/usr/local下
				创建挂载点： 
					#mkdir   /loring    
				将镜像文件进行挂载： 
					#mount   -o   loop,ios9660,ro    /usr/local/rhel-server-6.7-x86_64-dvd.iso   /loring   
					
					#cd   /loring  
					#ls    依然可以看见光盘的内容  
		3.使用rpm包管理器，去管理软件
			3.1安装软件包： 
				#rpm  -ivh    包的全名   
					-i: install  安装软件   
					-v: verbose  显示过程  
					-h: human  readable   以人类可读的方式显示 
				#rpm  -ivh   /mnt/Packages/zsh-4.3.11-4.el6.x86_64.rpm 
	
			3.2验证软件包是否已经被安装：  
				#rpm  -q   软件包短名
				#rpm  -q  zsh  
					注意： 如果出现了软件包名，代表已经安装；如果是is not installed，代表没有安装
			3.3卸载软件包： 
				#rpm  -e   软件包短名   
				#rpm  -e   zsh   
				#rpm  -q   zsh     发现出现is not installed  
			3.4更新软件包：  
				#rpm   -U    软件包名(有些时候必须使用全名)    
				#rpm   -U    zsh     
			3.5查看所有已经被安装的软件包： 
				#rpm   -qa     
					-q:   query  查询 ;注意所有的查询动作，都要有该选项   
					-a:   all   所有的  
				例：查看所有以my开头的软件包(已经被安装的)
					#rpm   -qa    |  grep  "^my"
					注释： grep是行级过滤，如上，是过滤以my开头的行；^代表以谁开头
				查看已经安装了多少个软件包： 
					#rpm   -qa  |  wc  -l  
					注释：  |代表管道，将前一个命令执行结果，当作后一个命令参数
	
			3.6查看安装软件，都安装了哪些文件： 
				#rpm  -ql   包短名  
				#rpm  -ql   zsh   
					-l: list  列表，会列出所有安装的文件  
			
			3.7查看已经安装软件的详细信息： 
				#rpm  -qi     包短名   
					-i:  info   详情  
				#rpm   -qi   zsh  
					rhel:   redhat   eterprise   linux 
					Vendor: Red Hat, Inc.   提供者  	
					Description：  描述，详细描述软件的功能
			3.8查看一个文件，是由哪个软件安装出来的：
				#rpm   -qf    文件名     
				#rpm   -qf    /etc/passwd   
				
				查看chmod命令，是由哪个软件安装出来的
					#which   chmod       查看命令的绝对路径 
						/bin/chmod   
					#rpm  -qf    /bin/chmod   
			3.9查看软件包的依赖关系：  
				#rpm  -qR   软件包短名   
					-R： 查看依赖关系  
					依赖关系：安装软件，还提前需要安装其它软件 
				#rpm   -qR   zsh  
				#rpm   -qR  samba-client  
					rpmlib(CompressedFileNames) <= 3.0.4-1
					samba-common = 0:3.6.23-20.el6
					如上所示，rpmlib和samba-common就是samba-client的两个依赖包
					出现了<=，代表rpmlib的版本必须是小于等于3.0.4-1  
					出现了=，代表samba-common的软件包，必须是等于后面的版本
					以后可能还会出现：>  >=  <  ，意义都是类似的
					
			4.0	查看未被安装软件的信息： 
				-p: 代表是针对于未被安装的软件包，必须用包的全名    
				查看未被安装软件包的详细信息： 
					#rpm   -qpi    包全名   
					#rpm   -qpi   zsh-4.3.11-4.el6.x86_64.rpm
					
				查看未被安装的软件，如果被安装了，都会安装哪些文件：	
					#rpm    -qpl    包全名   
					#rpm    -qpl    zsh-4.3.11-4.el6.x86_64.rpm
					
				查看安装的软件包，所有的依赖包：  
					#rpm   -qpR    包全名   
					#rpm   -qpR    zsh-4.3.11-4.el6.x86_64.rpm
						
			4.1	导入秘钥：  
				#rpm   --import   秘钥   
				
				#rpm   --import    /etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release 
					该秘钥就是针对系统光盘中的软件包的   
					
			4.2	测试安装、测试卸载：
				--test： 测试，而不真正执行  
				
				测试安装： 
					#rpm   -ivh  --test    软件包全名名   
				测试卸载： 
					#rpm   -e    --test    软件包名   
			
			4.3跳过依赖关系安装、卸载： 
				--nodeps:  跳过依赖关系，最好别用  
				
				安装：  
					#rpm   -ivh   --nodeps    包全名  
					#rpm   -ivh   --nodeps    mysql-server  
				卸载：比强制安装用的略多   
					#rpm   -e   --nodeps      包短名
					#rpm   -e   --nodeps      httpd   
					
		4.yum去管理rpm软件包： 
			yum是一个rpm包管理的上层工具，底层调用的依然是rpm管理器，能够管理的也依然.rpm格式的软件包
			rpm管理软件时的弊端，它不能自动解决依赖关系
			yum主要就是为了实现依赖关系自动判断
			yum是靠xml格式的文件，来实现依赖关系的记录和软件位置的记录
			1.配置Yum源： 告诉yum工具，repodata目录所在的位置
				#cd   /etc/yum.repos.d         该目录为存在yum源配置文件的目录
					在该目录中，可以创建任何以.repo结尾的文件，都是yum源的配置文件
					在该目录中，可以创建多个以.repo结尾的文件，但是必须保证每个文件都是可用的
					在.repo文件中，可以写多个容器(仓库)，但是必须保证每个仓库的配置都是正确(可以不开启) 


​				
				#mount  /dev/cdrom   /mnt         挂载光盘  
				#vim    loring.repo               配置yum源  
					[tom]            []必须要有，里面的名称任意，不能使用特殊符号，容器名
					name=jerry        name=必须要有，后面的名字任意，提供者
					baseurl=file:///mnt       baseurl=必须要有，后面是repodata所在的目录
											  file://代表引用的是本地路径
											  ftp://   http://    nfs://    三种网络路径
					enabled=1         enabled=1代表启用该段配置，如果等于0代表不启用，默认是1
					gpgcheck=0        是否检测秘钥，0代表不检测，暂时就设定为0
				#yum  clean  all    清除缓存
				#yum  list          列出可用的软件包  
				
			2.yum命令的使用： 
				#man    yum      查看yum命令的man手册  
					yum [options] [command] [package ...]
						options: 选项，一般很少使用，最常使用的是-y    
						command: 命令、yum的子命令  
						package:  软件包名  
					DESCRIPTION:  描述，会描述所有选项、子命令的具体作用
			常用子命令的使用：
				command is one of:
				安装软件包：
					#yum   install package1 [package2] [...]
						install:  安装   
					#yum   install   zsh     
						注意：yum安装软件包，可以直接去使用软件包的短名  
				重新安装软件包：  
					#yum    reinstall   package   
					#yum    reinstall   zsh    
				安装本地软件包： 
					#yum    localinstall  rpmfile(软件包全名)
					注意： 安装的软件包，可能不在依赖关系文件中，但是如果需要了依赖，也会从yum中读取
					可以从网上下载一个软件包，然后尝试安装  
				更新软件包： 	
					 #yum      update   package  
					 注意： 如果update后没有指定软件包的名称，会更新所有的软件包，包括内核
				检测能更新的软件： 
					 #yum   check-update
				删除软件： 	
					 #yum    remove      package
					 #yum    erase       package
					 例： 
					 #yum    remove   zsh  
				列出所有可用的软件包： 	 
					 #yum     list 
				查看软件包详细信息：	 
					 #yum    info    软件包名 
					 注意： yum  info 也可以去查看未安装的软件包 
					 类似rpm   -qi 和 rpm  -qpi   
				查看文件或者是命令是由哪个软件提供：******	 
					 #yum    provides    文件名、命令等
					 例：
					 #yum  provides   /etc/passwd  
					 #yum  provides    chmod   
						You can use "*/chmod" and/or "*bin/chmod" to get that behaviour
					 #yum   provides   */chmod    	
						发现使用*/chmod就可以搜索到，如果还不行就*bin/chmod，如果还没有，那就是没有
				清楚缓存： 
					#yum     clean   [ packages | metadata | expire-cache | rpmdb |  plugins
				   | all ]
						packages: 清除对软件包的缓存 
						metadata: 清除元数据的缓存  
						expire-cache： expire过期， 过期的缓存 
						rpmdb:   清除rpm的数据库缓存  
						plugins:  清除插件缓存  
						all:   清除所有缓存，暂时实验用all就可以了 
					#yum   clean  all   
				生成缓存： 
					#yum   makecache  
				   
				搜索软件包： 
					#yum   search     string1(软件包名的一部分)
					例： 
					#yum   search  zs   
						lrzsz.x86_64 : The lrz and lsz modem communications programs
						zsh.x86_64 : A powerful interactive shell
					扩展： 
						#yum   install  -y  lrzsz     安装lrzsz软件   
						#rpm  -ql   lrzsz    
							/usr/bin/rz	    rz命令，从物理机，向虚拟机拖拽文件
							/usr/bin/sz     sz命令，从虚拟机，拷贝文件到物理机
							使用格式： #sz    文件名    
				查看所有可用仓库： 
					#yum    repolist    
						  repo id    repo name       status
						仓库id号      仓库名称       软件包的数量
					
					例：扩展
					#vim   /etc/yum.repos.d/loring.repo  
						[tom]
						name=jerry
						baseurl=file:///mnt
						enabled=1
						gpgcheck=0 
						
						[LoadBalancer]
						name=LoadBalancer
						baseurl=file:///mnt/LoadBalancer
						enabled=1
						gpgcheck=0  
					
						注意： 一个.repo文件中，可以去指定多段配置，一段是一个仓库
					#yum   repolist   
						会发现多了一个仓库 
			查看使用yum的历史： 
					#yum   history    
			
			软件包组的操作：	
				查看软件包组：
					#yum    grouplist 
						Installed Groups:  已经安装的软件包组  
						Installed Language Groups:  已经安装的语言包组
							Chinese Support [zh]  中文支持
						Available Groups:   可用的软件包组 
						Available Language Groups: 可用的语言包组
				安装软件包组： 
					#yum    groupinstall group1 [group2] [...]
					
					#yum    groupinstall  -y   "Italian Support"
				更新软件包组： 
					#yum    groupupdate  group1 [group2] [...]
						如果没有跟软件包组名，则更新所有软件包组 
				卸载软件包组： 							
					#yum    groupremove group1 [group2] [...]
					#yum  groupremove     "Italian Support"
				查看软件包组的信息： 
					#yum    groupinfo group1 [...]
					#yum    groupinfo   Eclipse
					
			只去下载软件包，而不去安装：
				#yum    --downloadonly    软件包名 
					
				或者：  
				#yumdownloader     软件包名      
					该种方法用的最多 
			指定软件包下载的位置： 
				#yum  --downloaddir=    软件包名  
				
			手动生成一个yum源(repodata):
				#mkdir   /loring   
				#yumdownloader   Red_Hat_Enterprise_Linux-Release_Notes-6-it-IT  hunspell-it man-pages-it
				
				#createrepo     /loring(软	件包所在的目录)
					会在/loring目录中，生成一个repodata目录，里面的xml文件可以解决依赖关系 
				#vim   /etc/yum.repos.d/loring.repo  
					[loring]
					name=loring
					baseurl=file:///loring  
					enabled=1
					gpgcheck=0
					
		作业：配置好yum源，利用yum去安装，ricci软件，keepalived软件			
	
		配置网络yum源： 
			1.让虚拟机连接互联网：
				将自己的IP地址，设定跟物理机在同一网段
				将网关和DNS服务，都跟物理机相同 
				将虚拟机桥接 
				
				例：  如果物理机的ip为192.168.0.110，掩码为255.255.255.0,dns为192.1687.0.1，网关为192.168.0.1  
				
				如下是虚拟机配置： 
					#vim   /etc/sysconfig/network-scripts/ifcfg-eth0  
						IPADDR=192.168.0.235
						NETMASK=255.255.255.0
						GATEWAY=192.168.0.1
						DNS1=192.168.0.1
					#service  network  restart   
					将虚拟机改为桥接，如果是无线，要桥接到无线网卡上
					
			2.配置网络yum源： （如果是centos，直接可以使用）
			
				2.1手动配置yum源： 
					自己去找到repodata所在的网络路径 
				2.2自动安装yum源： 
					拷贝一个软件： epel-release-6-8.noarch
					#rpm  -ivh   epel-release-6-8.noarch
					#ls   /etc/yum.repos.d  
						epel.repo     安装出来的yum源  


​						
​						
	5.源码编译安装软件： 
		5.1下载软件包并解压
			#rz   nginx     拷贝一个软件到系统中   
			#ls   nginx-1.6.0.tar.gz
			#tar  -zxvf    nginx-1.6.0.tar.gz
		5.2预处理（预编译）: 向软件中传递参数  
			#cd   nginx-1.6.0      进入到解压目录中  
			#ls    
				configure
			预处理： 
			#./configure     --prefix=/usr/local   --without-http_rewrite_module   
				--prefix:  指定安装目录  
								
		5.3编译：
			#yum  groupinstall    "Development  Tools"
			#yum  install  -y  gcc*  
			#make    
		5.4编译安装 
			#make  install    
		5.5启动服务： 
			#/usr/local/sbin/nginx       启动了  
			#netstat   -anltp   |   grep   nginx   
				:80     成功了 
		5.6访问： 
			在浏览器中，直接输入虚拟机IP地址即可访问


八.计划任务： 
	计划任务：在未来的某个时刻，要去做什么事  
	分类： 一次性计划任务，只会在某个一刻执行一次；周期性计划任务 	
	(一).一次性计划任务： at  
		#at   2018-3-6  08:35:10
			> 计划任务的命令 
			>命令2  ...
			> ctrl+d   
		#date     查看时间，当时间到达了，会去执行动作  	
		时间的格式：
			HH:MM  [YYYY[-mm][-dd]]
			例如：  08:35:20   2018-03-06  
		例：  
			#at   08:35  
				> touch a.txt  
				> touch b.txt  
				> ctrl+d  
			#date     到达08:35时，会创建两个文件 
				
		例2：  
			#at  08:38
				> echo  hello  
				>ctrl+d  
				注意：发现当时间到达了，也没有去显示hello  
		扩展： 
			1.查看当前使用的终端： 
				第一个标签：
				#tty    
					/dev/pts/2
				第二个标签：
				#tty  
					/dev/pts/1   
				#echo  welcome   >  /dev/pts/2      将welcome输出到/dev/pts/2终端
				
		查看计划任务：  
			#at  08:50  
				>  touch c.txt  
				> ctrl+d  
			#atq      查看都有哪些计划任务 
				5	2018-03-06 08:50 a root
				5的位置，代表了计划任务的编号
		删除计划任务： 
			#atrm    任务编号  
			#atrm   5   
				
		查看计划任务中的具体动作： 
			#at   -c   任务编号  
			#atq   
				7   
			#at  -c   7  
				${SHELL:-/bin/sh} << 'marcinDELIMITER03d352da'
				touch  bb.txt
				touch cc.txt
				touch ff.txt
				这是命令的动作  
			使用场景： 1.在设定防火墙时   2.在一次性运行脚本时  3.一次性数据备份
	
	(二).周期性计划任务： crond服务  
		1.crond的服务，是由cronie的软件包安装出来的
			#rpm  -ql   cronie       查看都安装了哪些文件  
				/var/spool/cron       所有用户的计划任务配置文件
				var  -->  variable    可变的  
		
		2.管理crond服务： 
			启动：  #service  crond   start  
			停止：  #service  crond   stop  
			重启：  #service  crond   restart 
			查看状态：#service  crond   status  
			开机自启： #chkconfig   crond   on   
		3.设定计划任务： 
			3.1利用crontab命令：
				创建：
					#crontab   -u   用户名   -e    
					#crontab   -u   loring   -e      
					注意： 如果没有执行用户，那就代表是针对当前用户设定的
						   默认第一次创建计划任务，打开后没有任何内容
					计划任务书写格式： 
						第1列  第2列  第3列  第4列   第5列    第6列  
						 分钟   小时   日期   月份    星期    动作(命令、脚本)
						
						#man  5  crontab  
							The time and date fields are:
	
						  field          allowed values
						  -----          --------------
						  minute         0-59
						  hour           0-23
						  day of month   1-31
						  month          1-12 (or names, see below)
						  day of week    0-7 (0 or 7  is  Sun,  or  use
						  names)
						  
						  A  field may be an asterisk (*), which always stands for "first-last".
						时间定义的样例： 
							5  10  * *  *   /bin/echo  hello     
							每天的10:05，都会去指定/bin/echo  hello  
							
							1-10  9  *  *  *  /bin/pwd  
							每天的9:01-9:10，每隔一分钟，执行一次pwd  
							
							1,5,10,15   9  * * *    /bin/pwd  
							每天的9:01,9:05,9:10,9:15四个时间点，都会去执行pwd 
							
							1-5,10-20   9  *  *  *  /bin/pwd  
							每天的9:01-9:05和9:10-9:20两个时间段，都会执行pwd
							
							1-10/3  9  *  *  *  /bin/pwd  
							每天9:01-9:10，每隔3分钟，执行一次pwd；那就意味着在9:01,9:04,9:07,9:10 
							
							*/5  9  *  *  *    /bin/pwd  
							等同于：
							0-59/5  9   * *  *   /bin/pwd   
							9点时间段，每隔5分钟运行一次
						注意：  在时间设定上，日期和星期通常不会同时去指定
								动作中，无论是执行命令，还是运行脚本，最好都去使用绝对路径 
							
				查看：
					#crontab  -u   用户名    -l  
					#crontab  -u   loring    -l   
				删除：
					#crontab   -u  loring  -r      清空所有用户的计划任务
					
					删除用户的单个计划任务：再进入到编辑模式，删除指定的行


​			
			3.2利用/var/spool/cron目录下的文件：
				#ls   /var/spool/cron  
					
				#crontab   -u  tom   -e  
					19  8   *  *  1-5    /bin/echo  "hello"
				
				#ls   /var/spool/cron   
					发现该目录中多个一个名称为tom的文件 
		
				#cat   /var/spool/cron/tom   
					19  8   *  *  1-5    /bin/echo  "hello"
					
				注意：在/var/spool/cron，跟用户同名的文件，就是用来保证和管理该用户计划任务  
				
				例：  
					#vim   /var/spool/cron/loring  
						1,5,10  * * * *  /bin/touch  /loring/a.txt 
						3,7,12  *  * * *  /bin/rm -rf  /loring/a.txt
	
					#crontab    -u  loring  -l   
						发现计划任务已经生效了 
				
				利用文件编写计划任务的好处： 
					#echo  '15 6 * * * /bin/echo "welcome"' >> /var/spool/cron/lisi  

九.进程管理  **
	程序：程序员编写功能代码，是静态的，是在永久存储设备上存放的
	进程：程序运行时，在内存中的状态，是动态的
	(一).进程的查看：
		1.静态查看：ps、pstree     
			ps  -->   report a snapshot of the current processes
					  current:  当前的     
					  processes:  进程  
					  snapshot:  快照  
			使用格式： #ps [options]
			
			第一组：
			#ps    
				   PID  TTY          TIME  CMD
				  3380  pts/0    00:00:00  bash
				  4102  pts/0    00:00:00   ps
				pid:  process  id  进程的id号
				tty:  产生进程的终端   
				time: 运行的时间  
				cmd:  运行的命令   
				注意：如果没有加任何选项，默认只会去查看当前终端产生的进程
			#ps    -elf    
				-e: Select all processes   显示所有的进程  
				-l:  long format    长格式显示    
				-f:  does full-format listing   全格式显示  
				
			#ps   -e  
				PID  TTY          TIME  CMD
				1     ?         00:00:01 init
				307  pts/0      00:00:00 ps
				注意：在tty的位置，如果是?，代表该进程是不依赖于终端的
			#ps  -l   
				S   UID    PID   PPID  C PRI  NI ADDR SZ WCHAN
				s: stat  状态  s代表sleeping 睡眠, r代表running 运行中
				uid:  进程的所有者
				pid:   进程的id号 
				ppid:  父进程  
				pri:   进程的优先级，默认只有内核功能可以去修改
				ni:    nice值，可以去影响进程的优先级
				addr:  产生进程的地址 
				sz:    进程的大小 
				wchan:  是否处于队列中的等待状态
			#ps   -f   
				STIME:  启动了多久   
			#ps   -elf       通常都是同时使用的  
			
			第二组： 
			#ps   aux      
				a：  Select all processes
				u:   Select by effective user ID (EUID) or  name  显示所有者 
				x:   展开显示，显示所有 
			#ps  a   
				显示所有依赖终端的进程   
			#ps  u  
				%CPU: 占用cpu的百分比 
				%MEM：占用内存的百分比 
				VSZ： 虚拟内存集 
				RSS： 常驻内存集  
				虚拟内存集 > 常驻内存集
			#ps   x    
				显示所有的进程，包括不依赖于终端的进程  
				
			#ps    aux   	


​				
		pstree的使用：
			#pstree   
				5*[mingetty]    有五个同名的进程 
				
			#pstree  -a   
				-a:  Show command line arguments  显示命令行的参数 
			#pstree   -p  
				-p:  Show  PIDs    显示进程的pid号 
			#pstree   -u  
				-u:  Show  uid transitions  显示进程的所有者 
			#pstree  -apu   
				init─┬─NetworkManager
					├─abrtd
			注意：在红帽6以6以前，系统的第一进程，是init进程
		2.动态查看：top   
			#top  
	top - 01:53:37 up  1:33,  2 users,  load average: 0.00, 0.00, 0.00
	Tasks: 164 total,   1 running, 163 sleeping,   0 stopped,   0 zombie
	Cpu(s):  0.3%us,  0.3%sy,  0.0%ni, 99.0%id,  0.0%wa,  0.0%hi,  0.3%si,  0.0%st
	Mem:   1906252k total,   418444k used,  1487808k free,    30052k buffers
	Swap:  3071992k total,        0k used,  3071992k free,   138676k cached
		
		load average: 平均负载，第1分钟，第5分钟，第15分钟的平均负载
		hi: hard  interuppt    硬中断   
		si:  软中断
		
			#top  -d   1  
				可以设定每隔1秒，刷新一次 
			
	(二).进程的前后台运行：
		进程的后台运行： &  
			#vim   a.txt  
				[1] 9092
				[1]:  进程在后台的任务号  
				9092： 进程的pid号 
			
		进程的前台运行：
			#fg   3  
		查看后台运行的进程：
			#ps  aux    
				找到状态为T的，就是后台运行的进程  
			#jobs  
				[1]   Stopped                 vim a.txt
				[2]   Stopped                 vim b.txt
				[3]-  Stopped                 vim c.txt
				[4]+  Stopped                 vim d.txt
				出现+号的，代表最近一次运行的后台进程 
				出现-号的，代表上一次运行的后台进程 
						
	(三).进程间的通信：
		三种方式： 
			共享内存
			消息队列
			信号
		信号的方式通信： 管理进程(杀进程)
			查看所有可用的信号：
			#kill    -l   
				
			进程间通信： 
			#kill   信号   进程的名称(pid)
			
			#kill   -1      10001      
				-1:  SIGHUP     可以不重启服务，重读配置
				
			#vim  b.txt  
			#ps  aux  | grep  b.txt   
				PID为 12276
			#kill   -9    12276    
				-9: SIGKILL   强制杀死，必死
	
			#firefox    &
			#ps  aux   |  grep firefox  
				进程号为12880
			#kill   -15    	12880 
				-15：  杀死进程，但是不一定能死  
			
			#kill    -20  12136  
				-20： 停止进程
			#jobs   可以看见  
			#fg  编号      前台再次运行 
	
			杀进程 命令：  pkill   
				#pkill    进程号   
					停止一个进程  
				#pkill   -U    进程号   
					停止一个进程    
				#pkill  -kill   -t   /dev/pts/0    
					将用户从终端中踢出，其实是将用户的/bin/bash的进程杀死了 
	
			killall   
				#killall    httpd    
					可以将所有同名进程，一起杀死 
					
			xkill:图形化杀进程   		
					
	(四).修改进程的nice值：
		在运行时指定：
			优先级-nice=固定值  
			
			#vim    a.sh    
				#!/bin/bash  
				while  true;do
					echo "hello"  &> /dev/null
				done   
			#cp   a.sh   b.sh  
			
			#nice  -n   10   ./a.sh   
			#nice  -n  -10  ./b.sh  
			#top    
				priority    nice        command   
				10          -10          b.sh  
				30           10           a.sh  
			注意： pri的值越小，抢占资源的能力就越强 
			
			nice值的有效范围： -20-19     
			
		修改：
			#ps  aux  |  grep   a.sh   
				查看a.sh的进程号为19533  
			#renice   -n   15    19533  
				19533: old priority 10, new priority 15


​				
		扩展：  
			#vim   a.sh   
				#!/bin/bash 
					while  true;do
							if ps  aux  |  grep  "\.\/b.sh";then
							  /bin/bash  /loring/b.sh
							fi
					done
			#vim   /loring/b.sh  
				#!/bin/bash  
				while  true;do  
					echo  "hello"  &> /dev/null  
				done   
			先指定a.sh，在执行b.sh，然后去杀死b.sh的进程，发现还会生成新的进程  
十.时间同步： 
	1.时间的查看：
		#date    
			显示的是系统时间   
		#hwclock    
			查看系统的硬件时间   
	2.修改时间：  
		#date   -s    时间  
		#date   -s    15:06:10   
	
	3.将系统时间同步到硬件：
		#hwclock    --systohc   
		#hwclock   
			发现硬件时间，和系统时间保持一致了 
	4.将硬件同步到系统： 
		#hwclock    --hctosys 
	5.时间的格式化输出： 
		使用格式： #date    +format    
			%D     date; same as %m/%d/%y   日期 
			%F     full date; same as %Y-%m-%d 全格式的日期，显示年、月、日
			%Y     year    年  
			%m     month   月 
			%d     day of month   日期，哪天
			%H     hour   小时
			%M     minute  分钟    
			%S     second  秒  
			%T     time; same as %H:%M:%S  时间，显示小时、分钟、秒 
			%s     seconds since 1970-01-01 00:00:00 UTC
		
		#date    +%Y  
		#date    +%Y-%m-->%d   
			可以自己去指定输出的分隔符  
		扩展：  创建一个文件，将当前的时间，作为文件名的一部分？？
			#touch    `date +%F`abc
			
			``   反单引号，命令替换，是去引用命令指定的结果


​		
	6.时间同步服务：ntpd服务    rhel7中： chronyd   
		安装ntp服务： 
			#yum  install   -y  ntp  
		查看都安装了哪些文件：  
			#rpm    -ql   ntp    
				/etc/ntp.conf      主配置文件   
		修改配置文件：
			#vim   /etc/ntp.conf     
				restrict    192.168.0.0  mask  255.255.255.0
				server   127.127.1.0    iburst    
				
				注释： 
				driftfile /var/lib/ntp/drift    指定误差文件的位置   
				restrict  开头的行，代表将来有哪些网段的人，可以来跟自己同步时间
				notrap:不允许被捕获  nopeer:不会出现在网络邻居上 该两项可以没有
				server    开头的行，用来指定上层的时间服务
					server最多只能指定4个，默认从第一个去同步
					server  127.127.1.0  iburst 本地的时钟地址  
					iburst:  代表立即去做同步 
					
		重启服务生效 ：
			#service  ntpd   restart   
			
			查看服务的状态：
			#ntpq    -p      
				reach: 当下面的值达到了17，就可以给别人当服务器了 
					
		验证： 
			服务器和客户端都要执行
				#setenforce  0   
				#iptables  -F   
			
			客户端验证：  
				第一种方式： 直接使用命令同步  
				#ntpdate    服务的地址  
				#ntpdate    192.168.0.235   
					step time server 192.168.0.235 offset 54607.455775  
					时间同步成功   
				
				第二种方式： 靠ntp服务进程同步(客户端服务)
				#yum  install  -y  ntp  
				#vim    /etc/ntp.conf  
					server   192.168.0.235   iburst  
	
					注释：192.168.0.235的位置，是服务器的地址 
				#service  ntpd   restart    
					同步时间成功  
				#ntpdate   192.168.0.235    
					the NTP socket is in use, exiting
				注意：ntpdate命令，不能跟ntpd服务同时使用，必须先关闭服务才能用户
				
			扩展：  
				什么样的状态算作服务已经启动了：
					1.产生了进程文件  
					2.产生了套接字文件 (socket文件-->套接字文件)
						socket =  IP + 端口
					3.产生了锁文件  

十一.日志管理   *
	(一).基本日志管理  
	日志的作用：记录计算机在历史的某一刻都发生了什么事情，有助对系统做分析
	系统的普通日志： syslogd  
	系统内核的日志： klogd   
	
	日志管理服务：  rsyslog   
		安装软件： 
			#yum  install  -y  rsyslog   
		查看都安装了哪些文件： 
			#rpm   -ql    rsyslog   
				/etc/logrotate.d/syslog      logrotate.d目录，是用来设定日志滚动
				/etc/rc.d/init.d/rsyslog	 启动脚本  
				/etc/rsyslog.conf            主配置文件   
		
		主配置文件的修改：
			#vim     /etc/rsyslog.conf   
				$IncludeConfig /etc/rsyslog.d/*.conf
				代表了在/etc/rsyslog.d下，所有以.conf结尾的文件，也是配置文件的一部分
				
				在RULES下，每一行，代表了一个日志的记录 
				authpriv.*        /var/log/secure
				每一行都分为了三段： 
					第一段：authpriv的位置，服务名称  
					第二段：*的位置，代表记录的级别  
					第三段：/var/log/secure的位置，日志的位置和文件名  
	
			日志的常见服务： 
				auth      			# 认证相关的 
				authpriv  			# 权限,授权相关的 
				cron      			# 计划任务相关的 
				daemon    			# 守护进程相关的 
				kern      			# 内核相关的 
				lpr      			 # 打印相关的 
				mail     			 # 邮件相关的 
				mark     			 # 标记相关的 
				news     			 # 新闻相关的 
				security 			# 安全相关的,与auth 类似  
				syslog  			 # syslog自己的 
				user    			 # 用户相关的 
				uucp    			 # unix to unix cp 相关的 
				local 0 到 local 7 	# 用户自定义使用,通常都是在配置文件中定义的
				*        			# *表示所有的facility 
				
			日志级别：
				0 emerg   会导致主机系统不可用的情况
				1 alert    必须马上采取措施解决的问题
				2 crit     比较严重的情况
				3 err      运行出现问题
				4 warning  可能影响系统功能，需要提醒用户的重要事件
				5 notice   不会影响正常功能，但是需要注意的事件
				6 info     一般信息
				7 debug     程序或系统调试信息等
				8 none      不去记录 
				*           代表了任意级别  
			设定记录的服务和级别：
				服务.级别 
				服务1,服务2.级别  
				服务1.级别1;服务2.级别2
	
				例： 
					authpriv.notice      如果出现了notice已经比它更严重的级别，都会记录 
					
					authpriv.=notice     只记录notice这个级别的信息 
					
					authpriv.!notice     比notice更轻的级别会被记录 
					
					authpriv.!=notice    除了notice以外，都会被记录
					
					authpriv.*           记录所有的级别  
					*.notice             记录所有的服务   
					*.*                  记录所有的   
					
				例2：  
					*.emerg           *   会向连进系统的所有终端发送广播 


​					
			设定日志记录：
				例： 
					#vim     /etc/rsyslog.conf  
						authpri.*       /var/log/loring    
					
					#service   rsyslog   restart    
					#cat    /var/log/loring        发现没有内容  
					#su  -   loring    &&  exit   
					#cat    /var/log/loring      发现有内容了  
					
		常见日志的查看： 
				
			用户日志和程序日志
				其中/var/log/wtmp   /var/log/btmp  /var/log/lastlog都是数据文件，不能直接cat查看：
				只能用如下的方式查看：
					查询当前登录的用户情况：users，who，w
					查询用户登录的历史记录：last,lastb
			查看安全日志文件：/var/log/secure 这个文件是明文的，可以cat查看
				例：打开两个标签
					第一终端： 
						#tail  -f   /var/log/secure   
					第二终端： 
						#su  -  tom     
						然后看第一个标签的变化
	
			程序日志：大部分的程序，都会有自己单独的日志记录位置
				例如：httpd 服务的日志文件access_log和error_log
				分别记录客户访问事件和错误信息
			常见日志文件：
				/var/log/cron  crond 计划任务产生的事件信息
				/var/log/dmesg  引导过程中产生的信息
				/var/log/maillog 记录电子邮件活动信息
				/var/log/lastlog  用户最近登录信息
				/var/log/secure   与认证有关的信息
				/var/log/wtmp     记录用户登录、注销、系统启动、关键等信息
				/var/log/btmp    记录失败或者是错误的登录信息和验证
				/var/log/messages    记录系统一般信息的日志****
							
	(二).日志的切割：日志滚动、轮滚  
		 为了防止日志使用时间过长、日志文件过大，要对日志做切割 
		 可以节约磁盘空间
		 logrotated服务，是用来管理日志滚动   
		 
		 安装：  
			#yum   install   -y  logrotate     
		 查看安装了哪些文件： 
			#rpm -ql    logrotate   
				/etc/cron.daily/logrotate      计划任务，每天会被执行      
				/etc/logrotate.conf			   主配置文件  
				/etc/logrotate.d               设定滚动的配置文件 
				/usr/sbin/logrotate            日志滚动的命令   
		 修改配置文件：  
			#vim    /etc/logrotate.conf    
				# rotate log files weekly
				weekly      每周去滚动文件  
				
				# keep 4 weeks worth of backlogs
				rotate 4     保留几个旧的日志文件  
				
				# create new (empty) log files after rotating old ones
				create         滚动日志后，是否产生新的日志文件(空的)
				
				# use date as a suffix of the rotated file
				dateext        使用日志，当作滚动文件名的一部分  
				
				# uncomment this if you want your log files compressed
				#compress      如果去掉#，就可以压缩旧的日志文件  
				注意：以上的设定，都代表了全局设定，如果将来没有单独指定时，就引用上面全局
				
				include /etc/logrotate.d        在该目录中的文件，也是配置文件的一部分
				
				/var/log/wtmp {
								monthly
								create 0664 root utmp     权限   所有者  所属组 
								minsize 1M       滚动要求的最小的标准
								maxzize 10M      一旦达到10M，就会立即滚动 
								rotate 1
							}
			
		 修改日志滚动文件： 
			#vim    /etc/logrotate.d/ding        ding的文件名任意  
				/var/log/loring {
					weekly
					create
					rotate  4  
					}
		 手动执行生效： 
			#logrotate   -fv    /etc/logrotate.d/ding   
		 验证查看：  
			#ls      /var/log       可以发现已经滚动了  


​				
​				
​				
​				



十二.sudo      ***