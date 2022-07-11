import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBr'
})
export class DataBrPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const dataArr = value.split('-');

    if (dataArr.length !== 3) {
      return value;
    }

    return dataArr[2] + '/' + dataArr[1] + '/' + dataArr[0];
  }

}
