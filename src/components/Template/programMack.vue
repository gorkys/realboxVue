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
    height: 787px;
  }

  .resourceList li {
    width: 150px;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 9px 10px;
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

</style>
<style>
  /*模板样式*/
  #edit {
    width: 600px;
    height: 800px;
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

  /*模板样式END*/
</style>
<template>
  <div id="programMack">
    <div id="material">
      <div class="title">素材</div>
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane v-for="(resourceTitle) in resourceTitles" :key="resourceTitle.id" :label="resourceTitle.id">
          <span slot="label"></i>{{resourceTitle.label}}</span>
          <ul class="resourceList">
            <li v-for="(resource,id) in resources" :key="id" :id="resource.id"
                @mousedown="mouse($event)">
              <div class="imgBox">
                <img @dragstart="prohibited($event)" :src="'http://'+ resource.url">
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
          <a @click="view = true"><i class="el-icon-view"></i> 快速预览</a>
          <a @click="save"><i class="iconfont icon-iconset0237"></i> 保存</a>
          <a><i class="iconfont icon-lingcunwei"></i> 另存为</a>
          <a><i class="iconfont icon-server-kuaisufabu"></i> 发布</a>
        </div>
      </div>
      <div v-html="template" class="template"></div>
    </div>
    <div class="move">
      <img src="">
      <i class="iconfont icon-iconforbidden" style="color:red;display: block;margin-top: 10px"></i>
      <p></p>
    </div>
    <el-dialog
      title="快速预览"
      :visible.sync="view"
      width="30%"
    >
      <div style="width: 100%;height: 100%;text-align: center;overflow: hidden">

      </div>
    </el-dialog><!--预览-->
  </div>
</template>
<script>
  import $ from 'jquery'
  import html2canvas from 'html2canvas';

  export default {
    mounted: function () {
      document.documentElement.addEventListener('mousemove', this.handleMove, true)          //给window绑定鼠标移动事件
      document.documentElement.addEventListener('mouseup', this.handleUp, true)

      this.queryList()
      this.getTree()
      this.resourceQuery()
    },
    updated: function () {
      this.$nextTick(function () {
        //为模板添加移动事件
        $('div').remove('.handle');
        $('div').remove('.action');
        $('.vdr').on('mousemove', function (event) {
          $(this).css('border', '1px solid red');
          if ($(this).children().hasClass('image')) {
            $(".move>i").removeClass('icon-iconforbidden')
            $(".move>i").addClass('icon-yunxu')
            $(".move>i").css("color", "#33cc1e")
          }
        });       //移动到目标位置的样式更改
        $('.vdr').on('mouseup', function (event) {
          if ($(this).children().hasClass('image')) {
            let src = $('.move>img').attr('src');
            let id = $('.move>img').attr('id');
            $(this).children('.image').children('img').remove()
            $(this).children('.image').html("<img id='" + id + "' src='" + src + "'>")
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
                if (item.name == edit[i].getAttribute('name')) {
                  edit[i].children[0].innerHTML = "<img id='" + item.name + "' src='" + item.url + "'>"
                }
              }
            }
          }
        }

      })
    },
    beforeDestroy: function () {
      document.documentElement.removeEventListener('mousemove', this.handleMove, true)
      document.documentElement.removeEventListener('mouseup', this.handleUp, true)
    },
    computed: {},
    data() {
      return {
        template: '',
        resources: [],
        treeId: 1,
        pageCount: 20,     //每页显示数目
        pageNo: 1,          //当前页
        total: 0,            //总数目
        resourceTitles: '',   //资源标题
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
        proName: 'PLAYLIST' + new Date().getTime(),            //节目名称
        preview: '',                                  //预览图
        proElements: [],                              //节目元素
        view: false,                                    //快速预览
        temId: '',
        /*还原资源*/
        res: [],          //还原时资源的容器
        proId: '',
        groupId: ''
      }
    },
    components: {},
    methods: {
      prohibited(e) {
        // 阻止默认事件的触发
        e.preventDefault()
        return false
      },              //禁止浏览器默认拖动事件
      mouse(e) {
        let src = e.currentTarget.children[0].children[0].currentSrc;         //取当前拖动的图片地址
        $('.move>img').attr({'src': src, 'id': e.currentTarget.id});                                       //给弹出框赋图片地址
        //获取x坐标和y坐标
        this.x = e.clientX;
        this.y = e.clientY;
        //开关打开
        this.isDown = true;
        this.l = this.x + 20;
        this.t = this.y + 20;
        $('.move').css({'display': 'block', 'left': this.l + 'px', 'top': this.t + 'px'})
      },                  //选择拖动文件
      handleMove(e) {
        //样式更改
        let icon = $(".move>i")
        $(".vdr").css('border', 'none');
        icon.removeClass('icon-yunxu')
        icon.addClass('icon-iconforbidden')
        icon.css("color", "red")
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
      },             //window中移动事件
      handleUp() {
        $('.move').css({'display': 'none', 'left': '0px', 'top': '0px'})
      },                //window中松开事件

      resourceQuery() {
        let _this = this;
        this.resources = [];
        this.$http({
          method: 'get',
          url: 'resource/query?groupId=' + _this.treeId + "&pageCount=" + this.pageCount + "&pageNo=" + this.pageNo,
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
              center: true,
              type: 'error'
            });
          }
        })
      },                //查询资源列表
      handleCurrentChange(val) {
        this.pageNo = val
        this.resourceQuery()
      },            //当前页翻页

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
              center: true,
              type: 'error'
            });
          }
        })
      },            //获取树资源
      handleClick(tab, event) {
        this.treeId = tab.label
        this.resourceQuery()
      },                    //标签页切换

      queryList() {
        let _this = this;
        let url = '';
        let type = _this.$route.query.type;
        type == 0 ? url = 'template/query' : url = 'program/query';   //根据类型判断是新增还是编辑，0为新建1为编辑
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
            if (type == 0) {
              let template = response.data.cust.templates[0];
              _this.template = template.body
              _this.temId = template.id
            } else {
              let program = response.data.cust.programs[0];
              _this.template = program.body;
              _this.temId = program.modelId;
              _this.proName = program.name;
              _this.proId = program.id;
              _this.groupId = program.groupId;
              program.proElements.forEach(item => {
                _this.res.push({name: item.id, url: item.url})
              })
            }
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },              //获取模板列表
      save() {
        let _this = this
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
          /*useCORS: true,*/
          onrendered(image) {
            var url = image.toDataURL();
            _this.preview = url;

            let queryUrl = '', method = ''
            //获取区域块的属性值
            table.children().map(function () {
              let id = $(this).attr('name');
              let url = $(this).children().children().attr('src');
              let resId = $(this).children().children().attr('id');
              _this.proElements.push({id, url, resId});
            });
            let data = {};
            if (_this.$route.query.type == 0) {
              queryUrl = 'program/create';
              method = 'post';
              data = {
                groupId: 31,             //节目组ID(节目列表树ID)
                modelId: _this.temId,             //模板ID
                name: _this.proName,                //节目名称
                preview: _this.preview,             //预览图
                proElements: _this.proElements          //节目元素
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
                proElements: _this.proElements          //节目元素
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
                _this.$message({message: '保存成功！', center: true, type: 'success'});
              } else {
                _this.$message({
                  message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
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

      },

    }
  }
</script>
