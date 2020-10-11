import { ProjectModel } from './project-model';

export class CaseModel{
    project: ProjectModel;
    projectDetailsId:number;
    caseCourtId:string;
    caseNumber: string;
    caseJudgeId: string;
    caseOffice:string;
    caseConsultantId:string;
    caseConsultantEngagementDate:Date;
    caseClientId: string;
    caseClientPosition:string;
    caseOpposingId:string;
    caseOpposingPosition:string
    caseOpposingRepresenterId:string;
    caseConsultantEngagementText:string
}

