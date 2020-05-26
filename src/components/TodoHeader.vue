<template>
  <header class="header">
    <h1 class="logo">My Todo</h1>
    <p class="date">05/26 Tue.</p>
  </header>
</template>

<script>
export default {
  methods: {
    getDate() {
      let date = new Date();
      console.log(date);
    }
  }
};
</script>

<style>
</style>