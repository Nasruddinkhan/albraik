import { PrivilegeModel } from './Privilege-model';

export class RoleMaster{
  
    createdBy: string;
    companyId:string;
    name:Array<String>;
    privilegeList: Array<PrivilegeModel>;
    constructor(createdBy : string, companyId : string, name : Array<String>, privilageList: Array<PrivilegeModel> ){ 
      this.createdBy = createdBy;
      this.name = name;
      this.companyId = companyId;
      this.privilegeList = privilageList;
    }
}