// import {createTask, updateTask} from "./task";

// function createList(projectName){
//     const list = [];
//     let project = 'default';
//     project = projectName;
//     return {project, list};
// }


// function updateList(projectName){
//     let project = projectName;
//     let list = localStorage.getItem(project);



//     function insertTask(task) {
//         const newTask = updateTask(task);         
//         newTask.setProject(project);
//         let taskName = newTask.getTitle();
//         list = [list];
//         if (list.includes('')) {
//             const index = list.indexOf('');
//             list.slice(index, 1);
//         }
//         list.push(JSON.stringify(newTask.getInfo()));
//         return {list, taskName};
//     }
    
//     function removeTask(task) {
//         const index = list.indexOf(task);
//         list = [list];
//         list.slice(index, 1);
//         return list;
//     }

//     const getProject = () => project;

//     const setProject = (projectName) => {
//         project = projectName;
//         return project;
//     }

//     const displayList = () => {
//         list = [list]
//         return list;
//     }
    
//     const getInfo = () => {
//         return {list, projectName};
//     }

//     return {displayList, insertTask, removeTask, getProject, setProject, getInfo};
// }

// export {createList, updateList};