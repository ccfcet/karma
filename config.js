var config = {
    'development': {
        mysql: {
            database: 'dcms',
            username: 'root',
            password: ''
        }
    },
    'production': {

    }
}


var env = process.env.NODE_ENV || "development";

module.exports = function(mode) {
    return config[mode || env]
}
