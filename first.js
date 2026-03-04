// global Variables
let task = document.getElementById("task");
let list = document.getElementById("list");
let arr = [];
let progress_arr = [];
let completed_sign = false;
completed_arr = [];
let comp = document.getElementById("Completed_tasks");

let completed = 0;
let sound2 = document.getElementById("congrat");
const darkBtn = document.getElementById("dark");

darkBtn.onclick = function(){
    console.log("dark mode on");
    document.body.classList.toggle("dark"); // adding and removing the dark mode
}

// local Storage
let savedTasks = JSON.parse(localStorage.getItem("tasks"));
let savedTasks2 = JSON.parse(localStorage.getItem("completed_tasks")) || [];
let savedTasks3 = JSON.parse(localStorage.getItem("progress")) || [];
if (savedTasks !== null) {
  arr = savedTasks;
  completed_arr = savedTasks2;
  progress_arr = savedTasks3;
  document.getElementById("count").innerHTML = `Tasks: ${arr.length}`;
  comp.innerHTML = `Completed Tasks: ${completed_arr.length}`;
  // arr.sort((a, b) => completed_arr.includes(a) - completed_arr.includes(b));
  // arr.sort((a, b) => progress_arr.includes(b) - progress_arr.includes(a));
  arr.forEach(function (task) {
    if (completed_arr.includes(task)) {
      buttons_actions(task, true);
    } else {
      buttons_actions(task);
    }
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(arr));
  localStorage.setItem("progress", JSON.stringify(progress_arr));
  localStorage.setItem("completed_tasks", JSON.stringify(completed_arr));

}

// Scroll UP button
let btn_up = document.getElementById("up");
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

// Alert functions
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

function Sort_arr() {
  arr.sort((a, b) => completed_arr.includes(a) - completed_arr.includes(b));
  arr.sort((a, b) => progress_arr.includes(b) - progress_arr.includes(a));
  list.innerHTML = "";
  arr.forEach((t) => buttons_actions(t, completed_arr.includes(t)));
}

function buttons_actions(w, b = false) {

  
  // buttons creation...
  let t = document.createElement("li");
  t.textContent = w;
  let btn = document.createElement("button"); // delete button
  let btn2 = document.createElement("button"); // edit button
  let progressBtn = document.createElement("button");
  txt = document.createTextNode("❌");
  txt2 = document.createTextNode("✏️");
  txt3 = document.createTextNode("🟩");
  progressBtn.className = "prog";
  btn.appendChild(txt);
  btn2.appendChild(txt2);
  progressBtn.appendChild(txt3);
  t.className = "tclass";
  btn.className = "button";
  let check = document.createElement("input");
  check.type = "checkbox";
  check.setAttribute("id", "checkme");
  check.classList.add("todo-check");
  t.appendChild(check);
  t.appendChild(btn);
  t.appendChild(btn2);
  t.appendChild(progressBtn);
  if (progress_arr.includes(w)) {
    t.classList.add("progress");
  } else {
    t.classList.remove("progress");
  }
  if (completed_arr.includes(w)) {
    t.classList.add("done");
  } else {
    t.classList.remove("done");
  }

  list.appendChild(t);
  btn2.className = "edit";
  if (b === true) {
    t.children[0].checked = true;
    t.className = "done";
  }

  // =================================================================================//

  // Edit button function
  btn2.onclick = function () {
    btn.style.display = "none";
    let oldText = t.firstChild.textContent;
    console.log(oldText);
    let index = arr.indexOf(oldText);
    if (completed_arr.length === 1 && completed_arr[0] === t.textContent) {
      completed_arr.pop();
    }
    t.className = "tclass";
    let input = document.createElement("input");
    input.className = "inp";
    input.maxLength = 26;
    input.value = t.firstChild.textContent;
    t.innerHTML = "";
    t.appendChild(input);
    t.appendChild(btn);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        if (input.value !== "") {
          btn.style.display = "block";
          t.textContent = input.value;
          console.log(`index of ${arr[index]}`);
          // arr.push(input.value);
          if (index !== -1) {
            arr[index] = t.textContent;
          }
          saveTasks();
          t.appendChild(btn);
          t.appendChild(btn2);
          t.appendChild(progressBtn);
          t.appendChild(check);
          if (check.checked) {
            let index2 = completed_arr.indexOf(oldText);
            if (oldText != input.value) {
              console.log(`our index ${index2}`);
              completed_arr.splice(index2, 1);
              localStorage.setItem(
                "completed_tasks",
                JSON.stringify(completed_arr),
              ); // convert array to string
              comp.innerHTML = `Completed tasks: ${completed_arr.length}`;
              check.checked = false;
            }
          }
        } else {
          edit_warning();
        }
      }
    });
  };

  // =================================================================================//

  // delete function
  btn.addEventListener("click", function () {
    let oldText = t.firstChild.textContent;
    let index = arr.indexOf(oldText);
    if (index !== -1) {
      console.log(`spliced`);
      arr.splice(index, 1);
    }
    t.remove();
    // console.log(`deleted: ${arr.indexOf(t.textContent)}`)
    console.log(arr.length);
    saveTasks();
    mycount.innerHTML = `Tasks: ${arr.length}`;
    if (completed_arr.length === 1 && completed_arr[0] === t.textContent) {
      completed_arr.pop();
    }
    for (let i = 0; i < completed_arr.length; i++) {
      if (t.firstChild.textContent === completed_arr[i]) {
        completed_arr.splice(i, 1);
      }
      if (t.firstChild.textContent === progress_arr[i]) {
        progress_arr.splice(i, 1);
      }
    }

    comp.innerHTML = `Completed Tasks: ${completed_arr.length}`;
    saveTasks();
  });


  progressBtn.onclick = function () {
    let text = t.firstChild.textContent;
    let progressAudio = document.getElementById("prog")
    if(completed_arr.includes(text)){
      alert("Completed Tasks Can not be in progress");
      return;
    }
    if (!progress_arr.includes(text)) {
      progressAudio.play();
      progress_arr.push(text);
      prgoress_alert();
    } else {
      progress_arr.splice(progress_arr.indexOf(text), 1);
      t.classList.remove("progress");
    }

    saveTasks();
    Sort_arr();
  };

  // =================================================================================//

  let sound = document.getElementById("sound");
  check.onclick = function () {
    let text = t.firstChild.textContent;
    if (check.checked) {
      t.className = "done";
      if (progress_arr.includes(text)) {
        t.removeChild(progressBtn);
        progress_arr.splice(progress_arr.indexOf(text), 1);
      }

      if(arr.length === 1){
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

      comp.innerHTML = `Completed Tasks: ${completed_arr.length}`;
      check_completed();
      // list.appendChild(t);
    } else {
      t.className = "tclass";
      // list.prepend(t);
      let idx = completed_arr.indexOf(text);
      if (idx !== -1) {
        completed_arr.splice(idx, 1);
        // arr.unshift(text);
        // localStorage.setItem("completed_tasks", JSON.stringify(completed_arr));
      }

      comp.innerHTML = `Completed Tasks: ${completed_arr.length}`;
    }

    saveTasks();
    Sort_arr();
  };
}

