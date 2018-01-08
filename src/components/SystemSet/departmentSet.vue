<style scoped>
  #departmentSet {
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
    padding-left: 10px;
    font-size: 1.4rem;
    border-bottom: 4px solid #e0e0e0;
  }

  .controlBox a {
    margin-right: 15px;
  }

  .controlBox a i {
    margin-right: 5px;
  }

  .controlBox a:hover {
    color: #d33a31;
  }
</style>

<template>
  <div id="departmentSet">
    <nav-bar></nav-bar>
    <Breadcrumb></Breadcrumb>
    <div class="content">
      <div class="title">部门设置</div>
      <div class="controlBox">
        <a @click="New"><i class="el-icon-plus"></i>新建</a>
        <a @click="Edit"><i class="el-icon-edit"></i>编辑</a>
        <a @click="delDeartment"><i class="el-icon-delete"></i>删除</a>
        <a @click="getTree"><i class="el-icon-refresh"></i>刷新</a>
      </div>
      <el-tree
        :data="departmentTree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree" :check-strictly="true"
        highlight-current>
      </el-tree>
    </div>
    <footer-bar></footer-bar>
    <el-dialog :title="title" ref="dialog" :visible.sync="openDialog" width="27.5%">
      <el-dialog
        width="30%"
        title="选择上级部门"
        :visible.sync="innerVisible"
        append-to-body>
        <el-tree
          :data="departmentTree" show-checkbox default-expand-all :check-strictly="true"
          node-key="id" ref="departmentTree" highlight-current>
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitSD">确 定</el-button>
        </div>
      </el-dialog>            <!--上级部门选择-->
      <el-form :model="form">
        <el-form-item label="部门名称" :label-width="LabelWidth">
          <el-input v-model="form.deartmentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" :label-width="LabelWidth">
          <input v-model="form.superiorDeartment" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="innerVisible = true" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="部门描述" :label-width="LabelWidth">
          <el-input type="textarea" v-model="form.deartmentDescribe" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
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
        label: 'aa',                        //新增树的子名称
        openDialog: false,                  //打开对话框
        innerVisible: false,                //选择上级部门的对话框
        title: '',                          //弹出框标题
        form: {
          deartmentName: '',                 // 部门名称
          superiorDeartment: '',             //上级部门
          deartmentDescribe: ''              //部门备注
        },
        LabelWidth: '70px',
        departmentTree: [],
        superiorId: '',                     //上级部门ID
        treeId: 60,                         //树ID
        creator:'',                         //创建人
        departmentId:'',                    //部门ID  编辑用
        targetId:''                  //编辑时需要移动到的目标树ID
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {
      getTree: function () {
        let _this = this
        this.$http({
          method: 'get',
          url: 'tree/query?id=' + this.treeId,
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
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },         //获取树资源
      addDeartment() {
        if (this.form.deartmentName == '') {
          this.$message({message: '请填写部门名称！',showClose: true, center: true, type: 'warning'});
          return false
        }
        if (this.form.superiorDeartment == '') {
          this.$message({message: '请填写上级部门！',showClose: true, center: true, type: 'warning'});
          return false
        }
        let _this = this
        let data = {
          parentId: this.targetId,
          label: this.form.deartmentName,
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
            this.openDialog = false
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },
      submitSD() {
        let superior = this.$refs.departmentTree.getCheckedNodes()
        if (superior.length > 1) {
          this.$message({message: '只能选择一个上级！',showClose: true, center: true, type: 'warning'});
          return false
        }
        this.form.superiorDeartment = superior[0].label
        this.targetId = superior[0].id
        this.innerVisible = false
      },                   //选择上级部门
      submit() {
        if (this.title == '新建部门') {
          this.addDeartment()
        } else {
          this.editDeartment()
        }
      },                     //判断是新建还是编辑
      New() {
        this.openDialog = true
        this.title = '新建部门'
      },                        //新建部门
      Edit() {
        let tree = this.$refs.tree.getCheckedNodes()
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: '请选择一个部门！',showClose: true, center: true, type: 'warning'});
          return false
        }
        this.openDialog = true
        this.title = '编辑部门'
        this.form.deartmentName = tree[0].label
        this.superiorId = tree[0].parentId
        this.creator = tree[0].creator
        this.departmentId = tree[0].id
      },                       //编辑部门
      editDeartment() {
        if (this.form.deartmentName == '') {
          this.$message({message: '请填写部门名称！',showClose: true, center: true, type: 'warning'});
          return false
        }
        if (this.form.superiorDeartment == '') {
          this.$message({message: '请填写上级部门！',showClose: true, center: true, type: 'warning'});
          return false
        }
        let _this = this
        let data = {
          id:this.departmentId,
          parentId: this.superiorId,
          label: this.form.deartmentName,
          creator:this.creator,
          updaterCreator: sessionStorage.getItem('name'),
          treeId:this.targetId
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
            this.openDialog = false
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },              //编辑部门方法
      delDeartment(){
        let tree = this.$refs.tree.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: '只能选择一个部门！',showClose: true, center: true, type: 'warning'});
          return false
        }
        let id = tree[0].id;
        this.$confirm('此操作将永久删除该部门及下属的资源等, 是否继续?', '提示', {
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
                showClose: true,
                center: true,
                type: 'success'
              })
              this.getTree()
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                showClose: true,
                center: true,
                type: 'error'
              });
            }
          })
        })
      }                 //删除部门方法
    }
  }
</script>
