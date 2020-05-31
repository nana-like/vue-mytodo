<template>
  <div id="app">
    <div ref="back" class="top">
      <TodoHeader />
      <div v-if="userName">
        <TodoTitle
          v-bind:propCount="checkCount"
          v-bind:propName="userName"
          v-on:changeName="changeUserName"
        />
        <TodoInput v-on:addItem="addOneItem" />
      </div>
      <div v-else>
        <TodoHello v-on:addName="addUserName" />
      </div>
    </div>
    <div class="body">
      <div v-if="userName">
        <TodoController v-on:sortItem="sortAllItem" v-on:clearAll="clearAllItem" />
        <TodoList
          v-bind:propItems="todoItems"
          v-on:removeItem="removeOneItem"
          v-on:toggleItem="toggleOneItem"
          v-bind:propEmpty="isEmpty"
        />
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

import getDate from "./assets/commonJS/getDate.js";

export default {
  name: "App",
  data() {
    return {
      todoItems: [],
      userName: "",
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
    }
  },
  methods: {
    // 아이템 하나 추가
    addOneItem(todoItem) {
      // 빈 내용인 경우
      if (todoItem === "") {
        this.showModal = !this.showModal;
        this.modalText = "The form is empty. Please enter your task.";
        return false;
      }
      // 중복되는 내용인 경우
      for (let i = 0; i < this.todoItems.length; i++) {
        if (this.todoItems[i].item === todoItem) {
          this.showModal = !this.showModal;
          this.modalText = "I think you've already had the task.";
          return false;
        }
      }
      // 저장할 정보
      var value = {
        item: todoItem,
        date: `${getDate().date} ${getDate().week}`,
        time: getDate().time,
        completed: false
      };
      localStorage.setItem(todoItem, JSON.stringify(value));
      this.todoItems.push(value);
    },
    // 아이템 하나 삭제
    removeOneItem(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    // 아이템 하나 완료 토글
    toggleOneItem(todoItem) {
      todoItem.completed = !todoItem.completed;
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    // 모든 아이템 삭제
    clearAllItem() {
      this.todoItems = [];
      const name = this.userName;
      localStorage.clear();
      localStorage.setItem("userName", name);
    },
    // 최신순 정렬
    sortTodoLatest() {
      this.todoItems.sort(function(a, b) {
        return b.time - a.time;
      });
    },
    // 오래된 순 정렬
    sortTodoOldest() {
      this.todoItems.sort(function(a, b) {
        return a.time - b.time;
      });
    },
    // 선택된 값에 따라 아이템 정렬
    sortAllItem(selectedSort) {
      if (selectedSort.value === "date-desc") {
        this.sortTodoLatest();
      } else if (selectedSort.value === "date-asc") {
        this.sortTodoOldest();
      }
    },
    // 사용자 이름 추가
    addUserName(userName) {
      localStorage.setItem("userName", userName);
      this.userName = userName;
    },
    // 사용자 이름 변경
    changeUserName(userName) {
      localStorage.setItem("userName", userName);
      this.userName = userName;
    }
  },
  created() {
    // 로컬 스토리지의 사용자 이름 가져오기
    this.userName = localStorage.getItem("userName");

    // 로컬 스토리지의 아이템 목록 뿌리기
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (
          localStorage.key(i) !== "loglevel:webpack-dev-server" &&
          localStorage.key(i) !== "csCursors" &&
          localStorage.key(i) !== "csPointers" &&
          localStorage.key(i) !== "userName"
        ) {
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
  },
  mounted() {
    this.sortTodoOldest();

    // background(this.$refs.back);
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
