import useImage from "use-image";
import { useEffect, useState } from "react";
import { Circle } from "react-konva";

import nordstan from "./../assets/nordstan.png";
import gpsToPixelCalc from "../utilities/gps-to-pixel-calc";
import Coordinate from "../types/coordinate";
import fakeRealTimeTracking from "../test/fake-real-time-tracking";
import PageLayout from "./page-layout";
import TrackingInformation from "./tracking-information";
import TrackingMap from "./tracking-map";

const markerRadius = 5;
const trailMarkerRadius = 1;
const tailLength = 30;
const startTime = 0;

const mapMin: Coordinate = {
  lat: parseFloat(import.meta.env.VITE_MAP_MIN_LAT),
  lng: parseFloat(import.meta.env.VITE_MAP_MIN_LNG),
};
const mapMax: Coordinate = {
  lat: parseFloat(import.meta.env.VITE_MAP_MAX_LAT),
  lng: parseFloat(import.meta.env.VITE_MAP_MAX_LNG),
};

const Tracking = () => {
  const [map] = useImage(nordstan);

  const [currentPos, setCurrentPos] = useState<Coordinate | null>(null);
  const [trail, setTrail] = useState<Coordinate[]>([]);
  const [time, setTime] = useState(startTime);

  const gpsToPixel = gpsToPixelCalc(
    mapMin,
    mapMax,
    parseInt(import.meta.env.VITE_MAP_WIDTH),
    parseInt(import.meta.env.VITE_MAP_HEIGHT)
  );

  const setTail = (coord: Coordinate | null) => {
    if (!coord) return;

    setTrail((prevTrail) => {
      if (prevTrail.length >= tailLength) {
        prevTrail.shift();
      }
      return [...prevTrail, coord];
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, parseInt(import.meta.env.VITE_PUL_INTERVAL));
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {},
    parseInt(import.meta.env.VITE_PUL_INTERVAL));

    setCurrentPos((prevPos) => {
      setTail(prevPos);
      const trackData = fakeRealTimeTracking(time, () => setTime(0));

      if (!trackData) return prevPos;

      return { lat: trackData.lat, lng: trackData.lng } as Coordinate;
    });

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <PageLayout>
      <TrackingInformation currentPos={currentPos} />
      <TrackingMap
        map={map}
        width={parseInt(import.meta.env.VITE_MAP_WIDTH)}
        height={parseInt(import.meta.env.VITE_MAP_HEIGHT)}
      >
        {trail.map((coord, idx) => (
          <Circle
            key={idx}
            radius={trailMarkerRadius}
            x={gpsToPixel(coord.lat, coord.lng).x}
            y={gpsToPixel(coord.lat, coord.lng).y}
            fill="blue"
          />
        ))}
        {currentPos && (
          <Circle
            radius={markerRadius}
            x={gpsToPixel(currentPos.lat, currentPos.lng).x}
            y={gpsToPixel(currentPos.lat, currentPos.lng).y}
            fill="red"
          />
        )}
      </TrackingMap>
    </PageLayout>
  );
};

export default Tracking;
