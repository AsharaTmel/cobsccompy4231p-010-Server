const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://asharakaveen7:bruiCE1228@nibm-railwayapp.ezixmfd.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertHistoricalData() {
    try {
        await client.connect();
        const db = client.db('Nibm-RailwayAppDB');
        const collection = db.collection('HistoricalFulltrain');

        const startDate = new Date();
        const historicalData = [];

        for (let dayOffset = 0; dayOffset < 90; dayOffset++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() - dayOffset);
            
            const data = [
                { "fulltrain_id": "FT001", "train_id": "T001", "engine_id": "E001" },
                { "fulltrain_id": "FT002", "train_id": "T002", "engine_id": "E002" },
                { "fulltrain_id": "FT003", "train_id": "T003", "engine_id": "E003" },
                { "fulltrain_id": "FT004", "train_id": "T004", "engine_id": "E004" },
                { "fulltrain_id": "FT005", "train_id": "T005", "engine_id": "E005" },
                { "fulltrain_id": "FT006", "train_id": "T006", "engine_id": "E006" },
                { "fulltrain_id": "FT007", "train_id": "T007", "engine_id": "E007" },
                { "fulltrain_id": "FT008", "train_id": "T008", "engine_id": "E008" },
                { "fulltrain_id": "FT009", "train_id": "T009", "engine_id": "E009" },
                { "fulltrain_id": "FT010", "train_id": "T010", "engine_id": "E010" },
                { "fulltrain_id": "FT011", "train_id": "T011", "engine_id": "E011" },
                { "fulltrain_id": "FT012", "train_id": "T012", "engine_id": "E012" },
                { "fulltrain_id": "FT013", "train_id": "T013", "engine_id": "E013" },
                { "fulltrain_id": "FT014", "train_id": "T014", "engine_id": "E014" },
                { "fulltrain_id": "FT015", "train_id": "T015", "engine_id": "E015" },
                { "fulltrain_id": "FT016", "train_id": "T016", "engine_id": "E016" },
                { "fulltrain_id": "FT017", "train_id": "T017", "engine_id": "E017" },
                { "fulltrain_id": "FT018", "train_id": "T018", "engine_id": "E018" },
                { "fulltrain_id": "FT019", "train_id": "T019", "engine_id": "E019" },
                { "fulltrain_id": "FT020", "train_id": "T020", "engine_id": "E020" },
                { "fulltrain_id": "FT021", "train_id": "T021", "engine_id": "E021" },
                { "fulltrain_id": "FT022", "train_id": "T022", "engine_id": "E022" },
                { "fulltrain_id": "FT023", "train_id": "T023", "engine_id": "E023" }
            ];

            historicalData.push({
                date: currentDate.toISOString().split('T')[0], // Date in YYYY-MM-DD format
                HistoricalData: data
            });
        }

        const result = await collection.insertMany(historicalData);
        console.log(`Inserted ${result.insertedCount} documents into the collection.`);
    } finally {
        await client.close();
    }
}

insertHistoricalData().catch(console.error);
