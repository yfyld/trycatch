import { ErrorModel } from './error.model';

import { ErrorService } from './../error/error.service';
import { ErrorDto } from './../error/error.dto';
import {
  BullQueueEvents,
  OnQueueActive,
  OnQueueEvent,
  Queue,
  QueueProcess,
} from 'nest-bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Queue()
@Injectable()
export class ErrorQueue {
  constructor(
    private readonly errorService: ErrorService,
    private readonly redisService: RedisService,
  ) {}

  @QueueProcess({ name: 'sendAlarm' })
  async processSendAlarm(job: Job<ErrorModel>) {
    const client = this.redisService.getClient();
    let lastNum = (await client.get(job.data.id)) || 0;
    if (job.data.eventNum - Number(lastNum) > 3) {
      await this.errorService.sendAlarm(job.data);
      client.set(job.data.id, JSON.stringify(job.data.eventNum));
    }
    return true;
  }
}
