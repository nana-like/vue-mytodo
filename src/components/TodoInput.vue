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
      // 빈 내용인 경우
      if (this.newTodoItem === "") {
        const text = "The form is empty. Please note your task.";
        this.$emit("alertModal", text);
        this.clearInput();
        return false;
      }
      // 중복되는 내용인 경우
      const oldItems = this.$store.getters.getItems;
      for (let i = 0; i < oldItems.length; i++) {
        if (oldItems[i].item === this.newTodoItem) {
          const text = "I think you've already had the task.";
          this.$emit("alertModal", text);
          this.clearInput();
          return false;
        }
      }

      this.$store.commit("addOneItem", this.newTodoItem);
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