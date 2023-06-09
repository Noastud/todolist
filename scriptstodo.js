// Define an array to store TODOs
let todos = [];

// Function to add a TODO
function addTodo() {
  const title = document.getElementById('titleInput').value;
  const description = document.getElementById('descriptionInput').value;
  const abbreviation = document.getElementById('abbreviationInput').value;
  const important = document.getElementById('importantCheckbox').checked;
  const urgent = document.getElementById('urgentCheckbox').checked;
  const startDate = document.getElementById('startDateInput').value;
  const endDate = document.getElementById('endDateInput').value;
  const progress = document.getElementById('progressInput').value;

  const todo = {
    id: generateUniqueId(),
    title,
    description,
    abbreviation,
    important,
    urgent,
    startDate,
    endDate,
    progress
  };

  todos.push(todo);
  renderTodos();
  renderTodosSidebar();
  resetForm();
  saveTodosToLocalStorage();
}

// Function to generate a unique ID for each TODO
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Function to render TODOs in the main section
function renderTodos() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  const todosString = localStorage.getItem('todos');
  const storedTodos = JSON.parse(todosString) || [];

  const searchInput = document.getElementById('search').value.trim().toLowerCase();

  storedTodos.forEach(todo => {
    const todoTitle = todo.title.toLowerCase();
    if (!searchInput || todoTitle.includes(searchInput)) {
      const li = document.createElement('li');
      li.setAttribute('data-id', todo.id);

      const checkboxDiv = document.createElement('div');
      checkboxDiv.classList.add('cntr');

      const checkboxInput = document.createElement('input');
      checkboxInput.checked = todo.important;
      checkboxInput.type = 'checkbox';
      checkboxInput.id = `cbx-${todo.id}`;
      checkboxInput.classList.add('hidden-xs-up');
      checkboxDiv.appendChild(checkboxInput);

      const checkboxLabel = document.createElement('label');
      checkboxLabel.htmlFor = `cbx-${todo.id}`;
      checkboxLabel.classList.add('cbx');
      checkboxDiv.appendChild(checkboxLabel);

      li.appendChild(checkboxDiv);

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

      const importantElement = document.createElement('span');
      importantElement.textContent = `Important: ${todo.important ? 'Yes' : 'No'}`;
      importantElement.classList.add('todo-important');
      li.appendChild(importantElement);

      const urgentElement = document.createElement('span');
      urgentElement.textContent = `Urgent: ${todo.urgent ? 'Yes' : 'No'}`;
      urgentElement.classList.add('todo-urgent');
      li.appendChild(urgentElement);

      const startDateElement = document.createElement('span');
      startDateElement.textContent = `Start Date: ${todo.startDate}`;
      startDateElement.classList.add('todo-start-date');
      li.appendChild(startDateElement);

      const endDateElement = document.createElement('span');
      endDateElement.textContent = `End Date: ${todo.endDate}`;
      endDateElement.classList.add('todo-end-date');
      li.appendChild(endDateElement);

      const progressElement = document.createElement('span');
      progressElement.textContent = `Progress: ${todo.progress}%`;
      progressElement.classList.add('todo-progress');
      li.appendChild(progressElement);

      const editButton = document.createElement('button');
      editButton.classList.add('custom-button', 'edit-button', 'fa', 'fa-pencil');
      editButton.addEventListener('click', () => {
        editTodoItem(todo.id);
      });
      li.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('custom-button', 'delete-button', 'fa', 'fa-trash');
      deleteButton.addEventListener('click', () => {
        confirmDeleteTodoItem(todo.id);
      });
      li.appendChild(deleteButton);

      todoList.appendChild(li);
    }
  });
}

// Function to render TODOs in the sidebar
function renderTodosSidebar() {
  const checklist = document.getElementById('checklist');
  checklist.innerHTML = '';

  todos.forEach(todo => {
    const checkboxInput = document.createElement('input');
    checkboxInput.checked = false; // Update the checked state based on todo.completed property
    checkboxInput.value = todo.id;
    checkboxInput.name = 'r';
    checkboxInput.type = 'checkbox';
    checkboxInput.id = todo.id;

    const label = document.createElement('label');
    label.htmlFor = todo.id;
    label.textContent = todo.title;

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

    label.appendChild(todoInfo);

    checklist.appendChild(checkboxInput);
    checklist.appendChild(label);
  });
}

// Function to edit a TODO item
function editTodoItem(todoId) {
  const todo = todos.find(todo => todo.id === todoId);
  if (!todo) return;

  const title = prompt('Enter new title:', todo.title);
  if (title !== null) {
    todo.title = title;
    renderTodos();
    renderTodosSidebar();
    saveTodosToLocalStorage();
  }
}

// Function to confirm and delete a TODO item
function confirmDeleteTodoItem(todoId) {
  const todo = todos.find(todo => todo.id === todoId);
  if (!todo) return;

  const confirmation = confirm(`Are you sure you want to delete "${todo.title}"?`);
  if (confirmation) {
    deleteTodoItem(todoId);
  }
}

// Function to delete a TODO item
function deleteTodoItem(todoId) {
  todos = todos.filter(todo => todo.id !== todoId);
  renderTodos();
  renderTodosSidebar();
  saveTodosToLocalStorage();
}

// Function to reset the form
function resetForm() {
  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('abbreviationInput').value = '';
  document.getElementById('importantCheckbox').checked = false;
  document.getElementById('urgentCheckbox').checked = false;
  document.getElementById('startDateInput').value = '';
  document.getElementById('endDateInput').value = '';
  document.getElementById('progressInput').value = '';
}

// Function to save TODOs to localStorage
function saveTodosToLocalStorage() {
  const todosString = JSON.stringify(todos);
  localStorage.setItem('todos', todosString);
  console.log('TODOs saved to localStorage.');
}

// Event listener for form submission
document.getElementById('todoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo();
  saveTodosToLocalStorage();
});

// Load TODOs from localStorage on page load
window.addEventListener('DOMContentLoaded', function() {
  const todosString = localStorage.getItem('todos');
  todos = JSON.parse(todosString) || [];
  renderTodos();
  renderTodosSidebar();
});
