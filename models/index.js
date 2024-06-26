// this is where all the seperate models will be imported.
const Sequelize = require('sequelize');

// create sequelize instance with database info
const sequelize = new Sequelize('testDB', 'gnawtough', "#RoED#7R$9pK%7KFVXvBTMcPuki7a^ae", {
    host: 'localhost',
    dialect: 'mysql',
});

//import models TODO: add all other models to this and add to exports
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Analysis = require('./analysis')(sequelize, Sequelize.DataTypes);
const Budget = require('./Budget')(sequelize, Sequelize.DataTypes);
const BudgetDetails = require('./budgetDetails')(sequelize, Sequelize.DataTypes);
const Category = require('./Category')(sequelize, Sequelize.DataTypes);
const Receipt = require('./receipt')(sequelize, Sequelize.DataTypes);
const Transaction = require('./Transaction')(sequelize, Sequelize.DataTypes);
const UserPreferences = require('./userPreferences')(sequelize, Sequelize.DataTypes);
const UserProfile = require('./userProfile')(sequelize, Sequelize.DataTypes);
const Visualization = require('./visualization')(sequelize, Sequelize.DataTypes);


// establish relationships TODO: add relationships for each tables based on chart
// example 1:
// User.hasMany(Receipt);
// Receipt.belongsTo(User);

// User relationships
User.hasMany(Receipt);
Receipt.belongsTo(User);

User.hasMany(Budget);
Budget.belongsTo(User);

User.hasOne(Analysis);
Analysis.belongsTo(User);

User.hasOne(UserPreferences);
UserPreferences.belongsTo(User);

User.hasOne(UserProfile);
UserProfile.belongsTo(User);

// Receipts relationships
Receipt.hasMany(Transaction, { foreignKey: 'ReceiptId' });
Transaction.belongsTo(Receipt, { foreignKey: 'ReceiptId' });

Category.hasMany(Transaction);
Transaction.belongsTo(Category);

// Budget Relationships
Budget.hasMany(BudgetDetails);
BudgetDetails.belongsTo(Budget);

// Analysis Relationships
Analysis.hasMany(Visualization);
Visualization.belongsTo(Analysis);

// test connection
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));



// sync database
sequelize.sync({ force: true }).then(() => { //{ force: true }
    console.log("Database & tables created!");
});

// TODO: export all models
module.exports = {
    sequelize,
    User,
    Analysis,
    Budget,
    BudgetDetails,
    Category,
    Receipt,
    Transaction,
    UserProfile,
    UserPreferences,
    Visualization,
};