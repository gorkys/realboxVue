<style scoped>
  #userList {
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

  .userBox, .tableList {
    padding: 20px;
    height: 580px;
  }

  .userList {
    display: flex;
    flex-wrap: wrap;
  }

  .userList li {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border: 1px solid #a9a9a9;
    text-align: center;
    margin: 0 35px 60px;
    cursor: pointer;
  }

  .userList li img {
    width: 50%;
    height: 88.4%;
  }

  .userList li p {
    background-color: #d2d2d2;
  }

  .page {
    text-align: right;
    padding-right: 20px;
  }
</style>

<template>
  <div id="userList">
    <div class="title">用户列表</div>
    <div class="controlBox">
      <div class="search">
        <div style="width:200px;">
          <el-input placeholder="请输入内容" v-model="input3">
            <template slot="prepend">用户名</template>
          </el-input>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容" v-model="input3">
            <template slot="prepend">所属部门</template>
          </el-input>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容" v-model="input3">
            <template slot="prepend">用户类型</template>
          </el-input>
        </div>
        <el-button>搜索</el-button>
      </div>
      <div class="control">
        <a><i class="el-icon-plus"></i>新建</a>
        <a><i class="el-icon-edit"></i>编辑</a>
        <a><i class="el-icon-delete"></i>删除</a>
        <a><i class="el-icon-refresh"></i>刷新</a>
      </div>
    </div>
    <div v-if="value == '2'" class="tableList">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="date" align="center" label="用户名"></el-table-column>
        <el-table-column prop="name" align="center" label="角色"></el-table-column>
        <el-table-column prop="address" align="center" label="用户分组"></el-table-column>
        <el-table-column prop="address" align="center" label="所属部门"></el-table-column>
        <el-table-column prop="address" align="center" label="用户类型"></el-table-column>
        <el-table-column prop="address" align="center" label="终端总数"></el-table-column>
        <el-table-column prop="address" align="center" label="备注"></el-table-column>
        <el-table-column prop="address" align="center" label="创建人"></el-table-column>
        <el-table-column prop="address" align="center" label="更新时间"></el-table-column>
      </el-table>
    </div>
    <div v-else class="userBox">
      <ul class="userList">
        <li v-for="(users,id) in users" :key="id" @click="go(users.name,22)">
          <img :src="users.screenshot">
          <p>{{template.name}}</p>
        </li>
      </ul>
    </div>
    <div class="page">
      <el-pagination
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
      let _this = this
      let t = []
      this.$http({
        method: 'get',
        url: 'template/query?treeId=30',
        withCredentials: true,
        headers: {
          token: sessionStorage.getItem('token'),
          name: sessionStorage.getItem('name')
        }
      }).then(response => {
        if (response.data.code == '0000') {
          let users = response.data.cust.users
          for (let i = 0; i < users.length; i++) {
            t.push(users[i])
            _this.users = t
            debugger
          }

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
      return {
        users: [],
        value: '',
        select: [{
          value: '1',
          label: '图形模式'
        }, {
          value: '2',
          label: '列表模式'
        }]
      }
    },
    components: {},
    methods: {}
  }
</script>
