<template>
  <div class="admin__header">
    <div class="header__logo">机构管理后台</div>
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
  width: 200px;
  height: 60px;
  color: #333;
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
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>