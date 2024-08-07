const mongoose = require('mongoose');
const Engine = require('../models/Engine');
const Train = require('../models/Train');
const Route = require('../models/Route');
const FullTrain = require('../models/Fulltrain.js');

// MongoDB connection string
const dbUri = 'mongodb+srv://asharakaveen7:bruiCE1228@nibm-railwayapp.ezixmfd.mongodb.net/Nibm-RailwayAppDB?retryWrites=true&w=majority';

const engines = [ 
        { "engine_id": "E001", "engine_number": "E001-001", "other_details": { "type": "Diesel", "capacity": "2500 HP", "year_of_manufacture": 2015 }},
        { "engine_id": "E002", "engine_number": "E002-002", "other_details": { "type": "Electric", "capacity": "3000 HP", "year_of_manufacture": 2018 }},
        { "engine_id": "E003", "engine_number": "E003-003", "other_details": { "type": "Diesel", "capacity": "2200 HP", "year_of_manufacture": 2016 }},
        { "engine_id": "E004", "engine_number": "E004-004", "other_details": { "type": "Electric", "capacity": "3200 HP", "year_of_manufacture": 2020 }},
        { "engine_id": "E005", "engine_number": "E005-005", "other_details": { "type": "Diesel", "capacity": "2400 HP", "year_of_manufacture": 2017 }},
        { "engine_id": "E006", "engine_number": "E006-006", "other_details": { "type": "Electric", "capacity": "3100 HP", "year_of_manufacture": 2019 }},
        { "engine_id": "E007", "engine_number": "E007-007", "other_details": { "type": "Diesel", "capacity": "2300 HP", "year_of_manufacture": 2014 }},
        { "engine_id": "E008", "engine_number": "E008-008", "other_details": { "type": "Electric", "capacity": "3000 HP", "year_of_manufacture": 2018 }},
        { "engine_id": "E009", "engine_number": "E009-009", "other_details": { "type": "Diesel", "capacity": "2600 HP", "year_of_manufacture": 2015 }},
        { "engine_id": "E010", "engine_number": "E010-010", "other_details": { "type": "Electric", "capacity": "3300 HP", "year_of_manufacture": 2021 }},
        { "engine_id": "E011", "engine_number": "E011-011", "other_details": { "type": "Diesel", "capacity": "2500 HP", "year_of_manufacture": 2016 }},
        { "engine_id": "E012", "engine_number": "E012-012", "other_details": { "type": "Electric", "capacity": "3100 HP", "year_of_manufacture": 2019 }},
        { "engine_id": "E013", "engine_number": "E013-013", "other_details": { "type": "Diesel", "capacity": "2400 HP", "year_of_manufacture": 2017 }},
        { "engine_id": "E014", "engine_number": "E014-014", "other_details": { "type": "Electric", "capacity": "3200 HP", "year_of_manufacture": 2020 }},
        { "engine_id": "E015", "engine_number": "E015-015", "other_details": { "type": "Diesel", "capacity": "2300 HP", "year_of_manufacture": 2014 }},
        { "engine_id": "E016", "engine_number": "E016-016", "other_details": { "type": "Electric", "capacity": "3100 HP", "year_of_manufacture": 2018 }},
        { "engine_id": "E017", "engine_number": "E017-017", "other_details": { "type": "Diesel", "capacity": "2400 HP", "year_of_manufacture": 2017 }},
        { "engine_id": "E018", "engine_number": "E018-018", "other_details": { "type": "Electric", "capacity": "3300 HP", "year_of_manufacture": 2021 }},
        { "engine_id": "E019", "engine_number": "E019-019", "other_details": { "type": "Diesel", "capacity": "2500 HP", "year_of_manufacture": 2016 }},
        { "engine_id": "E020", "engine_number": "E020-020", "other_details": { "type": "Electric", "capacity": "3200 HP", "year_of_manufacture": 2020 }},
        { "engine_id": "E021", "engine_number": "E021-021", "other_details": { "type": "Diesel", "capacity": "2300 HP", "year_of_manufacture": 2014 }},
        { "engine_id": "E022", "engine_number": "E022-022", "other_details": { "type": "Electric", "capacity": "3000 HP", "year_of_manufacture": 2018 }}
    ];
    
  const trains = [
    {
      "train_id": "T001",
      "train_name": "Denuwara Menike Express",
      "route_id": "R001",
      "stations": [
        "Colombo Fort",
        "Kandy",
        "Hatton",
        "Nanu Oya",
        "Haputale",
        "Ella",
        "Badulla"
      ]
    },
    {
      "train_id": "T002",
      "train_name": "Udarata Menike Express",
      "route_id": "R001",
      "stations": [
        "Colombo Fort",
        "Peradeniya",
        "Nawalapitiya",
        "Hatton",
        "Thalawakele",
        "Nanu Oya",
        "Bandarawela",
        "Diyatalawa",
        "Badulla"
      ]
    },
    {
      "train_id": "T003",
      "train_name": "Podi Menike Express",
      "route_id": "R001",
      "stations": [
        "Colombo Fort",
        "Maradana",
        "Ragama",
        "Veyangoda",
        "Polgahawela",
        "Rambukkana",
        "Peradeniya",
        "Kandy",
        "Gampola",
        "Nawalapitiya",
        "Hatton",
        "Thalawakele",
        "Nanu Oya",
        "Ohiya",
        "Haputale",
        "Diyatalawa",
        "Bandarawela",
        "Ella",
        "Demodara",
        "Hali Ela",
        "Badulla"
      ]
    },
    {
      "train_id": "T004",
      "train_name": "Ruhunu Kumari Express",
      "route_id": "R002",
      "stations": [
        "Colombo Fort",
        "Maradana",
        "Bambalapitiya",
        "Wellawatte",
        "Dehiwala",
        "Mount Lavinia",
        "Panadura",
        "Aluthgama",
        "Hikkaduwa",
        "Galle",
        "Matara"
      ]
    },
    {
      "train_id": "T005",
      "train_name": "Kandy Intercity Express",
      "route_id": "R003",
      "stations": [
        "Colombo Fort",
        "Maradana",
        "Ragama",
        "Gampaha",
        "Veyangoda",
        "Polgahawela",
        "Rambukkana",
        "Kadugannawa",
        "Peradeniya",
        "Kandy"
      ]
    },
    {
      "train_id": "T006",
      "train_name": "Jaffna Express",
      "route_id": "R004",
      "stations": [
        "Colombo Fort",
        "Ragama",
        "Gampaha",
        "Veyangoda",
        "Polgahawela",
        "Kurunegala",
        "Maho",
        "Anuradhapura",
        "Medawachchiya",
        "Vavuniya",
        "Kilinochchi",
        "Jaffna"
      ]
    }
  ];
  
  
  const routes = [
    {
      "route_id": "R001",
      "route_name": "Up Country Line",
      "details": {
        "start_station": "Colombo Fort",
        "end_station": "Badulla",
        "total_distance_km": 200,
        "total_duration_minutes": 360
      }
    },
    {
      "route_id": "R002",
      "route_name": "Coastal Line",
      "details": {
        "start_station": "Colombo Fort",
        "end_station": "Matara",
        "total_distance_km": 150,
        "total_duration_minutes": 240
      }
    },
    {
      "route_id": "R003",
      "route_name": "Main Line",
      "details": {
        "start_station": "Colombo Fort",
        "end_station": "Kandy",
        "total_distance_km": 120,
        "total_duration_minutes": 180
      }
    },
    {
      "route_id": "R004",
      "route_name": "Northern Line",
      "details": {
        "start_station": "Colombo Fort",
        "end_station": "Jaffna",
        "total_distance_km": 300,
        "total_duration_minutes": 480
      }
    }
  ];
  
  const fulltrains = [
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
    { "fulltrain_id": "FT022", "train_id": "T022", "engine_id": "E022" }
];


