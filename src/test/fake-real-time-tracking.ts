import GPSTrackingData from "../types/gps-tracking-data";
import gpsData from "./gps-data";

const fakeRealTimeTracking = (
  time: number,
  callBack: () => void
): GPSTrackingData => {
  const maxTime = gpsData[gpsData.length - 1].time;

  if (time > maxTime) {
    callBack();
    return gpsData[0];
  }

  const filtered = gpsData.filter((data) => data.time === time);

  return filtered[0];
};

export default fakeRealTimeTracking;
