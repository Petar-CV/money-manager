import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToString',
})
export class NumberToStringPipe implements PipeTransform {
  transform(data: number | undefined): string {
    return data ? data.toString() : '';
  }
}
