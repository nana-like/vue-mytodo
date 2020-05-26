<template>
  <div class="title">
    <p class="title__message">{{ message }}</p>
    <p class="title__task">
      <span class="title__task-top">You've got</span>
      <span class="title__task-total">{{ taskTotal }}</span>
      <span class="title__task-bottom">tasks today !</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Good evening, Nana.",
      taskTotal: 3
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

    &-total {
      font-size: 5.4rem;
      line-height: 110%;
    }

    &-bottom {
      display: block;
      font-size: 2.8rem;
      line-height: 90%;
    }
  }
}
</style>