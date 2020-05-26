<template>
  <div id="app">
    <TodoHeader />
    <TodoTitle />
    <main class="main">
      <TodoInput />
      <TodoController />
      <TodoList />
      <TodoFooter />
    </main>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import TodoTitle from "./components/TodoTitle";
import TodoInput from "./components/TodoInput";
import TodoController from "./components/TodoController";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

export default {
  name: "App",
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
</style>
