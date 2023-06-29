import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(seconds: number): string {
    const hours:number=Math.floor(seconds/(60*60))
    const remainingMinutes=seconds-hours*60*60
    const minutes: number = Math.floor(remainingMinutes / 60);
    const remainingSeconds = remainingMinutes - minutes * 60;
    return (
      hours.toString().padStart(2,'0')+
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      remainingSeconds.toString().padStart(2, '0')
    );
  }

}
