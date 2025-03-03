import Coordinate from "../types/coordinate";

const pixelToGpsCalc = (
  mapMinCoord: Coordinate,
  mapMaxCoord: Coordinate,
  mapWidth: number,
  mapHeight: number
) => {
  function pixelToGps(x: number, y: number) {
    const lng =
      Number(mapMinCoord.lng) + // Ensure it's treated as a number
      (x / mapWidth) * (Number(mapMaxCoord.lng) - Number(mapMinCoord.lng));

    const lat =
      Number(mapMinCoord.lat) - // Ensure it's treated as a number
      (y / mapHeight) * (Number(mapMinCoord.lat) - Number(mapMaxCoord.lat));

    return { lat, lng };
  }

  return pixelToGps;
};

export default pixelToGpsCalc;
