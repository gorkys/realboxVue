<style scoped>
  #release {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    display: flex;
    justify-content: space-around;
  }

  .left {
    width: 15%;
    overflow: hidden;
  }

  .right {
    width: 83%;
    overflow: hidden;
  }

  .terminalBox {
    width: 100%;
    background-color: white;
    height: 99%;
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
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: right;
    padding: 5px;
    display: flex;
    border-bottom: 1px solid #e0e0e0;
  }

  .control {
    display: flex;
  }

  .playListControl {
    justify-content: space-between;
  }

  .controlBox > div, .control > div {
    padding-right: 10px;
  }

  .controlBox > label, .control > label {
    padding-right: 5px;
  }

  .right > div {
    background-color: white;
  }

  .playList {
    padding: 10px;
  }

  .checkedList {
    height: 404px;
  }

  .confirm {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    border-top: 1px solid #d2d2d2;
  }

  /*播放列表*/
  .playList {
    padding: 5px;
    min-height: 180px;
  }

  .playImgList {
    display: flex;
    flex-wrap: wrap;
  }

  .playImgList li {
    width: 150px;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 30px;
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

  .playImgList li img {
    max-width: 120px;
    max-height: 120px;
  }

  .playImgList li:hover {
    background-color: #ebebeb !important;
  }

  .playImgList p {
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

  /*选择节目弹窗*/
  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>

<template>
  <div id="release">
    <div class="left">
      <div class="terminalBox">
        <div class="title">部门/终端</div>
        <div class="controlBox">
          <div style="width: 120px">
            <el-select v-model="terSelect" size="mini" @change="selectChange">
              <el-option v-for="item in terSelect"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="terminalList">
          <el-tree v-if="value" :data="depTree" show-checkbox :check-strictly="true" @check-change="depCheck"
                   default-expand-all :expand-on-click-node="false" ref="depTree"></el-tree>
          <el-tree v-else :data="terTree" show-checkbox :check-strictly="true" @check-change="terCheck"
                   default-expand-all :expand-on-click-node="false" ref="terTree"></el-tree>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="releaseAttr">
        <div class="title">发布属性</div>
        <div class="controlBox">
          <label>播放模式</label>
          <div style="width:120px;">
            <el-select v-model="playMode" size="mini" @change="selectChange">
              <el-option v-for="item in playModes"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <label>失效时间</label>
          <div>
            <el-date-picker
              v-model="failTime"
              style="width:125px;"
              type="date"
              size="mini"
              :editable="false"
              value-format="yyyy-MM-dd"
              placeholder="失效时间">
            </el-date-picker>
          </div>
          <label>发布类型</label>
          <div style="width:120px;">
            <el-select v-model="releaseType" size="mini" @change="selectChange">
              <el-option v-for="item in releaseTypes"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="playListBox">
        <div class="title">播放列表</div>
        <div class="controlBox playListControl">
          <div class="control">
            <div style="width: 120px">
              <el-select v-model="playValue" size="mini" @change="playChange">
                <el-option v-for="item in playSelect"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
            <label>节目类型</label>
            <div style="width:120px;">
              <el-select v-model="proType" size="mini" @change="selectChange">
                <el-option v-for="item in proTypes"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="action">
            <el-button @click="openPro" size="mini" class="el-icon-plus"> 添加</el-button>
            <el-button @click="delPro" size="mini" class="el-icon-delete"> 删除</el-button>
          </div>
        </div>
        <div class="playList">
          <ul class="playImgList">
            <li v-for="(pro,index) in playImgs" :key="index" :name="index" :id="pro.id"
                @click="selected($event)">
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-check"></i>
              </label>
              <div class="imgBox">
                <img :src="pro.preview">
              </div>
              <p>{{pro.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="checked">
        <div class="title">选中的部门/终端</div>
        <div class="controlBox">
          <a><i class="el-icon-delete"></i>删除</a>
        </div>
        <div class="checkedList">
          <el-table
            :data="terminals"
            @selection-change="terminalSelect"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="date" align="center" label="类型"></el-table-column>
            <el-table-column prop="name" align="center" label="终端/部门"></el-table-column>
            <el-table-column prop="type" align="center" label="终端类型"></el-table-column>
            <el-table-column prop="resolution" align="center" label="分辨率"></el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @current-change="terChange"
            :page-size="pageCount"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="confirm">
        <el-button @click="release">发布</el-button>
        <el-button @click.native="exit">取消</el-button>
      </div>
    </div>
    <el-dialog
      title="选择节目"
      :visible.sync="openProList"
      width="58%"
      top="1vh"
    >
      <div class="tableList">
        <el-table
          :data="plays"
          @selection-change="ProSelect"
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="name" align="center" label="节目名称"></el-table-column>
          <el-table-column prop="resolution" align="center" label="分辨率"></el-table-column>
          <el-table-column prop="terminalType" align="center" label="终端类型"></el-table-column>
          <el-table-column prop="address" align="center" label="素材大小"></el-table-column>
          <el-table-column prop="address" align="center" label="播放时长"></el-table-column>
          <el-table-column prop="updateTime" align="center" label="更新时间"></el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @current-change="proChange"
          :page-size="proPageCount"
          layout="total, prev, pager, next, jumper"
          :total="proTotal">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectPro">确 定</el-button>
  </span>
    </el-dialog><!--选择节目-->
  </div>
</template>
<script>
  export default {
    mounted() {
      this.getTree();
      if (this.$route.query.name != undefined) {
        this.$http({
          method: 'get',
          url: 'program/query?groupId=31&pageNo=1&pageCount=1&name=' + this.$route.query.name,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let programs = response.data.cust.programs;
            for (let play of programs) {
              this.playImgs.push(play);
            }
          }
        })
      }           //判断是否直接从制作节目跳转
    },
    data() {
      return {
        depTree: [],              //部门树数据
        terTree: [],              //终端树数据
        terminals: [],             //终端列表
        tree: true,               //区分部门与终端树
        terSelect: '企业部门',
        terSelects: [{
          value: '1',
          label: '企业部门'
        }, {
          value: '2',
          label: '终端分组'
        }],
        playValue: '图形模式',
        playSelect: [{
          value: '1',
          label: '图形模式'
        }, {
          value: '2',
          label: '列表模式'
        }],
        value: true,               //当前选择部门为真
        depfId: '',
        groupId: '',
        /*播放列表*/
        proType: '播放列表',
        proTypes: [{
          value: '1',
          label: '播放列表'
        }, {
          value: '2',
          label: '滚动字幕'
        }],
        playImgs: [],                 //播放列表显示
        /*发布属性*/
        playMode: '循环播放',
        playModes: [{
          value: '1',
          label: '循环播放'
        }, {
          value: '2',
          label: '定时播放'
        }, {
          value: '3',
          label: '插播节目'
        }],
        failTime: '',             //失效时间
        releaseType: '立即发布',
        releaseTypes: [{
          value: '1',
          label: '立即发布'
        }, {
          value: '2',
          label: '预约发布'
        }],
        /*节目列表*/
        openProList: false,
        plays: [],
        proPageNo: 1,
        proPageCount: 10,
        proTotal: 0,
        proRow: [],
        check: false,
        index: 10,                   //选定节目坐标
        /*终端列表*/
        pageCount: 7,            //每页显示数目
        pageNo: 1,                //当前页
        total: 0,                 //总数目
        terRow: [],                //终端选中行数据
      }

    },
    components: {},
    methods: {
      exit() {
        this.$router.go(-1);
      },                               //返回
      selectChange(val) {
        val == '2' ? this.value = false : this.value = true;
        this.getTree()
      },                    //部门、终端切换
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
            _this.value == 1 ? _this.depTree = response.data.cust.trees : _this.terTree = response.data.cust.trees;
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                            //获取树资源
      depCheck() {
        this.tree = true;
        this.getTerList(this.tree)
      },                           //选中企业部门树节点
      terCheck() {
        this.tree = false;
        this.getTerList(this.tree)
      },                           //选中终端分组树节点
      getTerList(type) {
        if (type) {
          let tree = this.$refs.depTree.getCheckedNodes();
          if (tree.length > 1) {
            this.$message({message: '请选择一个分组！', center: true, type: 'warning'});
            return false
          }
          this.depfId = tree[0].id
        } else {
          let tree = this.$refs.terTree.getCheckedNodes();
          if (tree.length > 1) {
            this.$message({message: '请选择一个分组！', center: true, type: 'warning'});
            return false
          }
          this.groupId = tree[0].id
        }
        let _this = this;
        this.terminals = [];
        this.$http({
          method: 'get',
          url: "terminal/query?&pageCount=" + this.pageCount + "&pageNo=" + this.pageNo + '&groupId=' + _this.groupId + '&depfId=' + _this.depfId,
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
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                     //获取终端列表

      queryPlayList() {
        let _this = this;
        this.plays = [];
        this.$http({
          method: 'get',
          url: 'program/query?groupId=31&pageNo=' + this.proPageNo + '&pageCount=' + this.proPageCount,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let programs = response.data.cust.programs;
            _this.proTotal = response.data.cust.pages.count;
            for (let play of programs) {
              _this.plays.push(play);
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
      },                      //查询节目列表
      proChange(val) {
        this.proPageNo = val
        this.queryPlayList()
      },                        //节目列表翻页
      openPro() {
        this.openProList = true;
        this.queryPlayList()
      },                             //打开节目列表弹窗
      ProSelect(row) {
        this.proRow = row
      },                       //节目表格选中回调
      selectPro() {
        this.playImgs = this.proRow;
        let ids = this.proRow.map(item => item.id).join(' ');      //列表模式的id
        if (ids == '') {
          this.$message({
            message: '未选择资源！',
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
        this.openProList = false
      },                           //选择节目
      selected(e) {
        this.check = !this.check;
        let target = e.currentTarget;
        let children = target.children[0];
        if (this.check) {
          children.style.display = 'block';
          target.style.backgroundColor = "#ebebeb";

          this.index = e.currentTarget.getAttribute('name')
        } else {
          children.style.display = 'none';
          target.style.backgroundColor = "white";

          this.index = 10
        }
      },                             //单击选择节目
      delPro() {
        this.playImgs.splice(this.index, 1)
      },                              //删除节目

      terChange(val) {
        this.pageNo = val;
        this.getTerList(this.tree)
      },                       //终端列表翻页
      terminalSelect(row) {
        this.terRow = row
      },                       //终端列表选中回调
      release() {
        let _this = this;
        let ter = document.getElementsByClassName('playImgList')[0].children;
        let terAttr = [].slice.call(ter);                          //将伪数组转为数组
        let proId = terAttr.map(item => item.id).join(' ');       //节目ID
        let terId = this.terRow.map(item => item.id).join(' ');       //终端ID
        let data = {
          invalidTime: _this.failTime,	                              //失效时间
          playType: _this.playMode,	                                  //播放类型
          proId: proId,	                                        //节目ID
          proType: _this.proType,	                                    //节目类型
          publishType: _this.releaseType,	                            //发布类型
          publisher: sessionStorage.getItem('name'),	                //发布人
          startTime: '',	                                        //开始时间
          endTime: '',	                                          //结束时间
          terminalId: terId                                            //终端ID
        };
        this.$http({
          method: 'post',
          url: 'publish/create',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          },
          data: data
        }).then(response => {
          if (response.data.code == '0000') {
            _this.$message({message: '发布成功！',showClose: true, center: true, type: 'success'});
            _this.$router.push('/programList')
          } else {
            _this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              showClose: true,
              center: true,
              type: 'error'
            });
          }
        })
      },                                //发布
    }
  }
</script>


