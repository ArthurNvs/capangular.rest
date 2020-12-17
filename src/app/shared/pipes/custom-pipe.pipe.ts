import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';

@Pipe({
  name: 'randomCase'
})
export class CustomPipe implements PipeTransform {

  transform(value: string): any {
    let rand = value.split('')
      .map((val) => Math.round(Math.random()) ? val
        .toUpperCase() : val
          .toLowerCase())
      .join('');
    return rand;
  }
}
