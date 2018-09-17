<style scoped>
  #operatingLog {
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
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
  }

  .search {
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .search > div {
    margin-right: 10px;
  }

  .control a {
    padding: 10px;
  }

  .control {
    padding-right: 50px;
    font-size: 1.4rem;
  }

  .control a i {
    margin-right: 5px;
  }

  .control a:hover {
    color: #d33a31;
  }

  .logList {
    height: 620px;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>

<template>
  <div id="operatingLog">
    <nav-bar></nav-bar>
    <Breadcrumb></Breadcrumb>
    <div class="content">
      <div class="title">{{$t('Content.ID_LOG_LIST')}}</div>
      <div class="controlBox">
        <div class="search">
          <div>
            <el-input :placeholder="$t('Msg.ID_MSG_5')" v-model="operator">
              <template slot="prepend">{{$t('Content.ID_OPERATOR')}}</template>
            </el-input>
          </div>
          <el-button @click="getUserLog">{{$t('Content.ID_RESEARCH')}}</el-button>
        </div>
        <div class="control">
          <a @click="download"><i class="el-icon-download"></i>{{$t('Content.ID_EXPORT')}}</a>
        </div>
      </div>
      <div class="logList">
        <el-table
          :data="logs"
          style="width: 100%">
          <el-table-column prop="id" align="center" label="ID"></el-table-column>
          <el-table-column prop="operator" align="center" :label="$t('Content.ID_OPERATOR')"></el-table-column>
          <el-table-column prop="desc" align="center" :label="$t('Content.ID_CONTENT')"></el-table-column>
          <el-table-column prop="time" align="center" :label="$t('Content.ID_TIME')"></el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @current-change="pageChange"
          :page-size="pageCount"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'
  import {getSystemLog, exportSystemLog} from "@/api/log";

  export default {
    data() {
      return {
        pageCount: 11,     //每页显示数目
        pageNo: 1,          //当前页
        total: 0,            //总数目
        logs: [],
        operator: ''         //操作人
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    mounted() {
      this.getUserLog()
    },
    methods: {
      getUserLog() {
        let params = {
          pageCount: this.pageCount,
          pageNo: this.pageNo,
          operator: this.operator
        };
        getSystemLog(params).then(response => {
          this.logs = response.cust.logs;
          this.total = response.cust.pages.count;
        })
      },
      pageChange(val) {
        this.pageNo = val;
        this.getUserLog()
      },                    //分页
      download() {
        exportSystemLog().then(response => {
          let a = document.createElement('a');
          a.href = response.cust.desc;
          a.download = '';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
      }
    }
  }
</script>
