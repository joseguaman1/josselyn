module.exports = function (sequelize, Sequelize) {
    var Marca = sequelize.define('marca', {
        idMarca: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        nombre: {
            type: Sequelize.STRING(25)
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    },
            {
                timestamps: false,
                freezeTableName: true
            });
    /*Marca.associate = function (models) {
        models.marca.hasMany(models.vino, {
            foreignKey: 'id_marca'
        });
    };*/
    return Marca;
};