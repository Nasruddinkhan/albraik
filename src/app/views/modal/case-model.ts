import { ProjectModel } from './project-model';

export class CaseModel{
    project: ProjectModel;
    courtName:string;
    caseno: string;
    judgeName:string;
    office:string;
    consultant:string;
    consulantDate:Date;
    client:string;
    clientPositionCourt:string;
    opposing:string;
    oppPosiCourt:string
    oppRepisenter:string;
    consltEnggTxt:string
}