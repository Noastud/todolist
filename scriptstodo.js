let todos = [];

function addTodo() {
  const titleInput = document.getElementById('titleInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const abbreviationInput = document.getElementById('abbreviationInput');

  const title = titleInput.value;
  const description = descriptionInput.value;
  const abbreviation = abbreviationInput.value;

  const todo = {
    id: generateUniqueId(),
    title: title,
    description: description,
    abbreviation: abbreviation
  };

  todos.push(todo);
  renderTodos();
  renderTodosSidebar();

  // Zurücksetzen der Eingabefelder
  titleInput.value = '';
  descriptionInput.value = '';
  abbreviationInput.value = '';
}

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

function renderTodos() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = createTodoListItem(todo);
    todoList.appendChild(li);
  });
}

function createTodoListItem(todo) {
  const li = document.createElement('li');
  li.dataset.id = todo.id;

  const titleElement = document.createElement('span');
  titleElement.textContent = todo.title;
  titleElement.classList.add('todo-title');
  li.appendChild(titleElement);

  const descriptionElement = document.createElement('span');
  descriptionElement.textContent = todo.description;
  descriptionElement.classList.add('todo-description');
  li.appendChild(descriptionElement);

  const abbreviationElement = document.createElement('span');
  abbreviationElement.textContent = todo.abbreviation;
  abbreviationElement.classList.add('todo-abbreviation');
  li.appendChild(abbreviationElement);

  return li;
}

function renderTodosSidebar() {
  const checklist = document.getElementById('checklist');
  checklist.innerHTML = '';

  todos.forEach(todo => {
    const checkboxInput = createCheckboxInput(todo);
    const label = createLabel(todo);
    const todoInfo = createTodoInfo(todo);
    label.appendChild(todoInfo);
    checklist.appendChild(checkboxInput);
    checklist.appendChild(label);
  });
}

function createCheckboxInput(todo) {
  const checkboxInput = document.createElement('input');
  checkboxInput.checked = false; // Das Überprüfen des Zustands basierend auf der Eigenschaft "completed" des Todos aktualisieren
  checkboxInput.value = todo.id;
  checkboxInput.name = 'todo';
  checkboxInput.type = 'checkbox';
  checkboxInput.id = todo.id;
  return checkboxInput;
}

function createLabel(todo) {
  const label = document.createElement('label');
  label.htmlFor = todo.id;
  label.textContent = todo.title;
  return label;
}

function createTodoInfo(todo) {
  const todoInfo = document.createElement('div');
  todoInfo.classList.add('todo-info');

  const descriptionElement = document.createElement('span');
  descriptionElement.textContent = todo.description;
  descriptionElement.classList.add('todo-description');
  todoInfo.appendChild(descriptionElement);

  const abbreviationElement = document.createElement('span');
  abbreviationElement.textContent = todo.abbreviation;
  abbreviationElement.classList.add('todo-abbreviation');
  todoInfo.appendChild(abbreviationElement);

  return todoInfo;
}

// Eventlistener für das Absenden des Formulars
document.getElementById('todoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo();
});
