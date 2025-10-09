import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalcase',
  standalone: true,
})
export class CapitalcasePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';
    return value
      .toLowerCase()
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}


