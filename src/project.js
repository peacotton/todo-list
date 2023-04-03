import createList from "./list";

class Project {
    constructor(projectName) {
        this.name = projectName;
        this.list = createList;
    }

}

export default Project;
