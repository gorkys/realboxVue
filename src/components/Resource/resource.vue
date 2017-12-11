<style scoped>
  #resource{
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }
</style>

<template>
    <div id="resource">
      <nav-bar></nav-bar>
      <breadcrumb></breadcrumb>
      <Content>
          <resourceTree></resourceTree>
          <resourceList></resourceList>
      </Content>
      <footer-bar></footer-bar>
    </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Content from '@/components/common/content'
  import Breadcrumb from '@/components/common/Breadcrumb'
  import resourceTree from '@/components/Resource/resourceTree'
  import resourceList from '@/components/Resource/resourceList'
    export default {
        data() {
            return {}
        },
        components: {
          NavBar,
          FooterBar,
          Content,
          Breadcrumb,
          resourceTree,
          resourceList
        },
        methods: {}
    }
</script>


