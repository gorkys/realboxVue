<style scoped>
#terminal{
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
</style>

<template>
    <div id="terminal">
      <nav-bar></nav-bar>
      <breadcrumb></breadcrumb>
      <Content>
        <terminalTree></terminalTree>
        <terminalList></terminalList>
      </Content>
      <footer-bar></footer-bar>
    </div>
</template>
<script>
  import NavBar from '@/components/common/Navbar'
  import FooterBar from '@/components/common/footer'
  import Content from '@/components/common/content'
  import Breadcrumb from '@/components/common/Breadcrumb'
  import terminalTree from '@/components/Terminal/terminalTree'
  import terminalList from '@/components/Terminal/terminalList'
    export default {
        data() {
            return {}
        },
        components: {
          NavBar,
          FooterBar,
          Content,
          Breadcrumb,
          terminalTree,
          terminalList
        },
        methods: {}
    }
</script>
