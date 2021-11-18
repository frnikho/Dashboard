const db = require('../../src/services/DBService');

beforeAll(() => {
    require('dotenv').config();
})

test('get a connection to mariadb', (done) => {
    db.getConnection().then(async (pool) => {
        await pool.end();
        done();
    });

});