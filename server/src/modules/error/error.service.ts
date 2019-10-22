import { ALARM_INTERVAL } from './../../app.config';
import { InjectQueue } from 'nest-bull';
import { SourcemapModel, ProjectModel } from './../project/project.model';
import {
  QueryErrorListDto,
  ErrorDto,

  UpdateErrorDto,
} from './error.dto';
import { HttpBadRequestError } from '../../errors/bad-request.error';
import { ErrorModel } from './error.model';
import { Injectable, HttpService } from '@nestjs/common';
import { Repository, In, LessThan, MoreThan, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserModel } from '@/modules/user/user.model';
import { QueryListQuery, IPageData } from '@/interfaces/request.interface';

import { RedisService } from 'nestjs-redis';
import { Queue } from 'bull';
import * as moment from 'moment';
@Injectable()
export class ErrorService {
  constructor(
    @InjectRepository(ErrorModel)
    private readonly errorModel: Repository<ErrorModel>,
    @InjectRepository(SourcemapModel)
    private readonly sourcemapModel: Repository<SourcemapModel>,
    @InjectRepository(ProjectModel)
    private readonly projectModel: Repository<ProjectModel>,
    @InjectRepository(UserModel)
    private readonly userModel: Repository<UserModel>,
    private readonly httpService: HttpService,

    @InjectQueue()
    private readonly queue: Queue,
  ) {}

  public async createError(body: ErrorDto): Promise<void> {
    let error=await this.errorModel.findOne(body.id);
    if(!error){
      error = this.errorModel.create({
        userNum: 1,
        ...body,
      });
    }else{
      error.eventNum+=body.eventNum
    }
    await this.errorModel.save(error);
    return;
  }



  public async getErrorById(errorId: string): Promise<ErrorModel> {
    const error = await this.errorModel.findOne({
      where: { id: errorId },
    });
    return error;
  }

  public async getErrorAllInfo(errorId: string): Promise<string> {
    const error = await this.errorModel.findOne({
      where: { id: errorId },
    });
    return null;
  }

  public async getErrors(
    query: QueryListQuery<QueryErrorListDto>,
  ): Promise<IPageData<ErrorModel>> {
    const { endDate, startDate, guarderId, projectId, ...querys } = query.query;
    const searchBody = {
      skip: query.skip,
      take: query.take,
      where: {
        ...querys,
        project: { id: Number(projectId) },
        createdAt: LessThan(new Date(Number(endDate))),
        updatedAt: MoreThan(new Date(Number(startDate))),
      },
      order: {},
      relations: ['guarder'],
    };
    if (query.sort.key) {
      searchBody.order[query.sort.key] = query.sort.value;
    }
    if (query.query.guarderId) {
      searchBody.where['guarder'] = { id: guarderId };
    }
    const [errorTypes, totalCount] = await this.errorModel.findAndCount(
      searchBody,
    );
    return {
      totalCount,
      list: errorTypes,
    };
  }

  public async updateError(body: UpdateErrorDto): Promise<void> {
    const updateBody: any = {};
    if (body.actionType === 'LEVEL') {
      updateBody.level = body.level;
    } else if (body.actionType === 'STATUS') {
      updateBody.status = body.status;
    } else {
      updateBody.guarder = { id: body.guarderId };
    }
    await this.errorModel
      .createQueryBuilder()
      .update()
      .set(updateBody)
      .where('id IN (:...errorIds)', { errorIds: body.errorIds })
      .execute();
    return;
  }

  public async computedAlarmErrors() {
    const errors = await this.errorModel.find({
      where: {
        updatedAt: Between(new Date(Date.now() - ALARM_INTERVAL), new Date()),
      },
    });
    errors.forEach(item => {
      this.queue.add('sendAlarm', item);
    });
  }

  public async sendAlarm(error) {
    const guarder = await this.userModel.findOne(error.guarderId);
    //const project = await this.projectModel.findOne(error.projectId);
    await this.httpService.axiosRef.request({
      // project.alarmHookUrl
      url: `https://oapi.dingtalk.com/robot/send?access_token=76dc9eda9d95b1ff3f0c77ee8e0a0ebe7b43a388dfebead943a97d5d25a81c5a`,
      method: 'post',
      data: {
        actionCard: {
          title: error.name || error.type,
          text: `### ${error.type}  ${error.name}  @${guarder.nickname} \n > ${
            error.message
          } ${error.url} \n * 错误等级: ${error.level} \n * 用户数:   ${
            error.userNum
          } \n * 事件数:   ${error.eventNum} \n * 版本:   ${
            error.version
          } \n * 创建时间:  ${moment(error.created_at).format(
            'YYYY-MM-DD HH:mm:ss',
          )} \n * 更新时间:  ${moment(error.updated_at).format(
            'YYYY-MM-DD HH:mm:ss',
          )}`,
          hideAvatar: '0',
          btnOrientation: '0',
          btns: [
            {
              title: '查看详情',
              actionURL: `http://trycath.yfyld.com/dashboard/${error.projectId}/${error.id}`,
            },
            {
              title: '前往处理',
              actionURL: `http://trycath.yfyld.com/dashboard/${error.projectId}/${error.id}`,
            },
            {
              title: '暂不处理',
              actionURL: `http://trycath.yfyld.com/dashboard/${error.projectId}/${error.id}`,
            },
          ],
        },
        msgtype: 'actionCard',

        at: {
          atMobiles: [guarder.mobile],
          isAtAll: false,
        },
      },
    });
    return true;
  }
}
