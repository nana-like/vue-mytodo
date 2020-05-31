<template>
  <div class="add">
    <div class="main-input">
      <input
        type="text"
        class="add__input"
        placeholder="Enter your task here"
        v-model="newTodoItem"
        v-on:keypress.enter="addTodoItem"
        ref="taskInput"
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
      this.$emit("addItem", this.newTodoItem);
      this.clearInput();
      this.$refs.taskInput.focus();
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

  .main-input {
    @include animation(fadeShow, 800ms, 1, 900ms);
  }
}
</style>