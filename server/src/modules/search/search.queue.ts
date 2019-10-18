import { ErrorModel } from './../error/error.model';
import { AddLogDto } from './search.dto';

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
import { SearchService } from './search.service';

export interface ILogJobData {
  body: AddLogDto;
  ip: string;
  ua: string;
  uid: string;
}

@Queue()
@Injectable()
export class SearchQueue {
  constructor(
    private readonly searchService: SearchService,

  ) {}

  @QueueProcess({ name: 'dealLog', concurrency: 3 })
  async processDealLog(job: Job<ILogJobData>) {
    await this.searchService.dealLog(job.data);
    return true;
  }

  @QueueProcess({ name: 'createLog', concurrency: 3 })
  async processCreateLog(job: Job<any>) {
    console.log(job);
    // await this.searchService.createLogIndex(
    //   job.data.body,
    //   job.data.ip,
    //   job.data.ua,
    //   job.data.uid,
    // );
    // const data = job.data.body;
    // const error: ErrorDto = {
    //   ...data.data,
    //   project: { id: data.info.projectId },
    //   id: data.data.errorId,
    // };
    // await this.errorService.createError(error);
    //const bulk = await this.searchService.dealLog(job.data);
    return true;
  }

  @QueueProcess({ name: 'countUserNum' })
  async processCountUserNum(job: Job<ErrorModel>) {
    await this.searchService.computedErrorsUserNum(job.data);
    return true;
  }

  @QueueProcess({ name: 'generateImg' })
  async processGenerateImg(job: Job<number>) {
    await this.searchService.generateImg(job.data);
    return true;
  }

  @OnQueueEvent(BullQueueEvents.COMPLETED)
  onCompleted(job: Job<any>) {
    job.remove();
    // console.log(job.returnvalue.items[0]);
    // console.log(job.data.body);
  }
}
