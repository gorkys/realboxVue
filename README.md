# realboxvue

### 项目运行步骤
<pre>
#安装插件
npm install
#启动项目 端口号：8080
npm run dev
#启动mock数据 端口号：3000
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
- 模板制作
    - 保存模板
    - 保存并使用
- 多语言切换
- 组件

## 文件结构
```shell
.
├── mock    
│   ├── db.json           mock数据内容
│   └── post-to-get.js    将post请求转换为get返回数据
├── static
│   ├── fonts    字体图标
│   └── reset    初始化样式
└── src
    ├── assets    素材资源
    ├── router    路由配置
    └── components    视图组件
        ├── access    权限管理
        ├── error_page    错误页面
        ├── form    表单
        │   ├── article-publish    文章发布
        │   └── work-flow    工作流
        ├── home    首页
        ├── international    多语言切换
        ├── main_components    主框架
        ├── message    消息中心
        ├── my_components    组件
        │   ├── count-to    数字渐变
        │   ├── draggable-list    可拖拽列表
        │   ├── file-upload    文件上传
        │   ├── image-editor    图片预览编辑
        │   ├── markdown-editor    markdown编辑器
        │   └── text-editer    富文本编辑器
        ├── own-space    个人中心
        ├── screen-shorts    锁屏
        └── tables    表格
```
## 填坑之旅
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
```
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
