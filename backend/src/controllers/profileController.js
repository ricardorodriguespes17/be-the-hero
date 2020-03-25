const connection = require('../database/connection')

async function index (request, response) {
    const ongId = request.headers.authorization

    const incidents = await connection('incidents')
        .where('ong_id', ongId)
        .select('*')

    return response.json(incidents)
}

module.exports = {
    index
}