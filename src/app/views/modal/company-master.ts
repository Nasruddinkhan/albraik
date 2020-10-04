export class CompanyMaster {
    id: number;
    name: string;
    phoneNumber: string;
    faxNumber:string;
    address:string;
    companyLogo:string
    constructor(id : number, companyName: string,companyLogo : string,
        phoneNumber: string,
        faxNumber:string,
        address:string){
            this.name = name;
            this.phoneNumber = phoneNumber;
            this.faxNumber = faxNumber;
            this.address = address;
            this.id = id;
            this.companyLogo = companyLogo;
    }

}
