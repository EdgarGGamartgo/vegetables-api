import app from './app'
import { sequelize } from './util/database'
import { Venta } from './models/Venta'
import { Usuario } from './models/Usuario'

const port = process.env.PORT || 3001;

// Relations Databse
// User-Venta (One -to - many)
Usuario.hasMany(Venta, { as: 'ventas' });
// Venta-User (Many - to - one)
Venta.belongsTo(Usuario);

sequelize.sync({ force: true }).then(result => {
    app.listen(port, () => console.log(`Example app listening on port ${port}, GANBAREYO DESU NE!!`))
}).catch(err => {
    console.log(err)
})