import { PrivilegeModel } from './Privilege-model';

export class RoleModel{
    id: number
    createdBy: number;
    companyId:number;
    name:string;
    privilegeList: Array<PrivilegeModel>;
    constructor(createdBy : number, companyId : number, name : string , id: number){ 
      this.createdBy = createdBy;
      this.name = name;
      this.companyId = companyId;
    }
}