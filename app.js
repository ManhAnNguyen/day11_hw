const addTaskbtn = document.getElementById("add-task_btn");
const tbody = document.getElementById("tbody");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const input = document.getElementById("input");
const btnConfirm = document.getElementById("confirm");

const LOCAL_KEY = "todos";

const todos = {
  data: localStorage.getItem(LOCAL_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_KEY))
    : [],
  setData: function (newData) {
    this.data = newData;
  },
};

// handle modal
addTaskbtn.addEventListener("click", () => {
  modal.classList.add("open-modal");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("open-modal");
  input.value = "";
});

//function for generate tr

const generateTodos = () => {
  tbody.innerHTML = "";
  todos.data.forEach((todo, index) => {
    const tr = document.createElement("tr");
    const { name, done } = todo;

    tr.innerHTML = `
        
        <td>${index + 1}</td>
        <td>${name}</td>
        <td class = ${done ? "done" : "not-done"}>
          <span>${done ? "Done" : "Processing"}</span>
        </td>
        <td>
         <button id="edit">
          <i class="fa-solid fa-pen"></i>
        </button>
        </td>
        <td>
         <button id="remove">
           <i class="fa-solid fa-trash"></i>
         </button>
        </td>
    `;
    tr.setAttribute("id", todo.id);
    tr.classList.add("todo-item");
    tbody.appendChild(tr);
  });

  const todoItems = document.getElementsByClassName("todo-item");

  [...todoItems].forEach((todo) => {
    todo.addEventListener("click", () => {
      const { id } = todo;
      const foundTodo = todos.data.find((item) => item.id === id);
      const othersTodo = todos.data.filter((item) => item.id !== id);

      //   todos.setData([...othersTodo, { ...foundTodo, done: !foundTodo.done }]);

      //   console.log(todos.data);
    });
  });
};

//handle add todo list
btnConfirm.addEventListener("click", () => {
  const value = input.value;
  if (!value) return alert("This field is required");

  const newTodo = {
    id: new Date().toString(),
    name: value,
    done: false,
  };

  todos.setData([...todos.data, newTodo]);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos.data));
  generateTodos();
  closeModal.click();
});

window.onload = () => {
  generateTodos();
};
