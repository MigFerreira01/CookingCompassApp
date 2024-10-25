import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimQuotes'
})
export class TrimQuotesPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (typeof value !== 'string') {
      return ''; // Return an empty string if value is not a string or is undefined
    }
    return value.replace(/(^"|"$)/g, ''); // Remove leading and trailing quotes
  }
}