let clear_button = document.getElementById("clearall");
// Clear all function
clear_button.addEventListener("click", function () {
  if (arr.length != 0) {
    document.getElementById("clearModal").style.display = "block";
  } else {
    already_empty();
  }
});

// cancel button
function closeModal() {
  document.getElementById("clearModal").style.display = "none";
}

// confirm button
document.getElementById("confirmClear").onclick = function () {
  arr = [];
  completed_arr = [];
  progress_arr = [];
  list.innerHTML = "";

  mycount.innerHTML = "Tasks: 0";
  document.getElementById("Completed_tasks").innerHTML = "Completed Tasks: 0";
  localStorage.clear();
  closeModal();
};

// =================================================================================//

document.getElementById("cancelClear").onclick = closeModal;
// ================================================================================ //

mycount = document.getElementById("count");
let tasks = arr.length;

// Add task function
function add() {
  if (task.value === "") {
    warning();
  } else {
    let repeated = false;
    for (let i = 0; i < arr.length; i++) {
      if (task.value === arr[i]) {
        repeated = true;
      }
    }

    if (repeated) {
      repeated_warning();
    } else {
      arr.push(task.value);
      // mymap.set(task.value , false);
      // console.log(mymap)
      saveTasks();

      localStorage.setItem("tasks", JSON.stringify(arr)); // convert array to string

      mycount.innerHTML = `Tasks: ${arr.length}`;

      buttons_actions(task.value);

      task.value = "";
    }
  }
}

// press Enter
task.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    add();
  }
});

// Click Add
document.getElementById("add").addEventListener("click", function () {
  add();
});
