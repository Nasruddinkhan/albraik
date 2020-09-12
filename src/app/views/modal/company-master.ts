export class CompanyMaster {
    companyName: string;
    phoneNumber: string;
        faxNumber:string;
    address:string;
    
    constructor(companyName: string,
        phoneNumber: string,
        faxNumber:string,
        address:string){
            this.companyName = companyName;
            this.phoneNumber = phoneNumber;
            this.faxNumber = faxNumber;
            this.address = address;
    }

}
