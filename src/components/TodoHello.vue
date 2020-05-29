<template>
  <div class="hello">
    <p class="hello__guide">
      Nice to meet you!
      <br />I’m going to remember your tasks.
    </p>
    <p class="hello__ask">What is your name?</p>
    <label for="user-name">Name</label>
    <div class="main-input">
      <input
        class="hello__input"
        type="text"
        id="user-name"
        placeholder="Let me know your name"
        v-model="userName"
        v-on:keyup.enter="addUserName"
      />
      <button class="hello__button">
        <span class="blind">Enter</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: ""
    };
  },
  methods: {
    addUserName() {
      this.$emit("addName", this.userName);
    }
  }
};
</script>

<style lang="scss">
.hello {
  max-width: $max-width;
  margin: 0 auto;
  letter-spacing: 0.03rem;
  color: #fff;

  label {
    display: none;
  }

  &__guide {
    padding-top: 2.4rem;
    margin-bottom: 6rem;
    font-size: 1.6rem;
    line-height: 1.75;
    letter-spacing: 0.03rem;
  }

  &__ask {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 4rem;
  }
}
</style>