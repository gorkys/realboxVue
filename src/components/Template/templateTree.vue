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
    <el-tree :data="data" :props="defaultProps" node-key="id" @node-click="handleNodeClick" :default-expanded-keys="[1]"></el-tree>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [{
          id: 1,
          label: '模板类型',
          children: [{
            label: '系统模板'
          }, {
            label: '用户模板'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    components: {},
    methods: {}
  }
</script>
