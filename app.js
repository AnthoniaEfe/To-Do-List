//selectors
const inputField = document.querySelector("#toDoDescription");
const inputTitle = document.querySelector("#toDoTitle");
const formToDo = document.querySelector("form");
const toDoList = document.querySelector("#toDoList");
const addBtn = document.querySelector("#addButton");
const updateBtn = document.querySelector("#updateButton");

//event listeners
addBtn.addEventListener("click", addToDo);
updateBtn.addEventListener("click", updateToDo);
let editId = null;

toDoArray = []; //array to save each todo object(title, text, id)

function showDetails(id) {
  const el = document.querySelector("#text" + id);
  const classes = el.classList;
  if (classes.contains("hidden")) {
    classes.remove("hidden");
  } else {
    classes.add("hidden");
  }
}

function displayTodos() {
  let list = "";
  toDoArray.forEach((el) => {
    list += `
  <li data-id="${el.id}" class="liElements" onClick="showDetails(${el.id})">
    <div id="liSpan" class="spanDiv">
      <p id="title${el.id}" class="toDoTitle">${el.title}</p>
      <i class="updateButton fas fa-pen" id="pen" onClick="editToDo(event, ${el.id})"></i>
      <i class="deleteButton fas fa-trash-alt" id="trash-can" onClick="deleteToDo(event, ${el.id})"></i>
    </div>
    <div class="dropdown" id="">
      <p id="text${el.id}" class="toDoContent hidden">${el.text}</p>
    </div>
  </li>
  `;
  });

  toDoList.innerHTML = list;
}

function addToDo(e) {
  e.preventDefault();

  //retrieving the inputted values
  const inputTitled = inputTitle.value;
  const inputText = inputField.value;

  //ensuring that title and description are not empty
  if (inputTitled.trim() == "" || inputText.trim() == "") return;

  //giving elements random IDs
  const toDoId = Math.floor(Math.random() * 1000000);

  //creating new todo object
  const newToDo = {
    id: toDoId,
    text: inputText,
    title: inputTitled,
  };
  //pushing new todo object to todo list array
  toDoArray.push(newToDo);

  displayTodos();

  //clearing fields
  inputTitle.value = "";
  inputField.value = "";
  inputTitle.focus();
  inputTitle.removeAttribute("readonly");

  disableForm();
}

function editToDo(event, id) {
  event.stopPropagation();
  if ((inputTitle.disabled = true) && (inputField.disabled = true)) {
    inputTitle.disabled = false;
    inputField.disabled = false;
  }

  const foundTodo = toDoArray.find((todo) => {
    if (todo.id == id) {
      return true;
    } else {
      return false;
    }
  });

  editId = id;
  inputTitle.value = foundTodo.title;
  inputField.value = foundTodo.text;

  document.querySelector("#addButton").classList.add("hidden");
  document.querySelector("#updateButton").classList.remove("hidden");
}

function updateToDo() {
  toDoArray.forEach((todo) => {
    if (todo.id == editId) {
      todo.title = inputTitle.value;
      todo.text = inputField.value;
      document.querySelector("#title" + editId).innerHTML = inputTitle.value;
      document.querySelector("#text" + editId).innerHTML = inputField.value;
    }
  });
  console.log(toDoArray);

  inputTitle.value = "";
  inputField.value = "";
  inputTitle.focus();
  inputTitle.removeAttribute("readonly");
  document.querySelector("#updateButton").classList.add("hidden");
  document.querySelector("#addButton").classList.remove("hidden");
}

function deleteToDo(e, id) {
  e.stopPropagation();

  const foundTodo = toDoArray.find((todo) => {
    if (todo.id == id) {
      return true;
    } else {
      return false;
    }
  });

  index = toDoArray.findIndex((el) => {
    return el == foundTodo;
  });
  console.log(index);

  toDoArray.forEach((todo) => {
    if (todo.id == id) {
      let confirmDel = confirm("Delete this to-do?");
      if (confirmDel == true) {
        toDoArray.splice(index, 1);
        element = document.querySelector(`.liElements[data-id="${id}"]`);
        element.remove();
        console.log(toDoArray);
      } else {
        return;
      }
    }
  });
  disableForm();
}

function disableForm() {
  if (toDoArray.length > 9) {
    inputTitle.disabled = true;
    inputField.disabled = true;
  } else {
    inputTitle.disabled = false;
    inputField.disabled = false;
  }
}
