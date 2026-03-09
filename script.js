// ---------------- TIMER ----------------

let time = 1500;
let timer = null;
let currentTask = "";

function updateTime() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    document.getElementById("time").innerText =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function startTimer() {

    let taskInput = document.getElementById("taskInput").value;

    if(taskInput !== ""){
        currentTask = taskInput;
    }

    if (timer !== null) return;

    timer = setInterval(() => {

        time--;
        updateTime();

        if (time <= 0) {

            clearInterval(timer);
            timer = null;

            saveHistory(currentTask, 25);

            alert("Focus session completed!");
            resetTimer();
        }

    },1000);
}

function pauseTimer(){
    clearInterval(timer);
    timer = null;
}

function resetTimer(){
    clearInterval(timer);
    timer = null;
    time = 1500;
    updateTime();
}

updateTime();


// ---------------- TASK MANAGER ----------------

function addTask(){

    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if(taskText === "") return;

    let li = document.createElement("li");

    li.innerText = taskText;

    li.onclick = function(){
        li.style.textDecoration = "line-through";
    };

    document.getElementById("taskList").appendChild(li);

    taskInput.value="";
}


// ---------------- HISTORY STORAGE ----------------

function saveHistory(task, minutes){

    if(task === "") return;

    let history = JSON.parse(localStorage.getItem("studyHistory")) || [];

    let entry = {
        task: task,
        time: minutes,
        date: new Date().toLocaleString()
    };

    history.push(entry);

    localStorage.setItem("studyHistory", JSON.stringify(history));

    displayHistory();
}


// ---------------- DISPLAY HISTORY ----------------

function displayHistory(){

    let historyList = document.getElementById("historyList");

    if(!historyList) return;

    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("studyHistory")) || [];

    history.forEach(item => {

        let li = document.createElement("li");

        li.innerText = item.task + " - " + item.time + " min (" + item.date + ")";

        historyList.appendChild(li);

    });
}

displayHistory();


// ---------------- DARK MODE ----------------

function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }
}

window.onload = function(){

    let theme = localStorage.getItem("theme");

    if(theme === "dark"){
        document.body.classList.add("dark-mode");
    }

    displayHistory();
}


// ---------------- PRODUCTIVITY CHART ----------------

const ctx = document.getElementById("studyChart");

if(ctx){

new Chart(ctx,{
type:'bar',
data:{
labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
datasets:[{
label:'Focus Hours',
data:[2,3,1,4,2,5,3]
}]
},
options:{
responsive:true
}
});

}