<template>
  <div class="title">
    <p class="title__message">{{ message }}</p>
    <p class="title__task">
      You've got
      <span class="title__task-total">{{ taskTotal }}</span> tasks today.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello, nana.",
      taskTotal: 5
    };
  }
};
</script>

<style lang="scss">
.title {
  //****
  color: #fff;
  background-color: $cl-main;
  //****
}
</style>