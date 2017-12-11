<style scoped>
  #release{
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    display: flex;
    justify-content: space-around;
  }
  .left{
    width: 30%;
    overflow: hidden;
  }
  .right{
    width: 68%;
    overflow: hidden;
  }
  .terminalBox{
    width: 100%;
    background-color: white;
    height: 99%;
  }
  .title{
    height: 40px;
    background-color: #d33a31;
    line-height: 40px;
    padding-left: 10px;
    font-size: 1.4rem;
    color: white;
    letter-spacing: 3px;
    width: 100%;
  }
  .controlBox{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #e0e0e0;
  }
  .controlBox>div{
    padding-right: 10px;
  }
  .right>div{
    background-color: white;
  }
  .playList{
    padding: 10px;
  }
  .imgBox{
    width: 150px;
    height: 150px;
    overflow: hidden;
    border:1px solid #a9a9a9;
    text-align: center;
  }
  img{
    width: 50%;
    height: 87%;
  }
  .imgBox>p{
    background-color: #d2d2d2;
  }
  .checkedList{
    height: 404px;
  }
  .confirm{
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    border-top:1px solid #d2d2d2 ;
  }
</style>

<template>
  <div id="release">
      <div class="left">
        <div class="terminalBox">
          <div class="title">部门/终端</div>
          <div class="controlBox">
            <div style="width: 80px">
              <el-select v-model="select" placeholder="部门">
                <el-option label="部门" value="1"></el-option>
                <el-option label="终端" value="2"></el-option>
              </el-select>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容" v-model="input3">
                <template slot="prepend">节目名称</template>
              </el-input>
            </div>
            <el-button>搜索</el-button>
          </div>
          <div class="terminalList">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="releaseAttr">
          <div class="title">发布属性</div>
          <div class="controlBox">
            <div style="width:200px;">
              <el-input placeholder="请输入内容" v-model="input3">
                <template slot="prepend">播放模式</template>
              </el-input>
            </div>
            <div style="width:400px;">
              <el-date-picker
                v-model="date"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </div>
            <div style="width:200px;">
              <el-input placeholder="请输入内容" v-model="input3">
                <template slot="prepend">发布类型</template>
              </el-input>
            </div>
          </div>
        </div>
        <div class="playListBox">
          <div class="title">播放列表</div>
          <div class="controlBox">
            <div style="width: 110px">
              <el-select v-model="select" placeholder="图形模式">
                <el-option label="图形模式" value="1"></el-option>
                <el-option label="列表模式" value="2"></el-option>
              </el-select>
            </div>
          </div>
          <div class="playList">
            <div class="imgBox">
              <img src="../../assets/imgs/login/img.jpg">
              <p>萨克斯</p>
            </div>
          </div>
        </div>
        <div class="checked">
          <div class="title">选中的部门/终端</div>
          <div class="controlBox">
            <a><i class="el-icon-delete"></i>删除</a>
          </div>
          <div class="checkedList">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column type="selection" align="center" width="55"></el-table-column>
              <el-table-column prop="date" align="center" label="类型"></el-table-column>
              <el-table-column prop="name" align="center" label="终端/部门"></el-table-column>
              <el-table-column prop="address" align="center" label="所属机构"></el-table-column>
              <el-table-column prop="address" align="center" label="终端类型"></el-table-column>
              <el-table-column prop="address" align="center" label="分辨率"></el-table-column>
              <el-table-column prop="address" align="center" label="所属分组"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="confirm">
          <el-button>确认</el-button>
          <el-button @click.native="exit">取消</el-button>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

          data: [{
            label: '部门1',
            children: [{
              label: '分组1'
            },{
              label:'分组2'
            }]
          }, {
            label: '部门2',
            children: [
              {
                label: '分组1',
              }, {
                label: '分组2'
              }
            ]
          }, {
            label: '部门3',
            children: [{
              label: '分组1'
            }, {
              label: '分组2'
            }]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        }

    },
    components: {

    },
    methods: {
      exit:function () {
        this.$router.go(-1);
      }
    }
  }
</script>


