<template>
  <div class="add">
    <div class="main-input">
      <input
        type="text"
        class="add__input"
        placeholder="Enter your task here"
        v-model="newTodoItem"
        v-on:keyup.enter="addTodoItem"
      />
      <button class="add__buttonn" v-on:click="addTodoItem">
        <span class="blind">Add</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodoItem: ""
    };
  },
  methods: {
    addTodoItem() {
      if (this.newTodoItem !== "") {
        this.$emit("addItem", this.newTodoItem);
        this.clearInput();
      }
    },
    clearInput() {
      this.newTodoItem = "";
    }
  }
};
</script>

<style lang="scss">
.add {
  position: relative;
  max-width: $max-width;
  margin: 0 auto;

  &__input {
  }

  &__button {
  }
}
</style>