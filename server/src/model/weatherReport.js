import mongoose from "mongoose";

const weatherReportSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now, // Set default to the current time
  },
});

const WeatherReport = mongoose.model("WeatherReport", weatherReportSchema);

export default WeatherReport;
