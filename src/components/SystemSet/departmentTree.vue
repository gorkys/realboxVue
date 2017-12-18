<style scoped>

</style>

<template>
  <div id="tree">
    <el-tree
      :data="departmentTree"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current>
    </el-tree>
  </div>
</template>
<script>
  export default {
    mounted: function () {
      this.getTree()
    },
    data() {
      return {
        departmentTree: []
      }
    },
    components: {},
    methods: {
      getTree: function () {
        let _this = this
        this.$http({
          method: 'get',
          url: 'tree/query?id=60',
          withCredentials: true,
          headers: {
            token: sessionStorage.getItem('token'),
            name: sessionStorage.getItem('name')
          }
        }).then(response => {
          if (response.data.code == '0000') {
            _this.departmentTree = response.data.cust.trees
          } else {
            this.$message({
              message: '错误编码：' + response.data.code + ',错误类型：' + response.data.infor + '。',
              center: true,
              type: 'error'
            });
          }
        })
      }         //获取树资源
    }
  }
</script>
