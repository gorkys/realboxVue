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
    padding: 5px;
    display: flex;
    border-bottom: 1px solid #e0e0e0;
  }

  .box {
    width: 100%;
    height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: nowrap;

  }

  .box > div {
    margin-left: 10px;
    display: flex;
  }

  .box > div > label {
    margin-right: 10px;
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
    height: 394px;
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
        <div class="title">终端分组</div>
        <div class="controlBox">
          <div style="width: 120px">
            <el-select v-model="terSelect" size="mini" placeholder="终端分组" @change="getTree">
              <el-option v-for="item in terSelects"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="terminalList">
          <el-tree :data="terTree" show-checkbox :check-strictly="true" @check-change="terCheck"
                   default-expand-all :expand-on-click-node="false" ref="terTree"></el-tree>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="releaseAttr">
        <div class="title">发布属性</div>
        <div class="controlBox" style="height: 62px;line-height: normal;flex-wrap: wrap">
          <div class="box" style="margin-bottom: 2px">
            <div>
              <label>播放模式</label>
              <div style="width:120px;">
                <el-select v-model="playMode" size="mini" placeholder="循环播放">
                  <el-option v-for="item in playModes"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
            </div>                <!--//播放模式-->
            <div v-if="playMode == '2'|| playMode == '3'">
              <div style="width:120px;">
                <el-select v-model="timingMode" size="mini" placeholder="按日期">
                  <el-option v-for="item in timingModes"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div>
              <label>失效时间</label>
              <el-date-picker
                v-model="failTime"
                style="width:125px;"
                type="date"
                size="mini"
                :editable="false"
                value-format="yyyy-MM-dd"
                placeholder="失效时间">
              </el-date-picker>
            </div>                <!--//失效时间-->
            <div>
              <label>发布策略</label>
              <div style="width:120px;">
                <el-select v-model="releasePloy" size="mini" placeholder="追加日程">
                  <el-option v-for="item in releasePloys"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
            </div>                <!--//发布策略-->
            <div>
              <label>发布类型</label>
              <div style="width:120px;">
                <el-select v-model="releaseType" size="mini" placeholder="立即发布">
                  <el-option v-for="item in releaseTypes"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
            </div>                <!--//发布类型-->
            <div v-if="releaseType == '2'">
              <el-date-picker
                v-model="reservationDate"
                style="width:175px;"
                type="datetime"
                size="mini"
                :editable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="预约时间">
              </el-date-picker>
            </div>
          </div>
          <div v-if="playMode == '2'|| playMode == '3'" class="box">
            <div v-if="timingMode == '1'">
              <label>播放日期</label>
              <el-date-picker
                v-model="playDate"
                style="width:350px;"
                size="mini"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
            <div v-else="">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
              </el-checkbox>
              <el-checkbox-group v-model="checkedWeeks" @change="CheckedWeeksChange">
                <el-checkbox v-for="week in weeks" :label="week.value" :key="week.value">{{week.label}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div>
              <label>播放时间</label>
              <el-time-picker
                is-range
                v-model="playTime"
                size="mini"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="HH:mm:ss">
              </el-time-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="playListBox">
        <div class="title">播放列表</div>
        <div class="controlBox playListControl">
          <div class="control">
            <!--<div style="width: 120px">
              <el-select v-model="playValue" size="mini" @change="playChange">
                <el-option v-for="item in playSelect"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>-->
            <label>节目类型</label>
            <div style="width:120px;">
              <el-select v-model="proType" size="mini" placeholder="播放列表">
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
        <div class="title">选中终端</div>
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
            <el-table-column prop="name" align="center" label="终端"></el-table-column>
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
        <el-button @click="release" size="mini">发布</el-button>
        <el-button @click.native="exit" size="mini">取消</el-button>
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
        terTree: [],              //终端树数据
        terminals: [],             //终端列表
        terSelect: 1,
        terSelects: [{
          value: 1,
          label: '终端分组'
        }/*, {
          value: 2,
          label: '终端分组'
        }*/],
        /*playValue: '图形模式',
        playSelect: [{
          value: '1',
          label: '图形模式'
        }, {
          value: '2',
          label: '列表模式'
        }],*/
        depfId: '',
        groupId: '',
        /*播放列表*/
        proType: 1,
        proTypes: [{
          value: 1,
          label: '播放列表'
        }, {
          value: 2,
          label: '滚动字幕'
        }],
        playImgs: [],                 //播放列表显示
        /*发布属性*/
        playMode: 1,
        playModes: [{
          value: 1,
          label: '循环播放'
        }, {
          value: 2,
          label: '定时播放'
        }/*, {
          value: '3',
          label: '插播节目'
        }*/],
        failTime: '',             //失效时间
        releaseType: 1,
        releaseTypes: [{
          value: 1,
          label: '立即发布'
        }, {
          value: 2,
          label: '预约发布'
        }],
        releasePloy: 1,
        releasePloys: [
          {
            value: 1,
            label: '追加日程'
          }, {
            value: 2,
            label: '覆盖日程'
          }
        ],
        playDate: '',            //播放日期
        playTime: '',             //播放时间
        reservationDate: '',     //预约时间
        timingMode: 1,           //按日期
        timingModes: [{
          value: 1,
          label: '按日期'
        }, {
          value: 2,
          label: '按星期'
        }],
        week: [1, 2, 3, 4, 5, 6, 0],      //全选星期
        weeks: [
          {
            value: 0,
            label: '周天'
          }, {
            value: 1,
            label: '周一'
          }, {
            value: 2,
            label: '周二'
          }, {
            value: 3,
            label: '周三'
          }, {
            value: 4,
            label: '周四'
          }, {
            value: 5,
            label: '周五'
          }, {
            value: 6,
            label: '周六'
          }
        ],
        isIndeterminate: false,                                                //全选状态
        checkAll: false,                                                       //选择全部
        checkedWeeks: [],                                                      //选择中的周
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
        this.$router.push('programList');
      },                               //返回
      terCheck(){
        let tree = this.$refs.terTree.getCheckedNodes();
        if (tree.length > 1) {
          this.$message({message: '请选择一个分组！', center: true, type: 'warning'});
          return false
        }
        this.groupId = tree[0].id;
        this.getTerList()
      },                            //选中终端分组树节点
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
            _this.terTree = response.data.cust.trees;
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      },                            //获取树资源
      getTerList() {
        let _this = this;
        this.terminals = [];
        this.$http({
          method: 'get',
          url: "terminal/query?&pageCount=" + this.pageCount + "&pageNo=" + this.pageNo + '&groupId=' + _this.groupId,
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
      },                       //节目列表翻页
      openPro() {
        this.openProList = true;
        this.queryPlayList()
      },                            //打开节目列表弹窗
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
      },                          //选择节目
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
      },                          //单击选择节目
      delPro() {
        this.playImgs.splice(this.index, 1)
      },                             //删除节目


      terChange(val) {
        this.pageNo = val;
        this.getTerList(this.tree)
      },                       //终端列表翻页
      terminalSelect(row) {
        this.terRow = row
      },                  //终端列表选中回调
      release() {
        let _this = this;
        let ter = document.getElementsByClassName('playImgList')[0].children;
        let terAttr = [].slice.call(ter);                             //将伪数组转为数组
        let proId = terAttr.map(item => item.id).join(' ');           //节目ID
        let terId = this.terRow.map(item => item.id).join(' ');       //终端ID
        let playMode = _this.playMode == '1' ? 'loop' : 'time';
        let disType = _this.releaseType == '1' ? 'now' : 'plan';
        let releasePloy = _this.releasePloy == '1' ? 'append' : 'overwrite';
        let date = _this.timingMode == '1' ? _this.playDate.toString() : _this.checkedWeeks.toString();
        let type = _this.timingMode == '1' ? 'date' : 'week';
        let data = {
          invalidTime: _this.failTime,	                              //失效时间
          playMode: playMode,	                                        //播放类型
          proId: proId,	                                              //节目ID
          proType: _this.proType,	                                    //节目类型
          disType: disType,	                                          //发布类型
          publisher: sessionStorage.getItem('name'),	                //发布人
          date: date,	                                                //播放日期
          time: _this.playTime.toString(),	                          //播放时间
          terminalId: terId,                                          //终端ID
          makeTime: _this.reservationDate,                            //预约时间
          disStrategy: releasePloy,                                    //发布策略
          type: type                                                   //按日期还是星期
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
            _this.$message({message: '发布成功！', showClose: true, center: true, type: 'success'});
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
      },                            //发布

      handleCheckAllChange(val) {
        this.checkedWeeks = val ? this.week : [];
        this.isIndeterminate = false;
      },                    //按星期时全选状态回调
      CheckedWeeksChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.weeks.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.weeks.length;
      },                    //按星期时选择状态回调
    }
  }
</script>


