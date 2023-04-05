// import {createTask, updateTask} from "./task";
// import {createList, updateList} from "./list";

function loadHomePage() {
    const content = document.getElementById('content');
    
//     const projects = localStorage.getItem('projects');
//     if (projects === null) {
//         localStorage.setItem('projects', 'Default');
//         const projects = localStorage.getItem('projects');
//         localStorage.setItem('currentProject', 'Default');
//         addProject('Default');
//         addProjectButton();
//         addTaskButton();
//         return projects;
//     }
//     let projectsArray = projects.split(',');
//     if (projectsArray.includes('')) {
//         const index = projectsArray.indexOf('');
//         projectsArray.splice(index, 1);
//     } 
//     localStorage.setItem('currentProject', 'Default');
//     const defaultTasks = localStorage.getItem('Default');
//     let taskArray = defaultTasks.split('},');
//     for (let i =0; i < taskArray.length-1; i++) {
//         taskArray[i] = `${taskArray[i]}}`
//     }
//     for (let i=0; i < taskArray.length; i++) {
//         const iObject = JSON.parse(taskArray[i]);
//         addTask(iObject.title, iObject.dueDate, iObject.description, iObject.priority);
//     }
    
    addTaskButton();
//     for (let i = 0; i < projectsArray.length; i++) {
//         addProject(projectsArray[i]);
//     }
//     addProjectButton();
       
}

// function addProjectButton() {
//     const newProject = document.createElement('div');
//     newProject.setAttribute('id', 'newProject');
//     newProject.innerHTML = 'Add new Project';
//     newProject.addEventListener('click', showProjectForm, {once: true});
//     document.getElementById('sidebar').appendChild(newProject);
// }

// function showProjectForm() {
//     const newProject = document.getElementById('newProject');
//     newProject.id = 'taskForm';
//     newProject.innerHTML = '';
//     const taskInput = document.createElement('input');
//     taskInput.setAttribute('type','text');
//     taskInput.setAttribute('id', 'taskInput');
//     const confirm = document.createElement('button');
//     confirm.setAttribute('id', 'confirmButton');
//     confirm.innerHTML = 'Confirm';
//     confirm.addEventListener('click', () => {
//         const newProject = createList(taskInput.value);
//         document.getElementById('taskForm').remove();
//         addProject(newProject.project);
//         addProjectButton();
//     });
//     const cancel = document.createElement('button');
//     cancel.setAttribute('id','cancelButton');
//     cancel.innerHTML = 'Cancel';
//     cancel.addEventListener('click', () => {
//         document.getElementById('taskForm').remove();
//         addProjectButton();
//     })
    
//     newProject.appendChild(taskInput);
//     newProject.appendChild(confirm);
//     newProject.appendChild(cancel);
// }

// function addProject(projectName){
//     const confirmedProject = document.createElement('div');
//     confirmedProject.innerHTML = `${projectName}`;
//     confirmedProject.classList.add('sidebarContent');
    
//     const projects = localStorage.getItem('projects');
//     let projectsArray = projects.split(',');
    
//     if (!projectsArray.includes(projectName)){
//         projectsArray.push(projectName);
//     }
    
//     localStorage.setItem('projects', projectsArray);
//     if (!localStorage.getItem(projectName)) {
//         const projectObject = createList(projectName);
//         localStorage.setItem(projectObject.project, projectObject.list);
//     } 
//     confirmedProject.addEventListener('click', changeProject);
//     document.getElementById('sidebar').appendChild(confirmedProject);
    
//     const xButton = document.createElement('div');
//     xButton.textContent = 'x';
//     confirmedProject.appendChild(xButton);
//     if (projectName === 'Default') {
//         xButton.classList.add('hidden');
//         return;
//     }
//     xButton.classList.add('deleteTask');
//     xButton.addEventListener('click', (e) => {
//         let deleteTask = prompt(`remove project ${projectName}?`);
//         if (deleteTask === 'yes' || deleteTask === 'Yes') {
//             e.target.parentElement.remove();
//         } else return;  
//     })
    
    
    
// }

// function changeProject(e){
//     const projects = localStorage.getItem('projects');
//     let projectsArray = projects.split(',');
//     if (projectsArray.includes('')) {
//         const index = projectsArray.indexOf('');
//         projectsArray.splice(index, 1);
//     }
//     if (localStorage.getItem('currentProject') === e.target.textContent.slice(0, -1)) {
//         return;
//     }
//     localStorage.setItem('currentProject', e.target.textContent.slice(0, -1));
//     document.getElementById('mainContent').innerHTML = '';
//     const projectTitle = document.createElement('div');
//     projectTitle.setAttribute('id', 'projectTitle');
//     projectTitle.innerHTML = localStorage.getItem('currentProject');
//     document.getElementById('mainContent').appendChild(projectTitle);
//     const defaultTasks = localStorage.getItem(e.target.textContent.slice(0, -1));
//     let taskArray = defaultTasks.split('},');
//     if (!defaultTasks) {
//         addTaskButton();
//     }
//     for (let i =0; i < taskArray.length-1; i++) {
//         taskArray[i] = `${taskArray[i]}}`
//     }
//     for (let i=0; i < taskArray.length; i++) {
//         const iObject = JSON.parse(taskArray[i]);
//         addTask(iObject.title, iObject.dueDate, iObject.description, iObject.priority);
//     }
//     addTaskButton();
// }

