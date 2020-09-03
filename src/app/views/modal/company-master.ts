export class CompanyMaster {
    companyName: string;
    phoneNumber: string;
    faxNumber:string;
    logo:string;
    address:string;
    departments:[];
    jobTittle:[]
    constructor(companyName: string,
        phoneNumber: string,
        faxNumber:string,
        logo:string,
        address:string){
            this.companyName = companyName;
            this.phoneNumber = phoneNumber;
            this.faxNumber = faxNumber;
            this.logo = logo;
            this.address = address;
    }

}
