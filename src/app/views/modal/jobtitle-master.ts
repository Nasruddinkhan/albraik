export class JobMaster{
  
    createdBy: string;
    companyId:string;
    name:Array<String>;
    constructor(createdBy : string, companyId : string, name : Array<String> ){ 
      this.createdBy = createdBy;
      this.name = name;
      this.companyId = companyId;
    }
}