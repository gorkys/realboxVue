<style scoped>
  #terminal {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }

  #terminalTree {
    border: 1px solid #c1c1c1;
    height: 98%;
    width: 12%;
    border-radius: 10px;
    overflow: hidden;
  }

  .controlTree {
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding: 10px;
    border-bottom: 1px solid #dedede;
    display: flex;
    justify-content: space-between;
  }

  .controlTree > a {
    margin-left: 5px;
  }

  .controlTree > a > i {
    margin-right: 3px;
  }

  .controlTree > a:hover {
    color: #d33a31;
  }

  #terminalList {
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

  .tableList {
    height: 620px;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>

<template>
  <div id="terminal">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <Content>
      <div id="terminalTree">
        <div class="title">{{treeTitle}}</div>
        <div class="controlTree">
          <div style="width: 120px">
           <!-- <el-select v-model="elSelect" @change="selectChange">
              <el-option v-for="item in select"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>-->
          </div>
          <div><a><i class="el-icon-refresh"></i>刷新</a></div>
        </div>
        <el-tree v-if="value" :data="departmentTree" default-expand-all :expand-on-click-node="false"
                 @node-click="treeClick"></el-tree>
        <el-tree v-else :data="terminalTree" default-expand-all :expand-on-click-node="false"
                 @node-click="treeClick"></el-tree>
      </div>
      <div id="terminalList">
        <div class="title">终端列表</div>
        <div class="controlBox">
          <div class="search">
            <div style="width:200px;">
              <el-input placeholder="请输入内容" v-model="terName">
                <template slot="prepend">终端名称</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容" v-model="terCode">
                <template slot="prepend">终端编号</template>
              </el-input>
            </div>
            <el-button @click="queryTerminalList">搜索</el-button>
          </div>
          <div class="control">
            <a @click="delTerminal"><i class="el-icon-delete"></i>删除</a>
            <!--<el-dropdown>
          <span class="el-dropdown-link" style="cursor: pointer">
            <i class="el-icon-edit" style="margin-right: 5px"></i>批量操作<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="">开机时间</el-dropdown-item>
                <el-dropdown-item @click.native="">下载时间</el-dropdown-item>
                <el-dropdown-item @click.native="">音量设置</el-dropdown-item>
                <el-dropdown-item @click.native="">系统设置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>-->
          </div>
        </div>
        <div class="tableList">
          <el-table
            :data="terminals"
            @selection-change="tableSelect"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="name" align="center" label="终端名称"></el-table-column>
            <el-table-column prop="name" align="center" label="硬件编号"></el-table-column>
            <el-table-column prop="type" align="center" label="终端类型"></el-table-column>
            <el-table-column prop="resolution" align="center" label="分辨率"></el-table-column>
            <el-table-column prop="sversion" align="center" label="软件版本"></el-table-column>
            <el-table-column prop="version" align="center" label="系统版本"></el-table-column>
            <el-table-column prop="mac" align="center" label="MAC地址"></el-table-column>
            <el-table-column prop="creator" align="center" label="创建人"></el-table-column>
            <el-table-column prop="updateTime" align="center" label="更新时间"></el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @current-change="pageChange"
            :page-size="pageCount"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </Content>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Content from '@/components/common/content'
  import Breadcrumb from '@/components/common/Breadcrumb'

  export default {
    mounted: function () {
      this.getTree();
      this.queryTerminalList()
    },
    data() {
      return {
        departmentTree: [],      //部门树
        terminalTree: [],       //终端树
        terminals: [],
        pageCount: 8,     //每页显示数目
        pageNo: 1,          //当前页
        total: 0,            //总数目
        row: '',              //行数据
        /*elSelect: '企业部门',
        select: [
          {
            value: 1,
            label: '企业部门'
          },
          {
            value: 2,
            label: '终端分组'
          }
        ],*/
        value: true,        //当前选择树的值
        groupId: '',       //终端分组ID
        depfId: '',         //所属部门ID
        treeTitle: '终端分组',        //树标题
        terName: '',               //终端名称
        terCode: '',               //终端编号
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
        let _this = this, id = 0;
        this.value ? id = 60 : id = 40;
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
      },                          //获取树资源
      queryTerminalList() {
        let _this = this;
        this.terminals = [];
        this.$http({
          method: 'get',
          url: "terminal/query?&pageCount=" + this.pageCount + "&pageNo=" + this.pageNo + '&groupId=' + _this.groupId + '&depfId=' + _this.depfId + '&name=' + this.terName,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let terminals = response.data.cust.terminals
            _this.total = response.data.cust.pages.count
            for (let terminal of terminals) {
              _this.terminals.push(terminal)
            }
            _this.groupId = '';
            _this.depfId = ''
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                //获取终端列表
      pageChange(val) {
        this.pageNo = val;
        this.queryTerminalList()
      },                    //分页
      tableSelect(row) {
        this.row = row
      },                   //表格选择
      delTerminal() {
        let ids = this.row.map(item => item.id).join(' ');      //列表模式的id
        if (ids == '') {
          this.$message({
            message: '未选择资源！',
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
        this.$confirm('此操作将删除该终端, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: 'terminal/delete?ids=' + ids,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.$message({message: '删除成功！', showClose: true, center: true, type: 'success'});
              this.queryTerminalList()
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
      },                      //删除终端
      /*selectChange(val) {
        if (val != 1) {
          this.treeTitle = '终端分组';
          this.value = false
        } else {
          this.treeTitle = '企业部门';
          this.value = true
        }
        this.getTree()
      },                  //终端部门切换*/
      treeClick(val) {
        this.value ? this.depfId = val.id : this.groupId = val.id;
        this.queryTerminalList()
      },                     //点击树
    }
  }
</script>
