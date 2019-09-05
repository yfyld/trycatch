import { ErrorModel } from './../error/error.model';
import { AddLogDto } from './search.dto';
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
import { SearchService } from './search.service';

export interface JobData {
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
    private readonly errorService: ErrorService,
  ) {}

  @QueueProcess({ name: 'createLog' })
  async processGetLog(job: Job<JobData>) {
    await this.searchService.createLogIndex(
      job.data.body,
      job.data.ip,
      job.data.ua,
      job.data.uid,
    );
    const data = job.data.body;
    const error: ErrorDto = {
      ...data.data,
      project: { id: data.info.projectId },
      id: data.data.errorId,
    };
    await this.errorService.createError(error);
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
  onCompleted(job: Job<JobData>) {
    // console.log(job.returnvalue.items[0]);
    // console.log(job.data.body);
  }
}
