import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [],
  },
  getters: {},
  mutations: {
    addTodo(context, value) {
      context.todoList.push(value);
    },
    deleteTodo(context, value) {
      context.todoList = context.todoList.filter((item, idx) => idx !== value);
    },
  },
  // 비동기 API 사용 할때
  actions: {},
  // store를 나눠서 여러개의 모듈로 나눌경우. 아래에 선언
  modules: {},
});
