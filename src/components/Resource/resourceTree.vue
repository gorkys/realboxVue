<style scoped>
  #resourceTree{
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
  <div id="resourceTree">
    <div class="title">资源管理</div>
    <div class="control">
      <a><i class="el-icon-plus"></i>新建</a>
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
          label: '视频管理',
          children: [{
            label: '系统视频'
          },{
            label:'用户视频'
          }]
        }, {
          label: '图片管理',
          children: [
            {
              label: '系统图片',
            }, {
              label: '用户图片'
            }
          ]
        }, {
          label: '文本管理',
          children: [{
            label: '系统文本'
          }, {
            label: '用户文本'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    components: {},
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  }
</script>
