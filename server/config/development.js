const configuration = {};
configuration.db = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: process.env.OPERATOR_ALIASES
};

module.exports = configuration;