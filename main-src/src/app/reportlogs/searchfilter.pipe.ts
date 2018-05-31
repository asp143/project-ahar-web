import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})

@Injectable()
export class SearchfilterPipe implements PipeTransform {
  transform(logs: any[], field: string, value: string): any[] {
    if(!logs) return [];
    return logs.filter(lg => lg[field] == value);
  }
}
