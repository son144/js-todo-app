let textInput = document.querySelector(".textInput");
let addBtn = document.querySelector(".addBtn");
let clearAllBtn = document.querySelector(".clearAllBtn");
let tasklist = document.querySelector(".tasklist");

let tasks =JSON.parse(localStorage.getItem("tasks"))||[];

let renderTasks = () => {
    let tasksFromLocal = JSON.parse(localStorage.getItem("tasks"));
    console.log("tasksFromLocal", tasksFromLocal);
    tasklist.innerHTML=""
    tasksFromLocal.forEach((element, index) => {
        console.log("task is", element);
        // added li 
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.innerText = element.text;
        li.append(span);
        // added delete btn 
        let btnDiv = document.createElement("div")
        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        deleteBtn.onclick=()=>{
            deleteHandler(index)
        }
        btnDiv.append(deleteBtn)

        //added edit button 
        let editBtn = document.createElement("button")
        editBtn.innerText = "Edit"
        editBtn.onclick=()=>{
            editHandler(index)
        }
        btnDiv.append(editBtn)

        li.append(btnDiv)
        tasklist.append(li);
    });
}

addBtn.addEventListener("click", () => {
    // added tasks to local storage
    let userInputText = textInput.value.trim();
    tasks.push({ text: userInputText });
    console.log("task arr", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    textInput.value = "";
    // rendering
    renderTasks()

});

let deleteHandler=(index)=>{
console.log("index from deleteHandler",index);
tasks.splice(index,1)
console.log("task arr deleteHandler", tasks);
localStorage.setItem("tasks", JSON.stringify(tasks));
renderTasks()
}

let editHandler=(index)=>{
    console.log("index from editHandler",index);
    let editedTask=prompt("Edit here ...",tasks[index].text)

    if(editedTask!==null&&editedTask.trim()){
        tasks[index].text=editedTask
        console.log("task arr editHandler", tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks()
    }else{
       alert("this text can not be empty")
    }

}
clearAllBtn.addEventListener("click",()=>{
    tasks=[]
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks()
})
renderTasks()

