<style scoped>
  #programMack {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #d2d2d2;
    padding: 0 10px;
    height: 100%;
  }

  #material {
    width: 40.5%;
    height: 80%;
    background-color: white;
  }

  #templateBox {
    width: 59%;
    height: 80%;
    background-color: white;
  }

  #setAttr {
    width: 100%;
    height: 170px;
    background-color: white;
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

  .controlBox {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid #e0e0e0;
  }

  .control a {
    margin-left: 10px;
  }

  .name {
    display: flex;
  }

  .template {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 40px - 40px);
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }

  /*列表样式*/
  .resourceList {
    display: flex;
    flex-wrap: wrap;
    height: 616px;
    align-content: flex-start;
  }

  .resourceList li {
    width: 150px;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 9px 50px;
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
    /*防止拖动时选择图片*/
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .resourceList li:hover {
    background-color: #ebebeb;
  }

  .resourceList p {
    min-width: 20px;
    /*防止拖动时选择文字*/
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /*移动框*/
  .move {
    top: 0;
    left: 0;
    width: 180px;
    opacity: 0.9;
    z-index: 999;
    padding: 10px;
    display: none;
    overflow: hidden;
    position: absolute;
    text-align: center;
    background-color: #f8f8f8;
  }

  .move img {
    max-width: 170px;
    max-height: 130px;
  }

  /*快速预览*/
  #proPreview, #editTxt {
    position: relative;
  }

  #proPreview > div, #editTxt > div {
    position: absolute;

  }

  #proPreview > div > div, #editTxt > div > div {
    width: 100%;
    height: 100%;
  }

  #editTxt textarea {
    border: 0;
    position: absolute;
    background-color: rgb(211, 249, 162);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none;
    resize: none
  }

  .styleBox {
    display: flex;
  }

  .fontStyle, .alignStyle {
    display: flex;
    justify-content: space-around;
    width: 50%;
  }

  .fontStyle > li, .alignStyle > li {
    cursor: pointer;
    padding: 1px 8px;
  }

  .fontStyle > li:hover, .alignStyle > li:hover {
    background-color: #5d5d5d3b;
    border-radius: 5px;
  }

  .active {
    background-color: #5d5d5d3b;
    border-radius: 5px;
  }

