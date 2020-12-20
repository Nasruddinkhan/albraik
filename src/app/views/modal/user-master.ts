import { DepartmentModel } from './department';
import { JobTitleModel } from './jobtitle';
import { RoleModel } from './role';

export class UserMaster{
    id:number;
    email : string;
    name:string
    joiningDate: Date;
    firstName: string;
    fatherName: string;
    grandFatherName: string;
    familyName: string;
    phoneNumber: string;
    dateOfBirth: Date;
    profilePicture: string;
    mobileNumber: string;
    isActive: boolean;
    isFtl: boolean;
    role: RoleModel;
    department: DepartmentModel;
    jobTitle: JobTitleModel;
}