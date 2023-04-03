import createTask from "./task";

function createList(projectName){
    const list = [];
    let project = 'default';
    project = projectName;
    return {project, list};
}


function updateList(projectName){
    let project = projectName;
    let list = localStorage.getItem(project).split(',');

    function insertTask(task) {
        const newTask = createTask(task);         
        newTask.setProject(project);
        let taskName = newTask.getTitle();
        list.push(taskName);
        return {list, taskName};
    }
    
    function removeTask(task) {
        const index = list.indexOf(task);
        list.splice(index, 1);
        return list;
    }

    const getProject = () => project;

    const setProject = (projectName) => {
        project = projectName;
        return project;
    }

    const displayList = () => list;

    const getInfo = () => {
        return {list, projectName};
    }

    return {displayList, insertTask, removeTask, getProject, setProject, getInfo};
}

export {createList, updateList};