const createTask = (title) => {
    let dueDate = 'no date';
    let description = '';
    let priority = 'low';
    let project = 'default';

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

    const getProject = () => {
        return project;
    }

    const setProject = (newProject) => {
        project = newProject;
        return project;
    }

    const getInfo = () => {
        // return {title, dueDate, description, priority, project}
        return [title, dueDate, description, priority, project]
    }

    return {getTitle, setTitle, 
            getDate, setDate, 
            getDescription, setDescription,
            getPriority, setPriority,
            getProject, setProject,
            getInfo
        };
}

export default createTask;