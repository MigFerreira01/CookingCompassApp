import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {

  transform(value: Date): string {
    if (!(value instanceof Date)) {
      throw new Error("Invalid Date: Input should be a Date object.");
    }

    const day = value.getDate().toString().padStart(2, '0');
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const year = value.getFullYear().toString().slice(-2);
    
    return `${day}/${month}/${year}`;
  }
}