// =========================
// Global Variables
// =========================
let task = document.getElementById("task");
let list = document.getElementById("list");
let comp = document.getElementById("Completed_tasks");
let mycount = document.getElementById("count");

let arr = [];
let completed_sign = false;
let currentView = "tasks";

let sound2 = document.getElementById("congrat");
let darkBtn = document.getElementById("dark");
let completedButton = document.getElementById("completed-button");
let tasksButton = document.getElementById("tasks-button");
let ProgressButton = document.getElementById("progress-button");
let btn_up = document.getElementById("up");

// =========================
// Dark Mode
// =========================
darkBtn.onclick = function () {
  document.body.classList.toggle("dark");
  darkBtn.innerText = darkBtn.innerText === "🌙" ? "☀️" : "🌙";
};

// =========================
// Local Storage Load + Migration
// =========================
loadTasksFromStorage();
setActiveButton("tasks");
updateCounters();
renderCurrentView();

function loadTasksFromStorage() {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (savedTasks.length > 0 && typeof savedTasks[0] === "string") {
    let savedCompleted =
      JSON.parse(localStorage.getItem("completed_tasks")) || [];
    let savedProgress = JSON.parse(localStorage.getItem("progress")) || [];

    arr = savedTasks.map((text, index) => {
      let status = "pending";

      if (savedCompleted.includes(text)) {
        status = "completed";
      } else if (savedProgress.includes(text)) {
        status = "progress";
      }

      return {
        id: Date.now() + index,
        text: text,
        status: status,
      };
    });

    saveTasks();
    localStorage.removeItem("completed_tasks");
    localStorage.removeItem("progress");
  } else {
    arr = savedTasks;
  }
}

// =========================
// Save Function
// =========================
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(arr));
}

// =========================
// Render Functions
// =========================
function renderTasks() {
  list.innerHTML = "";

  let pendingTasks = arr.filter((item) => item.status === "pending");

  pendingTasks.forEach((item) => {
    buttons_actions(item);
  });
}

function renderCompleted() {
  list.innerHTML = "";

  let completedTasks = arr.filter((item) => item.status === "completed");

  completedTasks.forEach((item) => {
    buttons_actions(item);
  });
}

function renderProgress() {
  list.innerHTML = "";

  let progressTasks = arr.filter((item) => item.status === "progress");

  progressTasks.forEach((item) => {
    buttons_actions(item);
  });
}

function renderCurrentView() {
  if (currentView === "tasks") {
    renderTasks();
  } else if (currentView === "completed") {
    renderCompleted();
  } else if (currentView === "progress") {
    renderProgress();
  }
}

function updateCounters() {
  mycount.innerHTML = `Tasks: ${arr.length}`;
  comp.innerHTML = `Completed Tasks: ${
    arr.filter((item) => item.status === "completed").length
  }`;
}

// =========================
// Helpers
// =========================
function setActiveButton(view) {
  currentView = view;
  tasksButton.classList.remove("active");
  completedButton.classList.remove("active");
  ProgressButton.classList.remove("active");
  if (view === "tasks") {
    tasksButton.classList.add("active");
  } else if (view === "completed") {
    completedButton.classList.add("active");
  } else if (view === "progress") {
    ProgressButton.classList.add("active");
  }
}

function getTaskById(id) {
  return arr.find((item) => item.id === id);
}

function Sort_arr() {
  const order = {
    pending: 0,
    progress: 1,
    completed: 2,
  };

  arr.sort((a, b) => order[a.status] - order[b.status]);
  renderCurrentView();
}

// =========================
// Scroll Up Button
// =========================
window.onscroll = function () {
  if (window.scrollY >= 250) {
    btn_up.style.display = "block";
  } else {
    btn_up.style.display = "none";
  }
};

btn_up.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

// =========================
// Toggle Buttons
// =========================
completedButton.onclick = function () {
  setActiveButton("completed");
  renderCompleted();
};

tasksButton.onclick = function () {
  setActiveButton("tasks");
  renderTasks();
};

ProgressButton.onclick = function () {
  setActiveButton("progress");
  renderProgress();
};

// =========================
// Alerts
// =========================
function check_completed() {
  if (arr.length > 1 && arr.every((item) => item.status === "completed")) {
    completed_sign = true;
    showCongrats();
    sound2.play();
  }
}

function showCongrats() {
  const congrats = document.getElementById("congrats");
  congrats.style.display = "block";

  setTimeout(() => {
    congrats.style.display = "none";
  }, 3000);
}

function prgoress_alert() {
  const congrats = document.getElementById("in-progress");
  congrats.style.display = "block";

  setTimeout(() => {
    congrats.style.display = "none";
  }, 2000);
}

function done_alert() {
  const congrats = document.getElementById("done_one");
  congrats.style.display = "block";

  setTimeout(() => {
    congrats.style.display = "none";
  }, 2000);
}
function completedProgress() {
  const alt = document.getElementById("CompletedProgress");
  alt.style.display = "block";

  setTimeout(() => {
    alt.style.display = "none";
  }, 2000);
}

function warning() {
  const warn = document.getElementById("warning");
  warn.style.display = "block";

  setTimeout(() => {
    warn.style.display = "none";
  }, 3000);
}

function edit_warning() {
  const warn = document.getElementById("edit_warn");
  warn.style.display = "block";

  setTimeout(() => {
    warn.style.display = "none";
  }, 3000);
}

