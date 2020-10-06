const variables = {
    Api : {
        port: process.env.port || 3000
    },
    Database: {
        connection : process.env.connection || 'database'
    },
    Security: {
        secretKey: 'secretkey'
    }
};

module.exports = variables;