</style>
<style>

  /*模板样式*/
  #edit {
    background-color: #000;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #edit img {
    width: 100%;
    height: 100%;
  }

  .draggable img {
    width: 100%;
    height: 100%;
  }

  .vdr {
    position: absolute;
    box-sizing: border-box;
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

  .BG {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .BG img {
    height: 100%;
    width: 100%;
  }

  /*模板样式END*/
</style>
<template>
  <div id="programMack">
    <div id="material">
      <div class="title">素材</div>
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane v-for="(resourceTitle) in resourceTitles" :key="resourceTitle.id" :label="resourceTitle.id">
          <span slot="label">{{resourceTitle.label}}</span>
          <ul class="resourceList">
            <li v-for="(resource,id) in resources" :key="id" :id="resource.id" :name="resource.url"
                :type="resource.type"
                @mousedown="mouse($event)">
              <div class="imgBox">
                <img @dragstart="prohibited($event)" :src="'http://'+ resource.thumbnail">
              </div>
              <p>{{resource.name}}</p>
            </li>
          </ul>
          <div class="page">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="pageCount"
              layout="total, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="templateBox">
      <div class="title">模板信息</div>
      <div class="controlBox">
        <div class="name">
          <div style="width:350px;">
            <label>节目名称</label><input v-model="proName" style="width: 50%;margin-left: 10px;" type="text">
          </div>
        </div>
        <div class="control">
          <a @click="quickPreview"><i class="el-icon-view"></i> 快速预览</a>
          <a @click="save"><i class="iconfont icon-iconset0237"></i> 保存</a>
          <a @click="exit"><i class="iconfont icon-lingcunwei"></i> 返回</a>

          <a @click="release"><i class="iconfont icon-server-kuaisufabu"></i> 发布</a>
        </div>
      </div>
      <div v-html="template.body" class="template"></div>
    </div>
    <div id="setAttr">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="item in temItems" v-if="item.type.indexOf('txt') == -1" :label="item.name"
                     :name="item.name">
          <el-form v-if="item.type=='scroll'" v-model="form" label-width="100px">
            <el-form-item label="字幕内容" style="margin-bottom: 5px">
              <el-input v-model="form.scrollContent" type="textarea" placeholder="请输入文本内容..."
                        :autosize="{ minRows: 1, maxRows: 1}" style="width: 98%" resize="none">
              </el-input>
            </el-form-item>
            <el-row>
              <el-col :span="6">
                <el-form-item label="字体颜色" size="mini" style="margin-bottom: 5px;">
                  <el-color-picker v-model="form.scrollColor" size="mini"></el-color-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="字幕滚动" size="mini" style="margin-bottom: 5px;">
                  <el-select v-model="form.scrollDirection" placeholder="请选择滚动方向" style="width: 150px">
                    <el-option v-for="item in form.scrollDirections" :label="item.direction"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="字体大小" size="mini" style="margin-bottom: 5px;">
                  <el-select v-model="form.scrollFontSize" placeholder="请选择字体大小" style="width: 150px">
                    <el-option v-for="item in form.scrollFontSizes" :label="item.size" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="字体类型" size="mini" style="margin-bottom: 5px;">
                  <el-select v-model="form.scrollFontFamily" placeholder="请选择字体类型" style="width: 150px">
                    <el-option v-for="item in form.scrollFontFamilys" :label="item.font" :value="item.font"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="背景颜色" size="mini">
                  <el-color-picker v-model="form.scrollBGColor" size="mini"></el-color-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="滚动速度" size="mini">
                  <el-select v-model="form.scrollSpeed" placeholder="请选择滚动速度" style="width: 150px">
                    <el-option v-for="item in form.scrollSpeeds" :label="item.speed" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="背景透明度" size="mini">
                  <el-select v-model="form.scrollBGTransparency" placeholder="请选择透明度" style="width: 150px">
                    <el-option v-for="item in form.scrollBGTransparencys" :label="item.transparency"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="持续时间" size="mini">
                  <el-time-picker
                    v-model="form.scrollDuration"
                    placeholder="任意时间点">
                  </el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="display: flex;justify-content: flex-start" v-if="item.type=='image'"
               :style="{color:form.scrollColor,fontSize:form.scrollFontSize,fontFamily:form.scrollFontFamily}">
            <vue-marquee :BGOpacity="form.scrollBGTransparency" :BGColor="form.scrollBGColor"
                         :fontOpacity="form.scrollTransparency" content="我在没在滚动啊"></vue-marquee>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="move">
      <img src="">
      <i class="iconfont icon-iconforbidden" style="color:red;display: block;margin-top: 10px"></i>
      <p></p>
    </div>
    <el-dialog
      title="快速预览"
      :visible.sync="view"
      top="3vh"
      :before-close="viewClose"
    >
      <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;overflow: hidden">
        <div id="proPreview" :style="{width : proPreview.width * PP + 'px',height : proPreview.height * PP + 'px'}"
             style="background-color: black">
          <div v-for="item in proPreview.temItems" style=""
               :style="{width:item.width * PP+'px',height : item.height * PP + 'px',top : item.y * PP + 'px',left : item.x * PP + 'px'}">
            <!--静态文本-->
            <div v-if="item.type=='txt'" :name="item.type" :id="item.id" style="width: 100%;height: 100px"
                 :style="{textAlign:item.align}">
              <p style="position: relative"
                 :style="{fontSize:item.fontSize,fontFamily:item.font,color:item.fontColor,fontWeight: item.bold,fontStyle: item.italic,textDecoration: item.underline}">
                {{item.txtContent}}
              </p>
            </div>
            <!--动态文本-->
            <div style="display: flex;justify-content: flex-start;align-items: center" v-if="item.type=='scroll'"
                 :style="{color:form.scrollColor,fontSize:form.scrollFontSize + 'px',fontFamily:form.scrollFontFamily}">
              <vue-marquee :BGOpacity="form.scrollBGTransparency" :open="openScroll" :BGColor="form.scrollBGColor"
                           :fontOpacity="form.scrollTransparency" :speed="form.scrollSpeed"
                           :direction="form.scrollDirection" :content="form.scrollContent"></vue-marquee>
            </div>
            <div :name="item.type" :id="item.id">
              <!--视频-->
              <video preload="metadata" v-if="item.type ==='video'" id="myVideo" width="100%" height="100%" loop
                     autoplay>
                <source id="video" :src="item.url" type="video/mp4">
              </video>
              <!--图片-->
              <img v-if="item.type=='image'||item.type=='BG'" style="width: 100%;height: 100%;" :src="item.url">
            </div>

          </div>
        </div>
      </div>
    </el-dialog><!--预览-->
    <el-dialog
      title="文本编辑"
      :visible.sync="editTxt"
      :fullscreen="true"
    >
      <div
        style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;overflow: hidden;position: relative">
        <div
          style="width: 200px;height: 500px;left: 20px;top: 50px;background-color:#efefef;padding:10px;position: absolute;right:0;z-index: 9999">
          <div class="styleBox">
            <ul class="fontStyle">
              <li @click="setB" :class="{'active':SB === true}">
                <i class="iconfont icon-bold"></i></li>
              <li @click="setI" :class="{'active':SI === true}">
                <i class="iconfont icon-qingxie"></i></li>
              <li @click="setU" :class="{'active':SU === true}">
                <i class="iconfont icon-underline"></i></li>
            </ul>
            <ul class="alignStyle">
              <li :class="{'active':alignActive === 'left'}" @click="setAlign('left')">
                <i class="iconfont icon-icon--"></i></li>
              <li :class="{'active':alignActive === 'center'}" @click="setAlign('center')">
                <i class="iconfont icon--juzhongduiqi"></i></li>
              <li :class="{'active':alignActive === 'right'}" @click="setAlign('right')">
                <i class="iconfont icon-youduiqi"></i></li>
            </ul>
          </div>

          <el-form style="margin-top: 20px">
            <el-form-item label="字号" size="mini">
              <el-select v-model="fontSize" placeholder="请选择字体大小" style="width: 150px">
                <el-option v-for="item in fontSizes" :label="item.size" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字体" size="mini">
              <el-select v-model="font" placeholder="请选择字体大小" style="width: 150px">
                <el-option v-for="item in fonts" :label="item.font" :value="item.font"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="颜色">
              <el-color-picker v-model="fontColor"></el-color-picker>
            </el-form-item>
          </el-form>
          <el-button size="mini" @click="editTxt=false">取 消</el-button>
          <el-button size="mini" type="primary" @click="saveTxt">保 存</el-button>
        </div>
        <div id="editTxt" :style="{width : txtSize.width + 'px',height : txtSize.height + 'px'}"
             style="background-color: black">
          <div v-for="item in txtSize.temItems"
               :style="{width:item.width + 'px',height : item.height  + 'px',top : item.y + 'px',left : item.x + 'px'}">
            <div :name="item.type" :id="item.id" style="overflow: hidden;opacity: 0.7;">
              <textarea v-if="item.type == 'txt'" v-model="txtContent" placeholder="请输入文本内容..."
                        :style="{fontSize:fontSize+'px',fontFamily:font,color:fontColor,fontWeight: bold,fontStyle: italic,textDecoration: underline,textAlign:align}">
              </textarea>
              <img v-if="item.type=='BG'" style="width: 100%;height: 100%;" :src="item.backGround">
            </div>
          </div>
        </div>
      </div>
    </el-dialog><!--编辑文本-->
  </div>
</template>
<script>
  import $ from 'jquery'
  import html2canvas from 'html2canvas';
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import vueMarquee from "@/components/common/Marquee.vue"

  export default {
    components: {
      ElCol,
      ElRow,
      vueMarquee
    },
    mounted: function () {
      document.documentElement.addEventListener('mousemove', this.handleMove, true);          //给window绑定鼠标移动事件
      document.documentElement.addEventListener('mouseup', this.handleUp, true);

      this.queryList();
      this.getTree();
      this.resourceQuery();
      //字体大小列表
      for (let i = 12; i <= 100; i++) {
        let a = {};
        a['size'] = i + 'px';
        a['value'] = i;
        this.fontSizes.push(a);
        this.form.scrollFontSizes.push(a);
      }
      //end
      //透明度列表
      for (let i = 0; i < 101; i++) {
        let a = {
          transparency: i + '%',
          value: i / 100
        };
        this.form.scrollBGTransparencys.push(a)
      }
      //end
    },
    beforeDestroy: function () {
      document.documentElement.removeEventListener('mousemove', this.handleMove, true);
      document.documentElement.removeEventListener('mouseup', this.handleUp, true)
    },
    computed: {},
    data() {
      return {
        template: '',
        temItems: '',                //模板元素LIST
        resources: [],
        treeId: 1,
        pageCount: 12,          //每页显示数目
        pageNo: 1,              //当前页
        total: 0,               //总数目
        resourceTitles: '',     //资源标题
        /*移动参数*/
        isDown: false,
        x: 0,
        y: 0,
        l: 0,
        t: 0,
        nx: 0,
        ny: 0,
        nl: 0,
        nt: 0,
        /*节目*/
        proName: 'PLAYLIST' + new Date().getTime(),     //节目名称
        preview: '',                                    //预览图
        proItems: [],                                   //节目元素
        view: false,                                    //快速预览
        temId: '',
        /*还原资源*/
        res: [],          //还原时资源的容器
        proId: '',
        groupId: '',
        PP: '',
        proPreview: '',
        /*文本与动态文本*/
        openScroll: true,                                     //是否开起滚动字幕，默认false
        editTxt: false,
        txtSize: '',                                   //渲染编辑文本的容器
        txtId: '',
        txtArray: [],                                  //静态文本保存容器
        txtContent: '',
        font: 'Arial',                                //字体
        fonts: [
          {font: 'Arial'},
          {font: 'Book Antiqua'},
          {font: 'Bookman Old Style'},
          {font: 'Bradley Hand ITC'},
          {font: 'Calisto MT'},
          {font: 'Castellar'},
          {font: 'Curlz MT'},
          {font: 'Elephant'},
          {font: 'Forte'},
          {font: 'Garamond'},
          {font: 'Georgia'},
          {font: 'Gigi'},
          {font: 'Goudy Stout'},
          {font: 'Haettenschweiler'},
          {font: 'Impact'},
          {font: 'Monotype Corsiva'},
          {font: 'Papyrus'},
          {font: 'Pristina'},
          {font: 'Rage Italic'},
          {font: 'Rockwell'},
          {font: 'Script MT Bold'},
          {font: 'Sylfaen'},
          {font: 'Tahoma'},
          {font: '黑体'}
        ],                                 //字体列表
        fontSize: 12,                             //字体大小
        fontSizes: [],                                //字体大小列表
        fontColor: '#000000',                         //颜色
        align: 'left',                                    //对齐方式
        alignActive: 'left',                           //对齐选中样式
        bold: '',                                      //加粗
        italic: '',                                    //斜杠
        underline: '',                                 //下划线
        SB: false,
        SI: false,
        SU: false,
        form: {
          scrollContent: '',                             // 字幕内容
          scrollColor: '#000000',                               //字体颜色
          scrollTransparency: 1,                      //背景透明度
          scrollDirection: 1,                           //滚动方向
          scrollDirections: [
            {
              direction: '从右到左',
              value: 1
            },
            {
              direction: '从左到右',
              value: 0
            }
          ],                               //滚动方向列表
          scrollFontSize: 12,                                 //字体大小
          scrollFontSizes: [],                                //字体大小列表
          scrollFontFamily: 'Arial',                          //字体
          scrollFontFamilys: [
            {font: 'Arial'},
            {font: 'Book Antiqua'},
            {font: 'Bookman Old Style'},
            {font: 'Bradley Hand ITC'},
            {font: 'Calisto MT'},
            {font: 'Castellar'},
            {font: 'Curlz MT'},
            {font: 'Elephant'},
            {font: 'Forte'},
            {font: 'Garamond'},
            {font: 'Georgia'},
            {font: 'Gigi'},
            {font: 'Goudy Stout'},
            {font: 'Haettenschweiler'},
            {font: 'Impact'},
            {font: 'Monotype Corsiva'},
            {font: 'Papyrus'},
            {font: 'Pristina'},
            {font: 'Rage Italic'},
            {font: 'Rockwell'},
            {font: 'Script MT Bold'},
            {font: 'Sylfaen'},
            {font: 'Tahoma'},
            {font: '黑体'}
          ],                              //字体列表
          scrollBGColor: '#ffffff',                             //背景颜色
          scrollSpeed: 1,                               //滚动速度
          scrollSpeeds: [
            {
              speed: '慢',
              value: 0
            }, {
              speed: '普通',
              value: 1
            }, {
              speed: '快',
              value: 2
            }
          ],                                   //滚动速度列表
          scrollBGTransparency: 1,                      //背景透明度
          scrollBGTransparencys: [],                          //透明度列表
          scrollDuration: '10',                            //持续时间
        },
        activeName: '',                                     //当前激活的区域块标签

      }
    },
    methods: {
      prohibited(e) {
        // 阻止默认事件的触发
        e.preventDefault()
        return false
      },                              //禁止浏览器默认拖动事件
      mouse(e) {
        let src = e.currentTarget.children[0].children[0].currentSrc;               //取当前拖动素材的缩略图
        let url = 'http://' + e.currentTarget.getAttribute('name');                 //取当前拖动素材的文件地址
        let type = e.currentTarget.getAttribute('type');
        $('.move>img').attr({'src': src, 'id': e.currentTarget.id, 'name': url, 'type': type});   //给弹出框赋缩略图及文件地址
        //获取x坐标和y坐标
        this.x = e.clientX;
        this.y = e.clientY;
        //开关打开
        this.isDown = true;
        this.l = this.x + 20;
        this.t = this.y + 20;
        $('.move').css({'display': 'block', 'left': this.l + 'px', 'top': this.t + 'px'})
      },                                   //选择拖动文件
      handleMove(e) {
        //样式更改
        let icon = $(".move>i");
        $(".vdr").css('border', 'none');
        icon.removeClass('icon-yunxu');
        icon.addClass('icon-iconforbidden');
        icon.css("color", "red");
        //END
        if (this.isDown) {
          //获取x和y
          this.nx = e.clientX;
          this.ny = e.clientY;

          //获取左部和顶部的偏移量

          //计算移动后的左偏移量和顶部的偏移量
          this.nl = this.nx - (this.x - this.l);
          this.nt = this.ny - (this.y - this.t);

          $('.move').css('left', this.nl + 'px');
          $('.move').css('top', this.nt + 'px');
        }
      },                              //window中移动事件
      handleUp() {
        $('.move').css({'display': 'none', 'left': '0px', 'top': '0px'})
      },                                 //window中松开事件

      resourceQuery() {
        let _this = this;
        this.resources = [];
        this.$http({
          method: 'get',
          url: 'resource/query?groupId=' + _this.treeId + "&pageCount=" + _this.pageCount + "&pageNo=" + _this.pageNo,
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
      },                            //查询资源列表
      handleCurrentChange(val) {
        this.pageNo = val
        this.resourceQuery()
      },                   //当前页翻页

      getTree() {
        let _this = this
        this.$http({
          method: 'get',
          url: 'tree/query?id=0',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.resourceTitles = response.data.cust.trees[0].children.map(item => {
              return {
                id: item.id,
                label: item.label
              }
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
      },                                  //获取树资源
      handleClick(tab, event) {
        this.treeId = tab.label;
        this.resourceQuery()
      },                    //标签页切换

      queryList() {
        let _this = this;
        let type = _this.$route.query.type;
        let url = type != 0 && type != undefined ? 'program/query' : 'template/query';   //根据类型判断是新增还是编辑，0为新建1为编辑
        this.$http({
          method: 'get',
          url: url + '?groupId=' + _this.$route.query.groupId + '&name=' + _this.$route.query.name + '&pageNo=1&pageCount=1',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            if (type == 0 || type == undefined) {
              let template = response.data.cust.templates[0];
              _this.template = template;
              _this.temItems = template.temItems;
              _this.temId = template.id
            } else {
              let program = response.data.cust.programs[0];
              _this.template = program;
              _this.temId = program.modelId;
              _this.proName = program.name;
              _this.proId = program.id;
              _this.groupId = program.groupId;
              program.proItems.forEach(item => {
                _this.res.push({name: item.resId, itemsId: item.itemsId, url: item.url, thumbnail: item.thumbnail})
              });
              _this.getTemplate()
            }
            //数据渲染后为还原数据绑定事件
            _this.$nextTick(function () {
              //为模板添加移动事件
              let img = $('.move>img');
              $('div').remove('.handle');
              $('div').remove('.action');
              $('.vdr').on('mousemove', function () {
                $(this).css('border', '1px solid red');
                if (img.attr('type') == $(this).children().attr('class')) {
                  $(".move>i").removeClass('icon-iconforbidden');
                  $(".move>i").addClass('icon-yunxu');
                  $(".move>i").css("color", "#33cc1e")
                }           //判断当前移动文件类型与模板元素的类型是否一致
              });       //移动到目标位置的样式更改
              $('.vdr').on('mouseup', function (event) {
                if (img.attr('type') == $(this).children().attr('class')) {               //判断当前移动文件类型与模板元素的类型是否一致
                  let src = img.attr('src');
                  let name = img.attr('name');
                  let id = img.attr('id');
                  $(this).children('.' + img.attr('type')).children('img').remove();
                  $(this).children('.' + img.attr('type')).html("<img name='" + name + "' id='" + id + "' src='" + src + "'>")
                }
                this.isDown = false;
                $('.move').css({'display': 'none', 'left': '0px', 'top': '0px'})
              });
              //还原节目资源
              if (this.$route.query.type == 1) {
                if (document.getElementById('edit') != null && document.getElementById('edit').children != null) {
                  let edit = document.getElementById('edit').children;
                  for (let item of this.res) {
                    for (let i = 0; i < edit.length; i++) {
                      if (item.itemsId == edit[i].getAttribute('name')) {
                        if (item.thumbnail == null) return false;
                        edit[i].children[0].innerHTML = "<img name='" + item.url + "' id='" + item.name + "' src='" + item.thumbnail + "'>"
                      }
                    }
                  }
                }
              }
              //为文本与动态文本绑定编辑事件
              $('.txt').on('click', function () {

                _this.$http({
                  method: 'get',
                  url: 'template/query?id=' + _this.temId + '&pageNo=1&pageCount=1',
                  withCredentials: true,
                  headers: {
                    token: sessionStorage.getItem('token'),
                    name: sessionStorage.getItem('name')
                  }
                }).then(response => {
                  if (response.data.code == '0000') {
                    let template = response.data.cust.templates[0];
                    _this.txtSize = template;                       //快速预览
                    for (let item of template.temItems) {
                      if (item.type === 'txt') _this.txtId = item.id
                    }
                    _this.editTxt = true
                  } else {
                    this.$message({
                      message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                      showClose: true,
                      center: true,
                      type: 'error'
                    });
                  }
                });

              });
              $('.vdr').on('click', function () {
                _this.activeName = $(this).attr('area-name')
              })
            })
          } else {
            _this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                                //获取模板列表
      save(type) {
        let _this = this;
        let table = $('#edit');
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
          /*allowTaint:true,*/
          useCORS: true,
          onrendered(image) {
            let uri = image.toDataURL();
            _this.preview = uri;

            let queryUrl = '', method = '';
            //获取区域块的属性值
            table.children().map(function () {
              let itemsId = $(this).attr('name');                            //元素ID
              let thumbnail = $(this).children().children().attr('src');    //资源缩略图
              let url = $(this).children().children().attr('name');         //资源地址
              let resId = $(this).children().children().attr('id');         //资源ID
              let type = $(this).children().attr('class');                    //类型
              let scrollBGTransparency = '';
              let scrollColor = '';
              let scrollDirection = '';
              let scrollDuration = '';
              let scrollFontFamily = '';
              let scrollFontSize = '';
              let scrollFontTransparency = '';
              let scrollSpeed = '';
              let scrollBGColor = '';
              let font = '';
              let fontSize = '';
              let fontColor = '';
              let align = '';
              let bold = '';
              let italic = '';
              let underline = '';
              if (type === 'scroll') {
                scrollBGTransparency = _this.form.scrollBGTransparency;
                scrollColor = _this.form.scrollColor;
                scrollDirection = _this.form.scrollDirection;
                scrollDuration = _this.form.scrollDuration;
                scrollFontFamily = _this.form.scrollFontFamily;
                scrollFontSize = _this.form.scrollFontSize;
                scrollFontTransparency = _this.form.scrollFontTransparency;
                scrollSpeed = _this.form.scrollSpeed;
                scrollBGColor = _this.form.scrollBGColor;
                url = _this.form.scrollContent
              }
              if (type === 'txt') {
                for (let item of _this.txtArray) {
                  if (itemsId == item.id) {
                    url = item.url;
                    font = item.font;
                    fontSize = item.fontSize;
                    fontColor = item.fontColor;
                    align = item.align;
                    bold = item.bold;
                    italic = item.italic;
                    underline = item.underline
                  }
                }
              }
              _this.proItems.push({
                itemsId,
                resId,
                thumbnail,
                url,
                scrollBGTransparency,
                scrollColor,
                scrollDirection,
                scrollDuration,
                scrollFontFamily,
                scrollFontSize,
                scrollFontTransparency,
                scrollSpeed,
                scrollBGColor,
                font,
                fontSize,
                fontColor,
                align,
                bold,
                italic,
                underline
              });
            });
            let data = {};
            if (_this.$route.query.type == 0 || _this.$route.query.type == undefined) {
              queryUrl = 'program/create';
              method = 'post';
              data = {
                groupId: 31,             //节目组ID(节目列表树ID)
                modelId: _this.temId,             //模板ID
                name: _this.proName,                //节目名称
                preview: _this.preview,             //预览图
                proItems: _this.proItems            //节目元素
              };
            } else {
              queryUrl = 'program/update';
              method = 'put';
              data = {
                groupId: _this.groupId,             //节目组ID(节目列表树ID)
                id: _this.proId,
                modelId: _this.temId,             //模板ID
                name: _this.proName,                //节目名称
                preview: _this.preview,             //预览图
                proItems: _this.proItems          //节目元素
              };
            } //根据类型判断是新增还是编辑，0为新建1为编辑
            _this.$http({
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
                _this.$message({message: '保存成功！', showClose: true, center: true, type: 'success'});
                if (type == 'release') {
                  _this.$router.push({path: '/release', query: {name: _this.proName}})
                }
              } else {
                _this.$message({
                  message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                  showClose: true,
                  center: true,
                  type: 'error'
                });
              }
            })
            /*创建一个a标签，添加点击事件直接下载*/
            /*let a = document.createElement('a');
            a.href = url;
            a.download = '未命名';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);*/
            // document.body.removeChild(canvas);
          }
        });

      },                                 //保存
      release() {
        this.save('release');
      },                                  //发布
      exit() {
        this.$router.go(-1);
      },                                     //返回
      getTemplate() {
        let _this = this;
        _this.$http({
          method: 'get',
          url: 'template/query?id=' + this.temId + '&pageNo=1&pageCount=1',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.temItems = response.data.cust.templates[0].temItems
          }
        })
      },                               //获取模板
      quickPreview() {
        let _this = this;
        _this.$http({
          method: 'get',
          url: 'template/query?id=' + this.temId + '&pageNo=1&pageCount=1',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let template = response.data.cust.templates[0];
            _this.proPreview = template;                       //快速预览

            let items = _this.proPreview.temItems;
            let table = $('#edit');
            /*根据模板高度设置缩放比例*/
            if (_this.proPreview.height == '1080') _this.PP = 0.4;
            if (_this.proPreview.height == '720') _this.PP = 0.7;
            if (_this.proPreview.height == '1280') _this.PP = 0.6;
            if (_this.proPreview.height == '1920') _this.PP = 0.4;
            /*取节目资源地址*/

            for (let item of items) {
              table.children().map(function () {
                let itemsId = $(this).attr('name');                                //元素ID
                let type = $(this).children().attr('class');
                let url = $(this).children().children().attr('name');         //资源地址
                if (item.id === itemsId) {
                  item['url'] = url;
                  if (type === 'scroll') {
                    item['scrollContent'] = _this.form.scrollContent;
                    item['scrollColor'] = _this.form.scrollColor;
                    item['scrollDirection'] = _this.form.scrollDirection === 0 ? 'right' : 'left';
                    item['scrollFontSize'] = _this.form.scrollFontSize;
                    item['scrollFontFamily'] = _this.form.scrollFontFamily;
                    item['scrollBGColor'] = _this.form.scrollBGColor;
                    item['scrollSpeed'] = _this.form.scrollSpeed + '1s';
                    item['scrollBGTransparency'] = _this.form.scrollBGTransparency;
                    item['scrollDuration'] = _this.form.scrollDuration;
                    item['justify'] = _this.form.scrollDirection === 'left-right' ? 'flex-end' : 'flex-start'
                  }
                  if (type === 'txt') {
                    item['txtContent'] = _this.txtContent;
                    item['font'] = _this.font;
                    item['fontSize'] = _this.fontSize;
                    item['fontColor'] = _this.fontColor;
                    item['align'] = _this.align;
                    item['bold'] = _this.bold;
                    item['italic'] = _this.italic;
                    item['underline'] = _this.underline;
                  }
                }
              });
            }
            _this.view = true;
            _this.openScroll = true;
            let myVideo = document.getElementById('myVideo');
            if (myVideo != undefined) {
              myVideo.load();
              myVideo.play();
            }
          } else {
            _this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        });

      },                             //快速预览
      viewClose(done) {
        let myVideo = document.getElementById('myVideo');
        if (myVideo != undefined) {
          myVideo.currentTime = 0;                            //将视频当前时间初始化
          myVideo.pause();
        }
        this.openScroll = false;
        done()
      },                                //快速预览窗口关闭

      setAlign(val) {
        if (val == 'left') this.alignActive = this.align = val;
        if (val == 'center') this.alignActive = this.align = val;
        if (val == 'right') this.alignActive = this.align = val;
      },                               //设置文本对其方式
      setB() {
        this.SB = !this.SB;
        this.bold = this.SB ? 'bold' : 'normal';
      },                                      //设置文本加粗
      setI() {
        this.SI = !this.SI;
        this.italic = this.SI ? 'italic' : 'normal';
      },                                      //设置文本倾斜
      setU() {
        this.SU = !this.SU;
        this.underline = this.SU ? 'underline' : 'none'
      },                                      //设置文本下划线
      saveTxt() {
        let object = {
          id: this.txtId,
          url: this.txtContent,
          font: this.font,
          fontSize: this.fontSize,
          fontColor: this.fontColor,
          align: this.align,
          bold: this.bold,
          italic: this.italic,
          underline: this.underline
        };
        /*判断是否编辑的同一文本，如果是，删除之前的再进行添加*/
        if (this.txtArray.length != 0) {
          for (let i = 0; i <= this.txtArray.length; i++) {
            if (this.txtArray[i].id == this.txtId) {
              this.txtArray.splice(i, 1)
            }
          }
        }
        this.txtArray.push(object);
        this.editTxt = false
      },                                     //保存文本
    }
  }
</script>