function repeated_warning() {
  const warn = document.getElementById("repeated");
  warn.style.display = "block";

  setTimeout(() => {
    warn.style.display = "none";
  }, 3000);
}

function already_empty() {
  const warn = document.getElementById("already_empty");
  warn.style.display = "block";

  setTimeout(() => {
    warn.style.display = "none";
  }, 3000);
}

// =========================
// Main Task Card Function
// =========================
function buttons_actions(taskObj) {
  let t = document.createElement("li");
  t.className = "tclass";
  t.dataset.id = taskObj.id;

  let textSpan = document.createElement("span");
  textSpan.className = "task-text";
  textSpan.textContent = taskObj.text;
  t.appendChild(textSpan);

  let check = document.createElement("input");
  check.type = "checkbox";
  check.classList.add("todo-check");

  let btn = document.createElement("button");
  btn.className = "button";
  btn.appendChild(document.createTextNode("❌"));

  let btn2 = document.createElement("button");
  btn2.className = "edit";
  btn2.appendChild(document.createTextNode("✏️"));

  let progressBtn = document.createElement("button");
  progressBtn.className = "prog";
  progressBtn.appendChild(document.createTextNode("🟩"));

  t.appendChild(check);
  t.appendChild(btn);
  t.appendChild(btn2);
  t.appendChild(progressBtn);

  if (taskObj.status === "progress") {
    t.classList.add("progress");
  }

  if (taskObj.status === "completed") {
    t.classList.add("done");
    check.checked = true;
  }

  list.appendChild(t);

  // =========================
  // Edit
  // =========================
  btn2.onclick = function () {
    let currentTask = getTaskById(taskObj.id);
    if (!currentTask) return;

    let oldText = currentTask.text;

    let input = document.createElement("input");
    input.className = "inp";
    input.maxLength = 26;
    input.value = oldText;

    t.innerHTML = "";
    t.appendChild(input);
    t.appendChild(btn);

    input.focus();

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        let newValue = input.value.trim();

        if (newValue === "") {
          edit_warning();
          return;
        }

        let repeatedTask = arr.find(
          (item) =>
            item.text.toLowerCase() === newValue.toLowerCase() &&
            item.id !== currentTask.id,
        );

        if (repeatedTask) {
          repeated_warning();
          return;
        }

        currentTask.text = newValue;

        saveTasks();
        updateCounters();
        renderCurrentView();
      }
    });
  };

  // =========================
  // Delete
  // =========================
  btn.onclick = function () {
    arr = arr.filter((item) => item.id !== taskObj.id);

    saveTasks();
    updateCounters();
    renderCurrentView();
    check_completed();
  };

  // =========================
  // Progress
  // =========================
  progressBtn.onclick = function () {
    let currentTask = getTaskById(taskObj.id);
    let progressAudio = document.getElementById("prog");

    if (!currentTask) return;

    if (currentTask.status === "completed") {
      completedProgress();
      return;
    }

    if (currentTask.status !== "progress") {
      currentTask.status = "progress";
      progressAudio.play();
      prgoress_alert();

      setActiveButton("progress");
      saveTasks();
      updateCounters();
      renderProgress();
    } else {
      currentTask.status = "pending";

      setActiveButton("tasks");
      saveTasks();
      updateCounters();
      renderTasks();
    }
  };

  // =========================
  // Check / Uncheck
  // =========================
  let sound = document.getElementById("sound");

  check.onclick = function () {
    let currentTask = getTaskById(taskObj.id);
    if (!currentTask) return;

    if (check.checked) {
      currentTask.status = "completed";

      if (arr.length === 1) {
        sound.play();
        done_alert();
      }

      if (arr.filter((item) => item.status !== "completed").length >= 1) {
        sound.play();
        done_alert();
      }

      check_completed();

      updateCounters();
      saveTasks();
      Sort_arr();
      setActiveButton("completed");
      renderCompleted();
    } else {
      currentTask.status = "pending";

      updateCounters();
      saveTasks();
      Sort_arr();
      setActiveButton("tasks");
      renderTasks();
    }
  };
}

// =========================
// Add Task
// =========================
function add() {
  let value = task.value.trim();

  setActiveButton("tasks");

  if (value === "") {
    warning();
    return;
  }

  let repeatedTask = arr.find(
    (item) => item.text.toLowerCase() === value.toLowerCase(),
  );

  if (repeatedTask) {
    repeated_warning();
    return;
  }

  let newTask = {
    id: Date.now(),
    text: value,
    status: "pending",
  };

  arr.push(newTask);
  saveTasks();
  updateCounters();
  Sort_arr();
  task.value = "";
}

// Press Enter
task.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    add();
  }
});

// Click Add
document.getElementById("add").addEventListener("click", function () {
  add();
});

// =========================
// Clear All
// =========================
let clear_button = document.getElementById("clearall");

clear_button.addEventListener("click", function () {
  if (arr.length !== 0) {
    document.getElementById("clearModal").style.display = "block";
  } else {
    already_empty();
  }
});

function closeModal() {
  document.getElementById("clearModal").style.display = "none";
}

document.getElementById("cancelClear").onclick = closeModal;

document.getElementById("confirmClear").onclick = function () {
  arr = [];
  list.innerHTML = "";

  localStorage.removeItem("tasks");

  updateCounters();
  closeModal();
};
