import { Component, Input } from '@angular/core';
import { RoleModel } from '../../modal/role';


@Component({
    selector: 'app-role-det',
    templateUrl:'./role-details.component.html'
})
export class RoleDetailsComponent{
    @Input('rolemst') roles: RoleModel[];

}