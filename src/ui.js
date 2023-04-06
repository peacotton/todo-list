import {createList, updateList} from "./list";
import {format, parseISO} from 'date-fns';

function loadHomePage() {
    // const content = document.getElementById('content');
    const projects = localStorage.getItem('projects');
    if (projects === null) {
        localStorage.setItem('projects', 'default');
        localStorage.setItem('currentProject', 'default');
        localStorage.setItem('default', 'default}')
        addProject('default');
        addProjectButton();
        addTaskButton();
        return;
    } 

    localStorage.setItem('currentProject', 'default');
    const defaultTasks = localStorage.getItem('default');
    if (defaultTasks === 'default}'){
        addProject('default');
        addProjectButton();
        addTaskButton();
        return;
    }
    if (defaultTasks.length === 1) {
        addProject('default');
        addProjectButton();
        addTaskButton;
        return;
    }
    let taskArray = defaultTasks.split('},');
    for (let i =0; i < taskArray.length-1; i++) {
        taskArray[i] = `${taskArray[i]}}`
    }
    for (let i=0; i < taskArray.length; i++) {
        const iObject = JSON.parse(taskArray[i]);
        addTask(iObject.title);
    }
    addTaskButton();

    let projectsArray = projects.split(',');
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
        addProject(newProject);
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
    confirmedProject.addEventListener('click', changeProject);
    document.getElementById('sidebar').appendChild(confirmedProject);
    
    const xButton = document.createElement('div');
    xButton.textContent = 'x';
    confirmedProject.appendChild(xButton);
    if (projectName === 'default') {
        xButton.classList.add('hidden');
        confirmedProject.style.fontSize = '3em';
        return;
    }
    xButton.classList.add('deleteTask');
    xButton.addEventListener('click', (e) => {
        let deleteTask = prompt(`remove project ${projectName}?`);
        if (deleteTask === 'yes' || deleteTask === 'Yes') {
            e.target.parentElement.remove();
            const updateProjects = localStorage.getItem('projects').split(',');
            const index = updateProjects.indexOf(projectName);
            updateProjects.splice(index, 1);
            localStorage.setItem('projects', updateProjects);
            localStorage.removeItem(projectName);
            document.getElementById('sidebar').innerHTML = '<div class="sidebarContent projectsTitle">Projects</div>';
            document.getElementById('mainContent').innerHTML = '<div id="projectTitle">default</div>';
            loadHomePage();
        } else return;  
    })  
}

