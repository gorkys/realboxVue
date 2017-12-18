<style scoped>
  #roleSet {
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

  .control a {
    padding: 10px;
  }

  .control {
    font-size: 1.4rem;
  }

  .control a i {
    margin-right: 5px;
  }

  .control a:hover {
    color: #d33a31;
  }

  .roleList {
    height: 620px;
  }

  .roleForm {

  }

  .roleTree {

    border: 1px solid #b5b8c8;
    padding: 10px;
  }

  .roleTree p {
    text-align: center;
    background-color: #f1f1f1;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>

<template>
  <div id="roleSet">
    <NavBar></NavBar>
    <Breadcrumb></Breadcrumb>
    <div class="content">
      <div class="title">角色管理</div>
      <div class="controlBox">
        <div class="search">
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">角色名称</template>
            </el-input>
          </div>
          <el-button>搜索</el-button>
        </div>
        <div class="control">
          <a @click="newRole = true"><i class="el-icon-plus"></i>新建</a>
          <a><i class="el-icon-edit"></i>编辑</a>
          <a><i class="el-icon-delete"></i>删除</a>
        </div>
      </div>
      <div class="roleList">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="date" align="center" label="角色名称"></el-table-column>
          <el-table-column prop="name" align="center" label="角色描述"></el-table-column>
          <el-table-column prop="address" align="center" label="创建人"></el-table-column>
          <el-table-column prop="address" align="center" label="更新时间"></el-table-column>
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
    <FooterBar></FooterBar>
    <el-dialog title="新建" :visible.sync="newRole" width="27.5%">
      <el-form :model="form" class="roleForm">
        <el-form-item label="角色名称" :label-width="LabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="LabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <fieldset class="roleTree">
        <legend>权限树</legend>
        <p>分配权限</p>
        <el-tree :data="roleTree" show-checkbox node-key="id" style="height: 300px;overflow: auto"></el-tree>
      </fieldset>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newRole = false">取 消</el-button>
        <el-button type="primary" @click="newRole = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'

  export default {
    mounted: function () {
      this.getTree()
    },
    data() {
      return {
        newRole: true,        //“新建”的弹出框
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        LabelWidth: '70px',
        roleTree: []
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {
      addRole: function () {

      },
      getTree:function () {
        let _this = this
        this.$http({
          method: 'get',
          url: 'tree/query?id=70',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.roleTree = response.data.cust.trees
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      }
    }
  }
</script>
