<template>
  <div>
    <div
      class="card__img"
      v-if="imgSrc !== '/api/resources/'"
      :style="`background-image: url(${imgSrc})`"
      alt="courseIcon"
    />
    <div class="card__img card__img--default" v-else alt="courseIcon" />
    <div class="card__info">
      <div class="title">{{title}}</div>
      <div class="description">{{description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    tagName: {
      type: String,
      default: ""
    },
    imgSrc: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  &__img {
    width: 100%;
    height: 150px;
    background-size: cover;
    background-repeat: no-repeat;

    &--default {
      background-image: url(../../assets/img/default-news.jpg);
    }
  }

  &__info {
    height: 80px;
    padding: 5px;

    .title {
      overflow: hidden;
      width: 240px;
      height: 30px;
      padding: 0 5px;
      font-size: 16px;
      font-weight: bold;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: #1890ff;
      }
    }

    .description {
      overflow: hidden;
      display: -webkit-box;
      height: 40px;
      padding: 0 5px;
      font-size: 14px;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
