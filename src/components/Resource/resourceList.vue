<style scoped>
  #resourceList {
    border: 1px solid #c1c1c1;
    height: 98%;
    border-radius: 10px;
    overflow: hidden;
    width: 87%;
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
    border: 1px solid #a9a9a9;
    text-align: center;
    margin: 0 35px 60px;
    cursor: pointer;
  }

  .resourceList li img {
    width: 50%;
    height: 88.4%;
  }

  .resourceList li p {
    background-color: #d2d2d2;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>

<template>
  <div id="resourceList">
    <div class="title">资源列表</div>
    <div class="controlBox">
      <div class="search">
        <div style="width: 110px">
          <el-select v-model="value" placeholder="图形模式">
            <el-option v-for="item in select"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容" v-model="input3">
            <template slot="prepend">名称</template>
          </el-input>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容" v-model="input3">
            <template slot="prepend">机构</template>
          </el-input>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容" v-model="input3">
            <template slot="prepend">上传者</template>
          </el-input>
        </div>
        <el-button>搜索</el-button>
      </div>
      <div class="control">
        <a @click="dialog = true"><i class="el-icon-upload"></i>上传</a>
        <a @click="download"><i class="el-icon-download"></i>下载</a>
        <a @click="del"><i class="el-icon-delete"></i>删除</a>
      </div>
    </div>
    <div v-if="value == '2'" class="tableList">
      <el-table :data="resources">
        <el-table-column prop="name" align="center" label="名称"></el-table-column>
        <el-table-column prop="screenshot" align="center" label="预览图">
          <template scope="scope">
            <img :src="scope.row.url" width="100" height="70"/>
          </template>
        </el-table-column>
        <el-table-column prop="resolution" align="center" label="分辨率"></el-table-column>
        <el-table-column prop="address" align="center" label="大小"></el-table-column>
        <el-table-column prop="address" align="center" label="所属机构"></el-table-column>
        <el-table-column prop="creator" align="center" label="上传人"></el-table-column>
        <el-table-column prop="updateTime" align="center" label="更新时间"></el-table-column>
        <el-table-column prop="address" align="center" label="下载"></el-table-column>
      </el-table>
    </div>
    <div v-else class="imgList">
      <ul class="resourceList">
        <li v-for="(resource,id) in resources" :key="id" :id="resource.id" @click="selected($event)"
            @dblclick="preview($event)">
          <img :src="resource.url">
          <p>{{resource.name}}</p>
        </li>
      </ul>
    </div>
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
    <el-dialog
      title="上传"
      :visible.sync="dialog"
      width="21%">
      <el-upload
        class="upload-demo"
        drag
        :data="data"
        action="http://192.168.1.6:8081/resource/upload"
        :headers="headers"
        :before-upload="beforeUp"
        :on-success="onSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传说明</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </span>
    </el-dialog>  <!--上传-->
    <el-dialog
      title="预览"
      :visible.sync="view"
      width="30%"
      :before-close="handleClose">
      <div style="width: 100%;height: 100%;text-align: center">
        <img :src="url">
      </div>
    </el-dialog><!--预览-->
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    mounted: function () {
      this.resourceQuery()
    },
    data() {
      return {
        dialog: false,
        value: '',
        treeId: 1,
        resources: [],
        url: '',
        downloadUrl: '',
        downloadName: '',
        view: false,
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
        ]
      }
    },
    computed: {
      headers() {
        return {
          token: sessionStorage.getItem('token'),
          name: sessionStorage.getItem('name')
        }
      },
      data() {
        return {
          creator: sessionStorage.getItem('name'),
          treeId: this.treeId
        }
      }
    },
    components: {},
    methods: {
      beforeUp: function (file) {
        debugger
      },      //文件上传前的回调
      onSuccess: function (response) {
        if (response.code == '0000') {
          this.$message({
            message: '上传成功！',
            center: true,
            type: 'success'
          })
          this.resourceQuery()
        } else {
          this.$message({
            message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
            center: true,
            type: 'error'
          });
        }
      },  //上传成功的回调
      del() {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: 'resource/delete?id=' + this.id,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.$message({
                message: '删除成功！',
                center: true,
                type: 'success'
              })
              this.resourceQuery()
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        })
      },                          //删除资源
      preview(e) {
        this.url = e.currentTarget.children[0].currentSrc
        if (!this.view) this.view = true
      },                     //双击预览
      selected(e) {
        var dom = e.target.id;
        this.downloadUrl = e.currentTarget.children[0].currentSrc
        this.downloadName = e.currentTarget.children[1].innerText
        this.id = dom
        $('#' + dom).css("border", "1px solid  #e4007f");
        debugger
      },                    //选择当前文件
      resourceQuery() {
        let _this = this
        let t = []
        this.$http({
          method: 'get',
          url: 'resource/query?treeId=' + _this.treeId,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let resources = response.data.cust.resources
            for (let i = 0; i < resources.length; i++) {
              t.push(resources[i])
              _this.resources = t
              debugger
            }

          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                //查询列表
      download() {
        if (this.downloadUrl != '') {
          let a = document.createElement('a');
          a.href = this.downloadUrl;
          a.download = this.downloadName ? this.downloadName : '未命名';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }                       //下载文件
    }
  }
</script>
