module.exports = function (sequelize, Datatypes) {

    return sequelize.define('test', {
        username: Datatypes.STRING,
        password: Datatypes.STRING
    });
};

