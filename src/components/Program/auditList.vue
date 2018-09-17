<style scoped>
  #auditList {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }

  .content {
    height: 778px;
    border-radius: 10px;
    margin: 20px 20px 0px;
    background-color: white;
    box-shadow: 0px 7px 4.8px 3.2px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .title {
    height: 40px;
    background-color: #d33a31;
    line-height: 40px;
    padding-left: 10px;
    font-size: 1.4rem;
    color: white;
    letter-spacing: 3px;
    width: 100%;
  }

  .controlBox {
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 4px solid #e0e0e0;
  }

  .search {
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .search > div {
    margin-right: 10px;
  }

  .control {
    font-size: 1.4rem;
  }

  .control a {
    padding: 10px;
  }

  .control a i {
    margin-right: 5px;
  }

  .control a:hover {
    color: #d33a31;
  }

  .auditList {
    height: 620px;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }

  /*快速预览*/
  #proPreview {
    position: relative;
  }

  #proPreview > div {
    position: absolute;

  }

  #proPreview > div > div {
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <div id="auditList">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="title">{{$t('Content.ID_AUDIT_LIST')}}</div>
      <div class="controlBox">
        <div class="search">
          <div>
            <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="searchName">
              <template slot="prepend">{{$t('Content.ID_PROGRAM_NAME')}}</template>
            </el-input>
          </div>
          <div>
            <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="searchProStatus">
              <template slot="prepend">{{$t('Content.ID_PROGRAM_STATUS')}}</template>
            </el-input>
          </div>
          <el-button @click="queryPublishList">{{$t('Content.ID_RESEARCH')}}</el-button>
        </div>
      </div>
      <div class="auditList">
        <el-table
          :data="publish"
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="proType" align="center" :label="$t('Content.ID_PROGRAM_TYPE')"></el-table-column>
          <el-table-column prop="id" align="center" :label="$t('Content.ID_PUBLISH_CODE')"></el-table-column>
          <el-table-column prop="proName" align="center" :label="$t('Content.ID_PROGRAM_NAME')"></el-table-column>
          <el-table-column prop="disType" align="center" :label="$t('Content.ID_PUBLISH_TYPE')"></el-table-column>
          <el-table-column prop="playMode" align="center" :label="$t('Content.ID_PLAY_TYPE')"></el-table-column>
          <el-table-column prop="publisher" align="center" :label="$t('Content.ID_PUBLISHER')"></el-table-column>
          <el-table-column prop="date" align="center" :label="$t('Content.ID_PUBLISH_TIME')"></el-table-column>
          <el-table-column prop="invalidTime" align="center" :label="$t('Content.ID_USELESS_TIME')"></el-table-column>
          <el-table-column prop="status" align="center" :label="$t('Content.ID_PUBLISH_STATUS')"></el-table-column>
          <el-table-column prop="proPreview" align="center" :label="$t('Content.ID_PROGRAM_PREVIEW')">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="proPreview(scope.$index, scope.row)">{{$t('Content.ID_PROGRAM_PREVIEW')}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="address" align="center" :label="$t('Content.ID_AUDIT')">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="auditPass('pass', scope.row)">{{$t('Content.ID_PASS')}}
              </el-button>
              <el-button
                size="mini"
                @click="auditPass('refuse', scope.row)">{{$t('Content.ID_FAIL')}}
              </el-button>
            </template>
          </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @current-change="pageChange"
          :page-size="pageCount"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <footer-bar></footer-bar>
    <el-dialog
      :title="$t('Content.ID_PREVIEW')"
      :visible.sync="view"
      top="3vh"
      :before-close="viewClose"
    >
      <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;overflow: hidden">
        <div id="proPreview" :style="{width : template.width * PP + 'px',height : template.height * PP + 'px'}">
          <div v-for="item in items" style=""
               :style="{width:item.width * PP+'px',height : item.height * PP + 'px',top : item.y * PP + 'px',left : item.x * PP + 'px',zIndex : item.zIndex}">
            <!--背景-->
            <div style="z-index: 1;position: absolute" v-if="item.type=='BG'" :name="item.type" :id="item.id">
              <img style="width: 100%;height: 100%" :src="item.url">
            </div>
            <!--静态文本-->
            <div v-if="item.type=='txt'" :name="item.type" :id="item.id"
                 style="z-index: 10;position: absolute;width: 100%;height: 100px"
                 :style="{textAlign:item.align}">
              <p style="position: relative"
                 :style="{fontSize:item.fontSize,fontFamily:item.font,color:item.fontColor,fontWeight: item.bold,fontStyle: item.italic,textDecoration: item.underline}">
                {{item.url}}
              </p>
            </div>
            <!--动态文本-->
            <div style="z-index: 10;position: absolute;display: flex;justify-content: flex-start;align-items: center"
                 v-if="item.type=='scroll'"
                 :style="{color:item.scrollColor,fontSize:item.scrollFontSize + 'px',fontFamily:item.scrollFontFamily}">
              <vue-marquee :BGOpacity="item.scrollBGTransparency" :open="openScroll" :BGColor="item.scrollBGColor"
                           :fontOpacity="item.scrollTransparency" :speed="item.scrollSpeed"
                           :Duration="item.scrollDuration"
                           :direction="item.scrollDirection" :content="item.url"></vue-marquee>
            </div>
            <!--视频图片-->
            <div style="z-index: 10;position: absolute" :name="item.type" :id="item.id">
              <!--视频-->
              <video preload="metadata" v-if="item.type ==='video'" id="myVideo" width="100%" height="100%" loop
                     autoplay>
                <source id="video" :src="item.url" type="video/mp4">
              </video>
              <!--图片-->
              <img v-if="item.type=='image'" style="width: 100%;height: 100%;" :src="item.url">
            </div>

          </div>
        </div>
      </div>
    </el-dialog><!--预览-->
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'
  import vueMarquee from "@/components/common/Marquee.vue"
  import {publishAudit} from "@/api/auditList";
  import {getRelease} from "@/api/release";
  import {getProgram} from "@/api/program";
  import {getTemplate} from "@/api/template";

  export default {
    mounted() {
      this.queryPublishList()
    },
    data() {
      return {
        date: '',
        publish: [],       //发布列表数据
        pageCount: 11,     //每页显示数目
        pageNo: 1,          //当前页
        total: 0,            //总数目
        searchName: '',
        searchProStatus: '',
        /*节目预览*/
        view: false,             //预览弹出框
        template: '',             //模板
        program: '',               //节目
        PP: '',                    //比例
        items: [],                  //预览渲染参数
        openScroll: false           //打开滚动
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb,
      vueMarquee
    },
    methods: {
      queryPublishList() {
        let _this = this;
        this.publish = [];
        let params = {
          pageCount: this.pageCount,
          pageNo: this.pageNo,
          status: '未审核',
          proName: this.searchName,
          proStatus: this.searchProStatus
        };
        getRelease(params).then(response => {
          let publish = response.cust.publish;
          _this.total = response.cust.pages.count;
          for (let item of publish) {
            _this.publish.push(item)
          }
        })
      },                //获取节目列表
      pageChange(val) {
        this.pageNo = val;
        this.queryPublishList()
      },                    //分页
      auditPass(type, data) {
        let message;
        if (type === 'pass') {
          message = this.$t('Msg.ID_MSG_30')
        } else {
          message = this.$t('Msg.ID_MSG_31')
        }
        this.$confirm(message, this.$t('Content.ID_PROMPT'), {
          confirmButtonText: this.$t('Content.ID_OK'),
          cancelButtonText: this.$t('Content.ID_CANCEL'),
          type: 'warning'
        }).then(() => {
          let params = {
            id: data.id,
            type: type
          };
          publishAudit(params).then(response => {
            if (type === 'pass') {
              this.$message({
                message: this.$t('Msg.ID_MSG_32'),
                showClose: true,
                center: true,
                type: 'success'
              });
            } else {
              this.$message({
                message: this.$t('Msg.ID_MSG_33'),
                showClose: true,
                center: true,
                type: 'success'
              });
            }
            this.queryPublishList()
          })
        })


      },                           //审核通过

      viewClose(done) {
        let myVideo = document.getElementById('myVideo');
        if (myVideo !== undefined && myVideo !== null) {
          myVideo.currentTime = 0;                            //将视频当前时间初始化
          myVideo.pause();
        }
        this.openScroll = false;
        done()
      },                                //快速预览窗口关闭
      proPreview(index, data) {
        let _this = this;
        _this.template = '';
        _this.program = '';
        _this.items = [];
        let params = {
          id: data.proId,
          pageNo: 1,
          pageCount: 1
        };
        getProgram(params).then(response => {
          _this.program = response.cust.programs[0];

          _this.$nextTick(function () {
              let params = {
                id: _this.program.modelId,
                pageNo: 1,
                pageCount: 1
              };
              getTemplate(params).then(response => {
                _this.template = response.cust.templates[0];
                /*根据模板高度设置缩放比例*/
                if (_this.template.height == '1080') _this.PP = 0.4;
                if (_this.template.height == '720') _this.PP = 0.7;
                if (_this.template.height == '1280') _this.PP = 0.6;
                if (_this.template.height == '1920' || _this.template.height == '1740') _this.PP = 0.4;
                if (_this.template.height == '200') _this.PP = 0.5;
                for (let i of _this.program.proItems) {
                  for (let y of _this.template.temItems) {
                    if (i.itemsId === y.id) {
                      _this.items.push({
                        id: y.id,
                        type: y.type,
                        height: y.height,
                        width: y.width,
                        x: y.x,
                        y: y.y,
                        url: i.url,
                        scrollContent: i.scrollContent,
                        scrollColor: i.scrollColor,
                        scrollDirection: i.scrollDirection,
                        scrollFontSize: i.scrollFontSize,
                        scrollFontFamily: i.scrollFontFamily,
                        scrollBGColor: i.scrollBGColor,
                        scrollSpeed: i.scrollSpeed,
                        scrollBGTransparency: i.scrollBGTransparency,
                        scrollDuration: i.scrollDuration,
                        justify: i.justify,
                        txtContent: i.txtContent,
                        font: i.font,
                        fontSize: i.fontSize,
                        fontColor: i.fontColor,
                        align: i.align,
                        bold: i.bold,
                        italic: i.italic,
                        underline: i.underline
                      })
                    }
                  }
                }
              });
            }
          )
        });
        this.openScroll = true;
        this.view = true;
      }            //节目预览
    }
  }
</script>


