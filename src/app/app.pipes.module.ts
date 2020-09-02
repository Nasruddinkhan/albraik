import { NgModule } from '@angular/core';
import { ReversePipe } from './views/pipes/reverse-pipe.pipe';


@NgModule({
    imports:[

    ],
    declarations:[
        ReversePipe
    ],
    exports:[
        ReversePipe
    ]
})
export class ApplicationPipeModule{}