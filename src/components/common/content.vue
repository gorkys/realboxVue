<style scoped>
  #content {
    height: 778px;
    border-radius: 10px;
    margin: 20px 20px 0px;
    background-color: white;
    padding: 10px 20px 0;
    box-shadow: 0px 7px 4.8px 3.2px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
  }
</style>

<template>
    <div id="content">
      <slot></slot>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        components: {},
        methods: {}
    }
</script>
