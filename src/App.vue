<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html, body, #app, .el-container{
  height: 100%;
}
.el-main{
  margin-left: 0px !important;
  min-height: 80%;
}
.el-footer{
  line-height: 30px !important;
}
body {
  margin: 0px !important;
}
</style>
