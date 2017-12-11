<style scoped>
  #programList {
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

  .programList {
    height: 620px;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }

</style>

<template>
  <div id="programList">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="title">节目列表</div>
      <div class="controlBox">
        <div class="search">
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">发布单号</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">节目名称</template>
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
              <template slot="prepend">节目状态</template>
            </el-input>
          </div>
          <el-button>搜索</el-button>
        </div>
        <div class="control">
          <a @click="New"><i class="el-icon-plus"></i>新建</a>
          <a><i class="el-icon-edit"></i>编辑</a>
          <a><i class="el-icon-delete"></i>删除</a>
        </div>
      </div>
      <div class="programList">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="date" align="center" label="节目类型"></el-table-column>
          <el-table-column prop="name" align="center" label="发布单号"></el-table-column>
          <el-table-column prop="address" align="center" label="节目名称"></el-table-column>
          <el-table-column prop="address" align="center" label="发布类型"></el-table-column>
          <el-table-column prop="address" align="center" label="播放类型"></el-table-column>
          <el-table-column prop="address" align="center" label="发布人"></el-table-column>
          <el-table-column prop="address" align="center" label="发布时间"></el-table-column>
          <el-table-column prop="address" align="center" label="失效日期"></el-table-column>
          <el-table-column prop="address" align="center" label="状态"></el-table-column>
          <el-table-column prop="address" align="center" label="操作"></el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
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
    data() {
      return {
        date: ''
      }
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {
      New: function () {
        this.$router.push('/release')
      }
    }
  }
</script>


