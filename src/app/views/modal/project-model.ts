export class ProjectModel{
    projectId:number;
    projectTypeId: string;
    name: string;
    startDate: Date;
    priority: string;
    drawerNumber: string;
    objective: string;
    comment: string;
    hiddinProject: boolean;  
    managerId:string;
    createdBy:string;
    constructor( projectTypeId: string,
        name: string,
        startDate: Date,
        priority: string,
        drawerName: string,
        objective: string,
        comment: string,
        hiddinProject: boolean){
        this.projectTypeId =projectTypeId;
        this.name =       name;
        this.startDate =  startDate;
        this.priority =   priority;
        this.drawerNumber = drawerName;
        this.objective =  objective;
        this.comment =    comment;
        this.hiddinProject = hiddinProject;
    }
}