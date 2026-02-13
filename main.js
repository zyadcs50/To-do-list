
// global Variables 
let task = document.getElementById("task");
let list = document.getElementById("list");
let arr = [];
completed_arr = [];
let comp = document.getElementById("Completed_tasks");

let completed = 0;
let sound2 = document.getElementById("congrat")

// local Storage
let savedTasks = JSON.parse(localStorage.getItem("tasks"));
let savedTasks2 = JSON.parse(localStorage.getItem("completed_tasks")) || [] ;
if (savedTasks !== null) {
  arr = savedTasks;
  completed_arr = savedTasks2;
  document.getElementById("count").innerHTML = `Tasks: ${arr.length}`
  comp.innerHTML = `Completed Tasks: ${completed_arr.length}`
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
}


// Scroll UP button 
let btn_up = document.getElementById("up");
window.onscroll = function(){

    if(window.scrollY >= 250){
      btn_up.style.display = "block";
    }
    
    else{
      
      btn_up.style.display = "none";
    }
}

btn_up.onclick = function(){
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
}





// Alert functions 
function check_completed (){
    if(arr.length === completed_arr.length && completed_arr.length > 1){
        showCongrats();
        sound2.play();
    }
}

function showCongrats() {
    const congrats = document.getElementById("congrats");
    congrats.style.display = "block";

    setTimeout(() => {
        congrats.style.display = "none";
    }, 5000);
}
function warning() {
    const warn = document.getElementById("warning");
    warn.style.display = "block";

    setTimeout(() => {
        warn.style.display = "none";
    }, 5000);
}
function edit_warning() {
    const warn = document.getElementById("edit_warn");
    warn.style.display = "block";

    setTimeout(() => {
        warn.style.display = "none";
    }, 5000);
}
function repeated_warning() {
    const warn = document.getElementById("repeated");
    warn.style.display = "block";

    setTimeout(() => {
        warn.style.display = "none";
    }, 5000);
}
function already_empty() {
    const warn = document.getElementById("already_empty");
    warn.style.display = "block";

    setTimeout(() => {
        warn.style.display = "none";
    }, 5000);
}



function buttons_actions(w , b = false){
    
    
    // buttons creation...
    let t = document.createElement("li");
    t.textContent = w;
    let btn = document.createElement("button"); // delete button
    let btn2 = document.createElement("button"); // edit button
    txt = document.createTextNode("❌");
    txt2 = document.createTextNode("✏️");
    btn.appendChild(txt);
    btn2.appendChild(txt2);
    t.className = "tclass";
    btn.className = "button"
    let check = document.createElement("input");
    check.type = "checkbox";
    check.setAttribute("id" , "checkme")
    check.classList.add("todo-check");
    t.appendChild(check);
    t.appendChild(btn);
    t.appendChild(btn2);
    list.appendChild(t);
    btn2.className = "edit";
    if(b === true){
        t.children[0].checked = true;
        t.className = "done"

    }
    // JSON.stringify(Object.fromEntries(mymap))
    // for(let i = 0; i < completed_arr.length; i++){
    //     if(completed_arr[i] === w){
    //         t.children[0].checked = true;
    //     }
    // }

// =================================================================================//


// Edit button function
btn2.onclick = function(){
        let oldText = t.firstChild.textContent;
        
        console.log(oldText);
        let index = arr.indexOf(oldText);
        if(completed_arr.length === 1 && completed_arr[0] === t.textContent){completed_arr.pop()}
        t.className = "tclass";
        let input = document.createElement("input");
        input.className = "inp";
        input.maxLength = 26;
        input.value = t.firstChild.textContent;
        t.innerHTML = "";
        t.appendChild(input);
        t.appendChild(btn);
        input.addEventListener("keydown", function(e){
            if (e.key === "Enter"){
                if(input.value !== ""){
                    t.textContent = input.value;
                    // arr.splice(oldText, 1)
                    console.log(`index of ${arr[index]}`)
                    // arr.push(input.value);
                    if (index !== -1) {
                        arr[index] = t.textContent;
                    }
                    saveTasks();
                    t.appendChild(btn);
                    t.appendChild(btn2);
                    t.appendChild(check)
                    if(check.checked){
                        let index2 = completed_arr.indexOf(oldText);
                        if(oldText != input.value){
                            console.log(`our index ${index2}`)
                            completed_arr.splice(index2 , 1);
                            localStorage.setItem("completed_tasks", JSON.stringify(completed_arr)); // convert array to string
                            comp.innerHTML = `Completed tasks: ${completed_arr.length}`
                            check.checked = false;
                        }
                        
                    }
                }
                else{
                    edit_warning();
                }
            }
        })
    };

// =================================================================================//


    
    // delete function 
    btn.addEventListener("click", function(){
        let oldText = t.firstChild.textContent;
        let index = arr.indexOf(oldText);
        if (index !== -1) {
            console.log(`spliced`)
            arr.splice(index, 1);
        }
        t.remove();
        // console.log(`deleted: ${arr.indexOf(t.textContent)}`)
        console.log(arr.length);
        saveTasks();
        mycount.innerHTML = `Tasks: ${arr.length}`;
        if(completed_arr.length === 1 && completed_arr[0] === t.textContent){completed_arr.pop()}
        for(let i = 0; i < completed_arr.length; i++){
                if(t.firstChild.textContent === completed_arr[i]){
                    completed_arr.splice(i, 1);
                }
        }

        comp.innerHTML = `Completed Tasks: ${completed_arr.length}`
        localStorage.setItem("completed_tasks", JSON.stringify(completed_arr)); // convert array to string

    });


// =================================================================================//


    let sound = document.getElementById("sound");
    // Checkbox function 
    check.onclick = function (){
        t.className = "done"
        if(check.checked){ // if not checked
            if(arr.length - completed_arr.length > 0){
                sound.play();
            }
            // mymap[t] = false;
            // JSON.stringify(Object.fromEntries(mymap))
            // console.log(mymap)
            completed_arr.push(t.firstChild.textContent);
            localStorage.setItem("completed_tasks", JSON.stringify(completed_arr)); // convert array to string
            
            // console.log(completed_arr.length);
            comp.innerHTML = `Completed Tasks: ${completed_arr.length}`
            check_completed();
            
        }
        if(!check.checked){ // if it is already checked
            t.className = "tclass"

            // mymap[t] = true;
            // JSON.stringify(Object.fromEntries(mymap))
            // console.log(mymap)
            if(completed_arr.length === 1 && completed_arr[0] === t.textContent){completed_arr.pop()}
            for(let i = 0; i < completed_arr.length; i++){
                if(t.firstChild.textContent === completed_arr[i]){
                    completed_arr.splice(i, 1);
                    localStorage.setItem("completed_tasks", JSON.stringify(completed_arr)); // convert array to string
                }
            }
            comp.innerHTML = `Completed Tasks: ${completed_arr.length}`
            console.log(`length ${completed_arr.length}`)
        }
    }

}



let clear_button = document.getElementById("clearall");
// Clear all function 
clear_button.addEventListener("click" , function(){
        if (arr.length != 0){
            document.getElementById("clearModal").style.display = "block";
    }
    else{
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
function add(){
    if (task.value === ""){
            warning();
        }
        else{
            let repeated = false;
            for(let i = 0; i < arr.length; i++){
                if(task.value === arr[i]){
                    repeated = true
                }
            }

            if(repeated){repeated_warning();}
            else{
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
task.addEventListener("keydown" , function(e){
    if(e.key === "Enter"){
        add();
    }
});

// Click Add 
document.getElementById("add").addEventListener("click", function(){
    add();
});

