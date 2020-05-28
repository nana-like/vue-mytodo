<template>
  <div id="app">
    <div class="top">
      <TodoHeader />
      <TodoTitle />
      <TodoInput v-on:addItem="addOneItem" />
    </div>
    <div class="body">
      <TodoController v-on:clearAll="clearAllItem" />
      <TodoList
        v-bind:propsdata="todoItems"
        v-on:removeItem="removeOneItem"
        v-on:toggleItem="toggleOneItem"
      />
      <TodoFooter />
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import TodoTitle from "./components/TodoTitle";
import TodoInput from "./components/TodoInput";
import TodoController from "./components/TodoController";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

import getDate from "./assets/commonJS/getDate.js";

export default {
  name: "App",
  data() {
    return {
      todoItems: []
    };
  },
  methods: {
    addOneItem(todoItem) {
      var value = {
        item: todoItem,
        date: `${getDate().date} ${getDate().week}`,
        time: getDate().time,
        completed: false
      };
      localStorage.setItem(todoItem, JSON.stringify(value));
      this.todoItems.push(value);
    },
    removeOneItem(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem(todoItem) {
      todoItem.completed = !todoItem.completed;
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItem() {
      localStorage.clear();
    }
  },
  created() {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (
          localStorage.key(i) !== "loglevel:webpack-dev-server" &&
          localStorage.key(i) !== "csCursors" &&
          localStorage.key(i) !== "csPointers"
        ) {
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
  },
  components: {
    TodoHeader,
    TodoTitle,
    TodoInput,
    TodoController,
    TodoList,
    TodoFooter
  }
};
</script>

<style lang="scss">
@import "./assets/style/_reset";

.top {
  padding: 0 $padding 4.5rem;
  width: 100%;
  background-image: linear-gradient(145deg, #3770cc 20%, #ce91c9 84%);
}

.body {
  padding: 3rem $padding;
  background-color: #efefef;
}
</style>
