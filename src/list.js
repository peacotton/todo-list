import {createTask, updateTask} from "./task";

function createList(projectName){
    let project = projectName;
    if (!project) {
        alert("Please enter a project name");
        return;
    }
    localStorage.setItem(project, `${project}}`);
}

function updateList(projectName){
    let project = projectName;
    let list = localStorage.getItem(project);
    localStorage.setItem('currentProject', project);
    let listArray = list.split('},');
    for (let i =0; i < listArray.length-1; i++) {
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
        listArray = listArray.toString();
        localStorage.setItem(project, listArray);
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

    function changeTask(taskTitle){
        for (let i = 0; i < listArray.length; i++) {
            const task = JSON.parse(listArray[i]);
            if (task.title === taskTitle) {
               const thisTask = updateTask(task);
               /* TEMPORARY */
               thisTask.setTitle('cooking');
               listArray[i] = JSON.stringify(thisTask.getInfo());
               localStorage.setItem(project, listArray.toString());
            }
        }
    }

    const displayTasks = () => list;
    const displayTaskCount = () => {
        for (let i = 0; i < listArray.length; i++){
            console.log(i+1);
            console.log(JSON.parse(listArray[i]).title);
        }
    }

    return {insertTask, removeTask, displayTasks, displayTaskCount, changeTask}
}

export {createList, updateList};