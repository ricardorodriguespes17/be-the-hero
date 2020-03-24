const connection = require('../database/connection')

async function index(request, response) {
    const { page = 1 } = request.query

    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
        .join('ongs', 'ong_id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp','ongs.city', 'ongs.uf'])

    response.header('X-Total-Count', count['count(*)'])

    return response.json(incidents)
}

async function create(request, response) {
    const { title, description, value } = request.body
    const ongId = request.headers.authorization

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id: ongId
    })

    return response.json({ id })
}

async function del(request, response) {
    const { id } = request.params
    const ongId = request.headers.authorization

    const incidents = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first()

    if (incidents === undefined) {
        return response.status(404).json({ error: 'Incident not found' })
    }

    if (incidents.ong_id !== ongId)
        return response.status(401).json({ error: 'Operation not permitted' })

    await connection('incidents').where('id', id).delete()

    return response.status(204).send()
}

module.exports = {
    index,
    create,
    del
}