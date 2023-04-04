// const createTask = (title) => {
//     let dueDate = 'No due date';
//     let description = 'Click to add a description';
//     let priority = 'low';
//     let project = 'default';

//     const getDate = () => {
//         return dueDate;
//     }

//     const setDate = (newDate) => {
//         dueDate = newDate;
//         return dueDate;
//     }

//     const getTitle = () => {
//         return title;
//     }
    
//     const setTitle = (newTitle) => {
//         title = newTitle;
//         return title;
//     }

//     const getDescription = () => {
//         return description;
//     }

//     const setDescription = (newDescription) => {
//         description = newDescription;
//         return description;
//     }

//     const getPriority = () => {
//         return priority;
//     }

//     const setPriority = (newPriority) => {
//         priority = newPriority;
//         return priority;
//     }

//     const getProject = () => {
//         return project;
//     }

//     const setProject = (newProject) => {
//         project = newProject;
//         return project;
//     }

//     const getInfo = () => {
//         return [title,dueDate,description,priority,project];
//     }

//     return {getTitle, setTitle, 
//             getDate, setDate, 
//             getDescription, setDescription,
//             getPriority, setPriority,
//             getProject, setProject,
//             getInfo
//         };
// }


// function updateTask(array) {
//     let title = array[0];
//     let dueDate = array[1];
//     let description = array[2];
//     let priority = array[3];
//     let project = array[4];

//     const getDate = () => {
//         return dueDate;
//     }

//     const setDate = (newDate) => {
//         dueDate = newDate;
//         return dueDate;
//     }

//     const getTitle = () => {
//         return title;
//     }
    
//     const setTitle = (newTitle) => {
//         title = newTitle;
//         return title;
//     }

//     const getDescription = () => {
//         return description;
//     }

//     const setDescription = (newDescription) => {
//         description = newDescription;
//         return description;
//     }

//     const getPriority = () => {
//         return priority;
//     }

//     const setPriority = (newPriority) => {
//         priority = newPriority;
//         return priority;
//     }

//     const getProject = () => {
//         return project;
//     }

//     const setProject = (newProject) => {
//         project = newProject;
//         return project;
//     }

//     const getInfo = () => {
//         return {title,dueDate,description,priority,project}
//     }

//     const getInfoArray = () => {
//         return [title,dueDate,description,priority,project]
//     }

//     return {getTitle, setTitle, 
//         getDate, setDate, 
//         getDescription, setDescription,
//         getPriority, setPriority,
//         getProject, setProject,
//         getInfo, getInfoArray
//     };
// }
// export {createTask, updateTask};