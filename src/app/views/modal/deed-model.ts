import { ProjectModel } from './project-model';

export class DeedModel{
    project: ProjectModel;
    projectDetailsId:number;
    dooOfficeReference:string;
    dooCourtId:string;
    dooCaseObserverName:string;
    dooCaseNumber:string;
    dooReferentDate:Date;
}