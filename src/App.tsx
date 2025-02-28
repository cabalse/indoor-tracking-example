import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";

import nordstan from "./assets/nordstan.png";
import guard from "./assets/guard.png";

const mapMin = { lat: 57.710416, lon: 11.966644 };
const mapMax = { lat: 57.707108, lon: 11.971484 };

const imgWidth = 448;
const imgHeight = 555;

const startPoint = { lat: 57.708318, lon: 11.969123 };

const gpsToPixel = (lat: number, lon: number) => {
  const x = ((lon - mapMin.lon) / (mapMax.lon - mapMin.lon)) * imgWidth;
  const y = (1 - (lat - mapMin.lat) / (mapMax.lat - mapMin.lat)) * imgHeight; // Invert Y

  return { x: Math.round(x), y: Math.round(y) };
};

const interpolateGPSPoints = (points, numSteps = 10) => {
  const interpolatedPoints = [];

  for (let i = 0; i < points.length - 1; i++) {
    const [lat1, lon1] = points[i];
    const [lat2, lon2] = points[i + 1];

    for (let j = 0; j <= numSteps; j++) {
      const fraction = j / numSteps;
      const lat = lat1 + fraction * (lat2 - lat1);
      const lon = lon1 + fraction * (lon2 - lon1);
      interpolatedPoints.push([lat, lon]);
    }
  }

  return interpolatedPoints;
};

function App() {
  const [map] = useImage(nordstan);
  const [target] = useImage(guard);

  const targetPos = gpsToPixel(startPoint.lat, startPoint.lon);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image image={map} />
        <Image
          image={target}
          scale={{ x: 0.25, y: 0.25 }}
          x={targetPos.x}
          y={targetPos.y}
        />
      </Layer>
    </Stage>
  );
}

export default App;
