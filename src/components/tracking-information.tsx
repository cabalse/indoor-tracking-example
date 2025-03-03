import Coordinate from "../types/coordinate";

type Props = {
  currentPos: Coordinate | null;
  time: number;
};

const TrackingInformation = ({ currentPos, time }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold">Tracking</h1>
      <div className="mt-2">
        <div className="text-sm">Current Position: {time}</div>
        <div className="flex flex-row text-lg">
          {currentPos && (
            <>
              <div className="mr-2">Latitude:</div>
              {currentPos?.lat.toString().substring(0, 8)},
              <div className="ml-2 mr-2">lnggitude:</div>
              {currentPos?.lng.toString().substring(0, 8)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingInformation;
