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
      <div class="title">{{$t('Content.ID_ROLE')}}</div>
      <div class="controlBox">
        <div class="search">
          <div style="width:200px;">
            <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="searchName">
              <template slot="prepend">{{$t('Content.ID_ROLE_NAME')}}</template>
            </el-input>
          </div>
          <el-button @click="getRoleList">{{$t('Content.ID_RESEARCH')}}</el-button>
        </div>
        <div class="control">
          <a @click="newRole"><i class="el-icon-plus"></i>{{$t('Content.ID_NEW')}}</a>
          <a @click="editRole"><i class="el-icon-edit"></i>{{$t('Content.ID_EDIT')}}</a>
          <a @click="delRole"><i class="el-icon-delete"></i>{{$t('Content.ID_DELETE')}}</a>
        </div>
      </div>
      <div class="roleList">
        <el-table
          :data="roles"
          @selection-change="selectChange"
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="name" align="center" :label="$t('Content.ID_ROLE_NAME')"></el-table-column>
          <el-table-column prop="desc" align="center" :label="$t('Content.ID_ROLE_DESCRIPTION')"></el-table-column>
          <el-table-column prop="creator" align="center" :label="$t('Content.ID_CREATOR')"></el-table-column>
          <el-table-column prop="updateTime" align="center" :label="$t('Content.ID_UPDATE_TIME')"></el-table-column>
        </el-table>
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
    <FooterBar></FooterBar>
    <el-dialog :title="title" ref="dialog" :visible.sync="openDialog" width="27.5%">
      <el-form :model="form" label-width="200">
        <el-form-item :label="$t('Content.ID_ROLE_NAME')" :label-width="LabelWidth">
          <el-input v-model="form.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_ROLE_DESCRIPTION')" :label-width="LabelWidth">
          <el-input v-model="form.roleDescribe" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <fieldset class="roleTree">
        <legend>{{$t('Content.ID_PRIVILEGE_TREE')}}</legend>
        <p>{{$t('Content.ID_SET_PRIVILEGE')}}</p>
        <el-tree :data="powerTree" show-checkbox node-key="id"
                 ref="tree" style="height: 300px;overflow: auto"
                 :check-strictly="true">
        </el-tree>
      </fieldset>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">{{$t('Content.ID_CANCEL')}}</el-button>
        <el-button type="primary" @click="submit()">{{$t('Content.ID_OK')}}</el-button>
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
      this.getRoleList()
    },
    data() {
      return {
        openDialog: false,            //“新建”的弹出框
        title: '',                    //弹出框标题
        form: {
          roleName: '',               // 角色名称
          roleDescribe: '',           //角色描述
        },
        LabelWidth: '100px',
        userPrivId: '',               //当前用户权限ID
        rolePrivId: '',               //当前编辑角色的权限ID
        powerTree: [],                //权限树
        roles: [],                    //角色列表
        row: [],                      //当前选中的行
        pageCount: 11,                //每页显示条目
        pageNo: 1,                    //当前页
        total: 0,                     //总数量
        creator: '',                  //创建人
        roleId: '',                   //角色ID
        searchName: ''
      }
    },
    computed: {},
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {
      newRole: function () {
        this.openDialog = true;
        this.title = this.$t('Content.ID_NEW_ROLE');
        this.creator = sessionStorage.getItem('name');
        this.userPrivId = sessionStorage.getItem('privId');
        this.getTree()
      },        //新建角色
      getTree: function () {
        let _this = this;
        this.$http({
          method: 'get',
          url: 'privilege/query?userId=' + this.userPrivId + '&roleId=' + this.rolePrivId,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.powerTree = response.data.cust.trees;
            let rolePriv = response.data.cust.tree;
            if (_this.rolePrivId != '') {
              let rolePrivId = [];
              rolePriv.map(function (item) {
                rolePrivId.push(item.id)
              });
              /*_this.$refs.tree.setCheckedNodes(rolePriv)*/        //方法无效
              _this.$refs.tree.setCheckedKeys(rolePrivId);
            } else {
              _this.$refs.tree.setCheckedKeys([])
            }
            _this.rolePrivId = _this.userPrivId = ''
          } else {
            this.$message({
              message: response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },        //获取权限树
      getRoleList: function () {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/role/query?pageCount=' + _this.pageCount + '&pageNo=' + _this.pageNo + '&name=' + this.searchName,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.roles = response.data.cust.roles
            _this.total = response.data.cust.pages.count
          } else {
            this.$message({
              message: response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },    //获取角色列表
      submit() {
        if (this.title == this.$t('Content.ID_NEW_ROLE')) {
          this.powerAdd()
        } else {
          this.updatePower()
        }
      },
      powerAdd: function () {
        let power = this.$refs.tree.getCheckedNodes()
        let data = {};
        power.map(function (item, index) {          //遍历选中权限
          let name = item.property;               //取出权限名称
          data[name] = 1                            //添加到对象并赋值为1（1为有权限0为无），对象的访问方式有data.name与data[name],动态添加需要使用data[name]
        });
        let _this = this;
        this.$http({
          method: 'post',
          url: 'privilege/create',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          },
          data: data
        }).then(response => {
          if (response.data.code == '0000') {
            _this.userPrivId = response.data.cust.id
            _this.roleAdd()
          } else {
            this.$message({
              message: response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },       //新建权限
      roleAdd: function () {
        if (this.roleName == '') {
          this.$message({
            message: this.$t('Msg.ID_MSG_43'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
        let data = {
          creator: this.creator,
          name: this.form.roleName,
          desc: this.form.roleDescribe,
          privId: this.userPrivId
        };
        let _this = this;
        this.$http({
          method: 'post',
          url: 'role/create',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          },
          data: data
        }).then(response => {
          if (response.data.code == '0000') {
            this.$message({
              message: this.$t('Msg.ID_MSG_44'),
              showClose: true,
              center: true,
              type: 'success'
            });
            this.getRoleList()
            _this.openDialog = false
          } else {
            this.$message({
              message: response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },        //新建角色方法
      updatePower() {
        let power = this.$refs.tree.getCheckedNodes();
        let data = {id: this.row[0].privId};
        power.map(function (item) {                 //遍历选中权限
          let name = item.property;                  //取出权限名称
          data[name] = 1                            //添加到对象并赋值为1（1为有权限0为无），对象的访问方式有data.name与data[name],动态添加需要使用data[name]
        });
        let _this = this;
        this.$http({
          method: 'put',
          url: 'privilege/update',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          },
          data: data
        }).then(response => {
          if (response.data.code == '0000') {
            _this.updateRole()
          } else {
            this.$message({
              message: response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                  //编辑权限
      updateRole() {
        if (this.roleName == '') {
          this.$message({
            message: this.$t('Msg.ID_MSG_43'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
        let data = {
          id: this.roleId,
          creator: this.creator,
          name: this.form.roleName,
          desc: this.form.roleDescribe,
          privId: this.row[0].privId
        };
        let _this = this;
        this.$http({
          method: 'put',
          url: 'role/update',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          },
          data: data
        }).then(response => {
          if (response.data.code == '0000') {
            this.$message({
              message: this.$t('Msg.ID_MSG_45'),
              showClose: true,
              center: true,
              type: 'success'
            });
            this.getRoleList();
            _this.openDialog = false
          } else {
            this.$message({
              message: response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                //编辑角色
      delRole() {
        var ids = this.row.map(item => item.id).join(' ')
        this.$confirm( this.$t('Msg.ID_MSG_46'),this.$t('Content.ID_PROMPT'), {
          confirmButtonText: this.$t('Content.ID_OK'),
          cancelButtonText: this.$t('Content.ID_CANCEL'),
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: 'role/delete?ids=' + ids,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.$message({
                message: this.$t('Content.ID_DELETE_SUCCESS'),
                showClose: true,
                center: true,
                type: 'success'
              });
              this.getRoleList()
            } else {
              this.$message({
                message: response.data.infor + '。',
                showClose: true,
                center: true,
                type: 'error'
              });
            }
          })
        })
      },                   //删除角色
      selectChange(selection) {
        this.row = selection
      },     //通过选择回调进行批量删除
      editRole() {
        if (this.row.length > 1 || this.row.length == 0) {
          this.$message({
            message: this.$t('Msg.ID_MSG_20'),
            showClose: true,
            center: true,
            type: 'warning'
          });
        } else {
          this.openDialog = true;
          this.title = this.$t('Content.ID_EDIT_ROLE');
          this.creator = this.row[0].creator;
          this.userPrivId = sessionStorage.getItem('privId');
          this.rolePrivId = this.row[0].privId;
          this.form.roleName = this.row[0].name;
          this.form.roleDescribe = this.row[0].desc;
          this.roleId = this.row[0].id;
          this.getTree()
        }
      },                  //编辑角色
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getRoleList()
      }      //当前页翻页
    }
  }
</script>