function addTaskButton() {
    const newTask = document.createElement('div');
    newTask.setAttribute('id','newTask');
    newTask.innerHTML = 'Add new task';
    newTask.addEventListener('click', showForm, {once: true});
    document.getElementById('mainContent').appendChild(newTask);
}


function showForm() {
    const newTask = document.getElementById('newTask');
    newTask.id = 'taskForm';
    newTask.innerHTML = ``;
    const taskInput = document.createElement('input');
    taskInput.setAttribute('type','text');
    taskInput.setAttribute('id', 'taskInput');
    const confirm = document.createElement('button');
    confirm.setAttribute('id', 'confirmButton');
    confirm.innerHTML = 'Confirm';
    confirm.addEventListener('click', () => {
        console.log('confirm');
//         const makeTask = createTask(taskInput.value);
//         addTask(makeTask.getTitle(), makeTask.getDate(), makeTask.getDescription(), makeTask.getPriority());
//         console.log(makeTask.getInfo());
//         updateProject(makeTask.getInfo());
//         addTaskButton();
//         document.getElementById('taskForm').remove();
    });
    const cancel = document.createElement('button');
    cancel.setAttribute('id','cancelButton');
    cancel.innerHTML = 'Cancel';
    cancel.addEventListener('click', () => {
        document.getElementById('taskForm').remove();
        addTaskButton();
    })
    
    newTask.appendChild(taskInput);
    newTask.appendChild(confirm);
    newTask.appendChild(cancel);
}

// function addTask(title, date, description, priority) {
//     if (title === '' || title === null) {
//         return;
//     }
//     const taskContainer = document.createElement('div');
//     taskContainer.classList.add('task');
//     const confirmedTask = document.createElement('div');
//     confirmedTask.classList.add('title');
//     confirmedTask.innerHTML = `Task: ${title}`;
//     const dueDate = document.createElement('div');
//     dueDate.classList.add('date');
//     dueDate.innerHTML = `Due: ${date}`;
//     const desc = document.createElement('div');
//     desc.classList.add('description');
//     desc.innerHTML = `${description}`;
//     desc.addEventListener('click', (e) => {
//         const input = document.createElement('input');
//         input.setAttribute('type','text');
//         input.setAttribute('autofocus', 'true');
//         input.addEventListener('keypress', (e) => {
//             if (e.key === 'Enter') {
//                 desc.innerHTML = input.value;
//                 const currentProject = localStorage.getItem('currentProject');
//                 const refreshTask = localStorage.getItem(currentProject);
//                 console.log(refreshTask);
//                 const taskArray = refreshTask.split('},');
//                 if (taskArray.includes('')) {
//                     const index = taskArray.indexOf('');
//                     taskArray.splice(index, 1);
//                 } 
//                 console.log(taskArray);
//                 for (let i =0; i < taskArray.length-1; i++) {
//                     taskArray[i] = `${taskArray[i]}}`
//                     console.log(taskArray[i]);
//                 }
//                 for (let i=0; i < taskArray.length; i++) {
//                     const iObject = JSON.parse(taskArray[i]);
//                     if (iObject.title === title) {
//                         iObject.description = input.value;
//                         console.log(iObject);
//                         const updatedTask = updateList(currentProject);
//                         updatedTask.removeTask(title);
//                         updateProject(iObject);
//                     }
//                 }
//             }
//         })
//         e.target.textContent = '';
//         e.target.appendChild(input);
//     });
//     if (priority === 'low') {
//         taskContainer.style.backgroundColor = 'lime';
//     }
//     if (priority === 'medium') {
//         taskContainer.style.backgroundColor = 'yellow';
//     }
//     if (priority === 'high') {
//         taskContainer.style.backgroundColor = 'red';
//     }
//     const xButton = document.createElement('div');
//     xButton.textContent = 'x';
//     xButton.classList.add('deleteTask');
//     xButton.addEventListener('click', (e) => {
//         let deleteTask = prompt(`remove task ${title}?`);
//         if (deleteTask === 'yes' || deleteTask === 'Yes') {
//             e.target.parentElement.remove();
//             localStorage.setItem(localStorage.getItem('currentProject'), updateList(localStorage.getItem('currentProject')).removeTask(title));
//         } else return;  
//     })
//     taskContainer.appendChild(confirmedTask);
//     taskContainer.appendChild(dueDate);
//     taskContainer.appendChild(desc);
//     taskContainer.appendChild(xButton);
//     document.getElementById('mainContent').appendChild(taskContainer);
// }

// function updateProject(task){
//     let currentProject = localStorage.getItem('currentProject');
//     const updateProject = updateList(currentProject);
//     if (updateProject.displayList()[0] === '' || updateProject.displayList()[0] === null) {
//         updateProject.displayList().shift();
//     }
//     if (updateProject.displayList().includes('')) {
//         updateProject.removeTask('');
//     }
//     console.log(task);
//     updateProject.insertTask(task);
//     const projectList = updateProject.displayList();
//     console.log(projectList);
//     localStorage.setItem(currentProject, projectList);
// }

export default loadHomePage;