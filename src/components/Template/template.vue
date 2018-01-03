<style scoped>
  #template {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }

  #templateTree {
    border: 1px solid #c1c1c1;
    height: 98%;
    width: 12%;
    border-radius: 10px;
    overflow: hidden;
  }

  #templateList {
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
</style>

<template>
  <div id="template">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <Content>
      <div id="templateTree">
        <div class="title">模板管理</div>
        <el-tree :data="templateTree" node-key="id" @node-click="handleNodeClick" default-expand-all></el-tree>
      </div>
      <div id="templateList">
        <div class="title">模板列表</div>
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
                <template slot="prepend">模板名称</template>
              </el-input>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容">
                <template slot="prepend">所属机构</template>
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
            <a @click="openDialog=true"><i class="el-icon-plus"></i>新建</a>
            <a><i class="el-icon-edit"></i>修改</a>
            <a @click="delTemplate"><i class="el-icon-delete"></i>删除</a>
          </div>
        </div>
        <div v-if="value == '2'" class="tableList">
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
                @click="selected($event)" @dblclick="editTemplate(template.name)">
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
            @current-change="handleCurrentChange"
            :page-size="pageCount"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </Content>
    <footer-bar></footer-bar>
    <el-dialog title="新建模板" ref="dialog" :visible.sync="openDialog" width="18%">
      <el-form :model="form">
        <el-form-item label="模板名称" :label-width="LabelWidth">
          <el-input v-model="form.temName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分辨率" :label-width="LabelWidth">
          <el-select v-model="rltValue" placeholder="800×600" style="width: 100%" @change="rltChange">
            <el-option v-for="item in resolution"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       auto-complete="off"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板类型" :label-width="LabelWidth">
          <el-input v-model="form.temType" auto-complete="off" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="LabelWidth">
          <el-input type="textarea" v-model="form.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">取 消</el-button>
        <el-button type="primary" @click="NewTemplateMake">确 定</el-button>
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
      this.getTree()
      this.queryList()
    },
    data() {
      return {
        templateTree: [],
        templates: [],          //模板列表
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
        treeId: 22,
        check: false,          //选中资源的变量

        openDialog: false,       //新建对话框
        LabelWidth: '70px',
        form: {
          temName: '',
          resolution: '800×600',
          temType: '系统模板',
          desc: '',              //备注
        },
        rltValue: '',
        resolution: [{
          value: '1',
          label: '800×600'
        }, {
          value: '2',
          label: '1920×1080'
        }, {
          value: '3',
          label: '1366×768'
        }],        //分辨率
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
      queryList() {
        let _this = this
        this.templates = []
        this.$http({
          method: 'get',
          url: 'template/query?groupId=' + this.treeId + '&pageNo=' + this.pageNo + '&pageCount=' + this.pageCount,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let templates = response.data.cust.templates
            _this.total = response.data.cust.pages.count
            for (let template of templates) {
              _this.templates.push(template)
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
      editTemplate(name) {
        this.$router.push({path: "templateMake", query: {name: name, groupId: this.treeId}})
      },         //编辑模板
      handleCurrentChange(val) {
        this.pageNo = val
        this.getRoleList()
      },        //翻页回调
      handleNodeClick(val) {
        this.treeId = val.id
        this.form.temType = this.treeName = val.label
        debugger
        this.queryList()
      },          //点击树回调
      selected(e) {
        this.check = !this.check
        let dom = e.currentTarget.id;
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
          this.id = dom

        } else {
          children.style.display = 'none';
          target.style.backgroundColor = "white";
          this.id = ''
        }
      },                    //单击选择文件
      delTemplate() {
        if (this.id == '') {
          this.$message({
            message: '未选择模板！',
            center: true,
            type: 'warning'
          })
          return false
        }
        this.$confirm('此操作将删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: 'template/delete?ids=' + this.id,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.queryList()
              this.$message({
                message: '删除成功！',
                center: true,
                type: 'success'
              })
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                center: true,
                type: 'error'
              });
            }
          })
        })
      },                          //删除模板
      NewTemplateMake() {
        if (this.form.temName == '') {
          this.$message({
            message: '请输入模板名称！',
            center: true,
            type: 'warning'
          });
          return false
        }
        sessionStorage.setItem('temName', this.form.temName);
        sessionStorage.setItem('resolution', this.form.resolution);
        sessionStorage.setItem('temType', this.form.temType);
        sessionStorage.setItem('desc', this.form.desc);
        this.$router.push('/templateMake')
      },        //新建模板
      rltChange(val) {
        this.form.resolution = this.resolution.map(item => {
          if (item.value == val) return item.label
        }).join('');
      }
    }
  }
</script>
