<style scoped>
  #resizableBox {
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #e3e3e3;
  }

  /*区域*/
  .area {
    height: 100%;
    width: 180px;
    min-width: 180px;
    padding: 10px;
    background-color: #e3e3e3;

  }

  .areaList {
    padding: 20px;
    background-color: white;
  }

  .areaList li {
    margin-bottom: 20px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }

  .areaList li i {
    font-size: 3rem;
    color: #5ea2d3;
  }

  .areaList li b {
    font-size: 1.6rem;
    margin-left: 10px;
  }

  /*编辑区*/
  #editBox {
    height: 100%;
    width: 1500px;
    min-width: 1500px;
    background-color: white;
    margin-top: 10px;
  }

  .editBox {
    height: calc(100% - 40px - 10px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #edit {
    width: 600px;
    height: 800px;
    background-color: #000;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .action {
    text-align: end;
    padding-top: 5px;
  }

  .action > span > i {
    margin-right: 5px;
    color: white;
    font-size: 1.6rem;
    cursor: pointer;
  }

  /*信息区*/
  .info {
    height: 100%;
    width: 200px;
    min-width: 200px;
    padding: 10px;
    background-color: #e3e3e3;
  }

  .templateInfo, .areaInfo, .parameterSet {
    border: 1px solid #d6d6d6;
    margin-bottom: 10px;
    background-color: white;
  }

  .templateInfoList li {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 5px;
  }

  .templateInfoList li > input {
    width: 80px;

  }

  .templateInfoList li > span {
    margin-right: 20px;
  }

  .setBox {
    display: flex;
    justify-content: space-between;
  }

  .pixel input, .percent input {
    width: 50px;
  }

  .pixel b, .percent b {
    display: inline-block;
    width: 20px;
  }

  .saveBox {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
  }

  .save {
    background-color: #d33a31;
    color: white;
    padding: 5px 10px;
    letter-spacing: 2px;
  }

  /*内容框*/
  .img {
    height: 100%;
    width: 100%;
    background: url("../../assets/imgs/template/img.png") no-repeat 100% 100%;
    background-size: 100% 100%;
    position: relative;
  }

  .video {
    height: 100%;
    width: 100%;
    background: url("../../assets/imgs/template/video.png") no-repeat 100% 100%;
    background-size: 100% 100%;
  }

  .txt {
    height: 100%;
    width: 100%;
    background: url("../../assets/imgs/template/txt.png") no-repeat 100% 100%;
    background-size: 100% 100%;
  }

  .scroll {
    height: 100%;
    width: 100%;
    background: url("../../assets/imgs/template/scroll.png") no-repeat 100% 100%;
    background-size: 100% 100%;
  }

  .audio {
    height: 100%;
    width: 100%;
    background: url("../../assets/imgs/template/audio.png") no-repeat 100% 100%;
    background-size: 100% 100%;
  }

  .title {
    height: 40px;
    background-color: #d33a31;
    line-height: 40px;
    padding-left: 10px;
    font-size: 1.4rem;
    color: white;
    letter-spacing: 3px;
  }

  .templateInfoList, .setBox, .areaBox {
    padding: 10px;
  }
</style>
<template>
  <div id="resizableBox">
    <div class="area">
      <div class="title">区域</div>
      <ul class="areaList">
        <li><i class="iconfont icon-beijing"></i><b>背景</b></li>
        <li @click="add('img',true)"><i class="iconfont icon-tupian"></i><b>图片</b></li>
        <li @click="add('video',true)"><i class="iconfont icon-shipin"></i><b>视频</b></li>
        <li @click="add('txt',false)"><i class="iconfont icon-txt"></i><b>文本</b></li>
        <li @click="add('scroll',false)"><i class="iconfont icon-wenben"></i><b>动态文本</b></li>
        <li @click="add('audio',false)"><i class="iconfont icon-yinle"></i><b>音乐</b></li>
      </ul>
    </div>
    <div id="editBox">
      <div class="title">编辑区</div>
      <div class="editBox">
        <div id="edit">
          <vue-draggable-resizable v-for="(item,index) in items" :key="item.key"
                                   :w="189" :h="142" :minw="50" :minh="50"
                                   @dragging="onDrag" @resizing="onResize" :parent="true"
                                   :conflictCheck="item.conflictCheck" :id="item.id">
            <div :class="{[item.content]:true}" @mouseover="showDel($event)" @mouseout="show = false">
              <div class="action" v-show="show">
                <span @click="items.splice(index,1)"><i class="el-icon-delete"></i></span>
              </div>
            </div>
          </vue-draggable-resizable>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="templateInfo">
        <div class="title" style="margin-bottom: 10px;">模板信息</div>
        <ul class="templateInfoList">
          <li><span>模板名称：</span><input v-model="templateName" type="text"></li>
          <li><span>模板类型：</span><b>用户模板</b></li>
          <li><span>终端类型：</span><i class="iconfont"></i></li>
          <li><span>分辨率：&nbsp;&nbsp;&nbsp;</span><input type="text"></li>
        </ul>
      </div>
      <div class="areaInfo">
        <div class="title" style="margin-bottom: 10px;">区域信息</div>
        <div class="areaBox">
          <span>区域名称：</span><input type="text">
        </div>
      </div>
      <div class="parameterSet">
        <div class="title" style="margin-bottom: 10px;">参数设置</div>
        <div class="setBox">
          <div class="pixel">
            <b>X:</b><input type="number" :value="x"> px</br></br>
            <b>Y:</b><input type="number" :value="y"> px</br></br>
            <b>W:</b><input type="number" :value="width"> px</br></br>
            <b>H:</b><input type="number" :value="height"> px
          </div>
          <div class="percent">
            <b></b><input type="text" disabled :value="(x/600*100).toFixed(2)"> %</br></br>
            <b></b><input type="text" disabled :value="(y/600*100).toFixed(2)"> %</br></br>
            <b></b><input type="text" disabled :value="(width/600*100).toFixed(2)"> %</br></br>
            <b></b><input type="text" disabled :value="(height/600*100).toFixed(2)"> %
          </div>
        </div>

      </div>
      <div class="saveBox">
        <a class="save" @click="exportImage">保存</a>
        <a class="save" @click="exportImage('use')">保存并使用</a>
        <a class="save" @click="exit">取消</a>
      </div>
      <div>
        <img id="exportedImage" style="width: 200px">
      </div>
    </div>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas';
  import $ from 'jquery'
  import Vue from 'vue'

  export default {
    data() {
      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        items: [],
        show: false,
        id: 1,
        templateName: '',
        check: true,
        preview: ''
      }
    },
    components: {},
    methods: {
      onResize: function (left, top, width, height) {
        this.x = left
        this.y = top
        this.width = width
        this.height = height
      },   //调整大小的回调
      onDrag: function (left, top) {
        this.x = left
        this.y = top
      },                    //移动的回调
      showDel(e) {
        this.show = true
        e.currentTarget
        debugger
      },
      add: function (content, status) {
        var id = '';
        status ? id = 'check' : id = 'Uncheck'      //判断是否检查，用来给不检查的元素赋ID值
        this.items.push({key: this.id++, content: content, conflictCheck: status, id: id})
      },                //添加区域块
      exit: function () {
        this.$router.go(-1);
      },                              //后退
      exportImage(value) {
        let vm = this;
        let table = $('#edit');

        let html = $('.editBox').html();      //模板代码
        let creator = sessionStorage.getItem('name');  //创建人
        let treeId = 22;     //	树ID
        let Array = [];
        //获取区域块的属性值
        table.children().map(function () {
          let height = $(this).height();
          let width = $(this).width();
          let x = $(this).position().left;
          let y = $(this).position().top;
          let type = $(this).children().last().attr('class');
          Array.push({height, width, x, y, type});
        });
        let elements = Array    //end
        /* 这部分代码用来解决生成的图片不清晰的问题 */
        // let tableWidth = table.offsetWidth;
        // let tableHeight = table.offsetHeight;
        // let canvas = document.createElement('canvas');
        // canvas.width = tableWidth * 2;
        // canvas.height = tableHeight * 2;
        // canvas.style.width = tableWidth + 'px';
        // canvas.style.height = tableHeight + 'px';
        // document.body.appendChild(canvas);
        // var context = canvas.getContext('2d');
        // context.scale(2, 2);
        /* 这部分代码用来解决生成的图片不清晰的问题 */
        html2canvas(table, {
          // canvas: canvas,
          onrendered(image) {
            var url = image.toDataURL();
            document.getElementById('exportedImage').src = url;
            vm.preview = url;
            /*创建一个a标签，添加点击事件直接下载*/
            /*let a = document.createElement('a');
            a.href = url;
            a.download = vm.imageName ? vm.imageName : '未命名';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);*/
            // document.body.removeChild(canvas);
          }
        });
        if (table.html() == "") {
          vm.$message({message: '请加入区域块！', center: true, type: 'warning'});
        } else {
          this.$http({
            method: 'post',
            url: 'template/create',
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name'),
            },
            data: {
              body: html,     //模板js代码
              creator: creator,      //创建人
              elements: elements,     //List<Elements>模板元素集合
              treeId: treeId,     //	树ID
              name: vm.templateName,     //模板名称
              type: '用户模板',     //	模板类型
              width: '800',     //模板宽
              height: '600',     //模板高
              preview: vm.preview, //模板截图
              terminalType:'ios'
            }
          }).then(response => {
            if (response.data.code == '0000') {
              vm.$message({message: '保存成功！', center: true, type: 'success'});
              if (value == 'use') {
                localStorage.setItem("template", html);
                vm.$router.push('/programMack')
              }
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        }

      }                              //导出图片
    }
  }
</script>
