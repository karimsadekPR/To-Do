const inputValue = document.getElementById("taskInput");
const addButton = document.getElementById("addTasks");
const textsView = document.getElementById("textsView");
const importance = document.getElementById("importanceRange");
const moodToggle = document.getElementById("moodToggle");
const dateValue = document.getElementById("date");
const MainBday_div = document.getElementById("MainBday_div");
const bday_date = document.getElementById("bday_date");
const bday_button = document.getElementById("bday_button");
const bday_name = document.getElementById("bday_name");
const popup = document.getElementById("popupOverlay");
let darkmood = true;
let checked = false;

const counterBttn = document.getElementById("counter");
const hattersCount = document.getElementById("num");

window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToUI(task.text, task.importance, task.date, task.checked));

    const savedBirthdays = JSON.parse(localStorage.getItem("bdays")) || [];
    savedBirthdays.forEach(bday => addaBday(bday.name ,bday.birthDate))
};

addButton.onclick = function () {
    if (inputValue.value !== "") {
        const taskText = inputValue.value;
        const importanceValue = importance.value; 
        const dateValue_2 = dateValue.value;
        addTaskToUI(taskText, dateValue_2, importanceValue);
        saveTask(taskText, importanceValue, dateValue_2, checked);   

        inputValue.value = "";
        dateValue.value = "";
    } else {
        window.alert("Please enter a valid task");
    }
};

doneButton.onclick = function() {
    const name = bday_name.value;
    const birthDate = bday_date.value;

    addaBday(name,birthDate);
    saveBirthdays(name,birthDate);

    name.value = "";
    birthDate.value = "";
}

function saveTask(taskText, importanceValue, dateValue_2) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, importance: importanceValue, date: dateValue_2,checked: checked});
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveBirthdays (name, birthDate){
    const bdays = JSON.parse(localStorage.getItem("bdays")) || [];
    bdays.push({ name: name, birthDate: birthDate})
    localStorage.setItem("bdays", JSON.stringify(bdays));
}

function addTaskToUI(taskText, importanceValue, dateValue_2,) {
    // adding the essential basics of a to-do list 
    const taskWrapper = document.createElement("div");
    taskWrapper.className = "taskItem";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "taskCheck";

    const list = document.createElement("span");
    list.textContent = taskText;
    list.className = "taskText";

    const dateDisplay = document.createElement("div");
    dateDisplay.className = "colDiv";
    
    const taskDate = document.createElement("span");
    taskDate.textContent = dateValue_2 ? dateValue_2 : 'not available';
    dateDisplay.append(taskDate);

    // Create importance label
    const importanceLabel = document.createElement("span");
    importanceLabel.textContent = ` (${getImportanceText(importanceValue)}) `;
    importanceLabel.classList.add(getImportanceClass(importanceValue));


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.className = "deleteBtn";

    // Delete button functionality
    deleteButton.onclick = function () {
        textsView.removeChild(taskWrapper);
        deleteTask(taskText);
    };

    // Strike-through when checked
    function checkingForDone() {
        list.style.textDecoration = checkbox.checked ? "line-through" : "none";
        list.style.opacity = checkbox.checked ? "0.5" : "1";
        checked = !checked;
    };
    checkbox.onclick = checkingForDone

    taskWrapper.append(checkbox, list, importanceLabel, dateDisplay ,deleteButton);
    textsView.append(taskWrapper);    
}

function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to get importance text
function getImportanceText(value) {
    if (value < 33) return "LOW";
    if (value < 66) return "MODERATE";
    return "HIGH";
}

// Function to return the correct class for styling
function getImportanceClass(value) {
    if (value < 33) return "low";
    if (value < 66) return "moderate";
    return "high";
}

/*function showCallender(){
    
}*/
// A small haters counter
hattersCount.textContent = `0`
let counterNum = 0;
counterBttn.onclick = function addhaters (){
    counterNum++;
    hattersCount.textContent = counterNum;
}
console.log(bday_button, popup);

bday_button.onclick = function (){
    popup.style.display = "block";
}
    

function addaBday (name,birthDate) {
    if (name !== "" && birthDate !== "") {
        const bday_div = document.createElement("div");    
        const bday_text = document.createElement("span");

        bday_div.className = "taskItem";
        bday_text.textContent = name+`'s birthday is on `+birthDate;

        bday_div.appendChild(bday_text);
        MainBday_div.appendChild(bday_div);
    } else {
        alert("Something was missing, try again");
    }

    popup.style.display = "none";
};
