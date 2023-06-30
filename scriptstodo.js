// Definiere ein Array zur Speicherung der TODOs
let todos = [];

// Funktion zum Hinzufügen eines TODOs
function addTodo() {
  // Lese die Eingabewerte aus den entsprechenden Feldern aus
  const title = document.getElementById('titleInput').value;
  const description = document.getElementById('descriptionInput').value;
  const kurz = document.getElementById('kurzInput').value;
  const important = document.getElementById('importantCheckbox').checked;
  const dringend = document.getElementById('dringendCheckbox').checked;
  const startDate = document.getElementById('startDateInput').value;
  const endDate = document.getElementById('endDateInput').value;
  const progress = document.getElementById('progressInput').value;

  // Überprüfe, ob das Enddatum größer als das Startdatum ist
  if (endDate <= startDate) {
    alert("Enddatum muss größer als Startdatum sein.");
    return;
  }

  // Bestimme die Priorität basierend auf den Checkboxen
  let wichtig;
  if (important && dringend) {
    wichtig = "Wichtig und Dringend – Sofort erledigen";
  } else if (important && !dringend) {
    wichtig = "Wichtig und nicht Dringend – Einplanen und Wohlfühlen";
  } else if (!important && dringend) {
    wichtig = "Nicht Wichtig und Dringend – Gib es ab";
  } else {
    wichtig = "Nicht Wichtig und Nicht Dringend – Weg damit";
  }

  // Erstelle ein neues TODO-Objekt
  const todo = {
    id: generateUniqueId(),
    title,
    description,
    kurz,
    important,
    dringend,
    startDate,
    endDate,
    progress,
    wichtig
  };

  // Füge das TODO-Objekt zum Array hinzu
  todos.push(todo);
  renderTodosSidebar();
  resetForm();
  saveTodosToLocalStorage();
}

// Funktion zum Generieren einer eindeutigen ID für jedes TODO
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Funktion zum Rendern der TODOs in der Seitenleiste
// ...

// Funktion zum Rendern der TODOs in der Seitenleiste
function renderTodosSidebar() {
  const checklist = document.getElementById('checklist');
  checklist.innerHTML = '';

  const searchInput = document.getElementById('searchInput').value.toLowerCase();

  // Filtere die TODOs basierend auf dem Suchtext und rendere sie in der Seitenleiste
  todos
    .filter(todo => todo.title.toLowerCase().includes(searchInput))
    .forEach(todo => {
      const li = document.createElement('li');
      li.classList.add('todo');

      const titleElement = document.createElement('div');
      titleElement.textContent = todo.title;
      titleElement.classList.add('todo-title');
      li.appendChild(titleElement);

      const descriptionElement = document.createElement('div');
      descriptionElement.textContent = todo.description;
      descriptionElement.classList.add('todo-description');
      li.appendChild(descriptionElement);

      const kurzElement = document.createElement('div');
      kurzElement.textContent = todo.kurz;
      kurzElement.classList.add('todo-kurz');
      li.appendChild(kurzElement);

      const wichtigElement = document.createElement('div');
      wichtigElement.textContent = getwichtigLabel(todo);
      wichtigElement.classList.add('todo-wichtig');
      li.appendChild(wichtigElement);

      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('todo-buttons');

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('btn');
      editButton.addEventListener('click', () => {
        editTodo(todo.id);
      });
      buttonsContainer.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn', 'btn-delete');
      deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id);
      });
      buttonsContainer.appendChild(deleteButton);

      li.appendChild(buttonsContainer);

      checklist.appendChild(li);
    });
}

// Funktion zum Löschen eines TODOs
function deleteTodo(todoId) {
  // Finde das TODO-Objekt im Array anhand der ID
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex !== -1) {
    // Entferne das TODO-Objekt aus dem Array
    todos.splice(todoIndex, 1);
    renderTodosSidebar();
    saveTodosToLocalStorage();
    console.log('TODO gelöscht.');
  }
}



// Funktion zum Abrufen der Prioritätsbezeichnung für ein TODO
function getwichtigLabel(todo) {
  if (todo.important && todo.dringend) {
    return 'Wichtig und Dringend – Sofort erledigen';
  } else if (todo.important && !todo.dringend) {
    return 'Wichtig und nicht Dringend – Einplanen und Wohlfühlen';
  } else if (!todo.important && todo.dringend) {
    return 'Nicht Wichtig und Dringend – Gib es ab';
  } else {
    return 'Nicht Wichtig und Nicht Dringend – Weg damit';
  }
}

// Weitere Funktionen...

// Event-Listener für das Absenden des Formulars
document.getElementById('todoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo();
});

// Weitere Event-Listener...

// Laden der TODOs aus dem localStorage beim Seitenaufruf
window.addEventListener('DOMContentLoaded', function() {
  const todosString = localStorage.getItem('todos');
  todos = JSON.parse(todosString) || [];
  renderTodosSidebar();
});

// Funktion zum Speichern der TODOs im localStorage
function saveTodosToLocalStorage() {
  const todosString = JSON.stringify(todos);
  localStorage.setItem('todos', todosString);
  console.log('TODOs im localStorage gespeichert.');
}
