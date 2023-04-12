import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getWords'
})
export class GetWordsPipe implements PipeTransform {

  transform(value: string, number : number): string {
    return value.split(' ').splice(0,number).join(' ') + '...';
  }

}
