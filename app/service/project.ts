


import { Service } from 'egg';
import { Model, Instance } from 'sequelize';
import ServerResponse from '../util/serverResponse';
import { IResponseCode } from '../constant/responseCode';
import { awaitWrapper } from './../util/util';

export default class Project extends Service {

    ProjectModel: Model<Instance<{}>, {}>;
    ServerResponse: typeof ServerResponse;
    ResponseCode: IResponseCode;
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.ProjectModel = ctx.model.Project;
        this.ServerResponse = ctx.response.ServerResponse;
        this.ResponseCode = ctx.response.ResponseCode;
    }

    // 项目列表
    async list({ page = 1, pageSize = 10 }) {
        const data = await awaitWrapper(this.ProjectModel.findAndCountAll({
            attributes: ['id', 'name', 'language', 'frame'],
            offset: (page - 1) * pageSize,
            limit: pageSize,
            // order: ['id']
          }))

          if (data) {
            return this.ServerResponse.success('查询成功', { totalCount: data.count || 0, list: data.rows || [] });
          } else {
            return this.ServerResponse.error('查询失败');
          }
    }
    
    // 创建项目
    async create(project) {
        const data = await this.ProjectModel.create(project);
        if (data) {
            return this.ServerResponse.success('项目创建成功');
        } else {
            return this.ServerResponse.error('项目创建失败');
        }
    }

    // 更新项目
    async update({id, updates}) {
        const [err, project] = await awaitWrapper(this.ProjectModel.findById(id));
        if (err) {
            return this.ServerResponse.error('内部错误', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            if (project) {
                project.update(updates);
            } else {
                return this.ServerResponse.error('项目不存在', this.ResponseCode.NO_CONTENT);
            }
        }
        
    }

    // 删除项目
    async destroy(id) {
        const [err, project] = await awaitWrapper(this.ProjectModel.findById(id));
        
        if (err) {
            return this.ServerResponse.error('内部错误', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            if (project) {
                await project.destroy();
                return this.ServerResponse.success('删除成功');
            } else {
                return this.ServerResponse.error('项目不存在', this.ResponseCode.NO_CONTENT);
            }
        }
        
    }

    // 项目详情
    async show(id) {
        const [err, project] = await awaitWrapper(this.ProjectModel.findById(id));
        
        if (err) {
            return this.ServerResponse.error('内部错误', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            if (project) {
                return this.ServerResponse.success('查询成功', project);
            } else {
                return this.ServerResponse.error('项目不存在', this.ResponseCode.NO_CONTENT);
            }
        }
    }


}