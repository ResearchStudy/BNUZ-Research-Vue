<template>
  <div class="admin__header">

    <div class="header__logo">北师研学个人中心</div>
    <div class="header__navbar"></div>
    <div class="header__link"></div>
  </div>
</template>

<style scoped>
.admin__header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 60px;
  border: #d7d7d7 1px solid;
  background: #fff;
  z-index: 2;
}

.header__logo {
  color: #409EFF;
  width: 200px;
  height: 60px;
  font-weight: bold;
}

.header__link {
  margin-left: auto;
}
</style>

<script>

export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
      imgUrl : ''
    };
  },
  created(){
    // this.imgUrl=require('@/assets/shida.png')

  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
