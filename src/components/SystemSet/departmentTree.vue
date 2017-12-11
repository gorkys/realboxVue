<style scoped>

</style>

<template>
  <div id="tree">
    <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [{
          id: 1,
          label: 'System',
          children: [{
            id: 2,
            label: '部门1',
            children: [{
              id: 3,
              label: '部门1-1'
            }, {
              id: 4,
              label: '部门1-2'
            }]
          }, {
              id: 6,
              label: '部门2',
              children: [{
                id: 7,
                label: '部门2-1'
              }, {
                id: 8,
                label: '部门2-2'
              }]
            },
            {
              id: 6,
              label: '部门3',
              children: [{
                id: 7,
                label: '部门3-1'
              }, {
                id: 8,
                label: '部门3-2'
              }]
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
