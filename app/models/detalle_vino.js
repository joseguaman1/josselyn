module.exports = function (sequelize, Sequelize) {
    //venta
    var venta = require('../models/venta');
    var Venta = new venta(sequelize, Sequelize);
    //vino
    var vino = require('../models/vino');
    var Vino = new vino(sequelize, Sequelize);
    
    var Detalle_Vino = sequelize.define('detalle_vino', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        precio_unitario: {
            type: Sequelize.DOUBLE(7, 2)
        },
        precio_total: {
            type: Sequelize.DOUBLE(7, 2)
        }
    }, {timestamps: false,
        freezeTableName: true
    });
    
    Detalle_Vino.belongsTo(Venta, {
        foreignKey: 'id_venta',
        constraints: false
    });
    
    Detalle_Vino.belongsTo(Vino, {
        foreignKey: 'id_vino',
        constraints: false
    });
    
    return Detalle_Vino;
};

