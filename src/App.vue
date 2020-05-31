<template>
  <div id="app">
    <div class="top">
      <TodoHeader />
      <div v-if="this.checkName">
        <TodoTitle v-bind:propCount="checkCount" />
        <TodoInput />
      </div>
      <div v-else>
        <TodoHello />
      </div>
    </div>
    <div class="body">
      <div v-if="this.checkName">
        <TodoController />
        <TodoList v-bind:propEmpty="isEmpty" />
      </div>
      <TodoFooter />
    </div>
    <Modal v-if="showModal" v-on:close="showModal = false">
      <template v-slot:modal-text>{{ modalText }}</template>
    </Modal>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import TodoTitle from "./components/TodoTitle";
import TodoInput from "./components/TodoInput";
import TodoController from "./components/TodoController";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";
import TodoHello from "./components/TodoHello";
import Modal from "./components/common/Modal";

export default {
  name: "App",
  data() {
    return {
      todoItems: [],
      // userName: this.checkName,
      showModal: false,
      modalText: ""
    };
  },
  computed: {
    isEmpty() {
      return this.todoItems.length <= 0 ? true : false;
    },
    checkCount() {
      const checkLeftItems = () => {
        let leftCount = 0;
        for (let i = 0; i < this.todoItems.length; i++) {
          if (this.todoItems[i].completed === false) {
            leftCount++;
          }
        }
        return leftCount;
      };

      const count = {
        total: this.todoItems.length,
        left: checkLeftItems()
      };
      return count;
    },
    checkName() {
      return this.$store.getters.getName;
    }
  },
  mounted() {},
  components: {
    TodoHeader,
    TodoTitle,
    TodoInput,
    TodoController,
    TodoList,
    TodoFooter,
    TodoHello,
    Modal
  }
};
</script>

<style lang="scss">
@import "./assets/style/_reset";

.top {
  width: 100%;
  min-height: 43.6rem;
  padding: 0 $padding 4.5rem;
  background-image: linear-gradient(145deg, #3770cc 20%, #ce91c9 84%);
  // background-size: 200% 200%;
  // @include animation(randomBackground, 20s, infinite);
}

.body {
  padding: 3rem $padding;
  background-color: #efefef;
}
</style>
