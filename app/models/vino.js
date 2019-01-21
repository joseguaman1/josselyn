module.exports = function (sequelize, Sequelize) {
    var marca = require('../models/marca');    
    var Marca = new marca(sequelize, Sequelize);
    
    var Vino = sequelize.define('vino', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        nombre: {
            type: Sequelize.STRING(50)
        },
        tipo: {
            type: Sequelize.STRING(50)
        },
        
        fecha_creacion: {
            type: Sequelize.DATEONLY
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        precio: {
            type: Sequelize.DOUBLE
        },
        pais: {
            type: Sequelize.STRING(50)
        },
        foto: {
            type: Sequelize.STRING(50)
        }
    }, {
        freezeTableName: true
    });
    
    Vino.associate= function (models){
        models.vino.hasMany(models.detalle_vino, {
            foreignKey:'id_vino'});
    };
    
    Vino.belongsTo(Marca, {
        foreignKey: 'id_marca',
        constraints: false
    });
    
    return Vino;
};