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
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <Content>
      <div id="userTree">
        <div class="title">用户分组</div>
        <div class="controlTree">
          <a @click="NewTree"><i class="el-icon-plus"></i>新建</a>
          <a @click="EditTree"><i class="el-icon-edit"></i>编辑</a>
          <a @click="delTree"><i class="el-icon-delete"></i>删除</a>
        </div>
        <el-tree :data="userTree" node-key="id" default-expand-all show-checkbox
                 ref="tree" :check-strictly="true"></el-tree>
      </div>
      <div id="userList">
        <div class="title">用户列表</div>
        <div class="controlBox">
          <div class="search">
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">用户名</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">所属部门</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">用户类型</template>
              </el-input>
            </div>
            <el-button>搜索</el-button>
          </div>
          <div class="control">
            <a @click="New"><i class="el-icon-plus"></i>新建</a>
            <a @click="Edit"><i class="el-icon-edit"></i>编辑</a>
            <a @click="delUser"><i class="el-icon-delete"></i>删除</a>
            <a @click="queryUserList"><i class="el-icon-refresh"></i>刷新</a>
          </div>
        </div>
        <div class="tableList">
          <el-table
            :data="users"
            @selection-change="SelectRow"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="name" align="center" label="用户名"></el-table-column>
            <el-table-column prop="name" align="center" label="角色"></el-table-column>
            <el-table-column prop="groupName" align="center" label="用户分组"></el-table-column>
            <el-table-column prop="deptName" align="center" label="所属部门"></el-table-column>
            <el-table-column prop="address" align="center" label="终端总数"></el-table-column>
            <el-table-column prop="desc" align="center" label="备注"></el-table-column>
            <el-table-column prop="creator" align="center" label="创建人"></el-table-column>
            <el-table-column prop="updateTime" align="center" label="更新时间"></el-table-column>
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
      <el-dialog width="30%" title="选择所属部门" :visible.sync="openD" append-to-body>
        <el-tree
          :data="departmentTree" show-checkbox default-expand-all :check-strictly="true"
          node-key="id" ref="departmentTree" highlight-current>
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openD = false">取 消</el-button>
          <el-button type="primary" @click="departmentSelect">确 定</el-button>
        </div>
      </el-dialog>            <!--所属部门选择-->
      <el-dialog width="30%" title="选择用户角色" :visible.sync="openR" append-to-body>
        <el-table
          :data="roleList"
          @selection-change="roleSelectRow"
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="name" align="center" label="角色名称"></el-table-column>
          <el-table-column prop="desc" align="center" label="角色描述"></el-table-column>
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
          <el-button @click="openR = false">取 消</el-button>
          <el-button type="primary" @click="roleSelect">确 定</el-button>
        </div>
      </el-dialog>            <!--用户角色选择-->
      <el-dialog width="30%" title="选择用户分组" :visible.sync="openG" append-to-body>
        <el-tree
          :data="groupTree" show-checkbox default-expand-all :check-strictly="true"
          node-key="id" ref="groupTree" highlight-current>
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openG = false">取 消</el-button>
          <el-button type="primary" @click="groupSelect">确 定</el-button>
        </div>
      </el-dialog>            <!--用户分组选择-->
      <el-form :model="form">
        <el-form-item label="用户名称" :label-width="LabelWidth">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="title!='编辑用户'" label="用户密码" :label-width="LabelWidth">
          <el-input type="password" v-model="form.userPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="title!='编辑用户'" label="确认密码" :label-width="LabelWidth">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="LabelWidth">
          <input v-model="form.department" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="openDepartment" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="用户角色" :label-width="LabelWidth">
          <input v-model="form.role" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="openRole" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="用户分组" :label-width="LabelWidth">
          <input v-model="form.group" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="openGroup" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="备注" :label-width="LabelWidth">
          <el-input v-model="form.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openG = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="treeTitle" ref="TreeDialog" :visible.sync="openTreeDialog" width="27.5%">
      <el-dialog width="30%" title="选择分组上级" :visible.sync="openSuperG" append-to-body>
        <el-tree
          :data="groupSuper" show-checkbox default-expand-all :check-strictly="true"
          node-key="id" ref="groupSuper" highlight-current>
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openSuperG = false">取 消</el-button>
          <el-button type="primary" @click="selectSuperGroup">确 定</el-button>
        </div>
      </el-dialog>            <!--上级分组选择-->
      <el-form :model="treeForm">
        <el-form-item label="分组名称" :label-width="LabelWidth">
          <el-input v-model="treeForm.groupName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级分组" :label-width="LabelWidth">
          <input v-model="treeForm.superiorGroup" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="openSuperG = true" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="分组描述" :label-width="LabelWidth">
          <el-input type="textarea" v-model="treeForm.groupDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openTreeDialog = false">取 消</el-button>
        <el-button type="primary" @click="groupSubmit">确 定</el-button>
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
      this.getTree()
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
          label: '图形模式'
        }, {
          value: '2',
          label: '列表模式'
        }],
        treeId: '',
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
          department: '',
          role: '',
          group: '',
          desc: ''
        },
        treeForm: {
          groupName: '',
          superiorGroup: '',
          groupDesc: ''
        },
        LabelWidth: '70px',
        openD: false,          //打开选择部门对话框
        openR: false,          //打开选择角色对话框
        openG: false,         //打开选择分组对话框

        departmentTree: [],         //部门树
        roleList: [],         //角色列表
        groupTree: [],          //分组树

        departmentId: '',        //部门ID
        roleId: '',        //角色ID
        groupId: '',       //分组ID
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
        openSuperG:false,
        creator:'',
        currentGroupId:''       //当前组ID

      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb,
      Content
    },
    methods: {
      getTree() {
        let _this = this
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
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                          //用户分组树
      queryUserList() {
        let _this = this
        let t = []
        this.$http({
          method: 'get',
          url: 'user/query?treeId=' + _this.treeId + "&pageCount=" + this.pageCount + "&pageNo=" + this.pageNo,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let users = response.data.cust.users
            _this.total = response.data.cust.pages.count
            for (let i = 0; i < users.length; i++) {
              t.push(users[i])
              _this.users = t
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
      handleCurrentChange() {
        this.pageNo = val
        this.getRoleList()
      },            //当前页翻页
      New() {
        this.openDialog = true
        this.title = '新建用户'
      },                                //新建
      openDepartment() {
        this.openD = true

        let _this = this
        this.$http({
          method: 'get',
          url: 'tree/query?id=60',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.departmentTree = response.data.cust.trees
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },            //打开选择部门对话框
      openRole() {
        this.openR = true

        let _this = this
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
            _this.roleList = response.data.cust.roles
            _this.roleTotal = response.data.cust.pages.count
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                  //打开选择角色对话框
      openGroup() {
        this.openG = true

        let _this = this
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
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                 //打开选择分组对话框

      submit() {
        if (this.form.userName == '') {
          this.$message({message: '请填写用户名称！', center: true, type: 'warning'});
          return false
        }
        if (this.title == '新建用户') {
          if (this.form.password == '' || this.form.userPass == '') {
            this.$message({message: '请填写用户密码！', center: true, type: 'warning'});
            return false
          }
          if (this.form.password != this.form.userPass) {
            this.$message({message: '两次输入的密码不匹配！', center: true, type: 'warning'});
            return false
          }
          return false
        }
        if (this.form.department == '') {
          this.$message({message: '请选择所属部门！', center: true, type: 'warning'});
          return false
        }
        if (this.form.role == '') {
          this.$message({message: '请选择用户角色！', center: true, type: 'warning'});
          return false
        }
        if (this.form.group == '') {
          this.$message({message: '请选择用户分组！', center: true, type: 'warning'});
          return false
        }
        if (this.title == '新建用户') {
          let data = {
            creator: sessionStorage.getItem('name'),
            desc: this.form.desc,
            name: this.form.userName,
            password: this.form.password,
            deptId: this.departmentId,         //部门ID
            roleId: this.roleId,         //角色ID
            groupId: this.groupId,         //分组ID
          }
          this.$http({
            method: 'post',
            url: 'user/create',
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            },
            data: data
          }).then(response => {
            if (response.data.code == '0000') {
              this.$message({message: '新建用户成功！', center: true, type: 'success'});
              this.openDialog = false
              this.queryUserList()
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        }
        else {
          let data = {
            creator: sessionStorage.getItem('name'),
            id: this.userId,
            desc: this.form.desc,
            name: this.form.userName,
            deptId: this.departmentId,         //部门ID
            roleId: this.roleId,         //角色ID
            groupId: this.groupId,         //分组ID
          }
          this.$http({
            method: 'put',
            url: 'user/update',
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            },
            data: data
          }).then(response => {
            if (response.data.code == '0000') {
              this.$message({message: '编辑用户成功！', center: true, type: 'success'});
              this.openDialog = false
              this.queryUserList()
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        }
      },                         //新建与编辑用户
      handleRolePage() {
        this.rolePageNo = val
        this.openGroup()
      },                //选择角色列表的分页

      roleSelect() {
        if (this.roleRow.length > 1 || this.roleRow.length == 0) {
          this.$message({
            message: '请选择一个角色！',
            center: true,
            type: 'warning'
          });
        } else {
          this.roleId = this.roleRow[0].id
          this.form.role = this.roleRow[0].name
          this.openR = false
        }
      },                //选择角色
      roleSelectRow(selection) {
        this.roleRow = selection
      },    //选择角色列表的选中行数据
      departmentSelect() {
        let tree = this.$refs.departmentTree.getCheckedNodes()
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: '请选择一个部门！', center: true, type: 'warning'});
          return false
        }
        this.departmentId = tree[0].id
        this.form.department = tree[0].label
        this.openD = false
      },         //选择所属部门
      groupSelect() {
        let tree = this.$refs.groupTree.getCheckedNodes()
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: '请选择一个分组！', center: true, type: 'warning'});
          return false
        }
        this.groupId = tree[0].id
        this.form.group = tree[0].label
        this.openG = false
      },              //选择用户组

      Edit() {
        this.openDialog = true
        this.title = '编辑用户'
        this.form.userName = this.userRow[0].name
        this.form.department = this.userRow[0].deptName
        this.form.role = this.userRow[0].roleName
        this.form.group = this.userRow[0].groupName
        this.form.desc = this.userRow[0].desc
        this.departmentId = this.userRow[0].deptId
        this.roleId = this.userRow[0].roleId
        this.groupId = this.userRow[0].groupId
        this.userId = this.userRow[0].id
      },                    //编辑
      SelectRow(selection) {
        this.userRow = selection
      },         //用户列表选中行数据

      delUser() {
        var ids = this.userRow.map(item => item.id).join(' ')
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
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
              this.$message({message: '删除成功！', center: true, type: 'success'})
              this.queryUserList()
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        })
      },              //删除用户

      NewTree() {
        this.openTreeDialog = true
        this.treeTitle = "新建分组"
      },
      selectSuperGroup() {
        let tree = this.$refs.groupSuper.getCheckedNodes()
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: '请选择一个分组作为上级！', center: true, type: 'warning'});
          return false
        }
        this.superId = tree[0].id
        this.treeForm.superiorGroup = tree[0].label
        this.openSuperG = false
      },
      EditTree() {
        this.openTreeDialog = true
        this.treeTitle = "编辑分组"
        let tree = this.$refs.tree.getCheckedNodes()
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: '请选择一个分组！', center: true, type: 'warning'});
          return false
        }
        this.creator = tree[0].creator
        this.currentGroupId = tree[0].id
        this.treeForm.groupName = tree[0].label
        this.superId = tree[0].parentId
      },
      groupSubmit() {
        if (this.treeForm.groupName == '') {
          this.$message({message: '请填写分组名称！', center: true, type: 'warning'});
          return false
        }
        if (this.treeForm.superiorGroup == '') {
          this.$message({message: '请填写上级分组！', center: true, type: 'warning'});
          return false
        }
        if (this.treeTitle == '新建分组') {
          let _this = this
          let data = {
            parentId: this.superId,
            label: this.treeForm.groupName,
            creator: sessionStorage.getItem('name')
          }
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
              _this.getTree()
              this.$message({message: '新建分组成功！', center: true, type: 'success'});
              this.openTreeDialog = false
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        } else {
          let _this = this
          let data = {
            id:this.currentGroupId,          //当前ID
            parentId: this.superId,
            label: this.treeForm.groupName,
            creator:this.creator,          //创建人
            updaterCreator: sessionStorage.getItem('name'),
            treeId:this.targetId        //目标树ID
          }
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
              _this.getTree()
              _this.$message({message: '编辑分组成功！', center: true, type: 'success'});
              _this.openDialog = false
              _this.treeForm.superiorGroup = ''
              _this.treeForm.groupName = ''
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        }
      },
      delTree() {
        let tree = this.$refs.tree.getCheckedNodes()
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: '只能选择一个分组！', center: true, type: 'warning'});
          return false
        }
        let id = tree[0].id
        this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
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
                message: '删除成功！',
                center: true,
                type: 'success'
              })
              this.getTree()
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        })
      }
    }
  }
</script>
