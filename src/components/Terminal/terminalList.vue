<style scoped>
  #terminalList{
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
  .search{
    display: flex;
  }
  .search>div{
    margin-right: 10px;
  }

  .tableList{
    height: 620px;
  }

  .page{
    text-align: right;
    padding-right: 20px;
  }
</style>

<template>
    <div id="terminalList">
      <div class="title">终端列表</div>
      <div class="controlBox">
        <div class="search">
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">终端名称</template>
            </el-input>
          </div>
          <div style="width:200px;">
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">终端编号</template>
            </el-input>
          </div>
          <el-button>搜索</el-button>
        </div>
        <div class="control">
          <a><i class="el-icon-plus"></i>新建</a>
          <a><i class="el-icon-delete"></i>删除</a>
          <el-dropdown>
          <span class="el-dropdown-link" style="cursor: pointer">
            <i class="el-icon-edit" style="margin-right: 5px"></i>批量操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="">开机时间</el-dropdown-item>
              <el-dropdown-item @click.native="">下载时间</el-dropdown-item>
              <el-dropdown-item @click.native="">音量设置</el-dropdown-item>
              <el-dropdown-item @click.native="">系统设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="tableList">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column prop="date" align="center" label="终端名称"></el-table-column>
          <el-table-column prop="name" align="center" label="所属部门"></el-table-column>
          <el-table-column prop="address" align="center" label="硬件编号"></el-table-column>
          <el-table-column prop="address" align="center" label="终端类型"></el-table-column>
          <el-table-column prop="address" align="center" label="分辨率"></el-table-column>
          <el-table-column prop="address" align="center" label="软件版本"></el-table-column>
          <el-table-column prop="address" align="center" label="系统版本"></el-table-column>
          <el-table-column prop="address" align="center" label="MAC地址"></el-table-column>
          <el-table-column prop="address" align="center" label="创建人"></el-table-column>
          <el-table-column prop="address" align="center" label="更新时间"></el-table-column>
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
</template>
<script>
    export default {
        data() {
            return {}
        },
        components: {},
        methods: {}
    }
</script>
