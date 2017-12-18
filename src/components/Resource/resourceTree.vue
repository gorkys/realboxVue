<style scoped>
  #resourceTree {
    border: 1px solid #c1c1c1;
    height: 98%;
    width: 12%;
    border-radius: 10px;
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
  }

  .control {
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 10px;
    border-bottom: 1px solid #dedede;
  }

  .control > a {
    margin-left: 15px;
  }

  .control > a > i {
    margin-right: 3px;
  }

  .control > a:hover {
    color: #d33a31;
  }
</style>

<template>
  <div id="resourceTree">
    <div class="title">资源管理</div>
    <div class="control">
      <a><i class="el-icon-plus"></i>新建</a>
      <a><i class="el-icon-refresh"></i>刷新</a>
    </div>
    <el-tree :data="resourceTree" default-expand-all @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
  export default {
    mounted: function () {
      this.getTree()
    },
    data() {
      return {
        resourceTree: []
      }
    },
    components: {},
    methods: {
      getTree(){
        let _this = this
        this.$http({
          method: 'get',
          url: 'tree/query?id=0',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.resourceTree = response.data.cust.trees
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      }            //获取树资源
    }
  }
</script>
