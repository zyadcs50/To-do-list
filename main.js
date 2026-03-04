
// initialize Variables...

const taskInput = document.getElementById("task");
const list = document.getElementById("list");
const count = document.getElementById("count");
const completedCount = document.getElementById("Completed_tasks");
const addBtn = document.getElementById("add");
const clearBtn = document.getElementById("clearall");
const modal = document.getElementById("clearModal");
const confirmClear = document.getElementById("confirmClear");
const cancelClear = document.getElementById("cancelClear");
const upBtn = document.getElementById("up");
const soundDone = document.getElementById("sound");
const soundCongrats = document.getElementById("congrat");
let tasks = [];
let completedTasks = [];




function loadFromStorage() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  const savedCompleted =
    JSON.parse(localStorage.getItem("completed_tasks")) || [];

  tasks = Array.isArray(savedTasks) ? savedTasks : [];
  completedTasks = Array.isArray(savedCompleted) ? savedCompleted : [];
}

function saveToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("completed_tasks", JSON.stringify(completedTasks));
}

function updateCounters() {
  count.innerHTML = `Tasks: ${tasks.length}`;
  completedCount.innerHTML = `Completed Tasks: ${completedTasks.length}`;
}

function showToast(id, ms = 5000) {
  const box = document.getElementById(id);
  if (!box) return;
  box.style.display = "block";
  setTimeout(() => (box.style.display = "none"), ms);
}

function checkAllCompleted() {
  if (tasks.length > 1 && completedTasks.length === tasks.length) {
    showToast("congrats", 5000);
    soundCongrats.play();
  }
}

function isRepeated(text) {
  return tasks.includes(text);
}

function addTask(text) {
  tasks.push(text);
  saveToStorage();
  updateCounters();
  renderOneTask(text, completedTasks.includes(text));
}

function deleteTask(taskText, li) {
  const i = tasks.indexOf(taskText);
  if (i !== -1) tasks.splice(i, 1);

  const c = completedTasks.indexOf(taskText);

  if (c !== -1) completedTasks.splice(c, 1);

  li.remove();
  saveToStorage();
  updateCounters();
}
function moveCompletedToBottom() {
  tasks.sort((a, b) => completedTasks.includes(a) - completedTasks.includes(b));
}

function toggleComplete(taskText, isChecked) {
  if (isChecked) {
    if (!completedTasks.includes(taskText)) completedTasks.push(taskText);
    if (tasks.length !== completedTasks.length) soundDone.play();
    checkAllCompleted();
  } else {
    const idx = completedTasks.indexOf(taskText);
    if (idx !== -1) completedTasks.splice(idx, 1);
  }

  moveCompletedToBottom();
  saveToStorage();
  renderAll();
}

function startEdit(li, oldText) {
  li.className = "tclass";

  const input = document.createElement("input");
  input.className = "inp";
  input.maxLength = 26;
  input.value = oldText;

  li.innerHTML = "";
  li.appendChild(input);
  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const newText = input.value.trim();
    if (newText === "") {
      showToast("edit_warn", 5000);
      return;
    }

    if (newText === oldText) {
      renderTaskItem(li, oldText, completedTasks.includes(oldText));
      return;
    }

    if (tasks.includes(newText)) {
      showToast("repeated", 5000);
      renderTaskItem(li, oldText, completedTasks.includes(oldText));
      return;
    }

    const idx = tasks.indexOf(oldText);
    if (idx !== -1) tasks[idx] = newText;

    const cIdx = completedTasks.indexOf(oldText);
    if (cIdx !== -1) completedTasks[cIdx] = newText;

    saveToStorage();
    updateCounters();
    renderTaskItem(li, newText, completedTasks.includes(newText));
  });
}

function renderTaskItem(li, text, isDone) {
  li.innerHTML = "";
  li.className = isDone ? "done" : "tclass";

  li.appendChild(document.createTextNode(text));

  const check = document.createElement("input");
  check.type = "checkbox";
  check.classList.add("todo-check");
  check.checked = !!isDone;

  const delBtn = document.createElement("button");
  delBtn.className = "button";
  delBtn.appendChild(document.createTextNode("❌"));

  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.appendChild(document.createTextNode("✏️"));

  li.appendChild(check);
  li.appendChild(delBtn);
  li.appendChild(editBtn);

  check.addEventListener("click", () => {
    const currentText = li.firstChild.textContent;
    toggleComplete(currentText, check.checked);
  });

  delBtn.addEventListener("click", () => {
    const currentText = li.firstChild.textContent;
    deleteTask(currentText, li);
  });

  editBtn.addEventListener("click", () => {
    const currentText = li.firstChild.textContent;
    startEdit(li, currentText);
  });
}

function renderOneTask(text, isDone = false) {
  const li = document.createElement("li");
  renderTaskItem(li, text, isDone);
  list.appendChild(li);
}

function renderAll() {
  list.innerHTML = "";
  tasks.forEach((t) => renderOneTask(t, completedTasks.includes(t)));
  updateCounters();
}

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function clearAll() {
  tasks = [];
  completedTasks = [];
  list.innerHTML = "";
  localStorage.clear();
  updateCounters();
  closeModal();
}

function initScrollUp() {
  window.addEventListener("scroll", () => {
    upBtn.style.display = window.scrollY >= 250 ? "block" : "none";
  });

  upBtn.addEventListener("click", () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  });
}

function handleAdd() {
  const value = taskInput.value.trim();

  if (value === "") {
    showToast("warning", 5000);
    return;
  }

  if (isRepeated(value)) {
    showToast("repeated", 5000);
    return;
  }

  addTask(value);
  taskInput.value = "";
}

function initAddEvents() {
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAdd();
  });

  addBtn.addEventListener("click", handleAdd);
}

function initClearEvents() {
  clearBtn.addEventListener("click", () => {
    if (tasks.length !== 0) openModal();
    else showToast("already_empty", 5000);
  });

  confirmClear.addEventListener("click", clearAll);
  cancelClear.addEventListener("click", closeModal);
}

function init() {
  loadFromStorage();
  renderAll();
  initAddEvents();
  initClearEvents();
  initScrollUp();
}

init();