function changeProject(e){
    const projects = localStorage.getItem('projects');
    let projectsArray = projects.split(',');
    let thisProject = e.target.textContent.slice(0, -1);
    if (!thisProject) {
        thisProject = 'default';
    }
    if (localStorage.getItem('currentProject') === thisProject) {
        return;
    }
    localStorage.setItem('currentProject', thisProject);
    document.getElementById('mainContent').innerHTML = '';
    const projectTitle = document.createElement('div');
    projectTitle.setAttribute('id', 'projectTitle');
    projectTitle.innerHTML = thisProject;
    document.getElementById('mainContent').appendChild(projectTitle);
    const defaultTasks = localStorage.getItem(thisProject);
    let taskArray = defaultTasks.split('},');
    //check if projects task list is empty
    if (defaultTasks === `${localStorage.getItem('currentProject')}}`) {
        addTaskButton();
        return;
    }
    //fix array errors from split
    for (let i=0; i < taskArray.length-1; i++) {
        taskArray[i] = `${taskArray[i]}}`
    }
    //turn each element into an object
    for (let i=0; i < taskArray.length; i++) {
        const iObject = JSON.parse(taskArray[i]);
        //add each element
        addTask(iObject.title);
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
        addTask(taskInput.value);
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
    //use updateProject to filter already created tasks
    const thisTask = updateProject(title);
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task');
    const confirmedTask = document.createElement('div');
    confirmedTask.classList.add('title');
    confirmedTask.innerHTML = `Task: ${title}`;
    const dueDate = document.createElement('div');
    dueDate.classList.add('date');
    const dateObject = parseISO(thisTask.dueDate);
    const prettyDate = dateObject.toString().slice(0, 11);
    dueDate.innerHTML = `Due: ${prettyDate}`;
    if (dueDate.innerHTML === 'Due: Invalid Dat') {
        dueDate.innerHTML = `Due: ${thisTask.dueDate}`;
    }
    dueDate.addEventListener('click', (e) => {
        const input = document.createElement('input');
        input.setAttribute('type','date');
        input.setAttribute('autofocus', 'true');
        input.addEventListener('change', (e) => {
            const dateObject = parseISO(input.value);
            const dateInput = format(dateObject, 'MM-dd-yyyy');
            const prettyDate = dateObject.toString().slice(0, 11);
            dueDate.innerHTML = `Due: ${prettyDate}`;
            const currentProject = updateList(localStorage.getItem('currentProject'));
            const taskArray = currentProject.displayTasks();
            for (let i=0; i < taskArray.length; i++) {
                const iObject = JSON.parse(taskArray[i]);
                if (iObject.title === title) {
                        const updatedTask = currentProject.getTaskObject(title);
                        updatedTask.dueDate = input.value;
                        taskArray[i] = JSON.stringify(updatedTask);
                        localStorage.setItem(localStorage.getItem('currentProject'), taskArray);
                    }
                }
            })
        e.target.textContent = '';
        e.target.appendChild(input);
    });
    const desc = document.createElement('div');
    desc.classList.add('description');
    desc.innerHTML = `${thisTask.description}`;
    desc.addEventListener('click', (e) => {
        const input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('autofocus', 'true');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                desc.innerHTML = input.value;
                const currentProject = localStorage.getItem('currentProject');
                const refreshTask = localStorage.getItem(currentProject);
                const taskArray = refreshTask.split('},');
                for (let i =0; i < taskArray.length-1; i++) {
                    taskArray[i] = `${taskArray[i]}}`
                }
                for (let i=0; i < taskArray.length; i++) {
                    const iObject = JSON.parse(taskArray[i]);
                    if (iObject.title === title) {
                        const updatedTaskProject = updateList(currentProject);
                        const changedTask = updatedTaskProject.changeTask(title);
                        changedTask.setDescription(input.value);
                        taskArray[i] = JSON.stringify(changedTask.getInfo());
                        localStorage.setItem(currentProject, taskArray);
                    }
                }
            }
        })
        e.target.textContent = '';
        e.target.appendChild(input);
    });
    const priority = document.createElement('div');
    priority.classList.add('priority');
    const highPrio = document.createElement('button');
    highPrio.classList.add('highPrio');
    highPrio.addEventListener('click', (e) => {
        const projectObject = updateList(localStorage.getItem('currentProject'));
        const changedTask = projectObject.changeTask(e.target.parentElement.parentElement.firstChild.textContent.slice(6));
        changedTask.setPriority(e.target.classList[0].slice(0, 4));
        projectObject.removeTask(changedTask.getTitle());
        projectObject.insertTaskObject(changedTask.getInfo());
        taskContainer.style.backgroundColor = 'red';
    })
    const mediumPrio = document.createElement('button');
    mediumPrio.classList.add('mediumPrio');
    mediumPrio.addEventListener('click', (e) => {
        const projectObject = updateList(localStorage.getItem('currentProject'));
        const changedTask = projectObject.changeTask(e.target.parentElement.parentElement.firstChild.textContent.slice(6));
        changedTask.setPriority(e.target.classList[0].slice(0, 6));
        projectObject.removeTask(changedTask.getTitle());
        projectObject.insertTaskObject(changedTask.getInfo());
        taskContainer.style.backgroundColor = 'yellow';
    })
    const lowPrio = document.createElement('button');
    lowPrio.classList.add('lowPrio');
    lowPrio.addEventListener('click', (e) => {
        const projectObject = updateList(localStorage.getItem('currentProject'));
        const changedTask = projectObject.changeTask(e.target.parentElement.parentElement.firstChild.textContent.slice(6));
        changedTask.setPriority(e.target.classList[0].slice(0, 3));
        projectObject.removeTask(changedTask.getTitle());
        projectObject.insertTaskObject(changedTask.getInfo());
        taskContainer.style.backgroundColor = 'lime';
    })
    priority.appendChild(highPrio);
    priority.appendChild(mediumPrio);
    priority.appendChild(lowPrio);

    if (thisTask.priority === 'low') {
        taskContainer.style.backgroundColor = 'lime';
    }
    if (thisTask.priority === 'medium') {
        taskContainer.style.backgroundColor = 'yellow';
    }
    if (thisTask.priority === 'high') {
        taskContainer.style.backgroundColor = 'red';
    }
    const xButton = document.createElement('div');
    xButton.textContent = 'x';
    xButton.classList.add('deleteTask');
    xButton.addEventListener('click', (e) => {
        let deleteTask = prompt(`remove task ${title}?`);
        if (deleteTask === 'yes' || deleteTask === 'Yes') {
            const currentProject = updateList(localStorage.getItem('currentProject'));
            currentProject.removeTask(title);
            e.target.parentElement.remove();
        } else return;  
    })
    taskContainer.appendChild(confirmedTask);
    taskContainer.appendChild(desc);
    taskContainer.appendChild(dueDate);
    taskContainer.appendChild(priority);
    taskContainer.appendChild(xButton);
    document.getElementById('mainContent').appendChild(taskContainer);
}

function updateProject(task){
    let currentProject = localStorage.getItem('currentProject');
    //declare currentproject as a project object
    const updateProject = updateList(currentProject);
    
    const taskArray = updateProject.displayTasks();
    if (taskArray[0] === `${currentProject}}`) {
        const thisTask = updateProject.insertTask(task);
        return thisTask;
    }
    let titleArray = [];
    for (let i = 0; i < taskArray.length; i++) {
        if (JSON.parse(taskArray[i]).title === task){
            titleArray.push(JSON.parse(taskArray[i]).title);
        } 
    }    
    if (titleArray.includes(task)) {
        const index = titleArray.indexOf(task);
        let projectObject = updateProject.getTaskObject(task);
        return projectObject; 
    } else {
        const thisTask = updateProject.insertTask(task);
        return thisTask;
    }
    
}

export default loadHomePage;