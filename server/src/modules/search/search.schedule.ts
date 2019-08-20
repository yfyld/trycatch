import { STAT_USER_NUM_INTERVAL } from './../../app.config';
import { SearchService } from './search.service';
import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';

@Injectable()
export class SearchSchedule extends NestSchedule {
  constructor(private readonly searchService: SearchService) {
    super();
  }

  @Interval(STAT_USER_NUM_INTERVAL)
  intervalCountUser() {
    console.log('count user num');
    this.searchService.addComputedErrorsUserNumTask();
    // return true; //to stop
  }
}
