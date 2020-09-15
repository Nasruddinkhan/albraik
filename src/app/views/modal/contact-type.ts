export class ContactType{

    id:number;
    name:string;
    english_name:string;
    is_active:boolean;
    constructor(  id:number,   name:string, english_name:string, is_active:boolean){
        this.id= id;
        this.name = name;
        this.english_name = english_name;
        this.is_active = is_active;
    }
}
