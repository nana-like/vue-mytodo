<template>
  <header class="header">
    <h1 class="logo">My Todo</h1>
    <p class="header__date">{{ timestamp }}</p>
  </header>
</template>

<script>
export default {
  data() {
    return {
      timestamp: ""
    };
  },
  created() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const weekList = new Array(
      "Sun.",
      "Mon.",
      "Tue.",
      "Wed.",
      "Thu.",
      "Fri.",
      "Sat."
    );
    const week = weekList[now.getDay()];
    this.timestamp = `${month}/${date} ${week}`;
  }
};
</script>

<style lang="scss">
.header {
  max-width: $max-width;
  margin: 0 auto;
  padding: 0 $padding;
  height: 60px;
  @include flexbox;
  @include align-items(center);
  @include justify-content(space-between);

  //****
  color: #fff;
  background-color: $cl-main;
  //****

  &__date {
    // color: #555;
    letter-spacing: 0.02rem;
    font-size: 12px;

    @include res {
      font-size: 11px;
    }
  }
}

.logo {
  // color: $cl-main;
  font-size: 17px;

  @include res {
    font-size: 15px;
  }
}
</style>