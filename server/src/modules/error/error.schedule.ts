import { ALARM_INTERVAL } from './../../app.config';
import { ErrorService } from './error.service';
import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';

@Injectable()
export class ErrorSchedule extends NestSchedule {
  constructor(private readonly errorService: ErrorService) {
    super();
  }

  // @Cron('0 0 2 * *', {
  //   startTime: new Date(),
  //   endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  // })
  // async cronJob() {
  //   console.log('executing cron job');
  // }

  // @Timeout(5000)
  // onceJob() {
  //   console.log('executing once job');
  // }

  @Interval(ALARM_INTERVAL)
  intervalAlarm() {
    console.log('auto alarm');
    this.errorService.computedAlarmErrors();
    // return true; //to stop
  }
}
