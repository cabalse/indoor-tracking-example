import useImage from "use-image";
import { useEffect, useState } from "react";
import { Circle } from "react-konva";

import nordstan from "./../assets/nordstan.png";
import Coordinate from "../types/coordinate";
import PageLayout from "./page-layout";
import TrackingMap from "./tracking-map";
import pixelToGpsCalc from "../utilities/pixel-to-gps-calc";
import classNames from "classnames";
import Konva from "konva";

const markerRadius = 5;
const startTime = 0;

const mapMin: Coordinate = {
  lat: import.meta.env.VITE_MAP_MIN_LAT,
  lng: import.meta.env.VITE_MAP_MIN_LNG,
};
const mapMax: Coordinate = {
  lat: import.meta.env.VITE_MAP_MAX_LAT,
  lng: import.meta.env.VITE_MAP_MAX_LNG,
};

const CreateRoute = () => {
  const [map] = useImage(nordstan);

  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [time, setTime] = useState(startTime);
  const [status, setStatus] = useState("stop");
  const [ctaText, setCtaText] = useState("Start");
  const [result, setResult] = useState<string[]>([]);

  const pixelToGps = pixelToGpsCalc(
    mapMin,
    mapMax,
    import.meta.env.VITE_MAP_WIDTH,
    import.meta.env.VITE_MAP_HEIGHT
  );

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    setPosition({
      x: e.target.x(),
      y: e.target.y(),
    });

    const newPosition = pixelToGps(e.target.x(), e.target.y());

    setResult((prevState) => [
      ...prevState,
      `{ time: ${time}, lat: ${newPosition.lat}, lng: ${newPosition.lng}, msg: "" }`,
    ]);
  };

  const handleStart = () => {
    if (status === "start") {
      setStatus("stop");
      setCtaText("Start");
    } else {
      setResult([]);
      setTime(0);
      setStatus("start");
      setCtaText("Stop");
      const startPosition = pixelToGps(position.x, position.y);
      setResult([
        `{ time: ${time}, lat: ${startPosition.lat}, lng: ${startPosition.lng}, msg: "" }`,
      ]);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, parseInt(import.meta.env.VITE_PUL_INTERVAL));
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(status);
  }, [status]);

  useEffect(() => {
    console.log(time);
  }, [time]);

  return (
    <PageLayout>
      <div className="flex flex-row w-7/9">
        <TrackingMap
          map={map}
          width={import.meta.env.VITE_MAP_WIDTH}
          height={import.meta.env.VITE_MAP_HEIGHT}
        >
          <Circle
            radius={markerRadius}
            x={position.x}
            y={position.y}
            fill="red"
            draggable
            onDragMove={handleDragMove}
          />
        </TrackingMap>
        <div className="w-full max-h-full ml-2 mt-4">
          <textarea
            className="w-full min-h-full bg-white"
            disabled
            value={"[" + result + "]"}
          />
          <input
            type="button"
            value={ctaText}
            className={classNames({
              "w-full p-2 rounded-lg": true,
              "bg-blue-500 hover:bg-blue-700": status === "stop",
              "bg-red-500 hover:bg-red-700": status === "start",
            })}
            onClick={() => {
              handleStart();
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default CreateRoute;
