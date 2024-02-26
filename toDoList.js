//Selectors
let numberTasks = document.querySelector(".info span");
let numberPriorityTasks = document.querySelector(".priority span");
let writing = document.querySelector(".add-task");
let inputTask = document.querySelector(".add-input");
let btn = document.querySelector(".add-button");
let PriorityTaskCheck = document.querySelector("#set-priority");
let taskContainer = document.querySelector(".all-tasks");
let priorityContainer = document.querySelector(".priority-Container");
let normalContainer = document.querySelector(".normal");
let PriorityTasks = document.querySelectorAll(".task.priority");
let noTaskMessage = document.createElement("p");
noTaskMessage.innerHTML = "No Tasks To Show";
taskContainer.appendChild(noTaskMessage);

let messageCheck = true;


//To save Object To Restore Them From the localStorage
let normalTaskContainer = [];
let priorityTaskContainer = [];


//If there Is no Tasks In LocalStorage Reset Information
numberTasks.innerHTML = 0;
numberPriorityTasks.innerHTML = 0;
    
//Checking If there Any Tasks In LocalStorage

    if (window.localStorage.getItem("priorityTasks") && !(window.localStorage.getItem("priorityTasks") === "[]")) {
        noTaskMessage.remove();
        //Turns Data To Array
        priorityTaskContainer = JSON.parse(localStorage.getItem("priorityTasks"));

        //Put Tasks From LocalStorage To Tasks Container
        
        getTasks(priorityTaskContainer,true);
    } else {
        priorityContainer.classList.add("empty");
    }
    if (window.localStorage.getItem("normalTasks") && !(window.localStorage.getItem("normalTasks") === "[]")) {
        noTaskMessage.remove();
        //Turns Data To Array
        normalTaskContainer = JSON.parse(localStorage.getItem("normalTasks"));

        //Put Tasks From LocalStorage To Tasks Container
        getTasks(normalTaskContainer, false);
    } else {
        normalContainer.classList.add("empty");
        
        }
//Delete The message Element After the user add input
inputTask.oninput = () => {
    if (!inputTask.value == "" && messageCheck == false) {
        document.querySelector(".message").remove();
        messageCheck = true;
    }
}
//Adding Tasks
btn.onclick = () => {   
    if (inputTask.value == "") {
        if (messageCheck === true) {
            message();
        }
        //If There Are Old Tasks Just Add the News Tasks
    } else {
        noTaskMessage.remove();
        if (PriorityTaskCheck.checked) {
            addTask();
            priorityContainer.classList.remove("empty");
        //Prepare Tasks Container
        } else {
            addTask();
            normalContainer.classList.remove("empty")
        //Prepare Tasks Container
        }
        //Send Data to LocalStorage
        storingTasks();

        //Rest To Get The New Task
        inputTask.value = "";   
        PriorityTaskCheck.checked = false;

        //Reset Information
        setInfo(PriorityTasks, numberTasks, numberPriorityTasks);

        //Delete Tasks
        deleteTask();

    }
}

function addTask() {
    let divTask = document.createElement("div");

    divTask.classList.add("task");


    let taskSpan = document.createElement("span");

    taskSpan.innerHTML = inputTask.value;

    let delButton = document.createElement("button");

    delButton.className = "delete";
    delButton.innerHTML = "Delete";

    divTask.appendChild(taskSpan);
    divTask.appendChild(delButton);

    if (PriorityTaskCheck.checked) {
        divTask.classList.add("priority");
        priorityContainer.appendChild(divTask); 
    } else {
        normalContainer.appendChild(divTask);
    }
}

//Sending The Tasks to LocalStorage
function storingTasks() {
    if (PriorityTaskCheck.checked) {
        priorityTaskContainer.push({ task: inputTask.value})
    }else 
        normalTaskContainer.push({ task: inputTask.value });
    
    window.localStorage.setItem("normalTasks", JSON.stringify(normalTaskContainer));
    window.localStorage.setItem("priorityTasks", JSON.stringify(priorityTaskContainer));
}

//Dealing With Tasks From LOcalStorage
function getTasks(arrayTasks, priority) {
    for (let i = 0; i < arrayTasks.length; i++) {

        let divTask = document.createElement("div");

        divTask.className = "task";

        let taskSpan = document.createElement("span");

        taskSpan.innerHTML = arrayTasks[i]["task"];

        let delButton = document.createElement("button");

        delButton.className = "delete";
        delButton.innerHTML = "Delete";

        divTask.appendChild(taskSpan);
        divTask.appendChild(delButton);

        if (priority === true ) {
            divTask.classList.add("priority");
            priorityContainer.appendChild(divTask); 
        } else {
            normalContainer.appendChild(divTask);
            }
}

    let PriorityTasksOfLocalStorage = document.querySelectorAll(".task.priority");

    //Rest Information After Getting The Data From LocalStorage
    setInfo(PriorityTasksOfLocalStorage, numberTasks, numberPriorityTasks);
    deleteTask();
    
}
//Delete Task During Clicking On Delete Button
function deleteTask() {
    let deleteButton = document.querySelectorAll(".delete");
    let arrayDelete = [...deleteButton];

    deleteButton.forEach((ele) => {
        ele.onclick = () => {
            if (ele.parentElement.classList.contains("priority")) {
                indexTask = arrayDelete.indexOf(ele);
                priorityTaskContainer.splice(indexTask, 1);
                arrayDelete.splice(indexTask, 1);
                ele.parentElement.remove();
                window.localStorage.setItem("priorityTasks", JSON.stringify(priorityTaskContainer));
                if (priorityContainer.children.length === 0) {
                    priorityContainer.classList.add("empty");
                }
            } else {
                indexTask = arrayDelete.indexOf(ele);
                normalTaskContainer.splice(indexTask, 1);
                arrayDelete.splice(indexTask, 1);
                ele.parentElement.remove();
                window.localStorage.setItem("normalTasks", JSON.stringify(normalTaskContainer));
                if (normalContainer.children.length === 0) {
                    normalContainer.classList.add("empty");
                }
            }
            //Recollect Priority Tasks
            let allPriorityTasks = document.querySelectorAll(".task.priority");
            setInfo(allPriorityTasks, numberTasks, numberPriorityTasks);

            //Show Message If Tasks Container Is Empty after Deleting
            if (normalContainer.children.length === 0 && priorityContainer.children.length === 0) {
                priorityContainer.classList.add("empty");
                normalContainer.classList.add("empty");
                taskContainer.appendChild(noTaskMessage);
            }
        }
    })
}
//Set The information Values
function setInfo(PriorityT, numberT, numberPT) {
    let allTasks = document.querySelectorAll(".task");
    PriorityT = document.querySelectorAll(".task.priority");
    numberT.innerHTML = allTasks.length;
    numberPT.innerHTML = PriorityT.length;
}

function message() {
    let ele = document.createElement("div");
    ele.innerHTML = "Enter Task First";
    ele.classList.add("message");
    messageCheck = false;
    document.body.appendChild(ele);
}

