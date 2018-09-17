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
    height: auto;
    overflow: hidden;
  }

  .right {
    width: 83%;
    height: auto;
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
    height: 338px;
    padding-bottom: 10px;
  }

  .confirm {
    display: flex;
    justify-content: flex-end;
    padding: 20px 10px ;
    border-top: 1px solid #ededed;
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
        <div class="title">{{$t('Content.ID_GROUP')}}</div>
        <div class="controlBox">
          <div style="width: 120px">
            <el-select v-model="terSelect" size="mini" :placeholder="$t('Content.ID_GROUP')" @change="getTree">
              <el-option v-for="item in terSelects"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="terminalList">
          <el-tree :data="terTree" node-key="id" :check-strictly="true" @node-click="terCheck"
                   default-expand-all :expand-on-click-node="false" ref="terTree"></el-tree>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="releaseAttr">
        <div class="title">{{$t('Content.ID_PUBLISH_PROPERTY')}}</div>
        <div class="controlBox" style="height: 62px;line-height: normal;flex-wrap: wrap">
          <div class="box" style="margin-bottom: 2px">
            <div>
              <label>{{$t('Content.ID_PLAY_MODE')}}</label>
              <div style="width:120px;">
                <el-select v-model="playMode" size="mini" :placeholder="$t('Content.ID_LOOP_PLAY')">
                  <el-option v-for="item in playModes"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
            </div>                <!--//播放模式-->
            <div v-if="playMode == '2'|| playMode == '3'">
              <div style="width:120px;">
                <el-select v-model="timingMode" size="mini" :placeholder="$t('Content.ID_BY_DATE')">
                  <el-option v-for="item in timingModes"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div>
              <label>{{$t('Content.ID_USELESS_TIME')}}</label>
              <el-date-picker
                v-model="failTime"
                style="width:125px;"
                type="date"
                size="mini"
                :editable="false"
                value-format="yyyy-MM-dd"
                :placeholder="$t('Content.ID_USELESS_TIME')">
              </el-date-picker>
            </div>                <!--//失效时间-->
            <div>
              <label>{{$t('Content.ID_PLAY_STRATEGY')}}</label>
              <div style="width:120px;">
                <el-select v-model="releasePloy" size="mini" :placeholder="$t('Content.ID_APPEND')">
                  <el-option v-for="item in releasePloys"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </div>
            </div>                <!--//发布策略-->
            <div>
              <label>{{$t('Content.ID_PUBLISH_TYPE')}}</label>
              <div style="width:120px;">
                <el-select v-model="releaseType" size="mini" :placeholder="$t('Content.ID_NOW')">
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
                :placeholder="$t('Content.ID_ORDER_TIME')">
              </el-date-picker>
            </div>
          </div>
          <div v-if="playMode == '2'|| playMode == '3'" class="box">
            <div v-if="timingMode == '1'">
              <label>{{$t('Content.ID_PLAY_DATE')}}</label>
              <el-date-picker
                v-model="playDate"
                style="width:350px;"
                size="mini"
                type="daterange"
                :range-separator="$t('Content.ID_TO')"
                :start-placeholder="$t('Content.ID_START_TIME')"
                :end-placeholder="$t('Content.ID_END_TIME')"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
            <div v-else="">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                {{$t('Content.ID_SELECT_ALL')}}
              </el-checkbox>
              <el-checkbox-group v-model="checkedWeeks" @change="CheckedWeeksChange">
                <el-checkbox v-for="week in weeks" :label="week.value" :key="week.value">{{week.label}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div>
              <label>{{$t('Content.ID_PLAY_TIME')}}</label>
              <el-time-picker
                is-range
                v-model="playTime"
                size="mini"
                :range-separator="$t('Content.ID_TO')"
                :start-placeholder="$t('Content.ID_START_TIME')"
                :end-placeholder="$t('Content.ID_END_TIME')"
                value-format="HH:mm:ss">
              </el-time-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="playListBox">
        <div class="title">{{$t('Content.ID_PLAY_LIST')}}</div>
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
            <label>{{$t('Content.ID_PROGRAM_TYPE')}}</label>
            <div style="width:120px;">
              <el-select v-model="proType" size="mini" :placeholder="$t('Content.ID_PLAY_LIST')">
                <el-option v-for="item in proTypes"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="action">
            <el-button @click="openPro" size="mini" class="el-icon-plus"> {{$t('Content.ID_ADD')}}</el-button>
            <el-button @click="delPro" size="mini" class="el-icon-delete"> {{$t('Content.ID_DELETE')}}</el-button>
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
        <div class="title">{{$t('Content.ID_SELECT_TERMINAL')}}</div>
        <div class="controlBox">
          <a><i class="el-icon-delete"></i>{{$t('Content.ID_DELETE')}}</a>
        </div>
        <div class="checkedList">
          <el-table
            :data="terminals"
            @selection-change="terminalSelect"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="date" align="center" :label="$t('Content.ID_TYPE')"></el-table-column>
            <el-table-column prop="name" align="center" :label="$t('Content.ID_TER')"></el-table-column>
            <el-table-column prop="type" align="center" :label="$t('Content.ID_TERMINAL_TYPE')"></el-table-column>
            <el-table-column prop="resolution" align="center" :label="$t('Content.ID_RESOLUTION')"></el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            style="padding-bottom: 10px;"
            @current-change="terChange"
            :page-size="pageCount"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="confirm">
        <el-button @click.native="exit">{{$t('Content.ID_CANCEL')}}</el-button>
        <el-button style="width: 200px" type="primary" @click="release">{{$t('Content.ID_PUBLISH')}}</el-button>
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
          <el-table-column prop="name" align="center" :label="$t('Content.ID_PROGRAM_NAME')"></el-table-column>
          <el-table-column prop="resolution" align="center" :label="$t('Content.ID_RESOLUTION')"></el-table-column>
          <el-table-column prop="terminalType" align="center" :label="$t('Content.ID_TERMINAL_TYPE')"></el-table-column>
          <el-table-column prop="address" align="center" :label="$t('Content.ID_RESOURCE_SIZE')"></el-table-column>
          <el-table-column prop="address" align="center" :label="$t('Content.ID_PLAYTIME')"></el-table-column>
          <el-table-column prop="updateTime" align="center" :label="$t('Content.ID_UPDATE_TIME')"></el-table-column>
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
        <el-button type="primary" @click="selectPro">{{$t('Content.ID_OK')}}</el-button>
  </span>
    </el-dialog><!--选择节目-->
  </div>
</template>
<script>
  import {getProgram} from "@/api/program";
  import {getTree} from "@/api/Tree";
  import {
    newRelease,
    getRelease,
    delRelease
  } from "@/api/release";
  import {getTerminal} from "@/api/terminal";

  export default {
    mounted() {
      this.getTree();
      if (this.$route.query.name != undefined) {
        let params = {
          groupId: 31,
          pageNo: 1,
          pageCount: 1,
          name: this.$route.query.name
        };
        getProgram(params).then(response => {
          let programs = response.cust.programs;
          for (let play of programs) {
            this.playImgs.push(play);
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
          label: this.$t('Content.ID_GROUP')
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
        groupId: 41,
        /*播放列表*/
        proType: 1,
        proTypes: [{
          value: 1,
          label: this.$t('Content.ID_PLAY_LIST')
        }],
        playImgs: [],                 //播放列表显示
        /*发布属性*/
        playMode: 1,
        playModes: [{
          value: 1,
          label: this.$t('Content.ID_LOOP_PLAY')
        }, {
          value: 2,
          label: this.$t('Content.ID_TIMER_PLAY')
        }/*, {
          value: '3',
          label: '插播节目'
        }*/],
        failTime: '',             //失效时间
        releaseType: 1,
        releaseTypes: [{
          value: 1,
          label: this.$t('Content.ID_NOW')
        }, {
          value: 2,
          label: this.$t('Content.ID_ORDER')
        }],
        releasePloy: 1,
        releasePloys: [
          {
            value: 1,
            label: this.$t('Content.ID_APPEND')
          }, {
            value: 2,
            label: this.$t('Content.ID_OVERWRITE')
          }
        ],
        playDate: '',            //播放日期
        playTime: '',             //播放时间
        reservationDate: '',     //预约时间
        timingMode: 1,           //按日期
        timingModes: [{
          value: 1,
          label: this.$t('Content.ID_BY_DATE')
        }, {
          value: 2,
          label: this.$t('Content.ID_BY_WEEK')
        }],
        week: [1, 2, 3, 4, 5, 6, 0],      //全选星期
        weeks: [
          {
            value: 0,
            label: this.$t('Content.ID_SUNDAY')
          }, {
            value: 1,
            label: this.$t('Content.ID_MONDAY')
          }, {
            value: 2,
            label: this.$t('Content.ID_TUESDAY')
          }, {
            value: 3,
            label: this.$t('Content.ID_WEDNESDAY')
          }, {
            value: 4,
            label: this.$t('Content.ID_THURSDAY')
          }, {
            value: 5,
            label: this.$t('Content.ID_FRIDAY')
          }, {
            value: 6,
            label: this.$t('Content.ID_SATURDAY')
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
        index: 10,                   //选定节目坐标
        /*终端列表*/
        pageCount: 7,            //每页显示数目
        pageNo: 1,                //当前页
        total: 0,                 //总数目
        terRow: [],                //终端选中行数据
        i: 0
      }

    },
    components: {},
    methods: {
      exit() {
        this.$router.push('programList');
      },                               //返回
      terCheck(data) {
        /*let tree = this.$refs.terTree.getCheckedNodes();
        if (tree.length > 1) {
          this.$message({message: '不允许多项操作，只允许选择一个分组进行操作！', center: true, type: 'warning'});
          return false
        }
        this.groupId = tree[0].id;
        this.getTerList()*/
        this.groupId = data.id;
        this.getTerList()
        /*this.i++;
        if(this.i%2==0){
          if(node){
            this.$refs.terTree.setCheckedNodes([]);
            this.$refs.terTree.setCheckedNodes([data]);
            //交叉点击节点
            this.groupId = data.id;
            this.getTerList()

          }else{
            this.$refs.terTree.setCheckedNodes([]);
            //点击已经选中的节点，置空
            this.terminals = [];
          }
        }*/

      },                            //选中终端分组树节点
      getTree() {
        let _this = this;
        let params = {id: 40};
        getTree(params).then(response => {
          _this.terTree = response.cust.trees;
        })
      },                            //获取树资源
      getTerList() {
        let _this = this;
        _this.terminals = [];
        _this.groupId = _this.groupId == 40 ? 41 : _this.groupId;
        let params = {
          pageCount: this.pageCount,
          pageNo: this.pageNo,
          groupId: this.groupId
        };
        getTerminal(params).then(response => {
          let terminals = response.cust.terminals;
          _this.total = response.cust.pages.count;
          for (let terminal of terminals) {
            _this.terminals.push(terminal)
          }
        });
      },                     //获取终端列表

      queryPlayList() {
        let _this = this;
        this.plays = [];
        let params = {
          groupId: 31,
          pageNo: this.proPageNo,
          pageCount: this.proPageCount
        };
        getProgram(params).then(response => {
          let programs = response.cust.programs;
          _this.proTotal = response.cust.pages.count;
          for (let play of programs) {
            _this.plays.push(play);
          }
        })
      },                      //查询节目列表
      proChange(val) {
        this.proPageNo = val;
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
            message: this.$t('Content.ID_MSG_24'),
            showClose: true,
            center: true,
            type: 'warning'
          });
          return false
        }
        this.openProList = false
      },                          //选择节目
      selected(e) {
        let target = e.currentTarget;
        let children = target.children[0];
        if (children.style.display != 'block') {
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
        newRelease(data).then(response => {
          _this.$message({
            message: this.$t('Content.ID_PUBLISH_SUCCESS'),
            showClose: true,
            center: true,
            type: 'success'
          });
          _this.$router.push('/auditList')
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


