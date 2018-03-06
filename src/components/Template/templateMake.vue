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
    position: absolute;
    right: 0;
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
    position: relative;
  }

  .txt {
    height: 100%;
    width: 100%;
    background: url("../../assets/imgs/template/txt.png") no-repeat 100% 100%;
    background-size: 100% 100%;
    position: relative;
  }

  .scroll {
    height: 100%;
    width: 100%;
    background: url("../../assets/imgs/template/scroll.png") no-repeat 100% 100%;
    background-size: 100% 100%;
    position: relative;
  }

  .BG {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .BG img {
    height: 100%;
    width: 100%;
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

  .templateInfoList, .setBox, .areaBox, .infoList {
    padding: 10px;
  }

  .areaBox {
    border-bottom: 1px solid #e4e4e4;
  }

  .areaControl {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    color: white;
    padding-bottom: 5px;
  }

  .areaControl li {
    cursor: pointer;
    background-color: #d33a31;
    padding: 2px 6px;
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
      <div class="title">{{$t('Content.ID_AREA')}}</div>
      <ul class="areaList">
        <li @click="openSetBG"><i :style="{color:BG?'#5ea2d3':'rgb(195, 195, 195)'}"
                                  class="iconfont icon-beijing"></i><b
          :style="{color:BG?'#000':'rgb(195, 195, 195)'}">{{$t('Content.ID_BACKGROUND')}}</b></li>
        <li @click="add('image',true)"><i class="iconfont icon-tupian"></i><b>{{$t('Content.ID_IMAGE')}}</b></li>
        <li @click="add('video',true)"><i :style="{color:video?'#5ea2d3':'rgb(195, 195, 195)'}"
                                          class="iconfont icon-shipin"></i><b
          :style="{color:video?'#000':'rgb(195, 195, 195)'}">{{$t('Content.ID_VIDEO')}}</b></li>
        <li @click="add('txt',false)"><i class="iconfont icon-txt"></i><b>{{$t('Content.ID_TEXT')}}</b></li>
        <li @click="add('scroll',false)"><i :style="{color:scroll?'#5ea2d3':'rgb(195, 195, 195)'}"
                                            class="iconfont icon-wenben"></i><b
          :style="{color:scroll?'#000':'rgb(195, 195, 195)'}">{{$t('Content.ID_SCROLL_TEXT')}}</b></li>
      </ul>
    </div>
    <div id="editBox">
      <div class="title">{{$t('Content.ID_EDIT_AREA')}}</div>
      <div class="editBox">
        <div id="edit" :style="{width : temWidth * PP + 'px',height : temHeight * PP + 'px'}">
          <!--还原-->
          <vue-draggable-resizable v-if="revert" v-for="(item,index) in elements" :key="index"
                                   :w="item.width * PP" :h="item.height * PP" :x="item.x * PP" :y="item.y * PP"
                                   :minw="50" :minh="50" @active="activated" @activated="onResize" :zIndex="item.zIndex"
                                   @dragging="onDrag" @resizing="onResize" :parent="true" :name="item.name"
                                   :conflictCheck="item.conflictCheck" :id="item.id" :area-name="item.areaName">
            <div :class="{[item.content]:true}" @mouseover="showDel($event)" @mouseout="show = false">
              <div class="action" v-show="show">
                <span @click="elements.splice(index,1)"><i class="el-icon-delete"></i></span>
              </div>
            </div>
          </vue-draggable-resizable>
          <!--还原背景-->
          <vue-draggable-resizable v-for="(item,index) in zBGImg" :key="item.key" :w="item.width * PP"
                                   :h="item.height * PP"
                                   :parent="true" :conflictCheck="false" :area-name="item.name" :name="item.id"
                                   id="Uncheck"
                                   @active="activated" :draggable='false' :resizable='false' :zIndex=1>
            <div :class="{[item.type]:true}" @mouseover="showDel($event)" @mouseout="show = false">
              <div class="action" v-show="show">
                <span @click="BGDel(index,'edit')"><i class="el-icon-delete"></i></span>
              </div>
              <img :name="item.backGround" :src="item.backGround" :id="item.resId">
            </div>
          </vue-draggable-resizable>
          <!--新建-->
          <vue-draggable-resizable v-for="(item,index) in items" :key="item.key"
                                   :w="189" :h="142" :minw="50" :minh="50"
                                   @dragging="onDrag" @resizing="onResize" :parent="true"
                                   :conflictCheck="item.conflictCheck" :area-name="item.areaName" :name="item.name"
                                   :id="item.id" @active="activated" @activated="onResize" :zIndex="item.zIndex">
            <div :class="{[item.content]:true}" @mouseover="showDel($event)" @mouseout="show = false">
              <div class="action" v-show="show">
                <span @click="temDel(index)"><i class="el-icon-delete"></i></span>
              </div>
            </div>
          </vue-draggable-resizable>
          <!--背景-->
          <vue-draggable-resizable v-for="(item,index) in BGImg" :key="item.key" :w="temWidth * PP" :h="temHeight * PP"
                                   :parent="true" :conflictCheck="false" :area-name="item.areaName" :name="item.name"
                                   id="Uncheck"
                                   @active="activated" :draggable='false' :resizable='false' :zIndex=1>
            <div :class="{[item.content]:true}" @mouseover="showDel($event)" @mouseout="show = false">
              <div class="action" v-show="show">
                <span @click="BGDel(index,'new')"><i class="el-icon-delete"></i></span>
              </div>
              <img :name="item.BGUrl" :src="item.BGUrl" :id="item.resId">
            </div>
          </vue-draggable-resizable>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="templateInfo">
        <div class="title" style="margin-bottom: 10px;">{{$t('Content.ID_TEMPLATE_INFORMATION')}}</div>
        <ul class="templateInfoList">
          <li><span>{{$t('Content.ID_TEMPLATE_NAME')}}：</span><input v-model="temName" type="text"></li>
          <li><span>{{$t('Content.ID_TEMPLATE_TYPE')}}：</span><b>{{temType}}</b></li>
          <li><span>{{$t('Content.ID_TERMINAL_TYPE')}}：</span><b>{{terminalType}}</b><i class="iconfont"></i></li>
          <li><span>{{$t('Content.ID_RESOLUTION')}}：&nbsp;&nbsp;&nbsp;</span><input type="text" v-model="resolution" readonly="readonly"></li>
        </ul>
      </div>
      <div class="areaInfo">
        <div class="title" style="margin-bottom: 10px;">{{$t('Content.ID_AREA_INFORMATION')}}</div>
        <div class="areaBox">
          <span>{{$t('Content.ID_AREA_NAME')}}：</span><input v-model="areaName" type="text">
        </div>
        <div class="infoList">
          <ul class="areaControl">
            <li @click="areaChange('up')">{{$t('Content.ID_UP')}}</li>
            <li @click="areaChange('down')">{{$t('Content.ID_DOWN')}}</li>
            <li @click="areaChange('top')">{{$t('Content.ID_TOP')}}</li>
            <li @click="areaChange('bottom')">{{$t('Content.ID_BOTTOM')}}</li>
          </ul>
          <fieldset style="border: 1px solid #b5b8c8;padding: 10px;max-height: 200px;overflow: auto">
            <legend>{{$t('Content.ID_AREA_LIST')}}</legend>
            <el-tree :data="areaList" node-key="key" show-checkbox @check-change="areaListCheckCheck"
                     :expand-on-click-node="false" ref="areaList" :check-strictly="true" default-expand-all>
            </el-tree>
          </fieldset>
        </div>
      </div>
      <div class="parameterSet">
        <div class="title" style="margin-bottom: 10px;">{{$t('Content.ID_PARAMTERS_SETTING')}}</div>
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
        <a class="save" @click="exportImage">{{$t('Content.ID_SAVE')}}</a>
        <a class="save" @click="exportImage('use')">{{$t('Content.ID_SAVE_AND_USED')}}</a>
        <router-link class="save" to="template">{{$t('Content.ID_CANCEL')}}</router-link>
      </div>
      <div>
        <img id="exportedImage" style="width: 200px">
      </div>
    </div>
    <el-dialog
      :title="$t('Content.ID_CHOOSE_BG')"
      :visible.sync="setBg"
      width="51%"
      top="1vh"
    >
      <div style="width: 100%;height: 100%;text-align: center;overflow: hidden">
        <div class="controlBox">
          <div class="search">
            <div style="width: 110px">
              <el-select v-model="value" :placeholder="$t('Content.ID_IMAGE_MODE')" @change="selectChange">
                <el-option v-for="item in select"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
            <div style="width:200px;">
              <el-input :placeholder="$t('Msg.ID_MSG_5')">
                <template slot="prepend">{{$t('Content.ID_NAME')}}</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input :placeholder="$t('Msg.ID_MSG_5')">
                <template slot="prepend">{{$t('Content.ID_GROUP')}}</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input :placeholder="$t('Msg.ID_MSG_5')">
                <template slot="prepend">{{$t('Content.ID_OPERATOR')}}</template>
              </el-input>
            </div>
            <el-button>{{$t('Content.ID_RESEARCH')}}</el-button>
          </div>
        </div>
        <div v-if="value == '2'" class="tableList">
          <el-table :data="resources" @selection-change="tableSelect">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="name" align="center" :label="$t('Content.ID_NAME')"></el-table-column>
            <el-table-column prop="screenshot" align="center" :label="$t('Content.ID_THUMBNAIL')">
              <template scope="scope">
                <img :src="'http://'+ scope.row.thumbnail" width="100" height="70"/>
              </template>
            </el-table-column>
            <el-table-column prop="resolution" align="center" :label="$t('Content.ID_RESOLUTION')"></el-table-column>
            <el-table-column prop="size" align="center" :label="$t('Content.ID_SIZE')+'(kb)'"></el-table-column>
            <el-table-column prop="orgId" align="center" :label="$t('Content.ID_GROUP')"></el-table-column>
            <el-table-column prop="creator" align="center" :label="$t('Content.ID_CREATOR')"></el-table-column>
            <el-table-column prop="uploadtime" align="center" :label="$t('Content.ID_UPDATE_TIME')"></el-table-column>
          </el-table>
        </div>
        <div v-else class="imgList">
          <ul class="resourceList">
            <li v-for="(resource,id) in resources" :key="id" :id="resource.id"
                @click="selected($event,id)" :url="resource.url" @dblclick="preview($event)">
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
        <el-button type="primary" @click="setBGImg">{{$t('Content.ID_OK')}}</el-button>
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
      if (this.temHeight == '1920') this.PP = 0.4;
      if (this.temHeight == '200') this.PP = 0.5
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
        zIndex: 10,
        areaList: [
          {
            key: 0,
            label: sessionStorage.getItem('temName'),
            children: []
          }],                                                   //区域列表数据
        i: 0,
        //模板属性
        PP: 1,                                                         //百分比
        temName: sessionStorage.getItem('temName'),                     //模板名称
        terminalType: this.$t('Content.ID_ANDROID'),                    //终端类型
        temType: sessionStorage.getItem('temType'),                     //模板类型
        desc: sessionStorage.getItem('desc'),                           //备注
        resolution: sessionStorage.getItem('resolution'),               //分辨率
        preview: '',                                                    //预览图
        temWidth: sessionStorage.getItem('resolution').split('×')[0],  //模板宽
        temHeight: sessionStorage.getItem('resolution').split('×')[1],  //模板高
        //背景弹出框
        resources: [],
        value: "",
        BG: true,
        BGUrl: '',
        BGId: '',
        BGImg: [],
        setBg: false,                                                    //选择背景对话框
        pageCount: 12,                                                   //每页显示数目
        pageNo: 1,                                                       //当前页
        total: 0,                                                        //总数目
        select: [
          {
            value: 1,
            label: this.$t('Content.ID_IMAGE_MODE')
          },
          {
            value: 2,
            label: this.$t('Content.ID_LIST_MODE')
          }
        ],
        format: '',                                                      //资源格式
        check: '',
        //还原模板元素
        revert: false,                                                   //是否需要还原
        elements: [],
        temId: '',
        image: 0,
        txt: 0,
        scroll: true,
        video: true,                                                      //视频只允许添加一次，如果被添加则赋值为false,添加按钮不可点击
        areaName: '',                                                     //区域名称
        zBGImg: [],                                                        //模板还原时的背景容器
      }
    },
    components: {},
    methods: {
      areaChange(val, index) {
        if(val!=''){
          this.$message({
            message: this.$t('Msg.ID_MSG_69'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false;
        }
        let area = this.$refs.areaList.getCheckedNodes();
        let areas = this.areaList[0].children;
        if (area.length === 0) return false;
        /*let i=0;
        for(let item of this.items) {
          i++;
          if(item.zIndex == key[0]){
            i-=1;
          }
        }*/

        if (val === 'up') {
          let index = areas.indexOf(area[0]); //移动目标的坐标
          let item = areas[index - 1];        //移动目标前面的数据
          Vue.set(this.areaList[0].children, index, item);
          Vue.set(this.areaList[0].children, index - 1, areas[index]);

        }
        if (val === 'down') {
        }
        if (val === 'top') {
        }
        if (val === 'bottom') {
        }
      },                                    //区域块的层级移动
      areaListCheckCheck(data, node) {
        if (data.id === 0 || data.id === 1) {
          this.$refs.areaList.setCheckedNodes([]);
          return false
        }
        this.i++;
        if (this.i % 2 == 0) {
          if (node) {
            this.$refs.areaList.setCheckedNodes([]);
            this.$refs.areaList.setCheckedNodes([data]);
            //交叉点击节点
          } else {
            this.$refs.areaList.setCheckedNodes([]);
            //点击已经选中的节点，置空
          }
        }
      },                    //树单选
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
      },
      add: function (content, status) {
        if (content == 'video' && !this.video) return false;
        let id = '';
        let areaName = '';
        if (content == 'image') {
          this.image++;
          areaName = content + this.image
        } else if (content == 'txt') {
          if (this.BG) {
            this.$message({message: this.$t('Msg.ID_MSG_70'), showClose: true, center: true, type: 'warning'});
            return false
          }
          this.txt++;
          areaName = content + this.txt
        } else if (content === 'scroll') {
          if (this.BG) {
            this.$message({message: this.$t('Msg.ID_MSG_70'), showClose: true, center: true, type: 'warning'});
            return false
          }
          this.scroll = false;
          areaName = content
        } else {
          areaName = content;
        }
        if (content === 'video' && this.video) this.video = false;
        status ? id = 'check' : id = 'Uncheck';      //判断是否检查，用来给不检查的元素赋ID值
        let zIndex = this.zIndex++;
        this.items.push({
          zIndex: zIndex,
          key: this.id++,
          content: content,
          conflictCheck: status,
          id: id,
          name: new Date().getTime(),
          areaName: areaName
        });
        this.areaList[0].children.unshift({              //区域列表
          key: zIndex,
          label: areaName
        })
      },                  //添加区域块
      temDel(index) {
        if (this.items[index].content == 'video') this.video = true;
        if (this.items[index].content == 'scroll') this.scroll = true;
        this.items.splice(index, 1);
        this.areaList[0].children.splice(index, 1);      //区域列表
      },                                    //模板删除
      exportImage(value) {
        let vm = this;
        let table = $('#edit');
        let treeId = 0;                                      //树ID
        this.temType == this.$t('Content.ID_USER_TEMPLATE') ? treeId = 22 : treeId = 21;
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
          let name = $(this).attr('area-name');
          let BGUrl = name === 'BG' ? $(this).children().find('img').attr('src') : '';
          let resId = $(this).children().last().attr('id');
          let zIndex = $(this).css('z-index');
          Array.push({
            height: height,
            width: width,
            x: x,
            y: y,
            type: type,
            id: id,
            name: name,
            backGround: BGUrl,
            bgId: resId,
            zIndex: zIndex
          });
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
          useCORS: true,
          onrendered(image) {
            let url = image.toDataURL();
            document.getElementById('exportedImage').src = url;
            vm.preview = url;

            if (table.html() == "") {
              vm.$message({message: this.$t('Msg.ID_MSG_71'), showClose: true, center: true, type: 'warning'});
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
                if (value == 'use') {
                  vm.$router.push({path: '/programMack', query: {name: vm.temName, groupId: treeId}})
                } else {
                  vm.$message({message: this.$t('Msg.ID_MSG_68'), showClose: true, center: true, type: 'success'});
                  setTimeout(() => {
                    vm.$router.push({path: '/template'})
                  }, 2000);
                }
              } else {
                vm.$message({
                  message: response.data.infor + '。',
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
              message: response.data.infor + '。',
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
        let dom = e.currentTarget.id;
        let target = e.currentTarget;
        let p = target.parentNode.childNodes;
        /*if (e.target.tagName == 'DIV' || e.target.tagName == 'IMG' || e.target.tagName == 'P') {          //如果点击的是LI下面的子元素，就将子元素的父元素提取出来（即LI）。
          dom = e.target.offsetParent.id
          target = e.target.offsetParent
        } else {
          dom = e.target
          target = e.target
        }*/     //currentTarget与target的区别
        let children = target.children[0];
        if (children.style.display != 'block') {
          children.style.display = 'block';
          target.style.backgroundColor = "#ebebeb";

          this.BGUrl = "http://" + document.getElementById(target.id).getAttribute("url");
          this.BGId = dom;
          //去掉兄弟元素的选择项
          if (p.length > 1) {
            for (let i = 0; i <= p.length; i++) {
              if (p[i].id !== dom) {
                p[i].children[0].style.display = 'none';
              }
            }
          }
        } else {
          children.style.display = 'none';
          target.style.backgroundColor = "white";
          this.BGUrl = '';
          this.BGId = ''
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
              if (item.type === 'BG') {
                _this.zBGImg.push(item);
                _this.BG = false;
                return false
              }
              let data = {};                       //这个需要定义在循环内部
              data['width'] = item.width;
              data['height'] = item.height;
              data['x'] = item.x;
              data['y'] = item.y;
              data['name'] = item.id;                     //元素的唯一标识
              data['areaName'] = item.name;
              data['zIndex'] = item.zIndex;
              if (item.type === 'image') {
                data['content'] = item.type;
                data['conflictCheck'] = true;
                data['id'] = 'check'
              }
              if (item.type === 'video') {
                data['content'] = item.type;
                data['conflictCheck'] = true;
                data['id'] = 'check';
                _this.video = false
              }
              if (item.type === 'txt') {
                data['content'] = item.type;
                data['conflictCheck'] = false;
                data['id'] = 'Uncheck';
                _this.scroll = false
              }
              if (item.type === 'scroll') {
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
      activated() {
        this.areaName = $('.active').attr('area-name');
        let index = $('.active').css('zIndex');
        if (index != undefined) {
          this.$refs.areaList.setCheckedKeys([index])
        }
      },                                      //激活区域块
      openSetBG() {
        if (this.BG) this.setBg = true
      },                                      //打开背景选择对话框
      setBGImg() {
        if(this.BGUrl=='') {
          this.$message({
            message: this.$t('Msg.ID_MSG_72'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
        this.BGImg.push({
          key: this.id++,
          content: 'BG',
          resId: this.BGId,
          BGUrl: this.BGUrl,
          name: new Date().getTime(),
          areaName: 'BG'
        });
        this.BG = false;
        this.setBg = false
      },                                       //确认设置背景图片
      BGDel(index, val) {
        this.BG = true;
        if (val === 'new') {
          this.BGImg.splice(index, 1);
        } else {
          this.zBGImg.splice(index, 1);
        }
      }                                 //删除背景图片
    }
  }
</script>
