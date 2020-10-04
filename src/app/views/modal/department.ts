export class DepartmentModel{
    id: number
    createdBy: number;
    companyId:number;
    name:string;
    constructor(createdBy : number, companyId : number, name : string , id: number){ 
      this.createdBy = createdBy;
      this.name = name;
      this.companyId = companyId;
    }
}