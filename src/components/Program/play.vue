<style scoped>
  #play{
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }
</style>

<template>
  <div id="play">
    <nav-bar></nav-bar>
    <breadcrumb></breadcrumb>
    <Content>
      <playTree></playTree>
      <playList></playList>
    </Content>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Breadcrumb from '@/components/common/Breadcrumb'
  import Content from '@/components/common/content'
  import playTree from '@/components/Program/playTree'
  import playList from '@/components/Program/playList'
  export default {
    data() {
      return {}
    },
    components: {
      NavBar,
      FooterBar,
      Breadcrumb,
      Content,
      playTree,
      playList
    },
    methods: {}
  }
</script>
