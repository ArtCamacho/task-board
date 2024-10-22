document.addEventListener("DOMContentLoaded", function () {
  // 1. Get references to HTML elements
  const addTaskButton = document.getElementById("addTaskButton");
  const todoCards = document.getElementById("todo-cards");
  const inProgressCards = document.getElementById("in-progress-cards");
  const doneCards = document.getElementById("done-cards");

  // 2. Example: Add Task Button Functionality
  addTaskButton.addEventListener("click", () => {
    // 2.1. Get task input from the user (you'll likely use a modal)
    const taskContent = prompt("Enter new task description:");

    // 2.2. Create a new task card element
    const newTaskCard = createTaskCard(taskContent);

    // 2.3. Add the new task card to the "To Do" column
    todoCards.appendChild(newTaskCard);
  });

  // 3. Function to create a new task card
  function createTaskCard(taskContent) {
    const card = document.createElement("div");
    card.classList.add("card", "task-card"); // Add styling classes
    card.innerHTML = `
      <div class="card-body">
        <p class="card-text">${taskContent}</p>
      </div>
    `;
    return card;
  }

  // 4. Drag and Drop Logic (using jQuery UI)
  $(function () {
    $(".lane")
      .sortable({
        connectWith: ".lane", // Allow dragging between all lanes
        update: function (event, ui) {
          // This function will be called after a card is dropped
          // You can get the new status of the card and update your data
          const taskId = ui.item.attr("data-task-id"); // Assuming you add task IDs
          const newStatus = ui.item.closest(".lane").attr("id");
          console.log(`Task ${taskId} moved to ${newStatus}`);

          // TODO: Update task status in your data storage (e.g., localStorage)
        },
      })
      .disableSelection();
  });
});
