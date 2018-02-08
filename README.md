# realboxvue
### 项目运行环境
```
1、node 
2、npm
3、tomcat
```
### 项目运行步骤
<pre>
#安装依赖包
npm install

#启动项目 端口号：8666
npm run dev

#更改前端端口
config文件夹下index.js文件中第30行端口

#更改请求端口
src目录下的main.js文件中更改第13行地址

#打包项目
npm run build
运行命令后会生成一个dist文件夹，将里面的代码复制到tomcat中的Root文件夹下启动tomcat即可

#启动mock数据 端口号：3000（提供mock数据，有后台就不需要启动）
npm run mock
</pre>

## 项目组件
[element-ui（UI组件）](http://element-cn.eleme.io/#/zh-CN)<br>
[Axios（AJAX请求插件）](https://github.com/axios/axios)<br>
[JSON-server （mock数据）](https://github.com/typicode/json-server)<br>
[vue-draggable-resizable（移动插件）](https://github.com/mauricius/vue-draggable-resizable)<br>
[html2canvas(网页截图)](https://github.com/niklasvh/html2canvas)</br>
[jQuery]()

## 功能

- 登录/登出
- 模板管理
    - 保存模板
    - 保存并使用
- 用户管理
- 发布节目

## 文件结构
```shell
.
├── mock    
│   ├── db.json           mock数据内容
│   └── post-to-get.js    将post请求转换为get返回数据
├── static
│   ├── fonts    字体图标
│   └── reset    初始化样式
├── theme   主题样式
└── src
    ├── assets    素材资源
    ├── router    路由配置
    └── components    视图组件
        ├── common      公共组件（导航页尾）
        ├── Log         系统日志
        ├── Program     节目管理
        ├── Resource    资源管理
        ├── SystemSet    系统设置 用户管理
        ├── Template    模板管理
        ├── Terminal    终端管理
        ├── index       首页
        └── login       登录
```
## 填坑之旅
#### 16.vue在IE11中显示空白页
解决办法：通过npm安装babel-polyfill。`npm install --save-dev babel-polyfill`</br>
然后在main.js中引入。`import 'babel-polyfill'`
#### 15.element-ui tree树形控件单选实现
解决办法：通过tree的`check-change`事件曲线实现单选,注意：注意：</br>
1、setCheckedNodes  
2、勾选的节点，必须设置 node-key 属性
```vue
terCheck(data, node){
          this.i++;
          if(this.i%2==0){
            if(node){
              this.$refs.terTree.setCheckedNodes([]);
              this.$refs.terTree.setCheckedNodes([data]);
              //交叉点击节点
            }else{
              this.$refs.terTree.setCheckedNodes([]);
              //点击已经选中的节点，置空
            }
          }
        }
```
#### 14.[解决vue-cli element-ui打包报错](http://blog.csdn.net/qq_35624642/article/details/78828390)Unexpected token: punc (() [./~/element-ui/packages/row/src/row.js

#### 13.如何在页面渲染完后去操作dom，而且只执行一次？
解决办法：使用场景：节目编辑时还原节目素材;</br>
最初使用`update`生命周期，后来发现会在数据每次更新后执行一次，更改后使用第一种方法。

1.在接口请求成功的回调里使用
  
  ```
  this.$nextTick(() =>{
    // 在这里面去获取DOM
  })
  ```
  2.把watch和nextTick组合一起
 
    watch:{    
       showList:function(){ 
           this.$nextTick(function(){
                // 在这里面去获取DOM
                })
           }
        }
    showList对应页面的绑定变量
    <tr v-for="(item,index) in showList">
    

#### 12.js截取某个符号前后的字符串
解决方法：
```html

<script type="text/javascript">  
/*  
  string 字符串;  
  str 指定字符;  
  split(),用于把一个字符串分割成字符串数组;  
  split(str)[0],读取数组中索引为0的值（第一个值）,所有数组索引默认从0开始;  
 */  
function getStr(string,str){  
    var str_before = string.split(str)[0];  
    var str_after = string.split(str)[1];  
    alert('前：'+str_before+' - 后：'+str_after);  
}  
</script>  
<body>
<input type="button" onClick="getStr('1920*720','*');" value="获取值" />
</body> 
```
#### 11.htmlcollection 转数组
解决方法：这里把符合以下条件的对象称为伪数组（ArrayLike）

     1，具有length属性
     2，按索引方式存储数据
     3，不具有数组的push,pop等方法
方法：
```
let ter = document.getElementsByClassName('playImgList')[0].children;
let terAttr = Array.prototype.slice.call(ter,0);                //将伪数组转为数组
let terAttr= [].slice.call(ter);                                //此处为简写
```
#### 10.html2canvas无法截取链接图片
解决方法：属于跨域问题，本项目后台使用Nginx作为服务器,需要在nginx.conf中修改配置如下：
```html
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Credentials' 'true';
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,
            X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';

```
参考文章：

[Nginx 跨域设置 Access-Control-Allow-Origin 无效的解决办法](http://blog.csdn.net/frank_passion/article/details/53898769)
          <br>[html2canvas跨域问题的简单解决方法](http://www.shuijingwanwq.com/2017/05/24/1634/)
          
注意：
```
      1.useCORS:true 这个参数很重要，没有配置的话，依旧是不能解决问题的,
        allowTaint和useCORS这两个参数不能共存;
      2.根据现有的解决方案大致有两种： 
        (1).在跨域的服务器上设置header设置为允许跨域请求。 
        (2).借助代理脚本获得外域图片的 base64 编码后的字符串 
      3.后台设置完后前端需要清理一下缓存。
```
#### 9.切换弹窗时视频存在缓存问题
解决方法：使用`load()`重新加载视频元素，视频的暂停与播放方法为`play()`,`pause()`,设置当前视频播放位置`currentTime`。
#### 8.MP4在网页上播放需要特定编码
解决方法：由后台去转码
#### 7.如何选择资源时切换选中状态
解决方法：1、data中定义一个check变量，默认值为false,触发点击事件后`this.check=!this.check`,</br>
然后
```
if(this.check){
 //选中时状态代码
 }
 else {
 //未选中时状态代码
 }
 ```
点击时传的`$event`参数中currentTarget与target区别为(代码见resource.vue的资源选中事件):</br>
target指向被单击的对象而currentTarget指向当前事件活动的对象（一般为父级）
2、1方法中会更适合单选，多选中会出现选择下一个目标时，第一次点击无效的bug。多选可根据其样式</br>
是否增加去判断，代码已更改，详见资源选择模板选择内。
3、单选需要干掉兄弟元素的样式。代码：

```vue
         if (p.length > 1) {
            for (let i = 0; i <= p.length; i++) {
              if (p[i].id !== id) {     //去除自身
                p[i].children[0].style.display = 'none';
              }
            }
          }
```
#### 7.如何动态添加对象属性
解决方法：对象的访问方式有`data.name`与`data[name]`,动态添加需要使用`data[name]`,代码见roleSet.vue添加权限方法

#### 6.Vue和vue-template-compiler版本之间的问题
解决方法：删除node_modules,重新安装npm install,再更新npm update

#### 5.素材的拖放与拖放时的冲突检测（图片不能拖放进入视频区域）？
解决办法：
#### 4.模板的保存问题，从模板管理中进行编辑如何还原布局？
解决办法：
#### 3.组件之间如何进行冲突检测？
解决办法：
在vue-draggable-resizable的github上找到了支持X,Y,W,H双向绑定的测试版本，</br>
在里面加入冲突检测的代码块。详细代码参考vue-draggable-resizable.vue文件，</br>
部分代码如下：
```javascript
          let p = this.$el.parentNode.childNodes;
          //判断是否存在兄弟元素
          if (p.length > 1) {
            for (let i = 0; i <= p.length; i++) {
              if (p[i] !== this.$el) {      //过滤掉自身，剩下的就是兄弟元素
                let tw = p[i].offsetWidth;
                let th = p[i].offsetHeight;
                let tl = p[i].offsetLeft;
                let tt = p[i].offsetTop;

                if (this.top >= tt && this.left >= tl && tt + th >= this.top && tl + tw >= this.left ||
                  this.top <= tt && this.left <= tl && this.top + this.height >= tt && this.left + this.width >= tl) { /*左上角与右下角重叠*/

                  this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                  this.left = this.restoreX
                  this.width = this.restoreW
                  this.height = this.restoreH


                } else if (this.left <= tl && this.top >= tt && this.left + this.width >= tl && this.top <= tt + th ||
                  this.top <= tt && this.left >= tl && this.top + this.height >= tt && this.left <= tl + tw) { /*右上角与左下角重叠*/

                  this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                  this.left = this.restoreX
                  this.width = this.restoreW
                  this.height = this.restoreH

                } else if (this.top <= tt && this.left <= tl && this.top + this.height >= tt && this.left + this.width >= tl ||
                  this.top >= tt && this.left >= tl && this.top <= tt + th && this.left <= tl + tw) { /*下边与上边重叠*/

                  this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                  this.left = this.restoreX
                  this.width = this.restoreW
                  this.height = this.restoreH

                } else if (this.top <= tt && this.left >= tl && this.top + this.height >= tt && this.left <= tl + tw ||
                  this.top >= tt && this.left <= tl && this.top <= tt + th && this.left >= tl + tw) { /*上边与下边重叠（宽度不一样）*/

                  this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                  this.left = this.restoreX
                  this.width = this.restoreW
                  this.height = this.restoreH
                } else if (this.left >= tl && this.top >= tt && this.left <= tl + tw && this.top <= tt + th ||
                  this.top >= tt && this.left <= tl && this.left + this.width >= tl && this.top <= tt + th) { /*左边与右边重叠*/

                  this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                  this.left = this.restoreX
                  this.width = this.restoreW
                  this.height = this.restoreH

                } else if (this.top <= tt && this.left >= tl && this.top + this.height >= tt && this.left <= tl + tw ||
                  this.top >= tt && this.left <= tl && this.top <= tt + th && this.left + this.width >= tl) { /*左边与右边重叠（高度不一样）*/

                  this.top = this.restoreY          //如果冲突，就将回退到移动前的位置
                  this.left = this.restoreX
                  this.width = this.restoreW
                  this.height = this.restoreH

                }
              }
            }
          }
```
过滤掉某些不需要进行冲突检测的区域块：在插件中添加了一个`conflictCheck`道具。</br>

#### conflictCheck
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`</br>
定义拖动与调整组件时是否需要进行冲突检测
```html
<vue-draggable-resizable :conflictCheck="true">
```
当然，这个只能让当前拖动的组件不与其它组件进行冲突检测，而其他组件拖动的时候还是会与它进行冲突检测。</br>
暂时的解决办法是给每个组件添加一个ID，需要冲突检测的为check，不然为Uncheck。代码在templateMake.vue的107行
#### 2.将模板布局的代码存放在服务器中，再使用v-html渲染出来，无法添加@drop事件，从而让图片移入。</br>
解决办法：
</br>引入jQuery:
</br>2.1npm install jquery --save</br>
2.2import $ from 'jquery'</br>
2.3</br>
```vue
mounted:function () {
      this.$nextTick().then(function () {
        $('.draggable').on('drop',function (event) {
          event.preventDefault();
          event.target.appendChild(dom)
        })
        $('.draggable').on('dragover',function (event) {
          event.preventDefault();
        })
      })
    }
```
####1.VUE中drop需要注意的事项。</br>
html部分</br>
```html
<div id="div1" @drop="drop($event)" @dragover="allowDrop($event)"></div>
      <div id="div2" @drop="drop($event)" @dragover="allowDrop($event)">
      <img id="drag1" src="../assets/imgs/login/img.jpg"
           draggable="true" @dragstart="drag($event)" width="200" height="69">
</div>
```
js部分</br>
```vue
 methods: {
      allowDrop: function (ev) {
        ev.preventDefault();
      },
      drag: function (ev) {
        dom = ev.currentTarget
      },
      drop: function (ev) {
        ev.preventDefault();
        ev.target.appendChild(dom)
      }
    }
```
在vue中绑定事件时要传 'event',你不能像js那种格式去写 ,比如:`@dragstart='drag(event)'`  
这样写的话你在drag方法中获取到的event是  undefined,因为它把`@dragstart='drag(event)'`
中的event当成了一个变量,而该变量并没有在data中定义所以就是 undefined.早上小颖就碰到过
此坑.所以切记格式是介个酱紫的:`@dragstart='drag($event)'`
