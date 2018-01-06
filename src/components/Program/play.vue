<style scoped>
  #play {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }

  #playTree {
    border: 1px solid #c1c1c1;
    height: 98%;
    width: 12%;
    border-radius: 10px;
    overflow: hidden;
  }

  #playList {
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

  .playBox, .tableList {
    padding: 20px;
    height: 580px;
  }

  .playList {
    display: flex;
    flex-wrap: wrap;
  }

  .playList li {
    width: 150px;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 30px 40px;
    cursor: pointer;
    padding: 10px 5px;
    border-radius: 5px;
    position: relative;
  }

  .imgBox {
    width: 130px;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid #e7e7e7;
  }

  .playList li img {
    max-width: 120px;
    max-height: 120px;
  }

  .playList li:hover {
    background-color: #ebebeb !important;
  }

  .playList p {
    min-width: 20px;
  }

  .el-upload-list__item-status-label {
    position: absolute;
    right: -15px;
    top: -7px;
    width: 46px;
    height: 26px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 1px 1px #ccc;
  }

  .el-upload-list__item-status-label i {
    font-size: 12px;
    margin-top: 12px;
    transform: rotate(-45deg);
    color: white;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }

  /*模板样式*/
  .temDialog {
    width: 100%;
    height: 100%;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }

  #templateTree {
    border: 1px solid #c1c1c1;
    overflow: hidden;
    border-radius: 10px;
    width: 12%;
  }

  #templateList {
    border: 1px solid #c1c1c1;
    height: 98%;
    overflow: hidden;
    border-radius: 10px;
    width: 87%;
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

  .templateBox, .tableList {
    padding: 20px;
    height: 580px;
  }

  .templateList {
    display: flex;
    flex-wrap: wrap;
  }

  .templateList li {
    width: 150px;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 30px 40px;
    cursor: pointer;
    padding: 10px 5px;
    border-radius: 5px;
    position: relative;
  }

  .imgBox {
    width: 130px;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid #e7e7e7;
  }

  .templateList li img {
    max-width: 120px;
    max-height: 120px;
  }

  .templateList li:hover {
    background-color: #ebebeb !important;
  }

  .templateList p {
    min-width: 20px;
  }
</style>

