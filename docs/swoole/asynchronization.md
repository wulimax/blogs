## 事件驱动与异步编程模式

### 同步

同步和异步描述的是进程/线程的**调用方式**。

1. 同步调用指的是线程发起调用后, 一直等待调用返回后才继续执行下一步操作, 这并不代表 CPU 在这段时间内也会一直等待, 操作系统多半会切换到另一个线程上去, 等到调用返回后再切换回原来的线程。
2. 异步就相反, 发起调用后, 线程继续向下执行, 当调用返回后, 通过某种手段来通知调用者。

同步和异步中的调用返回指的是内核进程将数据复制到调用进程, 顺序编程里面通常调用是同步的, 上一步执行之后才会继续下一步。

#### 所谓的同步就行相同时间内相同 进程/线程 只能有一个独立的程序运行

###异步

将任务组织成一个序列来交替地小步完成, 一个比较好的应用场景就是 ,当我们时间到一些阻塞IO的情况下比较适合,比如,读取一个大型文件,或者一个网络请求会等待一段时间, 就好比说两个人干活 ,A一个人干的很快这个人就CPU,另一个人干的很慢就是B网络文件 我们没必要非得等到B干完再干,我们可以先干C,D或者其他人的活等B干完了再通知我他干完了就行了

## 异步模型具有优势的场景

1. 有大量的任务, 因此在一个时刻至少有一个任务要运行。
2. 任务执行大量的 I/O 操作, 这样同步模型就会在因为任务阻塞而浪费大量的时间。
3. 任务之间相互独立, 以至于任务内部的交互很少。

这些条件大多是在 Client/Server 模式中的网络比较繁忙的服务器端出现, 比如 web 服务器, 每个任务代表一个客户端进行接收请求并回复的 I/O 操作, 客户端的请求相当于读操作, 它们是相互独立的, 因此, 网络服务是异步模型的典型代表。

## 事件驱动模型

事件驱动模型主要应用在图形用户界面(GUI)、网络服务和 Web 前端上。比如编写图形用户界面程序, 要给界面上每个按钮都添加监听函数, 而该函数只有在相应的按钮被用户点击的事件发生时才会执行, 开发者并不需要事先确定事件何时发生, 只需要编写事件的响应函数即可。监听函数或者响应函数就是所谓的事件处理器(event handler), 类似的事件还有鼠标移动、按下、松开、双击等等, 这就是事件驱动。

事件驱动的程序一般都有一个主循环(main loop)或称事件循环(event loop), 该循环不停地做两件事: 事件监测和事件处理。首先要监测是否发生了事件, 如果有事件发生则调用相应的事件处理程序, 处理完毕再继续监测新事件。事件循环只是在一个进程中运行的单个线程。

