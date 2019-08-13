import { AddLogDto } from './search.dto';
import { ErrorService } from './../error/error.service';
import { ErrorTypeDto } from './../error/error.dto';
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
}

@Queue()
@Injectable()
export class SearchQueue {
  constructor(
    private readonly searchService: SearchService,
    private readonly errorService: ErrorService,
  ) {}

  @QueueProcess({ name: 'getlog' })
  processGetLog(job: Job<JobData>) {
    return this.searchService.createLogIndex(
      job.data.body,
      job.data.ip,
      job.data.ua,
    );
  }

  @QueueProcess({ name: 'getUserNum' })
  processGetUserNum(job: Job<JobData>) {
    return this.searchService.createLogIndex(
      job.data.body,
      job.data.ip,
      job.data.ua,
    );
  }

  // @OnQueueActive()
  // onActive(job: Job) {
  //   this.logger.log(
  //     `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
  //   );
  // }

  @OnQueueEvent(BullQueueEvents.COMPLETED)
  onCompleted(job: Job<JobData>) {
    console.log(job.returnvalue.items[0]);
    console.log(job.data.body);
    const data = job.data.body;
    const errorType: ErrorTypeDto = {
      ...data.data,
      projectId: data.info.projectId,
      id: data.info.projectId + '-' + data.data.errorId,
    };
    this.errorService.createError(errorType);
  }

  // @OnQueueEvent(BullQueueEvents.FAILED)
  // onFailed(job: Job) {
  //   // todo: how to get just the job error message
  //   this.logger.log(
  //     `Failed job ${job.id} of type ${job.name}.\n${job.stacktrace}`,
  //   );
  // }
}