<template>
  <div id="play">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <Content>
      <div id="playTree">
        <div class="title">节目分组</div>
        <el-tree :data="playTree" node-key="id" @node-click="handleNodeClick" :expand-on-click-node="false" default-expand-all></el-tree>
      </div>
      <div id="playList">
        <div class="title">节目列表</div>
        <div class="controlBox">
          <div class="search">
            <div style="width: 110px">
              <el-select v-model="value" placeholder="图形模式">
                <el-option v-for="item in select"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">节目名称</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">所属部门</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">分辨率</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">终端类型</template>
              </el-input>
            </div>
            <el-button>搜索</el-button>
          </div>
          <div class="control">
            <a @click="newPlay"><i class="el-icon-plus"></i>新建</a>
            <a @click="editPlay"><i class="el-icon-edit"></i>修改</a>
            <a @click="delPlay"><i class="el-icon-delete"></i>删除</a>
          </div>
        </div>
        <div v-if="value == '2'" class="tableList">
          <el-table
            :data="plays"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="name" align="center" label="节目名称"></el-table-column>
            <el-table-column prop="preview" align="center" label="预览图">
              <template scope="scope">
                <img :src="scope.row.preview" width="100" height="70"/>
              </template>
            </el-table-column>
            <el-table-column prop="resolution" align="center" label="分辨率"></el-table-column>
            <el-table-column prop="status" align="center" label="状态"></el-table-column>
            <el-table-column prop="terminalType" align="center" label="终端类型"></el-table-column>
            <el-table-column prop="address" align="center" label="素材大小"></el-table-column>
            <el-table-column prop="address" align="center" label="播放时长"></el-table-column>
            <el-table-column prop="updateTime" align="center" label="更新时间"></el-table-column>
            <el-table-column prop="address" align="center" label="操作"></el-table-column>
          </el-table>
        </div>
        <div v-else class="playBox">
          <ul class="playList">
            <li v-for="(play,id) in plays" :key="id" :id="play.id"
                @click="selected($event)" @dblclick="editTemplate(play.name)">
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-check"></i>
              </label>
              <div class="imgBox">
                <img :src="play.preview">
              </div>
              <p>{{play.name}}</p>
            </li>
          </ul>
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
    <el-dialog
      title="选择模板"
      :visible.sync="setTem"
      width="58%"
      top="1vh"
    >
      <div class="temDialog">
        <div id="templateTree">
          <div class="title">模板管理</div>
          <el-tree :data="templateTree" node-key="id" @node-click="temTreeClick" :expand-on-click-node="false" default-expand-all></el-tree>
        </div>
        <div id="templateList">
          <div class="controlBox">
            <div class="search">
              <div style="width: 110px">
                <el-select v-model="tValue" placeholder="图形模式">
                  <el-option v-for="item in tSelect"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
              <div style="width:200px;">
                <el-input placeholder="请输入内容">
                  <template slot="prepend">模板名称</template>
                </el-input>
              </div>
              <el-button>搜索</el-button>
            </div>
          </div>
          <div v-if="tValue == '2'" class="tableList">
            <el-table :data="templates" style="width: 100%">
              <el-table-column prop="name" align="center" label="模板名称"></el-table-column>
              <el-table-column prop="preview" align="center" label="预览图">
                <template scope="scope">
                  <img :src="scope.row.preview" width="30" height="50"/>
                </template>
              </el-table-column>
              <el-table-column prop="address" align="center" label="所属机构"></el-table-column>
              <el-table-column prop="resolution" align="center" label="分辨率"></el-table-column>
              <el-table-column prop="address" align="center" label="终端类型"></el-table-column>
              <el-table-column prop="creator" align="center" label="创建人"></el-table-column>
              <el-table-column prop="updateTime" align="center" label="更新时间"></el-table-column>
              <el-table-column prop="desc" align="center" label="描述"></el-table-column>
            </el-table>
          </div>
          <div v-else class="templateBox">
            <ul class="templateList">
              <li v-for="(template,id) in templates" :key="id" :id="template.id"
                  @click="selectedTem($event)">
                <label class="el-upload-list__item-status-label">
                  <i class="el-icon-upload-success el-icon-check"></i>
                </label>
                <div class="imgBox">
                  <img :src="template.preview">
                </div>
                <p>{{template.name}}</p>
              </li>
            </ul>
          </div>
          <div class="page">
            <el-pagination
              @current-change="temChange"
              :page-size="tPageCount"
              layout="total, prev, pager, next, jumper"
              :total="tTotal">
            </el-pagination>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectTem">确 定</el-button>
  </span>
    </el-dialog><!--选择模板-->
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'
  import Content from '@/components/common/content'

  export default {
    mounted: function () {
      this.getTree();
      this.queryPlayList()
    },
    data() {
      return {
        playTree: [],               //节目树
        //节目列表
        plays: [],
        value: '',
        select: [{
          value: '1',
          label: '图形模式'
        }, {
          value: '2',
          label: '列表模式'
        }],
        pageCount: 21,     //每页显示数目
        pageNo: 1,          //当前页
        total: 0,            //总数目
        treeId: 31,
        check: false,          //选中资源的变量
        playName: '',           //节目名称
        //模板选择
        setTem: false,
        tTreeId: 22,
        templates: [],          //模板列表
        templateTree: [],
        tValue: '',
        tSelect: [{
          value: '1',
          label: '图形模式'
        }, {
          value: '2',
          label: '列表模式'
        }],
        tPageCount: 12,     //每页显示数目
        tPageNo: 1,          //当前页
        tTotal: 0,            //总数目
        temName: ''
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
          url: 'tree/query?id=30',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.playTree = response.data.cust.trees
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },
      queryPlayList() {
        let _this = this;
        this.plays = [];
        this.$http({
          method: 'get',
          url: 'program/query?groupId=' + this.treeId + '&pageNo=' + this.pageNo + '&pageCount=' + this.pageCount,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let programs = response.data.cust.programs;
            _this.total = response.data.cust.pages.count;
            for (let play of programs) {
              _this.plays.push(play);
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
      handleCurrentChange(val) {
        this.pageNo = val
        this.getRoleList()
      },        //翻页回调
      handleNodeClick(val) {
        val.id != 30 ? this.treeId = val.id : this.treeId = 31;
        this.queryPlayList()
      },          //点击树回调
      selected(e) {
        this.check = !this.check
        let id = e.currentTarget.id
        let playName = e.currentTarget.children[2].innerHTML;
        let target = e.currentTarget
        /*if (e.target.tagName == 'DIV' || e.target.tagName == 'IMG' || e.target.tagName == 'P') {          //如果点击的是LI下面的子元素，就将子元素的父元素提取出来（即LI）。
          dom = e.target.offsetParent.id
          target = e.target.offsetParent
        } else {
          dom = e.target
          target = e.target
        }*/     //currentTarget与target的区别
        let children = target.children[0];
        if (this.check) {
          children.style.display = 'block';
          target.style.backgroundColor = "#ebebeb";
          this.playName = playName
          this.id = id
        } else {
          children.style.display = 'none';
          target.style.backgroundColor = "white";
          this.playName = ''
          this.id = ''
        }
      },                    //单击选择文件
      newPlay() {
        this.setTem = true;
        this.queryTemList();
        this.getTemTree()
      },
      delPlay() {

        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: 'program/delete?ids=' + this.id,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.queryPlayList()
              this.$message({
                message: '删除成功！',
                center: true,
                type: 'success'
              })
              this.check = false
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
      editPlay() {
        this.$router.push({path: '/programMack', query: {name: this.playName, groupId: this.treeId, type: 1}})
      },
      /*模板事件*/
      queryTemList() {
        let _this = this;
        this.templates = [];
        this.$http({
          method: 'get',
          url: 'template/query?groupId=' + this.tTreeId + '&pageNo=' + this.tPageNo + '&pageCount=' + this.tPageCount,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let templates = response.data.cust.templates;
            _this.tTotal = response.data.cust.pages.count;
            for (let template of templates) {
              _this.templates.push(template);
            }
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },              //获取模板列表
      temTreeClick(val) {
        this.tTreeId = val.id;
        this.queryTemList()
      },          //点击模板树回调
      temChange(val) {
        this.tPageNo = val
        this.queryTemList()
      },        //模板翻页回调
      getTemTree() {
        let _this = this
        this.$http({
          method: 'get',
          url: 'tree/query?id=20',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.templateTree = response.data.cust.trees
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                //查询模板树
      selectedTem(e) {
        this.check = !this.check
        let dom = e.currentTarget.children[2].innerHTML;
        let target = e.currentTarget
        let children = target.children[0];
        if (this.check) {
          children.style.display = 'block';
          target.style.backgroundColor = "#ebebeb";
          this.temName = dom
        } else {
          children.style.display = 'none';
          target.style.backgroundColor = "white";
          this.temName = ''
        }
      },                    //单击选择文件
      selectTem() {
        this.setTem = false
        this.$router.push({path: '/programMack', query: {name: this.temName, groupId: this.tTreeId, type: 0}})
      },                //新建模板
    }
  }
</script>
