const Subscription = require('egg').Subscription;

console.log(999909)
class UserCount extends Subscription {
  constructor(ctx){
    super(ctx)
    this.ErrorModel = ctx.model.Error;
    this.LogModel = ctx.model.Log;
  }
  static get schedule() {
    return {
      interval: '10s',
      type: 'all',
    };
  }

  


  async subscribe() {
    const Op = this.ctx.app.Sequelize.Op

    const errors = await this.ErrorModel.findAll({
      where: {
        update_at:{
          [Op.gt]:Date.now()-60*60000
        }
      },
      raw: true
    })

    console.log(999909,errors)
    if(errors.length){
      return;
    }

    for(let error of errors){
      const logs:[{customId:string}]=await this.LogModel.findAll({
        attributes: ['customId'],
        where: {
          errorId:error.id
        },
        raw: true
      })

      const userCount=new Set(logs.map(item=>item.customId)).size

      await this.ErrorModel.update({
        userCount
      },{
        where: {
          id:error.id
        }
      })

    }
    


  }
}

module.exports = UserCount;
