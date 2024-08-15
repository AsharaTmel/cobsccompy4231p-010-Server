// /services/dataGenerationService.js

const generateRealTimeData = (train, route, engine) => {
    if (!train || !route || !engine) {
      throw new Error('Missing required data for real-time generation');
    }
  
    const directions = ['upward', 'downward'];
    const direction = directions[Math.floor(Math.random() * directions.length)];
  
    const startTime = new Date();
    const totalDuration = route.details.total_duration_minutes;
    const endTime = new Date(startTime.getTime() + totalDuration * 60000);
  
    const stations = train.stations;
    let startLocation, endLocation, currentLocation;
  
    if (direction === 'upward') {
      startLocation = stations[0];
      endLocation = stations[stations.length - 1];
      currentLocation = startLocation;
    } else {
      startLocation = stations[stations.length - 1];
      endLocation = stations[0];
      currentLocation = startLocation;
    }
  
    const locations = [];
    let currentIndex = direction === 'upward' ? 0 : stations.length - 1;
    const step = direction === 'upward' ? 1 : -1;
  
    while ((direction === 'upward' && currentIndex < stations.length) || (direction === 'downward' && currentIndex >= 0)) {
      locations.push({
        station: stations[currentIndex],
        timestamp: new Date(startTime.getTime() + (locations.length * (Math.random() * (60 - 40) + 1)) * 60000)
      });
      currentIndex += step;
    }
  
    return {
      engine_id: engine.engine_id,
      train_name: train.train_name,
      direction: direction,
      start_time: startTime,
      start_location: startLocation,
      current_location: locations[0], // The initial location
      estimated_end_time: endTime,
      end_location: endLocation,
      locations: locations
    };
  };
  
  module.exports = { generateRealTimeData };
  