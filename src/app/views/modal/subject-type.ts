export class  SubjectType{
      id : string;
      name: string;
      english_name: string;
      isActive: boolean;
      order:number
      SubjectType(  id : string, name: string,   english_name: string ,  isActive: boolean,  order:number){
            this.id = id;
            this.name =  name;
            this.english_name = english_name;
            this.isActive = isActive;
            this.order  = order;
      }
}