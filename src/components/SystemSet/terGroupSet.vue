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
    <nav-bar @lang-change="langChange"></nav-bar>
    <Breadcrumb></Breadcrumb>
    <div class="content">
      <div class="title">{{$t('Content.ID_TERMINAL_SETTINGS')}}</div>
      <div class="controlBox">
        <a @click="New"><i class="el-icon-plus"></i>{{$t('Content.ID_NEW')}}</a>
        <a @click="Edit"><i class="el-icon-edit"></i>{{$t('Content.ID_EDIT')}}</a>
        <a @click="delDeartment"><i class="el-icon-delete"></i>{{$t('Content.ID_DELETE')}}</a>
        <a @click="getTree"><i class="el-icon-refresh"></i>{{$t('Content.ID_REFRESH')}}</a>
        <a @click="setting"><i class="el-icon-setting"></i>{{$t('Content.ID_PARAMTERS_SETTING')}}</a>
      </div>
      <el-tree
        :data="departmentTree"
        show-checkbox
        default-expand-all
        node-key="id"
        @check-change="depCheckChang"
        ref="tree" :check-strictly="true"
        highlight-current>
      </el-tree>
    </div>
    <footer-bar></footer-bar>
    <el-dialog
      width="400px"
      :title="$t('Content.ID_PARAMTERS_SETTING')"
      :visible.sync="dialogSetting"
      append-to-body>
      <el-form ref="settingForm" :model="settingForm" label-width="100px">
        <el-form-item :label="$t('Content.ID_SHOW_SETTING')">
          <el-checkbox-group v-model="settingForm.type" size="small">
            <el-checkbox :label="$t('Content.ID_SHOW_WEATHER')" name="type"></el-checkbox>
            <el-checkbox :label="$t('Content.ID_SHOW_TIME')" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSetting = false">{{$t('Content.ID_CANCEL')}}</el-button>
        <el-button type="primary" @click="submitSetting">{{$t('Content.ID_OK')}}</el-button>
      </div>
    </el-dialog>            <!--天气时间显示-->
    <el-dialog :title="title" ref="dialog" :visible.sync="openDialog" width="27.5%">
      <el-dialog
        width="30%"
        :title="$t('Content.ID_PARENT_GROUP')"
        :visible.sync="innerVisible"
        append-to-body>
        <el-tree
          :data="departmentTree" show-checkbox default-expand-all :check-strictly="true"
          node-key="id" ref="departmentTree" highlight-current @check-change="superiorDepCheckChang">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">{{$t('Content.ID_CANCEL')}}</el-button>
          <el-button type="primary" @click="submitSD">{{$t('Content.ID_OK')}}</el-button>
        </div>
      </el-dialog>            <!--上级分组选择-->
      <el-form :model="form" label-width="200">
        <el-form-item :label="$t('Content.ID_GROUP_NAME')" :label-width="LabelWidth">
          <el-input v-model="form.deartmentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_PARENT_GROUP')" :label-width="LabelWidth">
          <input v-model="form.superiorDeartment" class="el-input__inner" auto-complete="off"
                 style="cursor: pointer" @click="innerVisible = true" readonly="readonly"/>
        </el-form-item>
        <el-form-item :label="$t('Content.ID_GROUP_DESCRIPTION')" :label-width="LabelWidth">
          <el-input type="textarea" v-model="form.deartmentDescribe" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">{{$t('Content.ID_CANCEL')}}</el-button>
        <el-button type="primary" @click="submit">{{$t('Content.ID_OK')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'
  import {getTree, delTree, updateTree, newTree} from "@/api/Tree";
  import {setTerminalGroupWea} from "@/api/terminal";

  export default {
    mounted: function () {
      this.getTree()
    },
    data() {
      return {
        label: 'aa',                        //新增树的子名称
        dialogSetting: false,                //设置属性对话框
        openDialog: false,                  //打开对话框
        innerVisible: false,                //选择上级分组的对话框
        settingForm:{
          type:[]
        },
        title: '',                          //弹出框标题
        form: {
          deartmentName: '',                 // 分组名称
          superiorDeartment: '',             //上级分组
          deartmentDescribe: ''              //分组备注
        },
        LabelWidth: '100px',
        departmentTree: [],
        superiorId: '',                     //上级分组ID
        treeId: 40,                         //终端树ID
        creator: '',                         //创建人
        departmentId: '',                    //分组ID  编辑用
        targetId: '',                       //编辑时需要移动到的目标树ID
        i: 0,                                //记录点击次数
        j: 0,
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {
      depCheckChang(data, node) {
        this.i++;
        if (this.i % 2 === 0) {
          if (node) {
            this.$refs.tree.setCheckedNodes([]);
            this.$refs.tree.setCheckedNodes([data]);
            //交叉点击节点
          } else {
            this.$refs.tree.setCheckedNodes([]);
            //点击已经选中的节点，置空
          }
        }
      },        //树的单选实现
      superiorDepCheckChang(data, node) {
        this.j++;
        if (this.j % 2 === 0) {
          if (node) {
            this.$refs.departmentTree.setCheckedNodes([]);
            this.$refs.departmentTree.setCheckedNodes([data]);
            //交叉点击节点
          } else {
            this.$refs.departmentTree.setCheckedNodes([]);
            //点击已经选中的节点，置空
          }
        }
      },            //上级树的单选实现
      getTree: function () {
        let _this = this;
        let params = {
          id: this.treeId
        };
        getTree(params).then(response => {
          _this.departmentTree = response.cust.trees
        })
      },         //获取树资源
      addDeartment() {
        if (this.form.deartmentName === '') {
          this.$message({message: this.$t('Msg.ID_MSG_41'), showClose: true, center: true, type: 'warning'});
          return false
        }
        if (this.form.superiorDeartment === '') {
          this.$message({message: this.$t('Msg.ID_MSG_42'), showClose: true, center: true, type: 'warning'});
          return false
        }
        let _this = this;
        let data = {
          parentId: this.targetId,
          label: this.form.deartmentName,
          creator: sessionStorage.getItem('name')
        };
        newTree(data).then(response => {
          _this.getTree();
          this.openDialog = false
        })
      },
      submitSD() {
        let superior = this.$refs.departmentTree.getCheckedNodes();
        if (superior.length > 1) {
          this.$message({message: this.$t('Msg.ID_MSG_47'), showClose: true, center: true, type: 'warning'});
          return false
        }
        this.form.superiorDeartment = superior[0].label;
        this.targetId = superior[0].id;
        this.innerVisible = false
      },                   //选择上级分组
      submit() {
        if (this.title === this.$t('Content.ID_NEW_GROUP')) {
          this.addDeartment()
        } else {
          this.editDeartment()
        }
      },                     //判断是新建还是编辑
      New() {
        this.title = this.$t('Content.ID_NEW_GROUP');
        this.form.deartmentName = '';
        this.form.superiorDeartment = '';
        this.openDialog = true;
      },                        //新建分组
      Edit() {
        let tree = this.$refs.tree.getCheckedNodes();
        if (tree.length > 1 || tree.length == 0) {
          this.$message({message: this.$t('Msg.ID_MSG_19'), showClose: true, center: true, type: 'warning'});
          return false
        }
        this.openDialog = true;
        this.title = this.$t('Content.ID_EDIT_GROUP');
        this.form.deartmentName = tree[0].label;
        this.superiorId = tree[0].parentId;
        this.creator = tree[0].creator;
        this.departmentId = tree[0].id;
        this.form.superiorDeartment = tree[0].parentName;
      },                       //编辑分组
      editDeartment() {
        if (this.form.deartmentName == '') {
          this.$message({message: this.$t('Msg.ID_MSG_41'), showClose: true, center: true, type: 'warning'});
          return false
        }
        if (this.form.superiorDeartment == '') {
          this.$message({message: this.$t('Msg.ID_MSG_42'), showClose: true, center: true, type: 'warning'});
          return false
        }
        let _this = this;
        let data = {
          id: this.departmentId,
          parentId: this.superiorId,
          label: this.form.deartmentName,
          creator: this.creator,
          updaterCreator: sessionStorage.getItem('name'),
          newId: this.targetId
        };
        updateTree(data).then(response => {
          _this.getTree();
          this.openDialog = false
        })
      },              //编辑分组方法
      delDeartment() {
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
          let params = {
            id: id
          };
          delTree(params).then(response => {
            this.$message({
              message: this.$t('Content.ID_DELETE_SUCCESS'),
              showClose: true,
              center: true,
              type: 'success'
            });
            this.getTree()
          })
        })
      },                 //删除分组方法
      langChange() {
        this.getTree();
      },
      setting() {
        let tree = this.$refs.tree.getCheckedNodes();
        if (tree.length > 1 || tree.length === 0) {
          this.$message({message: this.$t('Msg.ID_MSG_19'), showClose: true, center: true, type: 'warning'});
          return false
        }
        this.dialogSetting = true
      },                                //设置属性
      submitSetting() {
        console.log(this.settingForm.type)
      }
    }
  }
</script>
