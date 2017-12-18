<style scoped>
  #activeCode {
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

  .playList {
    height: 620px;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>

<template>
  <div id="activeCode">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="title">激活码管理</div>
      <div class="controlBox">
        <div class="search">
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">激活码</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">所属终端</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">所属部门</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">激活状态</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">生成时间</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">创建者</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">可用状态</template>
            </el-input>
          </div>
          <el-button>搜索</el-button>
        </div>
        <div class="control">
          <a @click="generate"><i class="el-icon-plus"></i>生成</a>
          <a @click="batch = true"><i class="el-icon-edit"></i>批量生成</a>
          <a @click="del" ><i class="el-icon-delete"></i>删除</a>
        </div>
      </div>
      <div class="playList">
        <el-table
          ref="activeTable"
          :data="activates"
          @selection-change="selectChange"
          height="577">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="code" align="center" label="激活码"></el-table-column>
          <el-table-column prop="name" align="center" label="所属终端"></el-table-column>
          <el-table-column prop="address" align="center" label="激活状态"></el-table-column>
          <el-table-column prop="address" align="center" label="生成时间"></el-table-column>
          <el-table-column prop="address" align="center" label="创建者"></el-table-column>
          <el-table-column prop="used" align="center" label="可用状态"></el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
    <footer-bar></footer-bar>
    <el-dialog
      title="批量生成"
      :visible.sync="batch"
      width="20%">
      <div style="text-align: center">
        <el-input-number v-model="num" :min="1" :max="999"></el-input-number>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click.native="generateBatch">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'

  export default {
    mounted:function () {
        this.activeQuery()
    },
    data() {
      return {
        batch: false,
        num: 1,
        activates:[],
        rowId:[]
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {
      generate() {
        this.$http({
          method: 'get',
          url: 'activate/create?number=1',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            this.$message({
              message: '生成成功！',
              center: true,
              type: 'success'
            })
            this.activeQuery()
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },
      generateBatch(){
        this.$http({
          method: 'get',
          url: 'activate/create?number=' + this.num,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            this.$message({
              message: '生成成功！',
              center: true,
              type: 'success'
            })
            this.activeQuery()
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
        this.batch=false
      },
      activeQuery(){
        let _this=this;
        let t=[]
        this.$http({
          method: 'get',
          url: 'activate/query',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let activates = response.data.cust.activates
            for (let i = 0; i < activates.length; i++) {
              t.push(activates[i])
              _this.activates = t
            }
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },
      del(){
        var ids = this.rowId.map(item => item.id).join(' ')
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: 'activate/delete?ids=' + ids,
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
              this.activeQuery()
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        })
      },
      selectChange(selection){
        this.rowId = selection
      }     //通过选择回调进行批量删除
    }
  }
</script>


