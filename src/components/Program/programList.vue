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
      <div id="playTree">
        <div class="title">{{$t('Content.ID_PROGRAM_GROUP')}}</div>
        <div class="controlTree">
          <a @click="NewTree"><i class="el-icon-plus"></i>{{$t('Content.ID_NEW')}}</a>
          <a @click="EditTree"><i class="el-icon-edit"></i>{{$t('Content.ID_EDIT')}}</a>
          <a @click="delTree"><i class="el-icon-delete"></i>{{$t('Content.ID_DELETE')}}</a>
        </div>
        <el-tree :data="playTree" node-key="id" @node-click="handleNodeClick" show-checkbox :highlight-current="true"
                 :check-strictly="true" default-expand-all ref="tree" :expand-on-click-node="false"
                 @check-change="treeCheckCheck"></el-tree>
      </div>
      <div id="playList">
        <div class="title">{{$t('Content.ID_PROGRAM_LIST')}}</div>
        <div class="controlBox">
          <div class="search">
            <div>
              <el-select v-model="value" :placeholder="$t('Content.ID_IMAGE_MODE')">
                <el-option v-for="item in select"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
            <div>
              <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="searchName">
                <template slot="prepend">{{$t('Content.ID_PROGRAM_NAME')}}</template>
              </el-input>
            </div>
            <div>
              <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="searchResolution">
                <template slot="prepend">{{$t('Content.ID_RESOLUTION')}}</template>
              </el-input>
            </div>
            <el-button @click="queryPlayList">{{$t('Content.ID_RESEARCH')}}</el-button>
          </div>
          <div class="control">
            <a @click="newPlay"><i class="el-icon-plus"></i>{{$t('Content.ID_NEW')}}</a>
            <a @click="editPlay(playName)"><i class="el-icon-edit"></i>{{$t('Content.ID_EDIT')}}</a>
            <a @click="delPlay"><i class="el-icon-delete"></i>{{$t('Content.ID_DELETE')}}</a>
          </div>
        </div>
        <div v-if="value == '2'" class="tableList">
          <el-table
            :data="plays"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="name" align="center" :label="$t('Content.ID_PROGRAM_NAME')"></el-table-column>
            <el-table-column prop="preview" align="center" :label="$t('Content.ID_THUMBNAIL')">
              <template scope="scope">
                <img :src="scope.row.preview" width="100" height="70"/>
              </template>
            </el-table-column>
            <el-table-column prop="resolution" align="center" :label="$t('Content.ID_RESOLUTION')"></el-table-column>
            <el-table-column prop="status" align="center" :label="$t('Content.ID_STATUS')"></el-table-column>
            <el-table-column prop="terminalType" align="center"
                             :label="$t('Content.ID_TERMINAL_TYPE')"></el-table-column>
            <el-table-column prop="address" align="center" :label="$t('Content.ID_RESOURCE_SIZE')"></el-table-column>
            <el-table-column prop="address" align="center" :label="$t('Content.ID_PLAYTIME')"></el-table-column>
            <el-table-column prop="updateTime" align="center" :label="$t('Content.ID_UPDATE_TIME')"></el-table-column>
            <el-table-column prop="address" align="center" :label="$t('Content.ID_OPERATION')"></el-table-column>
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
      :title="$t('Content.ID_SELECT_TEMPLATE')"
      :visible.sync="setTem"
      width="58%"
      top="1vh"
    >
      <div class="temDialog">
        <div id="templateTree">
          <div class="title">{{$t('Content.ID_TEMPLATE')}}</div>
          <el-tree :data="templateTree" node-key="id" @node-click="temTreeClick" :expand-on-click-node="false"
                   default-expand-all></el-tree>
        </div>
        <div id="templateList">
          <div class="controlBox">
            <div class="search">
              <div style="width: 110px">
                <el-select v-model="tValue" :placeholder="$t('Content.ID_IMAGE_MODE')">
                  <el-option v-for="item in tSelect"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
              <div style="width:200px;">
                <el-input :placeholder="$t('Msg.ID_MSG_5')">
                  <template slot="prepend">{{$t('Content.ID_TEMPLATE_NAME')}}</template>
                </el-input>
              </div>
              <el-button>{{$t('Content.ID_RESEARCH')}}</el-button>
            </div>
          </div>
          <div v-if="tValue == '2'" class="tableList">
            <el-table :data="templates" style="width: 100%">
              <el-table-column prop="name" align="center" :label="$t('Content.ID_TEMPLATE_NAME')"></el-table-column>
              <el-table-column prop="preview" align="center" :label="$t('Content.ID_THUMBNAIL')">
                <template scope="scope">
                  <img :src="scope.row.preview" width="30" height="50"/>
                </template>
              </el-table-column>
              <el-table-column prop="resolution" align="center" :label="$t('Content.ID_RESOLUTION')"></el-table-column>
              <el-table-column prop="address" align="center" :label="$t('Content.ID_TERMINAL_TYPE')"></el-table-column>
              <el-table-column prop="creator" align="center" :label="$t('Content.ID_CREATOR')"></el-table-column>
              <el-table-column prop="updateTime" align="center" :label="$t('Content.ID_UPDATE_TIME')"></el-table-column>
              <el-table-column prop="desc" align="center" :label="$t('Content.ID_DESCRIPTION')"></el-table-column>
            </el-table>
          </div>
          <div v-else class="templateBox">
            <ul class="templateList">
              <li v-for="(template,id) in templates" :key="id" :id="template.id"
                  @click="selectedTem($event)" @dblclick="editPlay(template.name)">
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
        <el-button type="primary" @click="selectTem">{{$t('Content.ID_OK')}}</el-button>
  </span>
    </el-dialog><!--选择模板-->
    <el-dialog :title="treeTitle" ref="TreeDialog" :visible.sync="openTreeDialog" width="27.5%">
      <el-dialog width="30%" :title="$t('Content.ID_PARENT_GROUP')" :visible.sync="openSuperG" append-to-body>
        <el-tree :data="groupSuper" node-key="id" :check-strictly="true" show-checkbox
                 default-expand-all ref="groupSuper" @check-change="groupSuperCheckCheck"></el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openSuperG = false">{{$t('Content.ID_CANCEL')}}</el-button>
          <el-button type="primary" @click="selectSuperGroup">{{$t('Content.ID_OK')}}</el-button>
        </div>
      </el-dialog>            <!--上级分组选择-->
      <el-form :model="treeForm">
        <el-form-item :label="$t('Content.ID_GROUP_NAME')" :label-width="LabelWidth">
          <el-input v-model="treeForm.groupName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_PARENT_GROUP')" :label-width="LabelWidth">
          <input v-model="treeForm.superiorGroup" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="openSuperG = true" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="$t('Content.ID_GROUP_DESCRIPTION')" :label-width="LabelWidth">
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
          label: this.$t('Content.ID_IMAGE_MODE')
        }, {
          value: '2',
          label: this.$t('Content.ID_LIST_MODE')
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
          label: this.$t('Content.ID_IMAGE_MODE')
        }, {
          value: '2',
          label: this.$t('Content.ID_LIST_MODE')
        }],
        tPageCount: 12,     //每页显示数目
        tPageNo: 1,          //当前页
        tTotal: 0,            //总数目
        temName: '',          //模板名
        //树操作
        openTreeDialog: false,
        openTreeG: false,
        treeTitle: '',
        groupSuper: [],         //分组上级选择
        superId: '',             //分组上级ID
        openSuperG: false,
        creator: '',
        currentGroupId: '',       //当前组ID
        LabelWidth: '70px',
        treeForm: {
          groupName: '',
          superiorGroup: '',
          groupDesc: ''
        },
        ids: [],                //存储选中节目ID
        searchName: '',
        searchResolution: '',

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
            _this.groupSuper = _this.playTree = response.data.cust.trees
          } else {
            this.$message({
              message: response.data.infor + '。',
              showClose: true,
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
          url: 'program/query?groupId=' + this.treeId + '&pageNo=' + this.pageNo + '&pageCount=' + this.pageCount + '&name=' + this.searchName + '&resolution=' + this.searchResolution,
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
              message: response.data.infor + '。',
              showClose: true,
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
      },            //点击树回调
      selected(e) {
        let id = e.currentTarget.id;
        let playName = e.currentTarget.children[2].innerHTML;
        let target = e.currentTarget;
        /*if (e.target.tagName == 'DIV' || e.target.tagName == 'IMG' || e.target.tagName == 'P') {          //如果点击的是LI下面的子元素，就将子元素的父元素提取出来（即LI）。
          dom = e.target.offsetParent.id
          target = e.target.offsetParent
        } else {
          dom = e.target
          target = e.target
        }*/     //currentTarget与target的区别
        let children = target.children[0];
        if (children.style.display != 'block') {
          children.style.display = 'block';
          target.style.backgroundColor = "#ebebeb";
          this.playName = playName;
          this.ids.push(id)
        } else {
          children.style.display = 'none';
          target.style.backgroundColor = "white";
          this.playName = '';
          for (let i = 0; i < this.ids.length; i++) {
            if (this.ids[i] == id) this.ids.splice(i, 1)
          }       //取消则从ids删除该元素
        }
      },                     //单击选择文件
      newPlay() {
        this.setTem = true;
        this.queryTemList();
        this.getTemTree()
      },
      delPlay() {
        let ids = this.ids.join(' ');
        if (ids == '') {
          this.$message({
            message: this.$t('Msg.ID_MSG_34'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
        this.$confirm(this.$t('Msg.ID_MSG_9'), this.$t('Content.ID_PROMPT'), {
          confirmButtonText: this.$t('Content.ID_OK'),
          cancelButtonText: this.$t('Content.ID_CANCEL'),
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: 'program/delete?ids=' + ids,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.queryPlayList();
              this.$message({
                message: this.$t('Content.ID_DELETE_SUCCESS'),
                showClose: true,
                center: true,
                type: 'success'
              });
              this.check = false
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
      },
      editPlay(name) {
        if (name == '') {
          this.$message({
            message: this.$t('Msg.ID_MSG_18'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
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
              message: response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                  //获取模板列表
      temTreeClick(val) {
        this.tTreeId = val.id;
        this.queryTemList()
      },               //点击模板树回调
      temChange(val) {
        this.tPageNo = val
        this.queryTemList()
      },                  //模板翻页回调
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
              message: response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                    //查询模板树
      selectedTem(e) {
        let dom = e.currentTarget.children[2].innerHTML;
        let target = e.currentTarget;
        let children = target.children[0];
        //单选判定所需
        let p = target.parentNode.childNodes;
        let id = e.currentTarget.id;

        if (children.style.display != 'block') {
          children.style.display = 'block';
          target.style.backgroundColor = "#ebebeb";
          this.temName = dom;
          //去掉兄弟元素的选择项
          if (p.length > 1) {
            for (let i = 0; i <= p.length; i++) {
              if (p[i].id !== id) {
                p[i].children[0].style.display = 'none';
              }
            }
          }
        } else {
          children.style.display = 'none';
          target.style.backgroundColor = "white";
          this.temName = ''
        }
      },                  //单击选择文件
      selectTem() {
        if (this.temName === '') {
          this.$message({
            message: this.$t('Msg.ID_MSG_36'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false;
        }
        this.setTem = false;
        this.$router.push({path: '/programMack', query: {name: this.temName, groupId: this.tTreeId, type: 0}})
      },                     //新建模板

      NewTree() {
        this.treeForm.groupName = '';
        this.treeForm.superiorGroup = '';
        this.treeTitle = this.$t('Content.ID_NEW_GROUP');
        this.openTreeDialog = true
      },                       //新建节目分组
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
      },                      //选择上级分组
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
                message: this.$t('Content.ID_DELETE'),
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
      },                       //编辑节目分组
      selectSuperGroup() {
        let tree = this.$refs.groupSuper.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: this.$t('Msg.ID_MSG_40'), showClose: true, center: true, type: 'warning'});
          return false
        }
        this.superId = tree[0].id;
        this.treeForm.superiorGroup = tree[0].label;
        this.openSuperG = false
      },              //确认修改节目分组
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
              this.$message({message: this.$t('Content.ID_MSG_37'), showClose: true, center: true, type: 'success'});
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
            if (response.data.code === '0000') {
              _this.getTree();
              _this.$message({message: this.$t('Content.ID_MSG_38'), showClose: true, center: true, type: 'success'});
              this.openTreeDialog = false;
              _this.treeForm.superiorGroup = '';
              _this.treeForm.groupName = ''
            } else if (response.data.code === 'TREE006') {
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
      },                   //删除节目分组
    }
  }
</script>
