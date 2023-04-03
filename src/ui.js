import createTask from "./task";
import {createList, updateList} from "./list";

function loadHomePage() {
    const content = document.getElementById('content');
    
    const header = document.createElement('div');
    header.setAttribute('id', 'header');
    content.appendChild(header);

    const sidebar = document.createElement('div');
    sidebar.setAttribute('id', 'sidebar');
    content.appendChild(sidebar);
    const projectsBox = document.createElement('div');
    projectsBox.classList.add('sidebarContent');
    projectsBox.innerHTML = 'Projects';
    sidebar.appendChild(projectsBox);

    const mainContent = document.createElement('div');
    mainContent.setAttribute('id','mainContent');
    content.appendChild(mainContent);

    const projectTitle = document.createElement('div');
    projectTitle.setAttribute('id', 'projectTitle');
    projectTitle.innerHTML = 'Default';
    mainContent.appendChild(projectTitle);

    const projects = localStorage.getItem('projects');
    if (projects === null) {
        localStorage.setItem('projects', 'Default');
        const projects = localStorage.getItem('projects');
        localStorage.setItem('currentProject', 'Default');
        addProject('Default');
        addProjectButton();
        return projects;
    }
    let projectsArray = projects.split(',');
    if (projectsArray.includes('')) {
        const index = projectsArray.indexOf('');
        projectsArray.splice(index, 1);
    } 
    localStorage.setItem('currentProject', 'Default');
    const defaultTasks = localStorage.getItem('Default');
    let taskArray = defaultTasks.split(',');
    for (let i =0; i < taskArray.length; i++) {
        addTask(taskArray[i]);
    }
    addTaskButton();
    for (let i = 0; i < projectsArray.length; i++) {
        addProject(projectsArray[i]);
    }
    addProjectButton();
    
    
}

function addProjectButton() {
    const newProject = document.createElement('div');
    newProject.setAttribute('id', 'newProject');
    newProject.innerHTML = 'Add new Project';
    newProject.addEventListener('click', showProjectForm, {once: true});
    document.getElementById('sidebar').appendChild(newProject);
}

function showProjectForm() {
    const newProject = document.getElementById('newProject');
    newProject.id = 'taskForm';
    newProject.innerHTML = '';
    const taskInput = document.createElement('input');
    taskInput.setAttribute('type','text');
    taskInput.setAttribute('id', 'taskInput');
    const confirm = document.createElement('button');
    confirm.setAttribute('id', 'confirmButton');
    confirm.innerHTML = 'Confirm';
    confirm.addEventListener('click', () => {
        const newProject = createList(taskInput.value);
        document.getElementById('taskForm').remove();
        addProject(newProject.project);
        addProjectButton();
    });
    const cancel = document.createElement('button');
    cancel.setAttribute('id','cancelButton');
    cancel.innerHTML = 'Cancel';
    cancel.addEventListener('click', () => {
        document.getElementById('taskForm').remove();
        addProjectButton();
    })
    
    newProject.appendChild(taskInput);
    newProject.appendChild(confirm);
    newProject.appendChild(cancel);
}

function addProject(projectName){
    const confirmedProject = document.createElement('div');
    confirmedProject.innerHTML = `${projectName}`;
    confirmedProject.classList.add('sidebarContent');
    
    const projects = localStorage.getItem('projects');
    let projectsArray = projects.split(',');
    
    if (!projectsArray.includes(projectName)){
        projectsArray.push(projectName);
    }
    
    localStorage.setItem('projects', projectsArray);
    if (!localStorage.getItem(projectName)) {
        const projectObject = createList(projectName);
        localStorage.setItem(projectObject.project, projectObject.list);
    } 
    confirmedProject.addEventListener('click', changeProject);
    document.getElementById('sidebar').appendChild(confirmedProject);
    
    const xButton = document.createElement('div');
    xButton.textContent = 'x';
    confirmedProject.appendChild(xButton);
    if (projectName === 'Default') {
        xButton.classList.add('hidden');
        return;
    }
    xButton.classList.add('deleteTask');
    xButton.addEventListener('click', (e) => {
        let deleteTask = prompt(`remove project ${projectName}?`);
        if (deleteTask === 'yes' || deleteTask === 'Yes') {
            e.target.parentElement.remove();
        } else return;  
    })
    
    
    
}

function changeProject(e) {
    if (localStorage.getItem('currentProject') === e.target.textContent.slice(0, -1)) {
        return;
    }
    localStorage.setItem('currentProject', e.target.textContent.slice(0, -1));

    document.getElementById('mainContent').innerHTML = '';
    const projectTitle = document.createElement('div');
    projectTitle.setAttribute('id', 'projectTitle');
    document.getElementById('mainContent').appendChild(projectTitle);
    
    const currentProject = localStorage.getItem('currentProject');
    projectTitle.innerHTML = currentProject;
    const currentList = localStorage.getItem(currentProject);
    let currentProjectList = currentList.split(',');
    for (let i=0; i < currentProjectList.length; i++) {
        addTask(currentProjectList[i]);
    }
    addTaskButton();
}

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
        const newTask = createTask(taskInput.value).getInfo();
        const currentProject = localStorage.getItem('currentProject');
        addTask(newTask[0]);
        updateProject(newTask[0]);
        addTaskButton();
        document.getElementById('taskForm').remove();
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

function addTask(title) {
    if (title === '' || title === null) {
        return;
    }
    const confirmedTask = document.createElement('div');
    confirmedTask.innerHTML = `Task: ${title}`;
    confirmedTask.classList.add('task');
    const xButton = document.createElement('div');
    xButton.textContent = 'x';
    xButton.classList.add('deleteTask');
    xButton.addEventListener('click', (e) => {
        let deleteTask = prompt(`remove task ${title}?`);
        if (deleteTask === 'yes' || deleteTask === 'Yes') {
            e.target.parentElement.remove();
            localStorage.setItem(localStorage.getItem('currentProject'), updateList(localStorage.getItem('currentProject')).removeTask(title));
        } else return;  
    })
    confirmedTask.appendChild(xButton);
    document.getElementById('mainContent').appendChild(confirmedTask);
}

function updateProject(task){
    let currentProject = localStorage.getItem('currentProject');
    const updateProject = updateList(currentProject);
    if (updateProject.displayList()[0] === '' || updateProject.displayList()[0] === null) {
        updateProject.displayList().shift();
    }
    if (updateProject.displayList().includes('')) {
        updateProject.removeTask('');
    }
    console.log(updateProject.displayList());
    updateProject.insertTask(task);
    console.log(updateProject.displayList());
    
    localStorage.setItem(updateProject.getProject(), updateProject.displayList());
}

export default loadHomePage;