////////// Work in progress ////////////
///////////// User Model //////////////
const User = db.define('user', {
    name: {
        type: STRING
    },
    email: {
        type: STRING,
        unique: true
    },
    password: {
        type: STRING,
    }
})

module.exports = User
