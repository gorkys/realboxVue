<style scoped>
  #resource {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }

  #resourceTree {
    border: 1px solid #c1c1c1;
    height: 98%;
    width: 12%;
    border-radius: 10px;
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
  }

  .controlTree {
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 10px;
    border-bottom: 1px solid #dedede;
  }

  .controlTree > a {
    margin-left: 15px;
  }

  .controlTree > a > i {
    margin-right: 3px;
  }

  .controlTree > a:hover {
    color: #d33a31;
  }

  #resourceList {
    border: 1px solid #c1c1c1;
    height: 98%;
    border-radius: 10px;
    overflow: hidden;
    width: 87%;
  }

  .controlBox {
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
  }

  .control a {
    margin-left: 10px;
    font-size: 1.4rem;
    border-right: 1px solid #cfcfcf;
    padding-right: 10px;
  }

  .control > a > i {
    margin-right: 5px;
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
  <div id="resource">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <Content>
      <div id="resourceTree">
        <div class="title">资源管理</div>
        <div class="controlTree">
          <a><i class="el-icon-plus"></i>新建</a>
          <a><i class="el-icon-refresh"></i>刷新</a>
        </div>
        <el-tree :data="resourceTree" default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
      </div>
      <div id="resourceList">
        <div class="title">资源列表</div>
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
                <template slot="prepend">部门</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">上传者</template>
              </el-input>
            </div>
            <el-button>搜索</el-button>
          </div>
          <div class="control">
            <a @click="upload"><i class="el-icon-upload"></i>上传</a>
            <a @click="download"><i class="el-icon-download"></i>下载</a>
            <a @click="del"><i class="el-icon-delete"></i>删除</a>
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
            <el-table-column prop="orgId" align="center" label="所属部门"></el-table-column>
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
        <el-dialog
          :title="title + '上传'"
          :visible.sync="dialog"
          width="21%">
          <el-upload
            class="upload-demo"
            drag
            :data="data"
            :action=" baseURL + 'resource/upload'"
            :accept="accept"
            :headers="headers"
            :before-upload="beforeUp"
            :on-success="onSuccess"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">上传说明：{{directions}}</div>
          </el-upload>
          <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </span>
        </el-dialog>  <!--上传-->
        <el-dialog
          :title="title + '预览'"
          :visible.sync="view"
          width="30%"
          @close="viewClose"
        >
          <div style="width: 100%;height: 100%;text-align: center;overflow: hidden">
            <img v-if="format==='image'" style="width: 100%;height: 100%;" :src="url">
            <video preload="metadata" v-if="format ==='video'" width="520" height="320" controls>
              <source id="video" :src="url" type="video/mp4">
            </video>
          </div>
        </el-dialog><!--预览-->
      </div>
    </Content>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
  import $ from 'jquery'
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Content from '@/components/common/content'
  import Breadcrumb from '@/components/common/Breadcrumb'

  export default {
    mounted: function () {
      this.getTree()
      this.resourceQuery()
    },
    data() {
      return {
        baseURL: this.$http.defaults.baseURL, //服务器地址
        resourceTree: [],

        type: 'image',           //资源类型
        accept: 'image/png,image/jpg,image/jpeg',         //允许上传的资源类型
        directions: '仅允许上传png、jpg、jpeg文件。',                      //上传时的说明文字
        dialog: false,
        title: '',
        value: '',
        treeId: 1,
        treeName: '图片',
        resources: [],
        row: [],
        url: '',                   //资源地址
        downloadUrl: '',          //下载地址
        downloadName: '',         //下载名称
        view: false,              //双击预览显示
        id: '',
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
        pageCount: 21,     //每页显示数目
        pageNo: 1,          //当前页
        total: 0,            //总数目
        check: false,          //选中资源的变量
        format: ''               //资源格式
      }
    },
    computed: {
      headers() {                                   //上传组件的请求头
        return {
          token: sessionStorage.getItem('token'),
          name: sessionStorage.getItem('name')
        }
      },
      data() {                                       //上传组件的附加参数
        return {
          uploader: sessionStorage.getItem('userId'),
          groupId: this.treeId,
          type: this.type
        }
      }
    },
    components: {
      NavBar,
      FooterBar,
      Content,
      Breadcrumb
    },
    methods: {
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
            _this.resourceTree = response.data.cust.trees
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                               //获取树资源
      handleNodeClick(val) {
        this.treeId = val.id;
        this.type = val.treeType;
        this.treeName = val.label;
        let image = 'image/png,image/jpg,image/jpeg';
        let video = 'video/*';
        let audio = 'audio/*';
        if (image.indexOf(val.treeType) != -1) {
          this.accept = image;
          this.directions = '仅允许上传png、jpg、jpeg文件。'
        } else if (video.indexOf(val.treeType) != -1) {
          this.accept = video;
          this.directions = '仅允许上传视频文件。'
        } else if (audio.indexOf(val.treeType) != -1) {
          this.accept = audio;
          this.directions = '仅允许上传音频文件。'
        }else {
          this.accept ='*'
          this.directions = '不允许上传任何文件。'
        }
        this.resourceQuery()

      },                    //树节点的点击回调

      upload() {
        this.title = this.treeName.slice(0, 2);
        this.dialog = true
      },
      beforeUp: function (file) {
        if (this.accept.indexOf(file.type.slice(0, 4)) == -1) {
          this.$message({
            message: '上传资源格式不支持！',
            center: true,
            type: 'warning'
          });
          return false
        }
      },               //文件上传前的回调
      onSuccess: function (response) {
        if (response.code == '0000') {
          this.$message({
            message: '上传成功！',
            center: true,
            type: 'success'
          });
          this.resourceQuery()
        } else {
          this.$message({
            message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
            center: true,
            type: 'error'
          });
        }
      },          //上传成功的回调
      del() {
        if (this.value == '2') {
          let ids = this.row.map(item => item.id).join(' ');      //列表模式的id
          if (ids == '') {
            this.$message({
              message: '未选择资源！',
              center: true,
              type: 'warning'
            });
            return false
          }
          this.id = ids
        } else {
          if (this.id == '') {
            this.$message({
              message: '未选择资源！',
              center: true,
              type: 'warning'
            });
            return false
          }
        }
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: 'resource/delete?ids=' + this.id,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.resourceQuery()
              this.$message({
                message: '删除成功！',
                center: true,
                type: 'success'
              })
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        })
      },                                   //删除资源
      preview(e) {
        this.url = "http://" + document.getElementById(e.currentTarget.id).getAttribute("url")
        this.title = this.treeName.slice(0, 2);
        if (this.url.indexOf('mp4') != '-1') {
          this.format = 'video'
        } else if (this.url.indexOf('png') != '-1' || this.url.indexOf('jpg') != '-1' || this.url.indexOf('jpeg') != '-1') {
          this.format = 'image'
        } else {
          return false
        }
        if (!this.view) this.view = true
      },                              //双击预览
      selected(e) {
        this.check = !this.check
        let dom = e.currentTarget.id;
        let target = e.currentTarget
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
      },                             //单击选择文件
      resourceQuery() {
        let _this = this
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
            let resources = response.data.cust.resources
            _this.total = response.data.cust.pages.count
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
      },                         //查询列表
      selectChange(val) {
        val == '2' ? this.pageCount = 5 : this.pageCount = 21
        this.resourceQuery()
      },                       //选择显示模式
      download() {
        if (this.value == '2') {
          this.downloadUrl = 'http://' + this.row.map(item => item.url).join('')
          this.downloadName = 'http://' + this.row.map(item => item.name).join('')
        }
        if (this.downloadUrl != '' || this.downloadName != '') {
          let a = document.createElement('a');
          a.href = this.downloadUrl;
          a.download = this.downloadName ? this.downloadName : '未命名';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          this.$message({
            message: '未选择资源！',
            center: true,
            type: 'warning'
          })
        }
      },                              //下载文件
      handleCurrentChange(val) {
        this.pageNo = val
        this.resourceQuery()
      },                //当前页翻页
      tableSelect(row) {
        this.row = row
      },                        //表格选择
      viewClose(){

      }
    }
  }
</script>


