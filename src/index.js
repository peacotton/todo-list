import createTask from './task'


const newTask = createTask('practice coding');
newTask.setDate('thursday');

console.log(newTask.getDate());
console.log(newTask.getPriority());
console.log(newTask.getProject());