import "./index.css";
import { Composition } from "remotion";
import { StayfolioCinematic } from "./StayfolioCinematic";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="StayfolioCinematic"
        component={StayfolioCinematic}
        durationInFrames={1350} // 54 seconds at 25 fps
        fps={25}
        width={1080}
        height={1920}
      />
    </>
  );
};
