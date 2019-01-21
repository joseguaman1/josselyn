module.exports = function (sequelize, Sequelize) {
    var persona = require('../models/persona');
    var Persona = new persona(sequelize, Sequelize);
    var Venta = sequelize.define('venta', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        fecha: {
            type: Sequelize.DATEONLY
        },
        subtotal: {
            type: Sequelize.DOUBLE(7, 2)
        },
        iva: {
            type: Sequelize.DOUBLE(7, 2)
        },
        total: {
            type: Sequelize.DOUBLE(7, 2)
        },
        descuento: {
            type: Sequelize.DOUBLE(7, 2)
        }
    }, {timestamps: false,
        freezeTableName: true
    });
    
    Venta.associate= function (models){
        models.venta.hasMany(models.detalle_vino, {
            foreignKey:'id_venta'});
    };
    Venta.belongsTo(Persona, {
        foreignKey: 'id_persona',
        constraints: false
    });
    return Venta;
};

