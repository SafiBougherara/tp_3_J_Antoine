const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);
db.Article = require('./Article')(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Article, { foreignKey: 'userId' });
db.Article.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
