import Vue from 'vue'
import Vuex from 'vuex'
import getDate from "./../assets/commonJS/getDate.js";

Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    // 로컬 스토리지의 아이템 목록 뿌리기
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (
          localStorage.key(i) !== "loglevel:webpack-dev-server" &&
          localStorage.key(i) !== "csCursors" &&
          localStorage.key(i) !== "csPointers" &&
          localStorage.key(i) !== "userName"
        ) {
          arr.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
    return arr;
  },
  fetchName() {
    // 로컬 스토리지의 사용자 이름 가져오기
    if (localStorage.getItem("userName")) {
      const userName = localStorage.getItem("userName");
      return userName;
      // this.$store.commit("setUserName", this.userName);
    }
  }
}


export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch(),
    userName: storage.fetchName(),
    showModal: false,
    error: {
      alert: false,
      type: '',
      message: ''
    }
  },
  getters: {
    storedTodoItems(state) {
      return state.todoItems;
    },
    getName(state) {
      return state.userName
    },
    getItems(state) {
      return state.todoItems;
    },
    getItemsLength(state) {
      return state.todoItems.length;
    }
  },
  mutations: {
    // 아이템 하나 추가
    addOneItem(state, todoItem) {
      var value = {
        item: todoItem,
        date: `${getDate().date} ${getDate().week}`,
        time: getDate().time,
        completed: false
      };
      localStorage.setItem(todoItem, JSON.stringify(value));
      state.todoItems.push(value);
    },
    // 아이템 하나 삭제
    removeOneItem(state, payload) {
      localStorage.removeItem(payload.todoItem.item);
      state.todoItems.splice(payload.index, 1);
    },
    // 아이템 하나 완료 토글
    toggleOneItem(state, payload) {
      payload.todoItem.completed = !payload.todoItem.completed;
      localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },
    // 모든 아이템 삭제
    clearAllItem(state) {
      state.todoItems = [];
      const name = this.userName;
      localStorage.clear();
      localStorage.setItem("userName", name);
    },
    // 최신순 정렬
    sortTodoLatest(state) {
      state.todoItems.sort(function (a, b) {
        return b.time - a.time;
      });
    },
    // 오래된 순 정렬
    sortTodoOldest(state) {
      state.todoItems.sort(function (a, b) {
        return a.time - b.time;
      });
    },
    // 사용자 이름 추가
    setUserName(state, userName) {
      localStorage.setItem("userName", userName);
      state.userName = userName;
    },
  }
});