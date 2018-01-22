<style scoped>
  #auditList {
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
    border-bottom: 4px solid #e0e0e0;
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

  .control {
    font-size: 1.4rem;
  }

  .control a {
    padding: 10px;
  }

  .control a i {
    margin-right: 5px;
  }

  .control a:hover {
    color: #d33a31;
  }

  .auditList {
    height: 620px;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }

</style>

<template>
  <div id="auditList">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="title">审核列表</div>
      <div class="controlBox">
        <div class="search">
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="searchName">
              <template slot="prepend">节目名称</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="searchProStatus">
              <template slot="prepend">节目状态</template>
            </el-input>
          </div>
          <el-button @click="queryPublishList">搜索</el-button>
        </div>
      </div>
      <div class="auditList">
        <el-table
          :data="publish"
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="proType" align="center" label="节目类型"></el-table-column>
          <el-table-column prop="id" align="center" label="发布单号"></el-table-column>
          <el-table-column prop="proName" align="center" label="节目名称"></el-table-column>
          <el-table-column prop="disType" align="center" label="发布类型"></el-table-column>
          <el-table-column prop="playMode" align="center" label="播放类型"></el-table-column>
          <el-table-column prop="publisher" align="center" label="发布人"></el-table-column>
          <el-table-column prop="date" align="center" label="发布时间"></el-table-column>
          <el-table-column prop="invalidTime" align="center" label="失效日期"></el-table-column>
          <el-table-column prop="status" align="center" label="发布状态"></el-table-column>
          <el-table-column prop="address" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="auditPass(scope.$index, scope.row)">审核通过
              </el-button>
            </template>
          </el-table-column>
          </el-table-column>
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

  export default {
    mounted() {
      this.queryPublishList()
    },
    data() {
      return {
        date: '',
        publish: [],       //发布列表数据
        pageCount: 11,     //每页显示数目
        pageNo: 1,          //当前页
        total: 0,            //总数目
        searchName: '',
        searchProStatus: '',
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {
      queryPublishList() {
        let _this = this;
        this.publish = [];
        this.$http({
          method: 'get',
          url: "publish/query?&pageCount=" + this.pageCount + "&pageNo=" + this.pageNo + "&status=未审核" + "&proName=" + this.searchName + "&proStatus=" + this.searchProStatus,
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            let publish = response.data.cust.publish;
            _this.total = response.data.cust.pages.count;
            for (let item of publish) {
              _this.publish.push(item)
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
      },                //获取节目列表
      pageChange(val) {
        this.pageNo = val;
        this.queryPublishList()
      },                    //分页
      auditPass(index, data) {
        this.$confirm('审核通过后即刻发布, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'get',
            url: "publish/audit?id=" + data.id,
            withCredentials: true,
            headers: {
              token: sessionStorage.getItem('token'),
              name: sessionStorage.getItem('name')
            }
          }).then(response => {
            if (response.data.code == '0000') {
              this.$message({
                message: '审核通过，节目已发布成功！',
                showClose: true,
                center: true,
                type: 'success'
              });
              this.queryPublishList()
            } else {
              this.$message({
                message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
                showClose: true,
                center: true,
                type: 'error'
              });
            }
          })


        })


      }                           //审核通过
    }
  }
</script>


