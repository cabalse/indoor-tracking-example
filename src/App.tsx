import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";

import nordstan from "./assets/nordstan.png";
import guard from "./assets/guard.png";
import { useEffect, useState } from "react";

const mapMin = { lat: 57.71207, lon: 11.964359 };
const mapMax = { lat: 57.706622, lon: 11.97472 };

const imgWidth = 788;
const imgHeight = 771;

const startPoint = { lat: 57.709343, lon: 11.968625 };

const interval = 500;

function gpsToPixel(lat: number, lon: number) {
  const xRatio = (lon - mapMin.lon) / (mapMax.lon - mapMin.lon);
  const xPixel = Math.round(xRatio * imgWidth);

  const yRatio = (mapMin.lat - lat) / (mapMin.lat - mapMax.lat);
  const yPixel = Math.round(yRatio * imgHeight);

  return { x: xPixel, y: yPixel };
}

const interpolateGPSPoints = (points, numSteps = 10) => {
  const interpolatedPoints = [];

  for (let i = 0; i < points.length - 1; i++) {
    const { lat: lat1, lon: lon1 } = points[i];
    const { lat: lat2, lon: lon2 } = points[i + 1];

    for (let j = 0; j <= numSteps; j++) {
      const fraction = j / numSteps;
      const lat = lat1 + fraction * (lat2 - lat1);
      const lon = lon1 + fraction * (lon2 - lon1);
      interpolatedPoints.push({ lat, lon });
    }
  }

  return interpolatedPoints;
};

const guardKeyPoints = [
  startPoint,
  { lat: 57.710054, lon: 11.968119 },
  { lat: 57.707363, lon: 11.969719 },
  startPoint,
];

const guardPath = interpolateGPSPoints(guardKeyPoints, 30);

const totalSteps = guardPath.length;

function App() {
  const [map] = useImage(nordstan);
  const [target] = useImage(guard);

  const [currentPos, setCurrentPos] = useState(startPoint);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStep((prevValue) => {
        if (prevValue === totalSteps - 1) {
          return 0;
        }
        setCurrentPos(guardPath[prevValue]);
        return prevValue + 1;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [currentStep]);

  return (
    <div className="h-full w-full bg-gray-900">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white p-4 rounded-lg">
          <h1 className="text-2xl font-bold">Tracking</h1>
          <div className="mt-2">
            <p className="text-sm">Current Position:</p>
            <p className="flex flex-row text-lg">
              <p className="mr-2">Latitude:</p>
              {currentPos.lat.toString().substring(0, 8)},
              <p className="ml-2 mr-2">Longitude:</p>
              {currentPos.lon.toString().substring(0, 8)}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full mt-4">
          <Stage width={imgWidth} height={imgHeight}>
            <Layer>
              <Image image={map} />
              <Image
                image={target}
                scale={{ x: 0.25, y: 0.25 }}
                x={gpsToPixel(currentPos.lat, currentPos.lon).x}
                y={gpsToPixel(currentPos.lat, currentPos.lon).y}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}

export default App;
