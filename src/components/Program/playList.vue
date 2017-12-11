<style scoped>
  #playlist {
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

  .playList {
    height: 620px;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>

<template>
  <div id="playlist">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <div class="content">
      <div class="title">播放列表</div>
      <div class="controlBox">
        <div class="search">
          <div style="width: 110px">
            <el-select v-model="select" placeholder="列表模式">
              <el-option label="图形模式" value="1"></el-option>
              <el-option label="列表模式" value="2"></el-option>
            </el-select>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">节目名称</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">所属部门</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">分辨率</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">终端类型</template>
            </el-input>
          </div>
          <el-button>搜索</el-button>
        </div>
        <div class="control">
          <a><i class="el-icon-plus"></i>新建</a>
          <a><i class="el-icon-edit"></i>编辑</a>
          <a><i class="el-icon-delete"></i>删除</a>
        </div>
      </div>
      <div class="playList">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="date" align="center" label="节目名称"></el-table-column>
          <el-table-column prop="name" align="center" label="预览图"></el-table-column>
          <el-table-column prop="address" align="center" label="分辨率"></el-table-column>
          <el-table-column prop="address" align="center" label="状态"></el-table-column>
          <el-table-column prop="address" align="center" label="终端类型"></el-table-column>
          <el-table-column prop="address" align="center" label="素材大小"></el-table-column>
          <el-table-column prop="address" align="center" label="播放时长"></el-table-column>
          <el-table-column prop="address" align="center" label="更新时间"></el-table-column>
          <el-table-column prop="address" align="center" label="所属机构"></el-table-column>
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
      return {}
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb
    },
    methods: {}
  }
</script>


