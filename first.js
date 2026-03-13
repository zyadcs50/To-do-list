// =========================
// Global Variables
// =========================
let task = document.getElementById("task");
let list = document.getElementById("list");
let comp = document.getElementById("Completed_tasks");
let mycount = document.getElementById("count");

let arr = [];
let progress_arr = [];
let completed_arr = [];
let completed_sign = false;

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
};

// =========================
// Local Storage Load
// =========================
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
let savedCompleted = JSON.parse(localStorage.getItem("completed_tasks")) || [];
let savedProgress = JSON.parse(localStorage.getItem("progress")) || [];

arr = savedTasks;
completed_arr = savedCompleted;
progress_arr = savedProgress;
tasksButton.classList.add("active");
completedButton.classList.remove("active");
ProgressButton.classList.remove("active");

updateCounters();
renderTasks();

// =========================
// Save Function
// =========================
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(arr));
  localStorage.setItem("progress", JSON.stringify(progress_arr));
  localStorage.setItem("completed_tasks", JSON.stringify(completed_arr));
}

// =========================
// Render Functions
// =========================
function renderTasks() {
  list.innerHTML = "";

  let pendingTasks = arr.filter(
    (task) => !completed_arr.includes(task) && !progress_arr.includes(task),
  );

  pendingTasks.forEach((task) => {
    buttons_actions(task, false);
  });
}

function renderCompleted() {
  list.innerHTML = "";

  completed_arr.forEach((task) => {
    buttons_actions(task, true);
  });
}

function renderPrgress() {
  list.innerHTML = "";

  progress_arr.forEach((task) => {
    buttons_actions(task, false);
  });
}

function updateCounters() {
  mycount.innerHTML = `Tasks: ${arr.length}`;
  comp.innerHTML = `Completed Tasks: ${completed_arr.length}`;
}

// =========================
// Sorting
// =========================
function Sort_arr() {
  arr.sort((a, b) => completed_arr.includes(a) - completed_arr.includes(b));
  arr.sort((a, b) => progress_arr.includes(b) - progress_arr.includes(a));
  renderTasks();
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
  // if (completed_arr.length === 0) {
  //   alert("No Completed Tasks");
  //   return;
  // }

  completedButton.classList.add("active");
  tasksButton.classList.remove("active");
  ProgressButton.classList.remove("active");
  renderCompleted();
};

tasksButton.onclick = function () {
  // let pendingTasks = arr.filter((task) => !completed_arr.includes(task));
  // if (pendingTasks.length === 0) {
  //   alert("No Tasks");
  //   return;
  // }

  tasksButton.classList.add("active");
  completedButton.classList.remove("active");
  ProgressButton.classList.remove("active");
  renderTasks();
};

ProgressButton.onclick = function () {
  // if (progress_arr.length === 0) {
  //   alert("No Tasks in progress");
  //   return;
  // }

  completedButton.classList.remove("active");
  tasksButton.classList.remove("active");
  ProgressButton.classList.add("active");
  renderPrgress();
};

// =========================
// Alerts
// =========================
function check_completed() {
  if (arr.length === completed_arr.length && completed_arr.length > 1) {
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
function buttons_actions(w, isCompleted = false) {
  let t = document.createElement("li");
  t.className = "tclass";
  t.draggable = true;

  let textNode = document.createTextNode(w);
  t.appendChild(textNode);

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

  if (progress_arr.includes(w)) {
    t.classList.add("progress");
  }

  if (completed_arr.includes(w) || isCompleted) {
    t.classList.add("done");
    check.checked = true;
  }

  list.appendChild(t);

  // =========================
  // Edit
  // =========================
  btn2.onclick = function () {
    let oldText = t.firstChild.textContent;
    let index = arr.indexOf(oldText);

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

        if (newValue !== oldText && arr.includes(newValue)) {
          repeated_warning();
          return;
        }

        if (index !== -1) {
          arr[index] = newValue;
        }

        let completedIndex = completed_arr.indexOf(oldText);
        if (completedIndex !== -1) {
          completed_arr[completedIndex] = newValue;
        }

        let progressIndex = progress_arr.indexOf(oldText);
        if (progressIndex !== -1) {
          progress_arr[progressIndex] = newValue;
        }

        saveTasks();
        updateCounters();

        if (completed_arr.includes(newValue)) {
          renderCompleted();
        } else {
          Sort_arr();
        }
      }
    });
  };

  // =========================
  // Delete
  // =========================
  btn.onclick = function () {
    tasksButton.classList.add("active");
    completedButton.classList.remove("active");
    let oldText = t.firstChild.textContent;

    let index = arr.indexOf(oldText);
    if (index !== -1) {
      arr.splice(index, 1);
    }

    let completedIndex = completed_arr.indexOf(oldText);
    if (completedIndex !== -1) {
      completed_arr.splice(completedIndex, 1);
    }

    let progressIndex = progress_arr.indexOf(oldText);
    if (progressIndex !== -1) {
      progress_arr.splice(progressIndex, 1);
    }

    saveTasks();
    updateCounters();

    if (completed_arr.includes(oldText)) {
      renderCompleted();
    } else {
      Sort_arr();
    }
    check_completed();
  };

  // =========================
  // Progress
  // =========================
  progressBtn.onclick = function () {
    let text = t.firstChild.textContent;
    let progressAudio = document.getElementById("prog");

    if (completed_arr.includes(text)) {
      alert("Completed Tasks Can not be in progress");
      return;
    }

    if (!progress_arr.includes(text)) {
      progress_arr.push(text);
      progressAudio.play();
      prgoress_alert();

      t.remove(); // remove from UI
    } else {
      progress_arr.splice(progress_arr.indexOf(text), 1);
    }

    saveTasks();
  };

  // =========================
  // Check / Uncheck
  // =========================
  let sound = document.getElementById("sound");

  check.onclick = function () {
    let text = t.firstChild.textContent;

    if (check.checked) {
      if (progress_arr.includes(text)) {
        progress_arr.splice(progress_arr.indexOf(text), 1);
      }

      if (arr.length === 1) {
        sound.play();
        done_alert();
      }

      if (arr.length - completed_arr.length > 1) {
        sound.play();
        done_alert();
      }

      if (!completed_arr.includes(text)) {
        completed_arr.push(text);
      }

      check_completed();
    } else {
      let idx = completed_arr.indexOf(text);
      if (idx !== -1) {
        completed_arr.splice(idx, 1);
      }
    }

    updateCounters();
    saveTasks();
    Sort_arr();
    tasksButton.classList.add("active");
    completedButton.classList.remove("active");
    ProgressButton.classList.remove("active");
  };
}

// =========================
// Add Task
// =========================
function add() {
  let value = task.value.trim();
  tasksButton.classList.add("active");
  completedButton.classList.remove("active");
  ProgressButton.classList.remove("active");
  if (value === "") {
    warning();
    return;
  }

  if (arr.includes(value)) {
    repeated_warning();
    return;
  }

  arr.push(value);
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
  completed_arr = [];
  progress_arr = [];
  list.innerHTML = "";

  localStorage.removeItem("tasks");
  localStorage.removeItem("completed_tasks");
  localStorage.removeItem("progress");

  updateCounters();
  closeModal();
};
