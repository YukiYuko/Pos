<template>
  <div id="app">
    <!--左侧导航-->
    <leftNav></leftNav>
    <!--路由区域-->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="es6">
import leftNav from '@/components/common/leftNav'
export default {
  name: 'app',
  components: {
    leftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{
  margin-left: 60px;
  background-color: #EFF2F7;
  height:100%;
  overflow: auto;
}
</style>
