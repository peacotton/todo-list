const createTask = (title) => {
    let dueDate = 'No due date';
    let description = 'Click to add a description';
    let priority = 'low';
    let info = {title, dueDate, description, priority};

    return info;
}

function updateTask(task) {
    let title = task.title;
    let dueDate = task.dueDate;
    let description = task.description;
    let priority = task.priority;
    let info = {title, dueDate, description, priority};

    console.log(info);
    
    const getDate = () => {
        return dueDate;
    }

    const setDate = (newDate) => {
        dueDate = newDate;
        return dueDate;
    }

    const getTitle = () => {
        return title;
    }
    
    const setTitle = (newTitle) => {
        title = newTitle;
        return title;
    }

    const getDescription = () => {
        return description;
    }

    const setDescription = (newDescription) => {
        description = newDescription;
        return description;
    }

    const getPriority = () => {
        return priority;
    }

    const setPriority = (newPriority) => {
        priority = newPriority;
        return priority;
    }

    const getInfo = () => {
        return {title,dueDate,description,priority}
    }

    // const getInfoArray = () => {
    //     return [title,dueDate,description,priority]
    // }

    return {getTitle, setTitle, 
        getDate, setDate, 
        getDescription, setDescription,
        getPriority, setPriority,
        getInfo
    };
}


export {createTask, updateTask};