<style scoped>
  #templateList {
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

  .search {
    display: flex;
  }

  .search > div {
    margin-right: 10px;
  }

  .templateBox {
    padding: 20px;
    height: 580px;
  }

  .templateList {
    display: flex;
    flex-wrap: wrap;
  }

  .templateList li {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border: 1px solid #a9a9a9;
    text-align: center;
    margin: 0 35px 60px;
    cursor: pointer;
  }

  .templateBox li img {
    width: 50%;
    height: 87%;
  }

  .templateBox li p {
    background-color: #d2d2d2;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>

<template>
  <div id="templateList">
    <div class="title">模板列表</div>
    <div class="controlBox">
      <div class="search">
        <div style="width: 110px">
          <el-select v-model="select" placeholder="图形模式">
            <el-option label="图形模式" value="1"></el-option>
            <el-option label="列表模式" value="2"></el-option>
          </el-select>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容" v-model="input3">
            <template slot="prepend">模板名称</template>
          </el-input>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容" v-model="input3">
            <template slot="prepend">所属机构</template>
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
        <a @click="toTemplateMake"><i class="el-icon-plus"></i>新建</a>
        <a><i class="el-icon-edit"></i>修改</a>
        <a><i class="el-icon-delete"></i>删除</a>
      </div>
    </div>
    <div class="tableList">

    </div>
    <div class="templateBox">
      <ul class="templateList">
        <li>
          <img src="../../assets/imgs/login/img.jpg">
          <p>萨克斯</p>
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
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
    mounted: function () {
      this.$http({
        method: 'get',
        url: 'template/query?treeId=22',
        withCredentials: true,
        headers: {
          token: sessionStorage.getItem('token'),
          name: sessionStorage.getItem('name'),
        }
      }).then(response => {
        if (response.data.code == '0000') {
          response.data.cust.templates
        } else {
          this.$message({
            message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
            center: true,
            type: 'error'
          });
        }
      })
    },
    data() {
      return {}
    },
    components: {},
    methods: {
      toTemplateMake: function () {
        this.$router.push('/templateMake')
      }
    }
  }
</script>
