let task = document.getElementById("task");
let list = document.getElementById("list");
let arr = [];

completed_arr = [];

console.log(localStorage.getItem("completed_tasks"))
let completed = 0;

// document.addEventListener("DOMContentLoaded", function () {
//     let saved = JSON.parse(localStorage.getItem("tasks")); // convert to array again
//     let saved2 = JSON.parse(localStorage.getItem("completed_tasks")); // convert to array again

//     if (saved) {

        
//         arr = saved;
//         completed_arr = saved2;
//         mycount.innerHTML = `Tasks: ${arr.length}`;
//         // comp.innerHTML = `Completed Tasks: ${completed_arr.length}`


//         // show tasks on page
//         for(let i = 0; i < arr.length; i++){
//             let btn = document.createElement("button"); // delete button
//             let btn2 = document.createElement("button"); // edit button
//             txt = document.createTextNode("❌");
//             txt2 = document.createTextNode("✏️");
//             btn.appendChild(txt);
//             btn2.appendChild(txt2);

//             let t = document.createElement("li");
//             t.className = "tclass"
//             t.textContent = arr[i];
//             btn.className = "button"
//             btn2.className = "edit"
//             // t.appendChild(check);
//             let check = document.createElement("input");
//             check.type = "checkbox";
//             check.setAttribute("id" , "checkme")
//             check.classList.add("todo-check");
//             t.appendChild(btn);
//             t.appendChild(btn2);
//             t.appendChild(check)
//             list.appendChild(t);
//         }
//     }
// });




let btn = document.getElementById("up");




window.onscroll = function(){

    if(window.scrollY >= 250){
      btn.style.display = "block";
    }
    
    else{
      
      btn.style.display = "none";
    }
}

btn.onclick = function(){
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
}










let clear_button = document.getElementById("clearall");


function check_completed (){

    if(arr.length === completed_arr.length && completed_arr.length > 1){
        showCongrats();
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




// Clear all 
clear_button.addEventListener("click" , function(){
        if (arr.length != 0){


            document.getElementById("clearModal").style.display = "block";

            // result = confirm("Are you sure you want to clear all? ");
            // if (result){
            //     list.innerHTML = "";
            //     arr = [];
            //     mycount.innerHTML = `Tasks: ${arr.length}`
            // }
            // else{
            //     console.log("cancel");
            // }
    }
    else{
        already_empty();
    }
});

function closeModal() {
  document.getElementById("clearModal").style.display = "none";
}

document.getElementById("confirmClear").onclick = function () {
  arr = [];
  completed_arr = [];
  list.innerHTML = "";

  mycount.innerHTML = "Tasks: 0";
  document.getElementById("Completed_tasks").innerHTML = "Completed Tasks: 0";
  localStorage.clear();
  closeModal();
};




document.getElementById("cancelClear").onclick = closeModal;



// ================================================================================ //

mycount = document.getElementById("count");
let tasks = arr.length;




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
                    localStorage.setItem("tasks", JSON.stringify(arr)); // convert array to string

                    mycount.innerHTML = `Tasks: ${arr.length}`;
                    let btn = document.createElement("button"); // delete button
                    let btn2 = document.createElement("button"); // edit button
                    txt = document.createTextNode("❌");
                    txt2 = document.createTextNode("✏️");
                    btn.appendChild(txt);
                    btn2.appendChild(txt2);

                    let t = document.createElement("li");
                    t.textContent = task.value;
                    btn.className = "button"


                    // delete button function
                    btn.addEventListener("click", function(){
                        
                        t.remove();
                        arr.splice(arr.indexOf(t.textContent), 1);
                        console.log(arr.length);
                        mycount.innerHTML = `Tasks: ${arr.length}`;
                        if(completed_arr.length === 1 && completed_arr[0] === t.textContent){completed_arr.pop()}
                        for(let i = 0; i < completed_arr.length; i++){
                                if(t.textContent === completed_arr[i]){
                                    completed_arr.splice(i, 1);

                                }
                        }
                        comp.innerHTML = `Completed Tasks: ${completed_arr.length}`

                    });

                    // ======================================================================================================= //
                    
                    t.className = "tclass";
                    let check = document.createElement("input");
                    check.type = "checkbox";
                    check.setAttribute("id" , "checkme")
                    check.classList.add("todo-check");



                    t.appendChild(check);
                    t.appendChild(btn);
                    t.appendChild(btn2);
                    list.appendChild(t);
                    // div_li = document.createElement("div");


                    // Edit button function 
                    function edit(){
                        let oldText = t.firstChild.textContent;
                        console.log(oldText)
                        let index = arr.indexOf(oldText);
                        console.log(`index : ${index}`)
                        console.log(arr[index])
                        console.log(arr)
                        if(completed_arr.length === 1 && completed_arr[0] === t.textContent){completed_arr.pop()}
                        for(let i = 0; i < completed_arr.length; i++){
                            if(t.textContent === completed_arr[i]){
                                completed_arr.splice(i, 1);
                            }
                        }
                        t.className = "tclass";
                        let input = document.createElement("input");
                        input.className = "inp";
                        input.value = t.firstChild.textContent;
                        
                        t.innerHTML = "";
                        t.appendChild(input);
                        t.appendChild(btn);
                        
                        input.addEventListener("keydown", function(e){
                            if (e.key === "Enter"){
                                if(input.value !== ""){
                                    t.textContent = input.value;
                                    if (index !== -1) {
                                        arr[index] = t.textContent;
                                    }
                                    t.appendChild(btn);
                                    t.appendChild(btn2);
                                    t.appendChild(check)
                                    if(check.checked){
                                        completed_arr.push(t.textContent);
                                        t.className = "done"
                                    }
                                }
                                else{
                                    edit_warning();
                                }
                            }
                        })
                        // input.onblur = function (){
                        //     if(input.value !== ""){
                        //             t.textContent = input.value;
                        //             t.appendChild(btn);
                        //             t.appendChild(btn2);
                        //             t.appendChild(check)
                        //         }
                        //         else{
                        //             alert("please write a task");
                        //         }
                        // }
                    }



                    // call edit button function 
                    btn2.addEventListener("click", function(){
                        edit();
                    });
                    

                    let comp = document.getElementById("Completed_tasks");


                    // Checkbox logic 
                    check.onclick = function (){
                        
                        if(t.className === "tclass" && check.checked){ // if not checked
                            completed_arr.push(t.textContent);
                            localStorage.setItem("completed_tasks", JSON.stringify(completed_arr)); // convert array to string

                            console.log(completed_arr.length);
                            t.className = "done"
                            completed++;
                            comp.innerHTML = `Completed Tasks: ${completed_arr.length}`
                            check_completed();
                            
                        }
                        if(!check.checked){ // if it is already checked
                            t.className = "tclass";

                            if(completed_arr.length === 1 && completed_arr[0] === t.textContent){completed_arr.pop()}
                            for(let i = 0; i < completed_arr.length; i++){
                                if(t.textContent === completed_arr[i]){
                                    completed_arr.splice(i, 1);

                                    // completed--;
                                }
                            }
                            comp.innerHTML = `Completed Tasks: ${completed_arr.length}`
                            console.log(`length ${completed_arr.length}`)
                        }
                    }

                    // ============================================================================================= // 



                    task.value = "";
                    btn2.className = "edit"
                    let str = t.textContent;
            }

            

        }
        
}




task.addEventListener("keydown" , function(e){
    if(e.key === "Enter"){
        add();
    }
});
document.getElementById("add").addEventListener("click", function(){
    add();
});

