import { Injectable, Pipe, PipeTransform } from '@angular/core'
import { formatDate } from '@angular/common';



@Pipe({
    name: 'localDate'
})
export class DateLocaleFilter implements PipeTransform {
    constructor() { }
    // transform(value: string, dateFormat: string): any {
    //     if (!value) { return ''; }
    //     if (!dateFormat) { dateFormat = 'shortDate'; }
    //     return formatDate(value, dateFormat, 'ar');

    // }
    transform(dateInMilli: number) {
        if (!dateInMilli)
            return null;
        return new Date(dateInMilli).toLocaleDateString('ar');
    }
}