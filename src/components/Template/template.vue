<style scoped>
#template{
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
</style>

<template>
    <div id="template">
      <nav-bar></nav-bar>
      <breadcrumb></breadcrumb>
      <Content>
        <templateTree></templateTree>
        <templateList></templateList>
      </Content>
      <footer-bar></footer-bar>
    </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'
  import Content from '@/components/common/content'
  import templateTree from '@/components/Template/templateTree'
  import templateList from '@/components/Template/templateList'
    export default {
        data() {
            return {}
        },
        components: {
          NavBar,
          FooterBar,
          Breadcrumb,
          Content,
          templateTree,
          templateList
        },
        methods: {}
    }
</script>
