import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedValue',
})
export class NestedValuePipe implements PipeTransform {
  transform<T>(obj: T, path: string): string {
    return this.getNestedValue(obj, path);
  }

  private getNestedValue<T>(object: T, path: string) {
    return (
      path
        .replace(/\[/g, '.')
        .replace(/\]/g, '')
        .split('.')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((prev: any, current: any) => (prev || {})[current], object)
    );
  }
}
