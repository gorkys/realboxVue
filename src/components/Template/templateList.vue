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

  .templateBox, .tableList {
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

  .templateList li img {
    width: 50%;
    height: 88.4%;
  }

  .templateList li p {
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
          <el-select v-model="value" placeholder="图形模式">
            <el-option v-for="item in select"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容">
            <template slot="prepend">模板名称</template>
          </el-input>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容">
            <template slot="prepend">所属机构</template>
          </el-input>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容">
            <template slot="prepend">分辨率</template>
          </el-input>
        </div>
        <div style="width:200px;">
          <el-input placeholder="请输入内容">
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
    <div v-if="value == '2'" class="tableList">
      <el-table :data="templates" border style="width: 100%">
        <el-table-column prop="name" align="center" label="模板名称"></el-table-column>
        <el-table-column prop="screenshot" align="center" label="预览图">
          <template scope="scope">
            <img :src="scope.row.screenshot" width="30" height="50"/>
          </template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="所属机构"></el-table-column>
        <el-table-column prop="resolution" align="center" label="分辨率"></el-table-column>
        <el-table-column prop="address" align="center" label="终端类型"></el-table-column>
        <el-table-column prop="creator" align="center" label="创建人"></el-table-column>
        <el-table-column prop="updateTime" align="center" label="更新时间"></el-table-column>
        <el-table-column prop="address" align="center" label="描述"></el-table-column>
      </el-table>
    </div>
    <div v-else class="templateBox">
      <ul class="templateList">
        <li v-for="(template,id) in templates" :key="id" @click="go(template.name,22)">
          <img :src="template.screenshot">
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
        url: 'template/query?treeId=22',
        withCredentials: true,
        headers: {
          token: sessionStorage.getItem('token'),
          name: sessionStorage.getItem('name')
        }
      }).then(response => {
        if (response.data.code == '0000') {
          let templates = response.data.cust.templates
          for (let i = 0; i < templates.length; i++) {
            t.push(templates[i])
            _this.templates = t
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
        templates: [],
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
    methods: {
      toTemplateMake: function () {
        this.$router.push('/templateMake')
      },
      go: function (name, id) {
        this.$router.push({path: "templateMake", query: {name: name, treeId: id}})
      }
    }
  }
</script>
