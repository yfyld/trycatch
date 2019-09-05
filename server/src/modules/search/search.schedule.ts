import { STAT_USER_NUM_INTERVAL, GENERATE_IMG_CRON } from './../../app.config';
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

  //@Interval(600000)
  @Cron(GENERATE_IMG_CRON)
  intervalGenerateImg() {
    console.log('generate project img');
    this.searchService.addGenerateImgTask();
  }
}
