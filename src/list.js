import {createTask, updateTask} from "./task";

function createList(projectName){
    let project = projectName;
    if (!project) {
        alert("Please enter a project name");
        return;
    }
    localStorage.setItem(project, `${project}}`);
    return project;
}

function updateList(projectName){
    let project = projectName;
    localStorage.setItem('currentProject', project);
    let list = localStorage.getItem(project);
    let listArray = list.split('},');
    for (let i = 0; i < listArray.length-1; i++) {
        listArray[i] = `${listArray[i]}}`
    }

    function insertTask(task) {
        const thisTask = createTask(task);
        let newTask = JSON.stringify(thisTask);
        if (listArray.includes(newTask)) {
            alert(`${project} already contains ${task}`);
            return;
        }
        listArray.push(newTask);
        if (listArray[0] === `${project}}`) {
            listArray.shift();
        }

        let listString = listArray.toString();
        localStorage.setItem(project, listString);

        return thisTask;
    }
    
    function removeTask(taskTitle) {
        for (let i = 0; i < listArray.length; i++) {
            const task = JSON.parse(listArray[i]);
            if (task.title === taskTitle) {
                listArray.splice(i, 1);
                if (!listArray[0]) {
                    listArray.push(`${project}}`)
                }
                console.log(`Removed task: ${taskTitle}`);      
                localStorage.setItem(project, listArray.toString());
            }
        }
    }

    function insertTaskObject(taskObject){
        if (listArray[0] === `${project}}`) {
            listArray.shift();
        }
        listArray.push(JSON.stringify(taskObject));
        const currentProject = localStorage.getItem('currentProject');
        localStorage.setItem(currentProject, listArray);

    }

    function changeTask(task){
        for (let i = 0; i < listArray.length; i++) {
            const taskObject = JSON.parse(listArray[i]);
            if (taskObject.title === task) {
               const thisTask = updateTask(taskObject);
               return thisTask;
            }
        }
    }

    function getTaskObject(task){
        for (let i =0; i < listArray.length; i++) {
            const taskObject = JSON.parse(listArray[i]);
            if (taskObject.title === task) {
                return taskObject;
            }
        }
    }

    const displayTasks = () => listArray;
    const displayTaskCount = () => {
        for (let i = 0; i < listArray.length; i++){
            console.log(i+1);
            console.log(JSON.parse(listArray[i]).title);
        }
    }

    return {insertTask, removeTask, displayTasks, displayTaskCount, changeTask, getTaskObject, insertTaskObject}
}

export {createList, updateList};