async function insertData() {
    try {
      await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  
      // Remove existing data
      await Engine.deleteMany({});
      await Train.deleteMany({});
      await Route.deleteMany({});
      await FullTrain.deleteMany({});
      console.log('Existing data removed successfully');
  
      // Insert new data
      await Engine.insertMany(engines);
      console.log('Engines inserted successfully');
      
      await Train.insertMany(trains);
      console.log('Trains inserted successfully');
      
      await Route.insertMany(routes);
      console.log('Routes inserted successfully');
      
      await FullTrain.insertMany(fulltrains);
      console.log('FullTrains inserted successfully');
      
    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      mongoose.connection.close();
    }
  }
 
  async function insertData() {
    try {
      await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  
      // Insert or update data
      for (const engine of engines) {
        await Engine.updateOne({ engine_id: engine.engine_id }, engine, { upsert: true });
      }
      console.log('Engines inserted/updated successfully');
      
      for (const train of trains) {
        await Train.updateOne({ train_id: train.train_id }, train, { upsert: true });
      }
      console.log('Trains inserted/updated successfully');
      
      for (const route of routes) {
        await Route.updateOne({ route_id: route.route_id }, route, { upsert: true });
      }
      console.log('Routes inserted/updated successfully');
      
      for (const fulltrain of fulltrains) {
        await FullTrain.updateOne({ fulltrain_id: fulltrain.fulltrain_id }, fulltrain, { upsert: true });
      }
      console.log('FullTrains inserted/updated successfully');
      
    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      mongoose.connection.close();
    }
  }

  
  insertData();