import cds from '@sap/cds'
import { Readable } from 'stream'

async function t1() {
    console.log('t1')
    const e1 = cds.model.definitions['ao.test.S_ReportingTypes']
    const e2 = cds.model.definitions['ao.test.T_ReportingTypes']
    console.log('Entity e1: ', e1)

    
    const result = await INSERT.into(e2).from(SELECT.columns('ID','description').from(e1))
    console.log('Inserted rows: ', result)
    

    console.table(await SELECT.from(e2))

}



/**
 * Functionality to prepare the cds environment, load the model and connect to the database if required. This is necessary for the schema generation as we need to have the model loaded and the database connection established to generate the views based on the remote sources and table definitions.
 */
async function prepCds(options) {
    const o = { ...options, __proto__: {} }
    const csn = await cds.load('*').then(cds.minify)
    cds.model = cds.compile.for.nodejs(csn)
    if (cds.requires.db) cds.db = await cds.connect.to('db').then(_init)

    async function _init(db) {

        // Setting database to in-memory for schema generation, as we don't want to persist any data, just generate the schema
        o.in_memory = true
        //console.log('Initializing in-memory database with model: ', !o.in_memory)
        if (!o.in_memory || cds.requires.multitenancy) return db
        const fts = cds.requires.toggles && cds.resolve(cds.env.features.folders)
        const m = !fts ? csn : await cds.load([o.from || '*', ...fts], o).then(cds.minify)
        //console.log('Deploying in-memory database with model: ', m)
        return cds.deploy(m).to(db, o)
    }
}

await prepCds()
await t1()
