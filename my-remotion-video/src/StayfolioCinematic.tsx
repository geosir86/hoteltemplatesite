import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Sequence,
  Img,
  staticFile,
  spring,
  useVideoConfig
} from "remotion";
import { Video } from "@remotion/media";

const BrandColors = {
  deepInk: "#1A1612",
  warmMarble: "#F7F3EA",
  bronzeLight: "#D4AF37",
  aegeanBlue: "#004B87",
};

const AnimatedScreenshot: React.FC<{
  src: string;
  durationInFrames: number;
  scaleInitial?: number;
  mobile?: boolean;
}> = ({ src, durationInFrames, scaleInitial = 0.9, mobile = false }) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    localFrame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  const scale = spring({
    frame: localFrame,
    fps,
    config: {
      damping: 12,
    },
    from: scaleInitial,
    to: 1,
  });

  // Slow pan effect
  const yOffset = interpolate(
    localFrame,
    [0, durationInFrames],
    [0, -50],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) translateY(${yOffset}px)`,
          width: mobile ? "80%" : "90%",
          height: mobile ? "70%" : "60%",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          border: `2px solid ${BrandColors.warmMarble}40`,
          backgroundColor: BrandColors.deepInk,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: mobile ? "top center" : "center 10%",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const StayfolioCinematic: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BrandColors.deepInk }}>
      <AbsoluteFill>
        <Video
          src={staticFile("stayfolio.mov")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Subtle dark gradient overlay to make text/images pop */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)'
          }}
        />
      </AbsoluteFill>

      {/* 
        Timeline mapping based on the video's voiceover:
        - 25 frames per second 
      */}

      {/* "Σήμερα πλατφόρμες όπως το Booking και το Airbnb..." (0:09 - 0:16) -> 225 to 400 */}
      <Sequence from={225} durationInFrames={175}>
        <AnimatedScreenshot 
          src="screenshot_listing_top.png" 
          durationInFrames={175} 
        />
      </Sequence>

      {/* "να μετατρέπω την καταχώρησή σας σε μια branded... Δημιουργώ cinematic" (0:18 - 0:24) -> 450 to 600 */}
      <Sequence from={450} durationInFrames={150}>
        <AnimatedScreenshot 
          src="screenshot_hero.png" 
          durationInFrames={150} 
        />
      </Sequence>

      {/* "δίγλωσσα websites με αισθητική, premium galleries" (0:24 - 0:30) -> 600 to 750 */}
      <Sequence from={600} durationInFrames={150}>
        <AnimatedScreenshot 
          src="screenshot_gallery.png" 
          durationInFrames={150} 
        />
      </Sequence>

      {/* "το stay σας έχει τη δική του ψηφιακή ταυτότητα" (0:39 - 0:45) -> 975 to 1125 */}
      <Sequence from={975} durationInFrames={150}>
        <AnimatedScreenshot 
          src="screenshot_mobile.png" 
          durationInFrames={150}
          mobile={true}
        />
      </Sequence>

    </AbsoluteFill>
  );
};
