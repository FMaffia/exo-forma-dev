exports = async function (changeEvent) {
    try {
        const operationType = changeEvent.operationType
        const fullDocument = changeEvent.fullDocument
        const oldDoc = changeEvent.fullDocumentBeforeChange
        if (operationType === 'update' || operationType === 'replace') {
            if (oldDoc.title === fullDocument.title && oldDoc.order === fullDocument.order) {
                console.log('--- SKIP TRIGGER --- Titolo o ordine non modificati ')
                return
            }
        }
        const mongodb = context.services.get('MyCluster')
        const stepsColl = mongodb.db('FORMAZIONE_INTERNA').collection('steps')
        const key = operationType === 'delete' ? oldDoc.idProject : fullDocument.idProject
        const steps = await stepsColl
            .find(
                {
                    idProject: key
                },
                {
                    title: 1,
                    order: 1,
                    idString: { $toString: '$_id' },
                    _id: 0
                }
            )
            .toArray()
        const projectsColl = mongodb.db('FORMAZIONE_INTERNA').collection('projects')
        projectsColl.updateOne(
            {
                _id: new BSON.ObjectId(key)
            },
            {
                $set: {
                    steps
                }
            }
        )
    } catch (err) {
        console.log('error performing mongodb write: ', err.message)
    }
}
