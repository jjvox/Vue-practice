<template>
  <div class="home">
    <div class="container">
      <h2 class="title">할 일 추가 앱</h2>
      <div class="add-area">
        <input
          v-model="todo"
          type="text"
          class="add-input"
          placeholder="할 일을 적어 주세요"
        />
        <button class="add-button" type="button" @click="addTodo">추가</button>
      </div>
      <ul class="todo-list">
        <li class="todo-item" v-for="(item, index) in todoList" :key="index">
          <div class="todo-area">
            <input
              class="todo-item__status"
              type="checkbox"
              v-model="item.isChecked"
            />
            <span v-if="!item.isUpdate" :class="{ isFinish: item.isChecked }"
              >{{ item.name }}
            </span>
            <span v-else>
              <input class="todo-item_text" type="text" v-model="item.name" />
            </span>
          </div>
          <div class="button-area">
            <font-awesome-icon
              v-if="!item.isUpdate"
              icon="fa-solid fa-pen-to-square"
              @click="item.isUpdate = true"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-check"
              @click="item.isUpdate = false"
            />
            <font-awesome-icon
              icon="fa-solid fa-trash"
              @click="deleteTodo(index)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeView",
  data() {
    return {
      todo: "",
      todoList: [],
    };
  },
  methods: {
    addTodo() {
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

<style scoped>
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
}
.add-input {
  width: 120px;
  height: 30px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding-left: 8px;
  margin-right: 8px;
}
.add-input:hover {
  border-color: rgba(0, 0, 0, 0.54);
}
.add-input:focus {
  border-color: #00c4c4;
}
.add-button {
  width: 80px;
  height: 30px;
  background-color: #00c4c4;
  border: 1px solid #00c4c4;
  color: #fff;
  cursor: pointer;
  margin: 16px 0;
}
.add-button:hover {
  background-color: #00b2b2;
  border-color: #00b2b2;
}
.todo-list {
  width: 100%;
}
.todo-item {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid grey;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.button-area > svg {
  cursor: pointer;
  color: grey;
  margin-left: 8px;
}
.todo-item_text {
  width: 200px;
  height: 30px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding-left: 8px;
  margin-right: 8px;
}
.todo-item_text:hover {
  border-color: rgba(0, 0, 0, 0.54);
}
.todo-item_text:focus {
  border-color: #00c4c4;
}
.todo-item__status {
  margin-right: 8px;
}

.isFinish {
  text-decoration: line-through;
}
</style>
