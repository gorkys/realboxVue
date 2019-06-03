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

.templateBox,
.tableList {
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
    <nav-bar @lang-change="langChange"></nav-bar>
    <breadcrumb></breadcrumb>
    <Content>
      <div id="templateTree">
        <div class="title">{{$t('Content.ID_TEMPLATE')}}</div>
        <el-tree
          :data="templateTree"
          node-key="id"
          :highlight-current="true"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
          default-expand-all
        ></el-tree>
      </div>
      <div id="templateList">
        <div class="title">{{treeName}}</div>
        <div class="controlBox">
          <div class="search">
            <div>
              <el-select v-model="value" :placeholder="$t('Content.ID_IMAGE_MODE')">
                <el-option
                  v-for="item in select"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="searchName">
                <template slot="prepend">{{$t('Content.ID_TEMPLATE_NAME')}}</template>
              </el-input>
            </div>
            <div>
              <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="searchResolution">
                <template slot="prepend">{{$t('Content.ID_RESOLUTION')}}</template>
              </el-input>
            </div>
            <el-button @click="queryList">{{$t('Content.ID_RESEARCH')}}</el-button>
          </div>
          <div class="control">
            <a v-if="treeName==$t('Content.ID_USER_TEMPLATE')" @click="openDialog=true">
              <i class="el-icon-plus"></i>
              {{$t('Content.ID_NEW')}}
            </a>
            <a v-if="treeName==$t('Content.ID_USER_TEMPLATE')" @click="editTemplate(temName)">
              <i class="el-icon-edit"></i>
              {{$t('Content.ID_EDIT')}}
            </a>
            <a v-if="treeName==$t('Content.ID_USER_TEMPLATE')" @click="delTemplate">
              <i class="el-icon-delete"></i>
              {{$t('Content.ID_DELETE')}}
            </a>
          </div>
        </div>
        <div v-if="value == '2'" class="tableList">
          <el-table :data="templates" style="width: 100%">
            <el-table-column prop="name" align="center" :label="$t('Content.ID_TEMPLATE_NAME')"></el-table-column>
            <el-table-column prop="preview" align="center" :label="$t('Content.ID_THUMBNAIL')">
              <template slot-scope="scope">
                <img :src="scope.row.preview" width="30" height="50">
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
            <li
              v-for="(template,id) in templates"
              :key="id"
              :id="template.id"
              @click="selected($event)"
              @dblclick="editTemplate(template.name)"
            >
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
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </Content>
    <footer-bar></footer-bar>
    <el-dialog
      :title="$t('Content.ID_NEW_TEMPLATE')"
      ref="dialog"
      :visible.sync="openDialog"
      width="500px"
    >
      <el-form :model="form">
        <el-form-item :label="$t('Content.ID_TEMPLATE_NAME')" :label-width="LabelWidth">
          <el-input v-model="form.temName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_RESOLUTION')" :label-width="LabelWidth">
          <el-select v-model="rltValue" style="width: 100%" @change="rltChange">
            <el-option
              v-for="item in resolution"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              auto-complete="off"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_TEMPLATE_TYPE')" :label-width="LabelWidth">
          <el-input v-model="form.temType" auto-complete="off" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_REMARK')" :label-width="LabelWidth">
          <el-input type="textarea" v-model="form.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">{{$t('Content.ID_CANCEL')}}</el-button>
        <el-button type="primary" @click="NewTemplateMake">{{$t('Content.ID_OK')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import NavBar from "@/components/common/Navbar";
import FooterBar from "@/components/common/footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import Content from "@/components/common/content";
import { getTree } from "@/api/Tree";
import { getTemplate, delTemplate } from "@/api/template";

export default {
  mounted: function() {
    this.getTree();
    this.queryList();
  },
  data() {
    return {
      templateTree: [],
      templates: [], //模板列表
      value: "",
      select: [
        {
          value: "1",
          label: this.$t("Content.ID_IMAGE_MODE")
        },
        {
          value: "2",
          label: this.$t("Content.ID_LIST_MODE")
        }
      ],
      pageCount: 21, //每页显示数目
      pageNo: 1, //当前页
      total: 0, //总数目
      treeId: 21,

      openDialog: false, //新建对话框
      LabelWidth: "100px",
      form: {
        temName: "",
        resolution: "1280*720",
        temType: this.$t("Content.ID_USER_TEMPLATE"),
        desc: "" //备注
      },
      rltValue: "1280*720",
      resolution: [
        {
          value: "1",
          label: "1280*720"
        },
        {
          value: "2",
          label: "1920*1080"
        },
        {
          value: "3",
          label: "1080*1740"
        },
        {
          value: "4",
          label: "720*1280"
        },
        {
          value: "5",
          label: "1920*200"
        },
        {
          value: "6",
          label: "1080*1920"
        }
      ], //分辨率
      temName: "", //模板名
      treeName: this.$t("Content.ID_SYSTEM_TEMPLATE"),
      ids: [], //存储选中节目ID
      searchName: "", //搜索名称
      searchResolution: "" //搜索分辨率
    };
  },
  components: {
    NavBar,
    FooterBar,
    Breadcrumb,
    Content
  },
  methods: {
    getTree() {
      let _this = this;
      let params = {
        id: 20
      };
      getTree(params).then(response => {
        _this.templateTree = response.cust.trees;
      });
    }, //查询模板树
    queryList() {
      let _this = this;
      this.templates = [];
      let params = {
        groupId: this.treeId,
        pageNo: this.pageNo,
        pageCount: this.pageCount,
        name: this.searchName,
        resolution: this.searchResolution
      };
      getTemplate(params).then(response => {
        let templates = response.cust.templates;
        _this.total = response.cust.pages.count;
        for (let template of templates) {
          _this.templates.push(template);
        }
      });
    }, //获取模板列表
    editTemplate(name) {
      this.temName = "";
      if (this.treeName === this.$t("Content.ID_SYSTEM_TEMPLATE")) {
        return false;
      }
      if (name === "") {
        this.$message({
          message: this.$t("Msg.ID_MSG_36"),
          showClose: true,
          center: true,
          type: "warning"
        });
        return false;
      }
      this.$router.push({
        path: "templateMake",
        query: { name: name, groupId: this.treeId }
      });
    }, //编辑模板
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryList();
    }, //翻页回调
    handleNodeClick(val) {
      this.treeId = val.id;
      this.form.temType = this.treeName = val.label;
      this.queryList();
    }, //点击树回调
    selected(e) {
      let dom = e.currentTarget.id;
      let target = e.currentTarget; //currentTarget与target的区别
      /*if (e.target.tagName == 'DIV' || e.target.tagName == 'IMG' || e.target.tagName == 'P') {          //如果点击的是LI下面的子元素，就将子元素的父元素提取出来（即LI）。
          dom = e.target.offsetParent.id
          target = e.target.offsetParent
        } else {
          dom = e.target
          target = e.target
        }*/ let children =
        target.children[0];
      if (children.style.display !== "block") {
        children.style.display = "block";
        target.style.backgroundColor = "#ebebeb";
        this.ids.push(dom);
        this.temName = target.children[2].innerText;
      } else {
        children.style.display = "none";
        target.style.backgroundColor = "white";
        for (let i = 0; i < this.ids.length; i++) {
          if (this.ids[i] === dom) this.ids.splice(i, 1);
        } //取消则从ids删除该元素
        this.temName = "";
      }
    }, //单击选择文件
    delTemplate() {
      let ids = this.ids.join(" ");
      if (ids === "") {
        this.$message({
          message: this.$t("Msg.ID_MSG_36"),
          showClose: true,
          center: true,
          type: "warning"
        });
        return false;
      }
      this.$confirm(this.$t("Msg.ID_MSG_16"), this.$t("Content.ID_PROMPT"), {
        confirmButtonText: this.$t("Content.ID_OK"),
        cancelButtonText: this.$t("Content.ID_CANCEL"),
        type: "warning"
      }).then(() => {
        let params = { ids: ids };
        delTemplate(params).then(response => {
          this.queryList();
          this.$message({
            message: this.$t("Content.ID_DELETE_SUCCESS"),
            showClose: true,
            center: true,
            type: "success"
          });
        });
      });
    }, //删除模板
    NewTemplateMake() {
      if (this.form.temName === "") {
        this.$message({
          message: this.$t("Msg.ID_MSG_59"),
          showClose: true,
          center: true,
          type: "warning"
        });
      }
      sessionStorage.setItem("temName", this.form.temName);
      sessionStorage.setItem("resolution", this.form.resolution);
      sessionStorage.setItem("temType", this.form.temType);
      sessionStorage.setItem("desc", this.form.desc);
      this.$router.push("/templateMake");
    }, //新建模板
    rltChange(val) {
      this.form.resolution = this.resolution
        .map(item => {
          if (item.value === val) return item.label;
        })
        .join("");
    }, //分辨率选择
    langChange() {
      this.getTree();
      this.select = [
        {
          value: "1",
          label: this.$t("Content.ID_IMAGE_MODE")
        },
        {
          value: "2",
          label: this.$t("Content.ID_LIST_MODE")
        }
      ];
      this.treeName = this.$t("Content.ID_SYSTEM_TEMPLATE");
    }
  }
};
</script>
