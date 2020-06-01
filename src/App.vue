<template>
  <div id="app">
    <div class="top">
      <TodoHeader />
      <div v-if="this.checkName">
        <TodoTitle v-bind:propCount="checkCount" />
        <TodoInput v-on:alertModal="showModal" />
      </div>
      <div v-else>
        <TodoHello />
      </div>
    </div>
    <div class="body">
      <div v-if="this.checkName">
        <TodoController />
        <TodoList />
      </div>
      <TodoFooter />
    </div>
    <Modal v-if="modalVisible" v-on:close="modalVisible = false">
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
      error: "",
      modalVisible: false,
      modalText: ""
    };
  },
  computed: {
    checkCount() {
      const checkLeftItems = () => {
        const items = this.$store.getters.storedTodoItems;
        let leftCount = 0;
        for (let i = 0; i < items.length; i++) {
          if (items[i].completed === false) {
            leftCount++;
          }
        }
        return leftCount;
      };

      const count = {
        total: this.$store.getters.storedTodoItemsCount,
        left: checkLeftItems()
      };
      return count;
    },
    checkName() {
      return this.$store.getters.storedName;
    },
    checkModal() {
      return this.$store.state.showModal;
    }
    // checkError() {
    //   return this.$store.state.error.alert;
    // },
    // checkModal() {
    //   if (this.checkError) {
    //     return this.$store.state.error.message;
    //   } else {
    //     return false;
    //   }
    // }
  },
  methods: {
    showModal(text) {
      this.modalText = text;
      this.modalVisible = !this.modalVisible;
    }
  },
  mounted() {
    this.$store.commit("sortTodoOldest");
  },
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
