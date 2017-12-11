<template>
  <div id="programMack">
    <div id="material">
      <div class="title">素材</div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="iconfont icon-tupian"></i> 图片</span>
          <ul class="imgList">
            <li>
              <img src="../../assets/imgs/login/img.jpg"
                   draggable="true" @dragstart="drag($event)">
              <p>图片一</p>
            </li>
            <li>
              <img src="../../assets/imgs/login/img.jpg"
                   draggable="true" @dragstart="drag($event)">
              <p>图片二</p>
            </li>
          </ul>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="iconfont icon-shipin"></i> 视频</span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="iconfont icon-txt"></i> 文本</span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="iconfont icon-wenben"></i> 动态文本</span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="iconfont icon-yinle"></i> 音乐</span>
        </el-tab-pane>
      </el-tabs>
      <!--<div id="div1" @drop="drop($event)" @dragover="allowDrop($event)"></div>
      <div id="div2" @drop="drop($event)" @dragover="allowDrop($event)">
        <img id="drag1" src="../../assets/imgs/login/img.jpg"
             draggable="true" @dragstart="drag($event)" width="200" height="69">
      </div>-->
    </div>
    <div id="templateBox">
      <div class="title">模板信息</div>
      <div class="controlBox">
        <div class="name">
          <div style="width:200px;">
            <label>节目名称</label><input style="width: 50%;margin-left: 10px;" type="text">
          </div>
        </div>
        <div class="control">
          <a><i class="el-icon-view"></i> 快速预览</a>
          <a><i class="iconfont icon-iconset0237"></i> 保存</a>
          <a><i class="iconfont icon-lingcunwei"></i> 另存为</a>
          <a><i class="iconfont icon-server-kuaisufabu"></i> 发布</a>
        </div>
      </div>
      <div v-html="template" class="template"></div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'

  let dom = null;
  export default {
    mounted: function () {
      this.$nextTick().then(function () {
        $('div').remove('.handle ');
        $('.draggable').on('drop', function (event) {
          event.preventDefault();
          event.target.appendChild(dom)
        });
        $('.draggable').on('dragover', function (event) {
          event.preventDefault();
        })
      })
    },
    data() {
      return {
        template: localStorage.getItem('template')
      }
    },
    components: {},
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
  }
</script>

<style scoped>
  #programMack {
    display: flex;
    justify-content: space-between;
    background-color: #d2d2d2;
    padding: 0 10px;
    height: 100%;
  }

  #material {
    width: 49%;
    height: 98%;
    background-color: white;
  }

  #templateBox {
    width: 49%;
    height: 98%;
    background-color: white;
  }

  /*拖动测试*/
  #div1, #div2 {
    width: 198px;
    height: 66px;
    padding: 10px;
    border: 1px solid #aaaaaa;
  }

  /*END*/
  /*模板样式*/
  #edit {
    width: 600px;
    height: 800px;
    background-color: #000;
    position: relative;
  }

  #drag1 {
    width: 100%;
    height: 100%
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

  /*素材图片*/
  .imgList {
    height: 787px;
    display: flex;
  }

  .imgList li {
    width: 150px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 5px;
    border: 1px solid #e1e1e1;
  }

  .imgList li > img {
    width: 100px;
  }

  .imgList li > p {
    width: 100%;
    text-align: center;
  }

  #edit img {
    width: 100%;
    height: 100%;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>
