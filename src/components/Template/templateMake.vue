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
  .image {
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

  /*图片管理*/
  .controlBox {
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
  }

  .search {
    display: flex;
  }

  .search > div {
    margin-right: 10px;
  }

  .imgList, .tableList {
    padding: 20px;
    height: 580px;
  }

  .resourceList {
    display: flex;
    flex-wrap: wrap;
  }

  .resourceList li {
    width: 150px;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 30px 40px;
    cursor: pointer;
    padding: 10px 5px;
    border-radius: 5px;
    position: relative;
  }

  .imgBox {
    width: 130px;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid #e7e7e7;
  }

  .resourceList li img {
    max-width: 120px;
    max-height: 120px;
  }

  .resourceList li:hover {
    background-color: #ebebeb !important;
  }

  .resourceList p {
    min-width: 20px;
  }

  .el-upload-list__item-status-label {
    position: absolute;
    right: -15px;
    top: -7px;
    width: 46px;
    height: 26px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 1px 1px #ccc;
  }

  .el-upload-list__item-status-label i {
    font-size: 12px;
    margin-top: 12px;
    transform: rotate(-45deg);
    color: white;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>
<template>
  <div id="resizableBox">
    <div class="area">
      <div class="title">区域</div>
      <ul class="areaList">
        <!--<li @click="setBg = true"><i class="iconfont icon-beijing"></i><b>背景</b></li>-->
        <li @click="add('image',true)"><i class="iconfont icon-tupian"></i><b>图片</b></li>
        <li @click="add('video',true)"><i class="iconfont icon-shipin"></i><b>视频</b></li>
        <li @click="add('txt',false)"><i class="iconfont icon-txt"></i><b>文本</b></li>
        <li @click="add('scroll',false)"><i class="iconfont icon-wenben"></i><b>动态文本</b></li>
        <li @click="add('audio',false)"><i class="iconfont icon-yinle"></i><b>音乐</b></li>
      </ul>
    </div>
    <div id="editBox">
      <div class="title">编辑区</div>
      <div class="editBox">
        <div id="edit" :style="{width : temWidth * PP + 'px',height : temHeight * PP + 'px'}">
          <vue-draggable-resizable v-if="revert" v-for="(item,index) in elements" :key="index"
                                   :w="item.width * PP" :h="item.height * PP" :x="item.x * PP" :y="item.y * PP"
                                   :minw="50" :minh="50"
                                   @dragging="onDrag" @resizing="onResize" :parent="true" :name="item.name"
                                   :conflictCheck="item.conflictCheck" :id="item.id">
            <div :class="{[item.content]:true}" @mouseover="showDel($event)" @mouseout="show = false">
              <div class="action" v-show="show">
                <span @click="elements.splice(index,1)"><i class="el-icon-delete"></i></span>
              </div>
            </div>
          </vue-draggable-resizable>

          <vue-draggable-resizable v-for="(item,index) in items" :key="item.key"
                                   :w="189" :h="142" :minw="50" :minh="50"
                                   @dragging="onDrag" @resizing="onResize" :parent="true"
                                   :conflictCheck="item.conflictCheck" :name="item.name" :id="item.id">
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
          <li><span>模板名称：</span><input v-model="temName" type="text"></li>
          <li><span>模板类型：</span><b>{{temType}}</b></li>
          <li><span>终端类型：</span><b>{{terminalType}}</b><i class="iconfont"></i></li>
          <li><span>分辨率：&nbsp;&nbsp;&nbsp;</span><input type="text" v-model="resolution" readonly="readonly"></li>
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
            <b>X:</b><input type="number" :value="parseInt(x/PP)"> px</br></br>
            <b>Y:</b><input type="number" :value="parseInt(y/PP)"> px</br></br>
            <b>W:</b><input type="number" :value="parseInt(width/PP)"> px</br></br>
            <b>H:</b><input type="number" :value="parseInt(height/PP)"> px
          </div>
          <div class="percent">
            <b></b><input type="text" disabled :value="(x/600*100).toFixed(2)"> %</br></br>
            <b></b><input type="text" disabled :value="(y/600*100).toFixed(2)"> %</br></br>
            <b></b><input type="text" disabled :value="(width/PP/temWidth*100).toFixed(2)"> %</br></br>
            <b></b><input type="text" disabled :value="(height/PP/temHeight*100).toFixed(2)"> %
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
    <el-dialog
      title="选择背景"
      :visible.sync="setBg"
      width="51%"
      top="1vh"
    >
      <div style="width: 100%;height: 100%;text-align: center;overflow: hidden">
        <div class="controlBox">
          <div class="search">
            <div style="width: 110px">
              <el-select v-model="value" placeholder="图形模式" @change="selectChange">
                <el-option v-for="item in select"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">名称</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">终端分组</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">上传者</template>
              </el-input>
            </div>
            <el-button>搜索</el-button>
          </div>
        </div>
        <div v-if="value == '2'" class="tableList">
          <el-table :data="resources" @selection-change="tableSelect">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="name" align="center" label="名称"></el-table-column>
            <el-table-column prop="screenshot" align="center" label="预览图">
              <template scope="scope">
                <img :src="'http://'+ scope.row.thumbnail" width="100" height="70"/>
              </template>
            </el-table-column>
            <el-table-column prop="resolution" align="center" label="分辨率"></el-table-column>
            <el-table-column prop="size" align="center" label="大小(kb)"></el-table-column>
            <el-table-column prop="orgId" align="center" label="终端分组"></el-table-column>
            <el-table-column prop="creator" align="center" label="创建人"></el-table-column>
            <el-table-column prop="uploadtime" align="center" label="更新时间"></el-table-column>
          </el-table>
        </div>
        <div v-else class="imgList">
          <ul class="resourceList">
            <li v-for="(resource,id) in resources" :key="id" :id="resource.id"
                @click="selected($event)" :url="resource.url" @dblclick="preview($event)">
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-check"></i>
              </label>
              <div class="imgBox">
                <img :src="'http://'+ resource.thumbnail">
              </div>
              <p>{{resource.name}}</p>
            </li>
          </ul>
        </div>
        <div class="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageCount"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setBg = false">确 定</el-button>
  </span>
    </el-dialog><!--选择背景-->
  </div>
</template>
<script>
  import html2canvas from 'html2canvas';
  import $ from 'jquery'
  import Vue from 'vue'

  export default {
    mounted() {
      this.resourceQuery();
      this.temEdit();
      /*根据模板高度设置缩放比例*/
      if (this.temHeight == '1080') this.PP = 0.4;
      if (this.temHeight == '720') this.PP = 0.7;
      if (this.temHeight == '1280') this.PP = 0.6;
      if (this.temHeight == '1920') this.PP = 0.4
    },
    data() {
      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        items: [],
        show: false,
        id: 1,
        //模板属性
        PP: 1,                                                         //百分比
        temName: sessionStorage.getItem('temName'),                     //模板名称
        terminalType: '安卓',                                           //终端类型
        temType: sessionStorage.getItem('temType'),                     //模板类型
        desc: sessionStorage.getItem('desc'),                           //备注
        resolution: sessionStorage.getItem('resolution'),               //分辨率
        preview: '',                                                    //预览图
        temWidth: sessionStorage.getItem('resolution').split('×')[0],  //模板宽
        temHeight: sessionStorage.getItem('resolution').split('×')[1],  //模板高
        //弹出框
        resources: [],
        value: "",
        setBg: false,                                                    //选择背景对话框
        pageCount: 12,                                                   //每页显示数目
        pageNo: 1,                                                       //当前页
        total: 0,                                                        //总数目
        select: [
          {
            value: 1,
            label: '图形模式'
          },
          {
            value: 2,
            label: '列表模式'
          }
        ],
        format: '',                                                      //资源格式
        check: false,
        //还原模板元素
        revert: false,                                                   //是否需要还原
        elements: [],
        temId: ''
      }
    },
    components: {},
    methods: {
      onResize: function (left, top, width, height) {
        this.x = left;
        this.y = top;
        this.width = width;
        this.height = height
      },    //调整大小的回调
      onDrag: function (left, top) {
        this.x = left;
        this.y = top
      },                     //移动的回调
      showDel(e) {
        this.show = true;
        e.currentTarget
      },
      add: function (content, status) {
        let id = '';
        status ? id = 'check' : id = 'Uncheck';      //判断是否检查，用来给不检查的元素赋ID值
        this.items.push({key: this.id++, content: content, conflictCheck: status, id: id, name: new Date().getTime()})
      },                  //添加区域块
      exit: function () {
        this.$router.go(-1);
      },                                //后退
      exportImage(value) {
        let vm = this;
        let table = $('#edit');
        let treeId = 0;                                      //树ID
        this.temType == '用户模板' ? treeId = 22 : treeId = 21;
        let html = $('.editBox').html();                      //模板代码
        let creator = sessionStorage.getItem('name');         //创建人

        let Array = [];                                       //区域块的属性值
        let queryUrl = '';                                    //区分新建与编辑的请求地址
        let method = '';                                      //区分新建与编辑的请求方式
        let query = this.$route.query;                        //区分新建与编辑
        let data = {};                                        //请求参数
        //获取区域块的属性值
        table.children().map(function () {
          let height = $(this).height() / vm.PP;
          let width = $(this).width() / vm.PP;

          let id = $(this).attr('name');                    //元素的唯一标识
          let x = $(this).position().left / vm.PP;
          let y = $(this).position().top / vm.PP;
          let type = $(this).children().last().attr('class');
          Array.push({height, width, x, y, type, id});
        });
        let elements = Array;    //end
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
          onrendered(image) {
            let url = image.toDataURL();
            document.getElementById('exportedImage').src = url;
            vm.preview = url;

            if (table.html() == "") {
              vm.$message({message: '请加入区域块！', showClose: true, center: true, type: 'warning'});
            } else {
              //区分新建与编辑
              if (query.name == undefined && query.groupId == undefined) {
                queryUrl = 'template/create';
                method = 'post';
                data = {
                  body: html,                     //模板js代码
                  creator: creator,               //创建人
                  temItems: elements,             //List<Elements>模板元素集合
                  groupId: treeId,                //树ID
                  name: vm.temName,               //模板名称
                  type: vm.temType,               //模板类型
                  width: vm.temWidth,                   //模板宽
                  height: vm.temHeight,                  //模板高
                  preview: vm.preview,            //模板截图
                  terminalType: vm.terminalType,  //终端类型
                  desc: vm.desc                   //备注
                }
              } else {
                queryUrl = 'template/update';
                method = 'put';
                data = {
                  body: html,                     //模板js代码
                  creator: creator,               //创建人
                  temItems: elements,             //List<Elements>模板元素集合
                  groupId: treeId,                //树ID
                  name: vm.temName,               //模板名称
                  type: vm.temType,               //模板类型
                  width: vm.temWidth,                   //模板宽
                  height: vm.temHeight,                  //模板高
                  preview: vm.preview,            //模板截图
                  terminalType: vm.terminalType,  //终端类型
                  desc: vm.desc,                  //备注
                  id: vm.temId
                }
              }
            }
            vm.$http({
              method: method,
              url: queryUrl,
              withCredentials: true,
              headers: {
                token: sessionStorage.getItem('token'),
                name: sessionStorage.getItem('name'),
              },
              data: data
            }).then(response => {
              if (response.data.code == '0000') {
                vm.$message({message: '保存成功！', showClose: true, center: true, type: 'success'});
                if (value == 'use') {
                  vm.$router.push({path: '/programMack', query: {name: vm.temName, groupId: treeId}})
                }
              } else {
                vm.$message({
                  message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                  showClose: true,
                  center: true,
                  type: 'error'
                });
              }
            })
          }
        });


      },                               //保存模板

      resourceQuery() {
        let _this = this;
        this.resources = [];
        this.$http({
          method: 'get',
          url: 'resource/query?groupId=1' + "&pageCount=" + this.pageCount + "&pageNo=" + this.pageNo,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let resources = response.data.cust.resources;
            _this.total = response.data.cust.pages.count;
            for (let resource of resources) {
              _this.resources.push(resource)
            }
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                                  //查询资源列表
      handleCurrentChange(val) {
        this.pageNo = val;
        this.resourceQuery()
      },                         //当前页翻页
      selectChange(val) {
        val == '2' ? this.pageCount = 5 : this.pageCount = 21;
        this.resourceQuery()
      },                                //选择显示模式
      tableSelect(row, val) {
        this.row = row
      },                            //表格选择
      selected(e) {
        this.check = !this.check;
        let dom = e.currentTarget.id;
        let target = e.currentTarget;
        /*if (e.target.tagName == 'DIV' || e.target.tagName == 'IMG' || e.target.tagName == 'P') {          //如果点击的是LI下面的子元素，就将子元素的父元素提取出来（即LI）。
          dom = e.target.offsetParent.id
          target = e.target.offsetParent
        } else {
          dom = e.target
          target = e.target
        }*/     //currentTarget与target的区别
        let children = target.children[0];
        if (this.check) {
          children.style.display = 'block';
          target.style.backgroundColor = "#ebebeb";

          this.downloadUrl = "http://" + document.getElementById(target.id).getAttribute("url")
          this.downloadName = target.children[2].innerText;
          this.id = dom
        } else {
          children.style.display = 'none';
          target.style.backgroundColor = "white";
          this.downloadUrl = '';
          this.downloadName = '';
          this.id = ''
        }
      },                                      //单击选择文件

      temEdit() {
        let query = this.$route.query;
        if (query.name == undefined && query.groupId == undefined) return false;
        this.revert = true;
        let _this = this;
        this.$http({
          method: 'get',
          url: 'template/query?groupId=' + query.groupId + '&pageNo=1&pageCount=1' + '&name=' + query.name,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let elements = response.data.cust.templates[0].temItems;
            let template = response.data.cust.templates[0];
            _this.temId = template.id;
            _this.temName = template.name;
            _this.terminalType = template.terminalType;
            _this.temType = template.type;
            _this.desc = template.desc;
            _this.resolution = template.resolution;
            elements.forEach(item => {
              let data = {};                       //这个需要定义在循环内部
              data['width'] = item.width;
              data['height'] = item.height;
              data['x'] = item.x;
              data['y'] = item.y;
              data['name'] = item.id;                     //元素的唯一标识
              if (item.type == 'image') {
                data['content'] = item.type;
                data['conflictCheck'] = true;
                data['id'] = 'check'
              }
              if (item.type == 'video') {
                data['content'] = item.type;
                data['conflictCheck'] = true;
                data['id'] = 'check'
              }
              if (item.type == 'txt') {
                data['content'] = item.type;
                data['conflictCheck'] = false;
                data['id'] = 'Uncheck'
              }
              if (item.type == 'scroll') {
                data['content'] = item.type;
                data['conflictCheck'] = false;
                data['id'] = 'Uncheck'
              }
              if (item.type == 'audio') {
                data['content'] = item.type;
                data['conflictCheck'] = false;
                data['id'] = 'Uncheck'
              }
              _this.elements.push(data)
            })
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                                        //模板编辑
    }
  }
</script>
