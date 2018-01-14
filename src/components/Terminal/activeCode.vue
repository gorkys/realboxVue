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
          <!--<div style="width:200px;">
            <el-input placeholder="请输入内容">
              <template slot="prepend">激活码</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容">
              <template slot="prepend">所属终端</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容">
              <template slot="prepend">激活状态</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容">
              <template slot="prepend">可用状态</template>
            </el-input>
          </div>
          <el-button>搜索</el-button>-->
        </div>
        <div class="control">
          <a @click="gert"><i class="el-icon-plus"></i> 生成</a>
          <a @click="batch"><i class="el-icon-edit"></i> 批量生成</a>
          <a @click="exportCode"><i class="iconfont icon-lingcunwei"></i> 导出</a>
          <a @click="unbundled"><i class="el-icon-sort"></i> 解绑</a>
          <a @click="delCode"><i class="el-icon-delete"></i> 删除</a>
        </div>
      </div>
      <div class="playList">
        <el-table
          ref="activeTable"
          :data="activates"
          @selection-change="selectChange">
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
          @current-change="handleCurrentChange"
          :page-size="pageCount"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <footer-bar></footer-bar>
    <el-dialog :title="title" ref="dialog" :visible.sync="openDialog" width="20%">
      <el-dialog
        width="20%"
        title="选择企业部门"
        :visible.sync="openEntDep"
        append-to-body>
        <el-tree :data="departmentTree" node-key="id" ref="departmentTree"
                 show-checkbox :check-strictly="true" default-expand-all highlight-current></el-tree>       <!--部门树-->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="selectDep">确 定</el-button>
        </div>
      </el-dialog>            <!--选择企业部门-->
      <el-dialog
        width="20%"
        title="选择终端分组"
        :visible.sync="openTerGroup"
        append-to-body>
        <el-tree :data="terminalTree" node-key="id" ref="terminalTree" show-checkbox
                 :check-strictly="true" default-expand-all highlight-current></el-tree>
        <!--分组树-->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="selectGroup">确 定</el-button>
        </div>
      </el-dialog>            <!--选择终端分组-->
      <el-form :model="form">
        <el-form-item label="企业部门" :label-width="LabelWidth">
          <input v-model="form.entDep" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="clickEntDep" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="终端分组" :label-width="LabelWidth">
          <input v-model="form.terGroup" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="clickTerGroup" readonly="readonly"/>
        </el-form-item>
        <el-form-item v-if="isBatch" label="生成数量" :label-width="LabelWidth">
          <el-input-number v-model="form.num" :min="1" :max="999"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">取 消</el-button>
        <el-button type="primary" @click="generate">确 定</el-button>
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
      this.activeQuery()
    },
    data() {
      return {
        num: 1,
        activates: [],
        rowId: [],
        pageCount: 11,                //每页显示数目
        pageNo: 1,                    //当前页
        total: 0,                     //总数目
        /*生成激活码*/
        openDialog: false,
        openEntDep: false,
        openTerGroup: false,
        depfId: '',                     //部门ID
        groupId: '',                    //分组ID
        title: '',
        LabelWidth: '70px',
        form: {
          entDep: '',                 // 企业部门
          terGroup: '',               //终端分组
          num: 1                      //生成数量
        },
        value: 0,                     //生成与批量生成区分值
        departmentTree: [],           //部门树
        terminalTree: [],             //分组树
        isBatch: false                //是否批量生成
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
          url: 'activate/create?number=' + this.form.num + '&depfId=' + this.depfId + '&groupId=' + this.groupId,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            this.$message({
              message: '生成成功！',
              showClose: true,
              center: true,
              type: 'success'
            });
            this.activeQuery()
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        });
        this.openDialog = false
      },
      activeQuery() {
        let _this = this;
        _this.activates = [];
        this.$http({
          method: 'get',
          url: 'activate/query?pageNo=' + _this.pageNo + '&pageCount=' + _this.pageCount,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.total = response.data.cust.pages.count;
            let activates = response.data.cust.activates;
            for (let activate of activates) {
              _this.activates.push(activate);
            }
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                              //查询激活码
      delCode() {
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
                showClose: true,
                center: true,
                type: 'success'
              })
              this.activeQuery()
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
      },                                  //删除激活码
      selectChange(selection) {
        this.rowId = selection
      },                    //通过选择回调进行批量删除
      handleCurrentChange(val) {
        this.pageNo = val
        this.activeQuery()
      },                   //当前页翻页
      gert() {
        this.openDialog = true;
        this.title = '生成激活码';
        this.isBatch = false
      },                                      //生成
      batch() {
        this.openDialog = true;
        this.title = '批量生成激活码';
        this.isBatch = true
      },                                     //批量生成
      clickEntDep() {
        this.openEntDep = true;
        this.value = 1;
        this.getTree()
      },                              //弹出选择企业部门对话框
      clickTerGroup() {
        this.openTerGroup = true;
        this.value = 2;
        this.getTree()
      },                            //弹出选择终端分组对话框
      selectDep() {
        let tree = this.$refs.departmentTree.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: '请选择一个部门！',showClose: true, center: true, type: 'warning'});
          return false
        }
        this.depfId = tree[0].id;
        this.form.entDep = tree[0].label;
        this.openEntDep = false
      },                                //选择企业部门
      selectGroup() {
        let tree = this.$refs.terminalTree.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: '请选择一个分组！',showClose: true, center: true, type: 'warning'});
          return false
        }
        this.groupId = tree[0].id;
        this.form.terGroup = tree[0].label;
        this.openTerGroup = false
      },                              //选择终端分组
      getTree() {
        let _this = this, id = 0;
        this.value == 1 ? id = 60 : id = 40;
        this.$http({
          method: 'get',
          url: 'tree/query?id=' + id,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.value == 1 ? _this.departmentTree = response.data.cust.trees : _this.terminalTree = response.data.cust.trees;
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                                  //获取树资源
      exportCode(){
        this.$confirm('功能正在开发中...', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      },                                //导出激活码
      unbundled(){
        this.$confirm('功能正在开发中...', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }                                     //解绑激活码
    }
  }
</script>


