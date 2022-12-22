<template>
  <div class="home">
    <div class="container">
      <h2 class="title">할 일 추가 앱</h2>
      <div class="add-area">
        <!-- v-model을 이용해서 자식 컴포넌트에 value 값을 전달하고 input이벤트에 의한 값도 받아서 업데이트 한다.   -->
        <VInput v-model="todo" @enter="addTodo" class="add-area__button" />
        <VButton @click="addTodo" variant="contained">추가</VButton>
      </div>
      <!-- props로 todoList를 자식 컴포넌트에 전달 해준다.  -->
      <TodoList :todoList="todoList" @click="deleteTodo" />
    </div>
  </div>
</template>

<script>
import VInput from "../components/common/VInput.vue";
import VButton from "../components/common/VButton.vue";
import TodoList from "../components/todo/TodoList.vue";
export default {
  name: "homeView",
  components: {
    VInput,
    VButton,
    TodoList,
  },
  data() {
    return {
      todo: "",
      todoList: [],
    };
  },
  methods: {
    addTodo() {
      if (!this.todo) return;
      const newTodo = {
        name: this.todo,
        isUpdate: false,
        isChecked: false,
      };
      this.todoList.push(newTodo);
      this.todo = "";
    },
    deleteTodo(index) {
      this.todoList = this.todoList.filter((item, idx) => idx !== index);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  width: 500px;
  height: 500px;
  border: 1px solid black;
  padding: 24px;
}
.title {
  text-align: center;
}
.add-area {
  display: flex;
  align-items: center;
  justify-content: end;

  &__button {
    margin-right: 4px;
  }
}
</style>
