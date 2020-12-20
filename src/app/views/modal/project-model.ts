export class ProjectModel{
    project_id:number;
    project_type_id: string;
    name: string;
    start_date: Date;
    priority: string;
    drawer_number: string;
    case_logo: string;
    objective: string;
    comment: string;
    hiddin_project: boolean;  
    manager_id:string;
    created_by:string;
    company_id:string;
    is_active: boolean;
    constructor( projectTypeId: string,
        name: string,
        startDate: Date,
        priority: string,
        drawerName: string,
        objective: string,
        comment: string,
        companyId: string,
        hiddinProject: boolean){
        this.project_type_id =projectTypeId;
        this.name =       name;
        this.start_date =  startDate;
        this.priority =   priority;
        this.drawer_number = drawerName;
        this.objective =  objective;
        this.comment =    comment;
        this.hiddin_project = hiddinProject;
    }
}