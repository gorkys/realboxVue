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
    <nav-bar @lang-change="langChange"></nav-bar>
    <breadcrumb></breadcrumb>
    <Content>
      <div id="terminalTree">
        <div class="title">{{$t('Content.ID_GROUP')}}</div>
        <div class="controlTree">
          <div style="width: 120px">
          </div>
          <div><a @click="getTree"><i class="el-icon-refresh"></i>{{$t('Content.ID_REFRESH')}}</a></div>
        </div>
        <el-tree :data="terminalTree" default-expand-all :expand-on-click-node="false"
                 @node-click="treeClick"></el-tree>
      </div>
      <div id="terminalList">
        <div class="title">{{$t('Content.ID_TERMINAL_LIST')}}</div>
        <div class="controlBox">
          <div class="search">
            <div>
              <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="terName">
                <template slot="prepend">{{$t('Content.ID_TERMINAL_NAME')}}</template>
              </el-input>
            </div>
            <div>
              <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="terCode">
                <template slot="prepend">{{$t('Content.ID_TERMINAL_CODE')}}</template>
              </el-input>
            </div>
            <el-button @click="queryTerminalList">{{$t('Content.ID_RESEARCH')}}</el-button>
          </div>
          <div class="control">
            <a @click="delTerminal"><i class="el-icon-delete"></i>{{$t('Content.ID_DELETE')}}</a>
            <a @click="synTerminal"><i class="el-icon-sort"></i>{{$t('Content.ID_SYNCHRONIZATION')}}</a>
            <a @click="queryTerminalList"><i class="el-icon-refresh"></i>{{$t('Content.ID_REFRESH')}}</a>
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
            <el-table-column prop="name" align="center" :label="$t('Content.ID_TERMINAL_NAME')"></el-table-column>
            <el-table-column prop="name" align="center" :label="$t('Content.ID_TERMINAL_CODE')"></el-table-column>
            <el-table-column prop="type" align="center" :label="$t('Content.ID_TERMINAL_TYPE')"></el-table-column>
            <el-table-column prop="resolution" align="center" :label="$t('Content.ID_RESOLUTION')"></el-table-column>
            <el-table-column prop="sversion" align="center" :label="$t('Content.ID_SOFTWARE_VERSION')"></el-table-column>
            <el-table-column prop="version" align="center" :label="$t('Content.ID_SYSTEM_VERSION')"></el-table-column>
            <el-table-column prop="mac" align="center" :label="$t('Content.ID_MAC_ADDRESS')"></el-table-column>
            <el-table-column prop="creator" align="center" :label="$t('Content.ID_CREATOR')"></el-table-column>
            <el-table-column prop="status" align="center" :label="$t('Content.ID_ONLINE_STATUS')">
              <template slot-scope="scope">
                <i v-if="scope.row.status=='1'" style="color: #00ce06;font-size: 16px" class="el-icon-success"></i>
                <i v-if="scope.row.status=='0'" style="color: red;font-size: 16px" class="el-icon-error"></i>
              </template>
            </el-table-column>
            <el-table-column prop="updateTime" align="center" :label="$t('Content.ID_UPDATE_TIME')"></el-table-column>
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
        terminalTree: [],       //终端树
        terminals: [],
        pageCount: 8,     //每页显示数目
        pageNo: 1,          //当前页
        total: 0,            //总数目
        row: '',              //行数据

        terId: '41',                //终端分组ID
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
            _this.terminalTree = response.data.cust.trees;
          } else {
            this.$message({
              message: response.data.infor + '。',
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
          url: "terminal/query?&pageCount=" + this.pageCount + "&pageNo=" + this.pageNo + '&groupId=' + _this.terId+ '&name=' + this.terName + '&code=' + this.terCode,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let terminals = response.data.cust.terminals;
            _this.total = response.data.cust.pages.count;
            for (let terminal of terminals) {
              _this.terminals.push(terminal)
            }
            _this.terId = '';
          } else {
            this.$message({
              message: response.data.infor + '。',
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
        if (this.row == '') {
          this.$message({
            message: this.$t('Msg.ID_MSG_27'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
        let ids = this.row.map(item => item.id).join(' ');      //列表模式的id
        this.$confirm(this.$t('Msg.ID_MSG_10'), this.$t('Content.ID_PROMPT'), {
          confirmButtonText: this.$t('Content.ID_OK'),
          cancelButtonText: this.$t('Content.ID_CANCEL'),
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
              this.$message({message: this.$t('Content.ID_DELETE_SUCCESS'), showClose: true, center: true, type: 'success'});
              this.queryTerminalList()
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
      },                      //删除终端
      synTerminal(){
        if (this.row == '') {
          this.$message({
            message: this.$t('Msg.ID_MSG_27'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
        let ids = this.row.map(item => item.id).join(' ');      //列表模式的id
        this.$confirm(this.$t('Msg.ID_MSG_11'), this.$t('Content.ID_PROMPT'), {
          confirmButtonText: this.$t('Content.ID_OK'),
          cancelButtonText: this.$t('Content.ID_CANCEL'),
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'get',
            url: 'terminal/syn?ids=' + ids,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.$message({message: this.$t('Msg.ID_MSG_12'), showClose: true, center: true, type: 'success'});
              this.queryTerminalList()
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
      },                          //强制同步
      treeClick(val) {
        this.terId = val.id;
        this.queryTerminalList()
      },                     //点击树
      langChange(){
        this.getTree()
      }
    }
  }
</script>
