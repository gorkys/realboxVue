<style scoped>
  #templateTree {
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
</style>

<template>
  <div id="templateTree">
    <div class="title">模板管理</div>
    <el-tree :data="templateTree" node-key="id" @node-click="handleNodeClick" default-expand-all></el-tree>
  </div>
</template>
<script>
  export default {
    mounted:function () {
      this.getTree()
    },
    data() {
      return {
        templateTree: []
      }
    },
    components: {},
    methods: {
      getTree(){
        let _this = this
        this.$http({
          method: 'get',
          url: 'tree/query?id=20',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.templateTree = response.data.cust.trees
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      }
    }
  }
</script>
