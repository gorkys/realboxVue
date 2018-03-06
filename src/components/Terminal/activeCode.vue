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
      <div class="title">{{$t('Content.ID_ACTIVATION_CODE_MSG')}}</div>
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
          <a @click="gert"><i class="el-icon-plus"></i> {{$t('Content.ID_GENERATE')}}</a>
          <a @click="batch"><i class="el-icon-edit"></i> {{$t('Content.ID_BATCH_GENERATE')}}</a>
          <a @click="exportCode"><i class="iconfont icon-lingcunwei"></i> {{$t('Content.ID_EXPORT')}}</a>
          <a @click="unbundled"><i class="el-icon-sort"></i> {{$t('Content.ID_UNBIND')}}</a>
          <a @click="delCode"><i class="el-icon-delete"></i> {{$t('Content.ID_DELETE')}}</a>
        </div>
      </div>
      <div class="playList">
        <el-table
          ref="activeTable"
          :data="activates"
          @selection-change="selectChange">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="code" align="center" :label="$t('Content.ID_ACTIVATION_CODE')"></el-table-column>
          <el-table-column prop="name" align="center" :label="$t('Content.ID_TERMINAL_CODE')"></el-table-column>
          <el-table-column prop="creator" align="center" :label="$t('Content.ID_CREATOR')"></el-table-column>
          <el-table-column prop="used" align="center" :label="$t('Content.ID_AVAILABLE_STATUS')">
            <template slot-scope="scope">
              <i v-if="scope.row.used=='1'" style="color: #00ce06;font-size: 16px" class="el-icon-success"></i>
              <i v-if="scope.row.used=='0'" style="color: red;font-size: 16px" class="el-icon-error"></i>
            </template>
          </el-table-column>
          <el-table-column prop="time" align="center" :label="$t('Content.ID_GENERATE_TIME')"></el-table-column>
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
        :title="$t('Msg.ID_MSG_28')"
        :visible.sync="openEntDep"
        append-to-body>
        <el-tree :data="terGroupTree" node-key="id" ref="terGroupTree"
                 show-checkbox :check-strictly="true" default-expand-all highlight-current></el-tree>       <!--部门树-->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="selectDep">{{$t('Content.ID_OK')}}</el-button>
        </div>
      </el-dialog>            <!--选择终端分组-->

      <el-form :model="form">
        <el-form-item :label="$t('Content.ID_GROUP')" :label-width="LabelWidth">
          <input v-model="form.terGroup" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="clickEntDep" readonly="readonly"/>
        </el-form-item>
        <el-form-item v-if="isBatch" :label="$t('Content.ID_GENERATE_NUMBER')" :label-width="LabelWidth">
          <el-input-number v-model="form.num" :min="1" :max="999"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">{{$t('Content.ID_CANCEL')}}</el-button>
        <el-button type="primary" @click="generate">{{$t('Content.ID_OK')}}</el-button>
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
        terId: '',                    //部门ID
        groupId: '',                  //分组ID
        title: '',
        LabelWidth: '70px',
        form: {
          terGroup: '',               //终端分组
          num: 1                      //生成数量
        },
        value: 0,                     //生成与批量生成区分值
        terGroupTree: [],             //终端分组树
        isBatch: false,               //是否批量生成
        creator: sessionStorage.getItem('name')
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
          url: 'activate/create?number=' + this.form.num + '&terId=' + this.terId + '&creator=' + this.creator,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            this.$message({
              message: this.$t('Content.ID_GENERATE_SUCCESS'),
              showClose: true,
              center: true,
              type: 'success'
            });
            this.activeQuery()
          } else {
            this.$message({
              message: response.data.infor + '。',
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
              message: response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                              //查询激活码
      delCode() {
        if (this.rowId == '') {
          this.$message({
            message: this.$t('Msg.ID_MSG_29'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
        let ids = this.rowId.map(item => item.id).join(' ');
        this.$confirm(this.$t('Msg.ID_MSG_15'), this.$t('Content.ID_PROMPT'), {
          confirmButtonText: this.$t('Content.ID_OK'),
          cancelButtonText: this.$t('Content.ID_CANCEL'),
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
                message: this.$t('Content.ID_DELETE_SUCCESS'),
                showClose: true,
                center: true,
                type: 'success'
              });
              this.activeQuery()
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
        this.title = this.$t('Content.ID_GENERATE_ACTIVATION_CODE');
        this.isBatch = false
      },                                      //生成
      batch() {
        this.openDialog = true;
        this.title = this.$t('Content.ID_BATCH_ACTIVATION_CODE');
        this.isBatch = true
      },                                     //批量生成
      clickEntDep() {
        this.openEntDep = true;
        this.getTree()
      },                              //弹出选择终端分组对话框
      selectDep() {
        let tree = this.$refs.terGroupTree.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: this.$t('Msg.ID_MSG_28'), showClose: true, center: true, type: 'warning'});
          return false
        }
        this.terId = tree[0].id;
        this.form.terGroup = tree[0].label;
        this.openEntDep = false
      },                                //选择终端分组

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
            _this.terGroupTree = response.data.cust.trees
          } else {
            this.$message({
              message: response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                                  //获取树资源
      exportCode() {
        let ids = this.rowId.map(item => item.id).join(' ');
        this.$confirm(this.$t('Msg.ID_MSG_13'), this.$t('Content.ID_PROMPT'), {
          confirmButtonText: this.$t('Content.ID_OK'),
          cancelButtonText: this.$t('Content.ID_CANCEL'),
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'get',
            url: 'activate/export?ids=' + ids,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              let url = response.data.cust.desc;
              let a = document.createElement('a');
              a.href = url;
              a.download = '';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
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

      },                                //导出激活码
      unbundled() {
        let ids = this.rowId.map(item => item.id).join(' ');
        this.$confirm(this.$t('Msg.ID_MSG_14'), this.$t('Content.ID_PROMPT'), {
          confirmButtonText: this.$t('Content.ID_OK'),
          cancelButtonText: this.$t('Content.ID_CANCEL'),
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'get',
            url: 'activate/unbundled?ids=' + ids,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.$message({
                message: this.$t('Content.ID_UNBIND_SUCCESS'),
                showClose: true,
                center: true,
                type: 'success'
              });
              this.activeQuery()
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
      }                                  //解绑激活码
    }
  }
</script>


