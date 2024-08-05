const moment = require('moment');

// Sample duration in minutes (use your MongoDB value here)
const duration = 600; // Example duration

// Generate the current time and estimated end time
const startTime = moment();
const endTime = moment().add(duration, 'minutes');

// Output start time, end time, and duration
console.log('Start Time:', startTime.toISOString());
console.log('End Time:', endTime.toISOString());
console.log('Duration:', duration);

// Check if the calculated end time is valid
if (isNaN(endTime.valueOf())) {
  console.error('End Time is invalid');
} else {
  console.log('End Time is valid');
}
