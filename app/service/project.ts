


import { Service } from 'egg';
import { Model, Operators } from 'sequelize';
import * as _ from 'lodash';
import ServerResponse from '../util/serverResponse';
import { IResponseCode } from '../constant/responseCode';
import { awaitWrapper } from './../util/util';
import {ProjectModel} from "../../types"

export default class Project extends Service {

    ProjectModel: Model<ProjectModel, {}>;
    UserModel:any;
    ServerResponse: typeof ServerResponse;
    ResponseCode: IResponseCode;
    Op: Operators;
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.ProjectModel = ctx.model.Project;
        this.UserModel=ctx.model.User;
        this.ServerResponse = ctx.response.ServerResponse;
        this.ResponseCode = ctx.response.ResponseCode;
        this.Op = ctx.app.Sequelize.Op;
    }

    // 项目列表
    async list({ page = 1, pageSize = 10 }, id: number) {

        const data = await this.ProjectModel.findAndCountAll({
            attributes: ['id', 'name', 'language', 'frame'],
            offset: (page - 1) * pageSize,
            where: {
                [this.Op.or]: [
                    { adminId: id },
                    { memberIds: { [this.Op.like]: '%' + id + '%' }}
                ]
            },
            limit: pageSize,
            order: [['id', 'desc']]
        })

        if (data) {
            return this.ServerResponse.success('查询成功', { totalCount: data.count || 0, list: data.rows || [] });
        } else {
            return this.ServerResponse.error('查询失败');
        }
    }
    
    // 创建项目
    async create(project) {
        project.adminId=this.ctx.session.currentUser.id;
        project.ownerId=project.adminId;
        const data = await this.ProjectModel.create(project);
        if (data) {
            return this.ServerResponse.success('项目创建成功',{id:data.id});
        } else {
            return this.ServerResponse.error('项目创建失败');
        }
    }

    // 更新项目
    async update(id, updates) {
        const [err, project] = await awaitWrapper(this.ProjectModel.findById(id));
        if (err) {
            return this.ServerResponse.error('内部错误', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            if (project) {
                await project.update(updates)
                return this.ServerResponse.success('项目更新成功');
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

    // 添加项目成员
    async addMember({userIds}, id) {
        const [err, data] = await awaitWrapper(this.ProjectModel.findById(id));
        if (err) {
            return this.ServerResponse.error('内部错误');
        } else {
            if (data) {
                const members = data.members.split(',');
                const addMembers = userIds.split(',');
                const member = addMembers.filter(item => _.findIndex(members, i => i === item) === -1).concat(members);
                data.member = member.join(',');
                data.update();
            } else {
                return this.ServerResponse.error('项目不存在', this.ResponseCode.NO_CONTENT);
            }
        }
    }

    // 删除项目成员
    async deleteMember({userIds}, id) {
        const [err, data] = await awaitWrapper(this.ProjectModel.findById(id));
        if (err) {
            return this.ServerResponse.error('内部错误');
        } else {
            if (data) {
                const members = data.members.split(',');
                const addMembers = userIds.split(',');
                const member = members.filter(item => _.findIndex(addMembers, i => i === item) >= 0);
                data.member = member.join(',');
                data.update();
            } else {
                return this.ServerResponse.error('项目不存在', this.ResponseCode.NO_CONTENT);
            }
        }
    }

    async members(id) {
        const [err, project] = await awaitWrapper(this.ProjectModel.findById(id));
        
        if (err) {
            return this.ServerResponse.error('内部错误', this.ResponseCode.ERROR_ARGUMENT);
        }

        const [usersErr, users] = await awaitWrapper(this.UserModel.findAll({
            attributes:["id","name","mobile"],
            where:{
                id:{[this.Op.in]:project.memberIds.split(',').map(item=>Number(item))}
            },
            raw: true
        }));

        
        
        if (usersErr) {
            return this.ServerResponse.error('内部错误', this.ResponseCode.ERROR_ARGUMENT);
        }
        return this.ServerResponse.success('查询成功', users.map(item=>{
            if(item.id===project.adminId){
                item.isAdmin=true;
            }
            if(item.id===project.ownerId){
                item.isOwner=true;
            }
            return item
        }));
        
    }


}