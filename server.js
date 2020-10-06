'use strict'

const app = require('../kinday.api/bin/express');
const variables = require('../kinday.api/bin/configuration/variables');

app.listen(variables.Api.port, () => {
    console.info(`Api - Kinday iniciado porta ${variables.Api.port}`);
});
