import { NgModule } from '@angular/core';
import { ReversePipe } from './views/pipes/reverse-pipe.pipe';
import { DateLocaleFilter } from './views/pipes/localdate-pipe';


@NgModule({
    imports:[

    ],
    declarations:[
        ReversePipe,
        DateLocaleFilter
    ],
    exports:[
        ReversePipe,
        DateLocaleFilter
    ]
})
export class ApplicationPipeModule{}