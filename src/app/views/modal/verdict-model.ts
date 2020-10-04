import { ProjectModel } from './project-model';

export class VerditModel{
    project:ProjectModel;
    projectDetailsId:string;
    verdictExecutedCaseId:string;
    verdictNumber:string;
    verdictDate:Date;
    verdictSource:string;
    verdictType:string;
    verdictDecisionDate:Date;
}
