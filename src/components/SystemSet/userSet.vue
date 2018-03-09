<style scoped>
  #play {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }

  #userTree {
    border: 1px solid #c1c1c1;
    height: 98%;
    width: 12%;
    border-radius: 10px;
    overflow: hidden;
  }

  #userList {
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

  .userBox, .tableList {
    padding: 20px;
    height: 580px;
  }

  .userList {
    display: flex;
    flex-wrap: wrap;
  }

  .userList li {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border: 1px solid #a9a9a9;
    text-align: center;
    margin: 0 35px 60px;
    cursor: pointer;
  }

  .userList li img {
    width: 50%;
    height: 88.4%;
  }

  .userList li p {
    background-color: #d2d2d2;
  }

  .page {
    text-align: right;
    padding-right: 20px;
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
</style>

<template>
  <div id="play">
    <nav-bar @lang-change="langChange"></nav-bar>
    <breadcrumb></breadcrumb>
    <Content>
      <div id="userTree">
        <div class="title">{{$t('Content.ID_USER_GROUP')}}</div>
        <div class="controlTree">
          <a @click="NewTree"><i class="el-icon-plus"></i>{{$t('Content.ID_NEW')}}</a>
          <a @click="EditTree"><i class="el-icon-edit"></i>{{$t('Content.ID_EDIT')}}</a>
          <a @click="delTree"><i class="el-icon-delete"></i>{{$t('Content.ID_DELETE')}}</a>
        </div>
        <el-tree :data="userTree" node-key="id" default-expand-all show-checkbox @node-click="handleNodeClick"
                 ref="tree" :check-strictly="true" :highlight-current="true" @check-change="treeCheckCheck"></el-tree>
      </div>
      <div id="userList">
        <div class="title">{{$t('Content.ID_USER_LIST')}}</div>
        <div class="controlBox">
          <div class="search">
            <div style="width:200px;">
              <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="searchName">
                <template slot="prepend">{{$t('Content.ID_USERNAME')}}</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="searchType">
                <template slot="prepend">{{$t('Content.ID_USER_TYPE')}}</template>
              </el-input>
            </div>
            <el-button @click="queryUserList">{{$t('Content.ID_RESEARCH')}}</el-button>
          </div>
          <div class="control">
            <a @click="New"><i class="el-icon-plus"></i>{{$t('Content.ID_NEW')}}</a>
            <a @click="Edit"><i class="el-icon-edit"></i>{{$t('Content.ID_EDIT')}}</a>
            <a @click="delUser"><i class="el-icon-delete"></i>{{$t('Content.ID_DELETE')}}</a>
            <a @click="queryUserList"><i class="el-icon-refresh"></i>{{$t('Content.ID_REFRESH')}}</a>
          </div>
        </div>
        <div class="tableList">
          <el-table
            :data="users"
            @selection-change="SelectRow"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="name" align="center" :label="$t('Content.ID_USERNAME')"></el-table-column>
            <el-table-column prop="roleName" align="center" :label="$t('Content.ID_ROLE')"></el-table-column>
            <el-table-column prop="groupName" align="center" :label="$t('Content.ID_USER_GROUP')"></el-table-column>
            <el-table-column prop="terName" align="center" :label="$t('Content.ID_GROUP')"></el-table-column>
            <el-table-column prop="desc" align="center" :label="$t('Content.ID_REMARK')"></el-table-column>
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
    </Content>
    <footer-bar></footer-bar>
    <el-dialog :title="title" :visible.sync="openDialog" width="27.5%">
      <el-dialog width="30%" :title="$t('Msg.ID_MSG_28')" :visible.sync="openD" append-to-body>
        <el-tree
          :data="terGroupTree" show-checkbox default-expand-all :check-strictly="true"
          node-key="id" ref="terGroupTree" highlight-current>
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openD = false">{{$t('Content.ID_CANCEL')}}</el-button>
          <el-button type="primary" @click="terGroupSelect">{{$t('Content.ID_OK')}}</el-button>
        </div>
      </el-dialog>            <!--终端分组选择-->
      <el-dialog width="30%" :title="$t('Content.ID_USER_ROLE')" :visible.sync="openR" append-to-body>
        <el-table
          :data="roleList"
          @selection-change="roleSelectRow"
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="name" align="center" :label="$t('Content.ID_ROLE_NAME')"></el-table-column>
          <el-table-column prop="desc" align="center" :label="$t('Content.ID_ROLE_DESCRIPTION')"></el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @current-change="handleRolePage"
            :page-size="rolePageCount"
            layout="total, prev, pager, next, jumper"
            :total="roleTotal">
          </el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openR = false">{{$t('Content.ID_CANCEL')}}</el-button>
          <el-button type="primary" @click="roleSelect">{{$t('Content.ID_OK')}}</el-button>
        </div>
      </el-dialog>            <!--用户角色选择-->
      <el-dialog width="30%" :title="$t('Content.ID_USER_GROUP')" :visible.sync="openG" append-to-body>
        <el-tree
          :data="groupTree" show-checkbox default-expand-all :check-strictly="true"
          node-key="id" ref="groupTree" highlight-current>
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openG = false">{{$t('Content.ID_CANCEL')}}</el-button>
          <el-button type="primary" @click="groupSelect">{{$t('Content.ID_OK')}}</el-button>
        </div>
      </el-dialog>            <!--用户分组选择-->
      <el-form :model="form" label-width="200">
        <el-form-item :label="$t('Content.ID_USERNAME')" :label-width="LabelWidth">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="title!=$t('Content.ID_EDIT_USER')" :label="$t('Content.ID_PASSWORD')" :label-width="LabelWidth">
          <el-input type="password" v-model="form.userPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="title!=$t('Content.ID_EDIT_USER')" :label="$t('Content.ID_CONFIRM_PASSWORD')" :label-width="LabelWidth">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_GROUP')" :label-width="LabelWidth">
          <input v-model="form.terGroup" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="openTerGroup" readonly="readonly"/>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_USER_ROLE')" :label-width="LabelWidth">
          <input v-model="form.role" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="openRole" readonly="readonly"/>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_USER_GROUP')" :label-width="LabelWidth">
          <input v-model="form.group" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="openGroup" readonly="readonly"/>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_REMARK')" :label-width="LabelWidth">
          <el-input v-model="form.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">{{$t('Content.ID_CANCEL')}}</el-button>
        <el-button type="primary" @click="submit">{{$t('Content.ID_OK')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="treeTitle" ref="TreeDialog" :visible.sync="openTreeDialog" width="27.5%">
      <el-dialog width="30%" :title="$t('Content.ID_PARENT_GROUP')" :visible.sync="openSuperG" append-to-body>
        <el-tree
          :data="groupSuper" show-checkbox default-expand-all :check-strictly="true"
          node-key="id" ref="groupSuper" highlight-current @check-change="groupSuperCheckCheck">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openSuperG = false">{{$t('Content.ID_CANCEL')}}</el-button>
          <el-button type="primary" @click="selectSuperGroup">{{$t('Content.ID_OK')}}</el-button>
        </div>
      </el-dialog>            <!--上级分组选择-->
      <el-form :model="treeForm" label-width="200">
        <el-form-item :label="$t('Content.ID_GROUP_NAME')" :label-width="LabelWidth">
          <el-input v-model="treeForm.groupName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_PARENT_GROUP')" :label-width="LabelWidth">
          <input v-model="treeForm.superiorGroup" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="openSuperG = true" readonly="readonly"/>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_GROUP_DESCRIPTION')" :label-width="LabelWidth">
          <el-input type="textarea" v-model="treeForm.groupDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openTreeDialog = false">{{$t('Content.ID_CANCEL')}}</el-button>
        <el-button type="primary" @click="groupSubmit">{{$t('Content.ID_OK')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'
  import Content from '@/components/common/content'

  export default {
    mounted() {
      this.getTree();
      this.queryUserList()
    },
    data() {
      return {
        userTree: [],
        users: [],
        userRow: [],
        value: '',
        select: [{
          value: '1',
          label: this.$t('Content.ID_IMAGE_MODE')
        }, {
          value: '2',
          label: this.$t('Content.ID_LIST_MODE')
        }],
        treeId: 51,
        pageCount: 11,     //每页显示数目
        pageNo: 1,          //当前页
        total: 0,            //总数目
        //弹出框
        openDialog: false,           //“新建”的弹出框
        title: '',                   //弹出框标题
        form: {
          userName: '',
          userPass: '',
          password: '',
          terGroup: '',
          role: '',
          group: '',
          desc: ''
        },
        treeForm: {
          groupName: '',
          superiorGroup: '',
          groupDesc: ''
        },
        LabelWidth: '100px',
        openD: false,          //打开选择终端分组对话框
        openR: false,          //打开选择角色对话框
        openG: false,         //打开选择分组对话框

        terGroupTree: [],         //终端分组树
        roleList: [],         //角色列表
        groupTree: [],          //分组树

        terGroupId: '',        //终端分组ID
        roleId: '',        //角色ID
        terId: '',       //终端ID
        userId: '',        //用户ID

        rolePageCount: 5,         //角色列表分页
        rolePageNo: 1,         //角色列表分页
        roleTotal: 1,           //角色列表分页
        roleRow: [],           //角色行数据

        openTreeDialog: false,
        openTreeG: false,
        treeTitle: '',
        groupSuper: [],         //分组上级选择
        superId: '',             //分组上级ID
        openSuperG: false,
        creator: '',
        currentGroupId: '',       //当前组ID

        searchName: '',
        searchType: '',

        i: 0,
        j: 0
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb,
      Content
    },
    methods: {
      groupSuperCheckCheck(data, node) {
        this.j++;
        if (this.j % 2 == 0) {
          if (node) {
            this.$refs.groupSuper.setCheckedNodes([]);
            this.$refs.groupSuper.setCheckedNodes([data]);
            //交叉点击节点
          } else {
            this.$refs.groupSuper.setCheckedNodes([]);
            //点击已经选中的节点，置空
          }
        }
      },
      treeCheckCheck(data, node) {
        this.i++;
        if (this.i % 2 == 0) {
          if (node) {
            this.$refs.tree.setCheckedNodes([]);
            this.$refs.tree.setCheckedNodes([data]);
            //交叉点击节点
          } else {
            this.$refs.tree.setCheckedNodes([]);
            //点击已经选中的节点，置空
          }
        }
      },                 //树单选
      handleNodeClick(val) {
        val.id != 50 ? this.treeId = val.id : this.treeId = 51;
        this.queryUserList()
      },                   //用户分组树点击
      getTree() {
        let _this = this;
        this.$http({
          method: 'get',
          url: 'tree/query?id=50',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.groupSuper = _this.userTree = response.data.cust.trees
          } else {
            this.$message({
              message: response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                          //用户分组树
      queryUserList() {
        let _this = this;
        _this.users = [];
        this.$http({
          method: 'get',
          url: 'user/query?groupId=' + _this.treeId + "&pageCount=" + this.pageCount + "&pageNo=" + this.pageNo + '&name=' + this.searchName + '&type=' + this.searchType,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let users = response.data.cust.users;
            _this.total = response.data.cust.pages.count;
            for (let user of users) {
              _this.users.push(user)
            }
          } else {
            this.$message({
              message: response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                    //查询列表
      handleCurrentChange() {
        this.pageNo = val;
        this.getRoleList()
      },              //当前页翻页
      New() {
        this.openDialog = true;
        this.title = this.$t('Content.ID_NEW_USER')
      },                              //新建
      openTerGroup() {
        this.openD = true;

        let _this = this;
        this.$http({
          method: 'get',
          url: 'tree/query?id=40',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.terGroupTree = response.data.cust.trees
          } else {
            this.$message({
              message: response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                   //打开选择终端分组对话框
      openRole() {
        this.openR = true;

        let _this = this;
        this.$http({
          method: 'get',
          url: '/role/query?pageCount=' + _this.rolePageCount + '&pageNo=' + _this.rolePageNo,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.roleList = response.data.cust.roles;
            _this.roleTotal = response.data.cust.pages.count
          } else {
            this.$message({
              message: response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                         //打开选择角色对话框
      openGroup() {
        this.openG = true;

        let _this = this;
        this.$http({
          method: 'get',
          url: 'tree/query?id=50',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.groupTree = response.data.cust.trees
          } else {
            this.$message({
              message: response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                        //打开选择分组对话框

      submit() {
        if (this.form.userName == '') {
          this.$message({message: this.$t('Msg.ID_MSG_48'), center: true, type: 'warning'});
          return false
        }
        if (this.title == this.$t('Content.ID_NEW_USER')) {
          if (this.form.password == '' || this.form.userPass == '') {
            this.$message({message: this.$t('Msg.ID_MSG_49'), center: true, type: 'warning'});
            return false
          }
          if (this.form.password != this.form.userPass) {
            this.$message({message: this.$t('Msg.ID_MSG_50'), center: true, type: 'warning'});
            return false
          }
        }
        if (this.form.terGroup == '') {
          this.$message({message: this.$t('Msg.ID_MSG_51'), center: true, type: 'warning'});
          return false
        }
        if (this.form.role == '') {
          this.$message({message: this.$t('Msg.ID_MSG_52'), center: true, type: 'warning'});
          return false
        }
        if (this.form.group == '') {
          this.$message({message: this.$t('Msg.ID_MSG_53'), center: true, type: 'warning'});
          return false
        }
        let data = {}, url = '', method = '', msg = '';
        if (this.title == this.$t('Content.ID_NEW_USER')) {
          data = {
            creator: sessionStorage.getItem('name'),
            desc: this.form.desc,
            name: this.form.userName,
            password: this.form.password,
            terId: this.terGroupId,         //终端分组ID
            roleId: this.roleId,         //角色ID
            groupId: this.groupId,         //终端树ID
          };
          url = 'user/create';
          method = 'post';
          msg = this.$t('Msg.ID_MSG_54')
        }
        else {
          data = {
            creator: sessionStorage.getItem('name'),
            id: this.userId,
            desc: this.form.desc,
            name: this.form.userName,
            terId: this.terGroupId,         //终端分组ID
            roleId: this.roleId,         //角色ID
            groupId: this.groupId,         //分组ID
          };
          url = 'user/update';
          method = 'put';
          msg = this.$t('Msg.ID_MSG_55')
        }
        this.$http({
          method: method,
          url: url,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          },
          data: data
        }).then(response => {
          if (response.data.code == '0000') {
            this.$message({message: msg, center: true, type: 'success'});
            this.openDialog = false;
            this.queryUserList()
          } else {
            this.$message({
              message: response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                           //新建与编辑用户
      handleRolePage() {
        this.rolePageNo = val
        this.openGroup()
      },                   //选择角色列表的分页

      roleSelect() {
        if (this.roleRow.length > 1 || this.roleRow.length == 0) {
          this.$message({
            message: this.$t('Msg.ID_MSG_56'),
            center: true,
            type: 'warning'
          });
        } else {
          this.roleId = this.roleRow[0].id;
          this.form.role = this.roleRow[0].name;
          this.openR = false
        }
      },                       //选择角色
      roleSelectRow(selection) {
        this.roleRow = selection
      },           //选择角色列表的选中行数据
      terGroupSelect() {
        let tree = this.$refs.terGroupTree.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: this.$t('Msg.ID_MSG_57'), center: true, type: 'warning'});
          return false
        }
        this.terGroupId = tree[0].id;
        this.form.terGroup = tree[0].label;
        this.openD = false
      },                 //选择终端分组
      groupSelect() {
        let tree = this.$refs.groupTree.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: this.$t('Msg.ID_MSG_57'), showClose: true, center: true, type: 'warning'});
          return false
        }
        this.groupId = tree[0].id;
        this.form.group = tree[0].label;
        this.openG = false
      },                      //选择用户组

      Edit() {
        this.openDialog = true;
        this.title = this.$t('Content.ID_EDIT_USER');
        this.form.userName = this.userRow[0].name;
        this.form.terGroup = this.userRow[0].terName;
        this.form.role = this.userRow[0].roleName;
        this.form.group = this.userRow[0].groupName;
        this.form.desc = this.userRow[0].desc;
        this.terGroupId = this.userRow[0].terId;
        this.roleId = this.userRow[0].roleId;
        this.groupId = this.userRow[0].groupId;
        this.userId = this.userRow[0].id
      },                             //编辑
      SelectRow(selection) {
        this.userRow = selection
      },               //用户列表选中行数据

      delUser() {
        var ids = this.userRow.map(item => item.id).join(' ')
        this.$confirm(this.$t('Msg.ID_MSG_58'), this.$t('Content.ID_PROMPT'), {
          confirmButtonText: this.$t('Content.ID_OK'),
          cancelButtonText: this.$t('Content.ID_CANCEL'),
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: 'user/delete?ids=' + ids,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.$message({message: this.$t('Content.ID_DELETE_SUCCESS'), showClose: true, center: true, type: 'success'});
              this.queryUserList()
            } else if (response.data.code == 'USER006') {
              this.$message({
                message: response.data.infor,
                showClose: true,
                center: true,
                type: 'warning'
              });
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
      },                          //删除用户

      NewTree() {
        this.treeForm.groupName = '';
        this.treeForm.superiorGroup = '';
        this.treeTitle = this.$t('Content.ID_NEW_GROUP');
        this.openTreeDialog = true
      },                          //新建节目分组
      selectSuperGroup() {
        let tree = this.$refs.groupSuper.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: this.$t('Msg.ID_MSG_40'), showClose: true, center: true, type: 'warning'});
          return false
        }
        this.superId = tree[0].id;
        this.treeForm.superiorGroup = tree[0].label;
        this.openSuperG = false
      },                 //选择上级分组
      EditTree() {
        this.treeTitle = this.$t('Content.ID_EDIT_GROUP');
        let tree = this.$refs.tree.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: this.$t('Msg.ID_MSG_19'), showClose: true, center: true, type: 'warning'});
          return false
        }
        this.creator = tree[0].creator;
        this.currentGroupId = tree[0].id;
        this.treeForm.groupName = tree[0].label;
        this.superId = tree[0].parentId;
        this.treeForm.superiorGroup = tree[0].parentName;
        this.openTreeDialog = true;
      },                         //编辑节目分组
      groupSubmit() {
        if (this.treeForm.groupName == '') {
          this.$message({message: this.$t('Msg.ID_MSG_41'), showClose: true, center: true, type: 'warning'});
          return false
        }
        if (this.treeForm.superiorGroup == '') {
          this.$message({message: this.$t('Msg.ID_MSG_42'), showClose: true, center: true, type: 'warning'});
          return false
        }
        if (this.treeTitle == this.$t('Content.ID_NEW_GROUP')) {
          let _this = this;
          let data = {
            parentId: this.superId,
            label: this.treeForm.groupName,
            creator: sessionStorage.getItem('name')
          };
          this.$http({
            method: 'post',
            url: 'tree/create',
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            },
            data: data
          }).then(response => {
            if (response.data.code == '0000') {
              _this.getTree();
              this.$message({message: this.$t('Msg.ID_MSG_37'), showClose: true, center: true, type: 'success'});
              this.openTreeDialog = false
            } else {
              this.$message({
                message: response.data.infor + '。',
                showClose: true,
                center: true,
                type: 'error'
              });
            }
          })
        } else {
          let _this = this;
          let data = {
            id: this.currentGroupId,          //当前ID
            parentId: this.superId,
            label: this.treeForm.groupName,
            creator: this.creator,          //创建人
            updaterCreator: sessionStorage.getItem('name'),
            treeId: this.targetId        //目标树ID
          };
          this.$http({
            method: 'put',
            url: 'tree/update',
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            },
            data: data
          }).then(response => {
            if (response.data.code == '0000') {
              _this.getTree();
              _this.$message({message: this.$t('Msg.ID_MSG_37'), showClose: true, center: true, type: 'success'});
              this.openTreeDialog = false;
              _this.treeForm.superiorGroup = '';
              _this.treeForm.groupName = ''
            } else if (response.data.code == 'TREE006') {
              this.$message({
                message: response.data.infor,
                showClose: true,
                center: true,
                type: 'warning'
              });
            } else {
              this.$message({
                message: response.data.infor + '。',
                showClose: true,
                center: true,
                type: 'error'
              });
            }
          })
        }
      },                      //确认修改节目分组
      delTree() {
        let tree = this.$refs.tree.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: this.$t('Msg.ID_MSG_19'), showClose: true, center: true, type: 'warning'});
          return false
        }
        let id = tree[0].id;
        this.$confirm(this.$t('Msg.ID_MSG_39'), this.$t('Content.ID_PROMPT'), {
          confirmButtonText: this.$t('Content.ID_OK'),
          cancelButtonText: this.$t('Content.ID_CANCEL'),
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: 'tree/delete?id=' + id,
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
              this.getTree()
            } else if (response.data.code == 'TREE006') {
              this.$message({
                message: response.data.infor,
                showClose: true,
                center: true,
                type: 'warning'
              });
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
      },                           //删除节目分组
      langChange(){
        this.getTree();
      }
    }
  }
</script>
