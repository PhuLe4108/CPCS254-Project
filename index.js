// Event Listeners
document.addEventListener('click', (event) => {
    // Check which element the clicked target is closest to and call corresponding function
    if (event.target.closest('.edit-button')) {
        editTask(event);
    } else if (event.target.closest('.complete-button')) {
        completeTask(event);
    } else if (event.target.closest('.delete-button')) {
        deleteTask(event);
    }
});

// Listen for form submission and call the addTask function
document.querySelector('form').addEventListener('submit', addTask);

// Add Task
function addTask(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const taskInput = document.getElementById('add-task-input');
    const taskText = taskInput.value.trim(); // Get the task text from the input field

    if (taskText !== '') {
        // Create a new <li> task item element and add the task text and buttons from template
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="task-buttons">
                <button type="button" class="btn btn-outline-light edit-button"><i class="fa-solid fa-edit"></i></button>
                <button type="button" class="btn btn-outline-danger delete-button"><i class="fa-solid fa-trash-can"></i></button>
                <button type="button" class="btn btn-outline-success complete-button"><i class="fa-solid fa-check"></i></button>
            </div>
        `;
        
        // Append the new task item to the task list
        const taskList = document.querySelector('.task-list');
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}

// Edit Task
function editTask(event) {
    // Get the task item and task text
    const taskItem = event.target.closest('.task-item');
    const taskText = taskItem.querySelector('.task-text');
    const currentText = taskText.textContent;

    // Replace the task text with an input field containing the current text
    taskText.innerHTML = `<input type="text" value="${currentText}" class="edit-task-input">`;
    const editInput = taskText.querySelector('.edit-task-input');
    editInput.focus(); // Focus on the edit input field
    editInput.setSelectionRange(currentText.length, currentText.length); // Set cursor at end of the text

    // Update the task text when the edit input loses focus (click away from input field)
    editInput.addEventListener('blur', () => {
        taskText.textContent = editInput.value;
    });

    // Update the task text when the Enter key is pressed in the edit input
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            taskText.textContent = editInput.value;
        }
    });
}

// Delete Task
function deleteTask(event) {
    const taskItem = event.target.closest('.task-item');
    taskItem.remove();
}

// Complete Task
function completeTask(event) {
    const taskItem = event.target.closest('.task-item');
    taskItem.classList.toggle('strike-through');

    const completeButton = taskItem.querySelector('.complete-button');
    completeButton.classList.toggle('green');
}