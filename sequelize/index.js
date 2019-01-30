const Sequelize = require('sequelize');


const sequelize = new Sequelize('trycatch', 'yuhonyon', '342531', {
    host: '97.64.36.18',
    port: '3333',
    dialect: 'mysql',
    define: {
        underscored: true
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully');
}).catch(err => {
    console.error('Unable to connect to the database: ', err);
});

const year = ['2019', '2020'];
const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const STRING = Sequelize.STRING;
const INTEGER = Sequelize.INTEGER;
const DATE = Sequelize.DATE;

for (let i = 0; i < year.length; i++) {
    for (let j = 0; j < month.length; j++) {
        const Log = sequelize.define(`log_${year[i]}_${month[[j]]}`, {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            type: STRING(30),
            source: STRING(10000),
            url: STRING(100),
            projectId: {
                type: INTEGER,
                field: 'project_id'
            },
            errorId: {
                type: INTEGER,
                field: 'error_id'
            },
            customId: STRING(30),
            month: STRING(10),
            version: STRING(10),
            created_at: DATE,
            updated_at: DATE
        }, {
            tableName: `log_${year[i]}_${month[[j]]}`
        });

        Log.sync({
            force: true
        });
    }
}
