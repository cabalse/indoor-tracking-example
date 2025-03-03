import Coordinate from "../types/coordinate";

const gpsToPixelCalc = (
  mapMinCoord: Coordinate,
  mapMaxCoord: Coordinate,
  mapWidth: number,
  mapHeight: number
) => {
  function gpsToPixel(lat: number, lng: number) {
    const xRatio =
      (lng - mapMinCoord.lng) / (mapMaxCoord.lng - mapMinCoord.lng);
    const xPixel = Math.round(xRatio * mapWidth);

    const yRatio =
      (mapMinCoord.lat - lat) / (mapMinCoord.lat - mapMaxCoord.lat);
    const yPixel = Math.round(yRatio * mapHeight);

    return { x: xPixel, y: yPixel };
  }

  return gpsToPixel;
};

export default gpsToPixelCalc;
