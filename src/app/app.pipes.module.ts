import { NgModule } from '@angular/core';
import { ReversePipe } from './views/pipes/reverse-pipe.pipe';
import { DateLocaleFilter } from './views/pipes/localdate-pipe';
import { FileSizePipe } from './views/pipes/filesize.pipe';
import { FullNamePipe } from './views/pipes/fullname.pipe';


@NgModule({
    imports:[

    ],
    declarations:[
        ReversePipe,
        DateLocaleFilter,
        FileSizePipe,
        FullNamePipe
    ],
    exports:[
        ReversePipe,
        DateLocaleFilter,
        FileSizePipe,
        FullNamePipe
    ]
})
export class ApplicationPipeModule{}