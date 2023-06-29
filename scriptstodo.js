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
  renderTodosSidebar();
  resetForm();
  saveTodosToLocalStorage();
}

// Function to generate a unique ID for each TODO
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Function to render TODOs in the sidebar
function renderTodosSidebar() {
  const checklist = document.getElementById('checklist');
  checklist.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.checked = false; // Update the checked state based on todo.completed property
    checkboxInput.value = todo.id;
    checkboxInput.name = 'r';
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

    const progressElement = document.createElement('div');
    progressElement.classList.add('todo-progress-sidebar');
    const progressBar = document.createElement('div');
    progressBar.style.width = `${todo.progress}%`;
    progressElement.appendChild(progressBar);
    todoInfo.appendChild(progressElement);

    label.appendChild(todoInfo);

    li.appendChild(checkboxInput);
    li.appendChild(label);
    checklist.appendChild(li);

    checkboxInput.addEventListener('change', () => {
      updateTodoProgress(todo.id, checkboxInput.checked);
    });
  });
}

// Function to update the progress of a TODO
function updateTodoProgress(todoId, completed) {
  const todo = todos.find(todo => todo.id === todoId);
  if (!todo) return;

  todo.progress = completed ? 100 : 0;
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
  document.getElementById('progressInput').value = '0';
  document.getElementById('progressOutput').textContent = '0%';
}

// Function to update the progress output text
function updateProgressOutput() {
  const progressInput = document.getElementById('progressInput');
  const progressOutput = document.getElementById('progressOutput');
  progressOutput.textContent = `${progressInput.value}%`;
}

// Event listener for form submission
document.getElementById('todoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo();
});

// Event listener for progress input change
document.getElementById('progressInput').addEventListener('input', updateProgressOutput);

// Load TODOs from localStorage on page load
window.addEventListener('DOMContentLoaded', function() {
  const todosString = localStorage.getItem('todos');
  todos = JSON.parse(todosString) || [];
  renderTodosSidebar();
});

// Function to save TODOs to localStorage
function saveTodosToLocalStorage() {
  const todosString = JSON.stringify(todos);
  localStorage.setItem('todos', todosString);
  console.log('TODOs saved to localStorage.');
}
