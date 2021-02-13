import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
    transform(size: number) {
        if (!size)
            return;
        let fileSize = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        let index = 0;
        while (size > 1024) {
            size /= 1024;
            ++index;
        }
        let tempAns = size.toFixed(2).toString();
        let i = tempAns.length - 1;
        if (tempAns.charAt(i) === '0') {
            if (tempAns.charAt(i-1) === '0')
                tempAns = tempAns.substr(0, i-2);
            else
                tempAns = tempAns.substr(0, i);
        }
        return tempAns +" "+ fileSize[index].toString();
    }
}