<template>
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
          <!-- <input class="todo-item_text" type="text" v-model="item.name" /> -->
          <VInput v-model="item.name" />
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
</template>

<script>
import VInput from "../common/VInput.vue";
export default {
  name: "TodoList",
  components: { VInput },
  props: {
    todoList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteItem(index) {
      this.$emit("click", index);
    },
    deleteTodo(index) {
      this.$store.commit("deleteTodo", index);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.button-area {
  svg {
    cursor: pointer;
    color: grey;
    margin-left: 8px;
  }
}
.todo-item_text {
  width: 200px;
  height: 30px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding-left: 8px;
  margin-right: 8px;

  &:hover {
    border-color: rgba(0, 0, 0, 0.54);
  }
  &:focus {
    border-color: #00c4c4;
  }
}
.todo-item__status {
  margin-right: 8px;
}

.isFinish {
  text-decoration: line-through;
}
</style>
