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

html, body, #app{
  height: 100%;
}
body {
  margin: 0px !important;
}
.ql-container.ql-snow{
  min-height: 180px;
}

.el-main{
  background-color: white !important;
}

</style>
