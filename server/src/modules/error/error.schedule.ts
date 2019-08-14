import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';

@Injectable()
export class ErrorSchedule extends NestSchedule {
  @Cron('0 0 2 * *', {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  })
  async cronJob() {
    console.log('executing cron job');
  }

  @Timeout(5000)
  onceJob() {
    console.log('executing once job');
  }

  @Interval(2000)
  intervalJob() {
    console.log('executing interval job');

    return true; //to stop
  }
}
