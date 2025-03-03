import { Line, Rect, Text } from "react-konva";

type Props = {
  x: number;
  y: number;
  message: string;
};

const MessageBox = ({ x, y, message }: Props) => {
  const boxWidth = 200;
  const boxHeight = 80;
  const padding = 10;

  const boxX = x + 20;
  const boxY = y - boxHeight - 20;

  const linePoints = [x, y, boxX, boxY + boxHeight];

  return (
    <>
      <Line points={linePoints} stroke="black" strokeWidth={2} />
      <Rect
        x={boxX}
        y={boxY}
        width={boxWidth}
        height={boxHeight}
        fill="white"
        stroke="black"
        cornerRadius={5}
        shadowBlur={5}
      />
      <Text
        x={boxX + padding}
        y={boxY + padding}
        width={boxWidth - padding * 2}
        text={message}
        fontSize={16}
        fill="black"
      />
    </>
  );
};

export default MessageBox;
