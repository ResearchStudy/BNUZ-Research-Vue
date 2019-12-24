<template>
  <div>
    <div v-for="(resource,index) in resources" :key="index">
      <el-tooltip
        class="item"
        effect="dark"
        :content="`大小: ${(resource.size/1000).toFixed(2)}KB`"
        placement="right"
      >
        <span class="link" @click="handleEnclousureClick(resource.storage)">{{resource.name}}</span>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnclousureList",
  props: {
    resources: Array
  },
  mounted() {},
  methods: {
    handleEnclousureClick(storage) {
      window.open(`/api/resources/${storage}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.link {
  cursor: pointer;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #409eff;
  }
}
</style>