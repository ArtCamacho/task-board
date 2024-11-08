document.addEventListener("DOMContentLoaded", function () {
  // 1. Get references to HTML elements
  const addTaskButton = document.getElementById("addTaskButton");
  const todoCards = document.getElementById("todo-cards");
  const inProgressCards = document.getElementById("in-progress-cards");
  const doneCards = document.getElementById("done-cards");
  addTaskButton.addEventListener("click", () => {
    const taskContent = prompt("Enter new task description:");

    const dueDate = prompt("Enter due date (YYYY-MM-DD):"); // Get date input
    const dueTime = prompt("Enter due time (HH:MM):"); // Get time input

    // 2.2. Create a new task card element
    const newTaskCard = createTaskCard(taskContent, dueDate, dueTime);

    // 2.3. Add the new task card to the "To Do" column
    todoCards.appendChild(newTaskCard);
  });

  // 3. Function to create a new task card
  function createTaskCard(taskContent, dueDate, dueTime) {
    const card = document.createElement("div");
    card.classList.add("card", "task-card");

    // Format the due date and time (optional, but recommended)
    const formattedDueDate = dueDate
      ? new Date(dueDate).toLocaleDateString()
      : "No due date";
    const formattedDueTime = dueTime ? dueTime : "No due time";

    card.innerHTML = `
      <div class="card-body">
        <p class="card-text">${taskContent}</p>
        <p class="card-dueDate">Due: ${formattedDueDate} ${formattedDueTime}</p> 
      </div>
    `;
    return card;
  }
  addTaskButton.addEventListener("click", () => {
    const taskContent = prompt("Enter new task description:");

    const newTaskCard = createTaskCard(taskContent);

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

  $(function () {
    $(".lane")
      .sortable({
        connectWith: ".lane", // Allow dragging between all lanes
        update: function (event, ui) {
          const taskId = ui.item.attr("data-task-id"); // Assuming you add task IDs
          const newStatus = ui.item.closest(".lane").attr("id");
          console.log(`Task ${taskId} moved to ${newStatus}`);

          // TODO: Update task status in your data storage (e.g., localStorage)
        },
      })
      .disableSelection();
  });
});
$(function () {
  $(".lane").sortable({
    connectWith: ".lane",
    placeholder: "task-placeholder", // Placeholder class for visual feedback
    receive: function (event, ui) {
      $(ui.item).removeClass("bg-danger bg-warning bg-success"); // Remove old color classes

      if ($(this).attr("id") === "to-do") {
        $(ui.item).addClass("bg-danger");
      } else if ($(this).attr("id") === "in-progress") {
        $(ui.item).addClass("bg-warning");
      } else if ($(this).attr("id") === "done") {
        $(ui.item).addClass("bg-success");
      }
    },
  });

  $(".lane").disableSelection();
});
