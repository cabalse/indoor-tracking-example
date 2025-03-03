import { Image, Layer, Stage } from "react-konva";

type Props = {
  width: number;
  height: number;
  map: HTMLImageElement | undefined;
  children: React.ReactNode;
};

const TrackingMap = ({ width, height, map, children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-4">
      <Stage width={width} height={height}>
        <Layer>
          <Image image={map} />
          {children}
        </Layer>
      </Stage>
    </div>
  );
};

export default TrackingMap;
