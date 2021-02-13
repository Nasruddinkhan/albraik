import { Pipe, PipeTransform } from '@angular/core';
import { UserMaster } from '../modal/user-master';

@Pipe({
    name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
    transform(user: UserMaster) {
        if (!user)
            return;
        if (user.firstName)
            return user.firstName+" "+user.familyName;
        else 
            return '';
    }
}