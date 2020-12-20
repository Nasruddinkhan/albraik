import { ContactType } from './contact-type';

export class Contact{


    // "id": 4,
    // "name": "Wasim Shaikh",
    // "contact_type_id": 3,
    // "phone_number": "9769886237",
    // "mobile_number": "9769886237",
    // "email": "shaikhwasim78@gmail.com",
    // "fax_number": "0581452365",
    // "address": "Tilak Nagar, Sakinaka, Mumbai",
    // "comment": "This is Wasim's contact",
    // "created_by": 5,
    // "created_time": 1600022386709,
    // "updated_time": 1600022386709,
    // "company_id": 2,
    // "is_deleted": false

    id:number;
    name:string;
    contact_type_id: number;
    contact_type: ContactType;
    phone_number: string;
    mobile_number: string;
    email: string;
    fax_number: string;
    address: string;
    comment: string;
    created_by: number;
    created_time: number;
    updated_time: number;
    company_id: number;
    is_deleted: boolean;

    constructor(  id:number,name:string,contact_type_id: number,phone_number: string,mobile_number: string,email: string,fax_number: string,address: string,comment: string,created_by: number,created_time: number,updated_time: number,company_id: number,is_deleted: boolean){
        this.id= id;
        this.name = name;
        this.contact_type_id = contact_type_id;
        this.phone_number = phone_number;
        this.mobile_number = mobile_number;
        this.email = email;
        this.fax_number = fax_number;
        this.address = address;
        this.comment = comment;
        this.created_by = created_by;
        this.created_time = created_time;
        this.updated_time = updated_time;
        this.company_id = company_id;
        this.is_deleted = is_deleted;
    }
}
