<style scoped>
  #terminalTree{
    border: 1px solid #c1c1c1;
    height: 98%;
    width: 12%;
    border-radius: 10px;
    overflow: hidden;
  }
  .title{
    height: 40px;
    background-color: #d33a31;
    line-height: 40px;
    padding-left: 10px;
    font-size: 1.4rem;
    color: white;
    letter-spacing: 3px;
  }
  .control{
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 10px;
    border-bottom: 1px solid #dedede;
  }
  .control>a{
    margin-left: 15px;
  }
  .control>a>i{
    margin-right: 3px;
  }
  .control>a:hover{
    color: #d33a31;
  }
</style>

<template>
    <div id="terminalTree">
      <div class="title">企业部门</div>
      <div class="control">
        <a><i class="el-icon-refresh"></i>刷新</a>
      </div>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              data: [{
                label: '部门1',
                children: [{
                  label: '分组1'
                },{
                  label:'分组2'
                }]
              }, {
                label: '部门2',
                children: [
                  {
                    label: '分组1',
                  }, {
                    label: '分组2'
                  }
                ]
              }, {
                label: '部门3',
                children: [{
                  label: '分组1'
                }, {
                  label: '分组2'
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
