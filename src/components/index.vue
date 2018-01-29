<template>
  <div class="home">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <div class="content">
      <ul class="fastNav">
        <li>
          <a @click="newPlay">
            <i class="iconfont icon-server-kuaisufabu"></i>
            <b>快速发布</b>
          </a>
        </li>
        <li>
          <router-link to="auditList">
            <i class="iconfont icon-shenhe"></i>
            <b>审核列表</b>
          </router-link>
        </li>
        <li>
          <router-link to="play">
            <i class="iconfont icon-jiemu"></i>
            <b>节目列表</b>
          </router-link>
        </li>
        <li>
          <router-link to="terminal">
            <i class="iconfont icon-zhongduan"></i>
            <b>终端管理</b>
          </router-link>
        </li>
        <li>
          <router-link to="resource">
            <i class="iconfont icon-ziyuanguanli"></i>
            <b>资源管理</b>
          </router-link>
        </li>
      </ul>
      <div style="font-size: 2rem;padding-left: 100px;margin-bottom: 20px;">发布步骤：</div>
      <el-steps :active="4" align-center>
        <el-step title="选择模板" description="选择一个的模板"></el-step>
        <el-step title="选择素材" description="为模板填充素材"></el-step>
        <el-step title="设置属性" description="设置播放的属性值"></el-step>
        <el-step title="发布节目" description="发布节目成功"></el-step>
      </el-steps>
    </div>
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
          <el-tree :data="templateTree" node-key="id" @node-click="temTreeClick" :expand-on-click-node="false"
                   default-expand-all></el-tree>
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
        <el-button type="primary" @click="selectTem">确 定</el-button>
  </span>
    </el-dialog><!--选择模板-->
  </div>
</template>

<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'

  export default {
    data() {
      return {
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
        temName: '',          //模板名
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {
      /*模板事件*/
      newPlay() {
        this.setTem = true;
        this.queryTemList();
        this.getTemTree()
      },                       //新建节目
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
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                    //查询模板树
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
      },                  //单击选择文件
      selectTem() {
        this.setTem = false
        this.$router.push({path: '/programMack', query: {name: this.temName, groupId: this.tTreeId, type: 0}})
      },                     //新建模板
    }
  }
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }

  .content {
    height: 73%;
    border-radius: 10px;
    margin: 20px 20px 0px;
    background-color: white;
    padding: 5% 270px 0;
    box-shadow: 0px 7px 4.8px 3.2px rgba(0, 0, 0, 0.1);
  }

  .fastNav {
    display: flex;
    justify-content: space-around;
    margin-bottom: 200px;
  }

  .fastNav li {
    text-align: center;
  }

  .fastNav li a b {
    color: #d33a31;
    display: block;
    font-size: 2rem;
  }

  .fastNav li a i {
    font-size: 100px;
    color: #d33a31;
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

  .title {
    height: 40px;
    background-color: #d33a31;
    line-height: 40px;
    padding-left: 10px;
    font-size: 1.4rem;
    color: white;
    letter-spacing: 3px;
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
</style>
