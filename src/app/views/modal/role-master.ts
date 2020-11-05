import { PrivilegeModel } from './Privilege-model';

export class RoleMaster{
    id: number;
    createdBy: string;
    companyId:string;
    name:Array<String>;
    privilegeList: Array<PrivilegeModel>;
    constructor(createdBy : string, companyId : string, name : Array<String>, privilegeList: Array<PrivilegeModel> ){ 
      this.createdBy = createdBy;
      this.name = name;
      this.companyId = companyId;
      this.privilegeList = privilegeList;
    }
}