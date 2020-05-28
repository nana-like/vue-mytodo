<template>
  <div class="title">
    <p class="title__message">{{ message }}</p>
    <p class="title__task">
      <span class="title__task-top">You've got</span>
      <span class="title__task-count">
        <em class="title__task-left">{{ propsdata.left }}</em>
        <em v-if="propsdata.total" class="title__task-total">&nbsp;/ {{ propsdata.total }}</em>
      </span>
      <span class="title__task-bottom">tasks today !</span>
      <span class="title__task-info"></span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["propsdata"],
  data() {
    return {
      message: "Good evening, Nana."
    };
  }
};
</script>

<style lang="scss">
.title {
  max-width: $max-width;
  margin: 0 auto;
  letter-spacing: 0.03rem;
  color: #fff;

  &__message {
    font-size: 1.6rem;
  }

  &__task {
    margin-top: 3.5rem;
    margin-bottom: 5rem;
    font-weight: bold;

    &-top {
      display: block;
      font-size: 2.6rem;
    }

    &-count {
      font-size: 5.4rem;
    }

    &-total {
      font-size: 50%;
    }

    &-bottom {
      display: block;
      font-size: 2.8rem;
      line-height: 50%;
    }
  }
}
</style>