import app from './app'
import { sequelize } from './util/database'

const port = process.env.PORT || 3001;

sequelize.sync({ force: true }).then(result => {
    app.listen(port, () => console.log(`Example app listening on port ${port}, GANBAREYO DESU NE!!`))
}).catch(err => {
    console.log(err)
})