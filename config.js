var config = {
    'development': {
        mysql: {
            database: 'cet',
            username: 'root',
            password: 'linux4amrc'
        },
        firebase: {
            databaseURL: "url"
        }
    },
    'production': {

    }
}


var env = process.env.NODE_ENV || "development";

module.exports = function(mode) {
    return config[mode || env]
}
