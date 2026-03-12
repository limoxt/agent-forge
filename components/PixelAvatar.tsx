"use client";

import { AvatarType } from "@/lib/rpg";

interface PixelAvatarProps {
  type: AvatarType;
  color: string;
  size?: number;
}

// 8x8 face-only pixel avatars — CryptoPunks-inspired
// 0 = transparent, 1 = skin, 2 = hair/helmet, 3 = eye, 4 = mouth/detail, 5 = accent
type Pixel = 0 | 1 | 2 | 3 | 4 | 5;

const SKIN = "#f0c8a0";
const SKIN_SHADOW = "#d4a878";
const EYE = "#1a1a2e";
const MOUTH = "#c06040";

function getPixelColor(pixel: Pixel, accentColor: string): string | null {
  switch (pixel) {
    case 0: return null;
    case 1: return SKIN;
    case 2: return accentColor;
    case 3: return EYE;
    case 4: return MOUTH;
    case 5: return SKIN_SHADOW;
    default: return null;
  }
}

const AVATAR_SPRITES: Record<AvatarType, Pixel[][]> = {
  warrior: [
    // Horned helmet, strong jawline
    [0,2,2,2,2,2,2,0],
    [2,2,2,2,2,2,2,2],
    [0,2,2,2,2,2,2,0],
    [0,1,1,1,1,1,1,0],
    [0,1,3,1,1,3,1,0],
    [0,1,1,1,1,1,1,0],
    [0,5,1,4,4,1,5,0],
    [0,0,5,5,5,5,0,0],
  ],
  mage: [
    // Pointed wizard hat, mystical
    [0,0,0,2,2,0,0,0],
    [0,0,2,2,2,2,0,0],
    [0,2,2,2,2,2,2,0],
    [0,1,1,1,1,1,1,0],
    [0,1,3,1,1,3,1,0],
    [0,1,1,1,1,1,1,0],
    [0,5,1,4,4,1,5,0],
    [0,0,1,1,1,1,0,0],
  ],
  ranger: [
    // Hood, sharp eyes
    [0,2,2,2,2,2,2,0],
    [2,2,2,2,2,2,2,2],
    [2,2,1,1,1,1,2,2],
    [0,1,1,1,1,1,1,0],
    [0,1,3,1,1,3,1,0],
    [0,1,1,5,5,1,1,0],
    [0,0,1,4,4,1,0,0],
    [0,0,5,1,1,5,0,0],
  ],
  healer: [
    // Halo/circlet, gentle face
    [0,0,2,2,2,2,0,0],
    [0,2,0,0,0,0,2,0],
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [0,1,3,1,1,3,1,0],
    [0,1,1,1,1,1,1,0],
    [0,5,1,4,4,1,5,0],
    [0,0,1,1,1,1,0,0],
  ],
  rogue: [
    // Mask across eyes, spiky hair
    [0,2,0,2,2,0,2,0],
    [0,2,2,2,2,2,2,0],
    [0,0,2,2,2,2,0,0],
    [0,1,1,1,1,1,1,0],
    [2,2,3,2,2,3,2,2],
    [0,1,1,1,1,1,1,0],
    [0,5,1,4,4,1,5,0],
    [0,0,5,1,1,5,0,0],
  ],
  sage: [
    // Flat cap, long beard detail
    [0,2,2,2,2,2,2,0],
    [2,2,2,2,2,2,2,2],
    [0,1,1,1,1,1,1,0],
    [0,1,3,1,1,3,1,0],
    [0,1,1,1,1,1,1,0],
    [0,5,1,1,1,1,5,0],
    [0,0,5,4,4,5,0,0],
    [0,0,0,5,5,0,0,0],
  ],
};

export default function PixelAvatar({ type, color, size = 4 }: PixelAvatarProps) {
  const sprite = AVATAR_SPRITES[type];
  const w = 8;
  const h = 8;
  const totalSize = w * size;

  return (
    <div
      className="pixel-avatar"
      style={{
        width: totalSize,
        height: totalSize,
        display: "grid",
        gridTemplateColumns: `repeat(${w}, ${size}px)`,
        gridTemplateRows: `repeat(${h}, ${size}px)`,
        gap: 0,
        imageRendering: "pixelated",
        borderRadius: 2,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {sprite.flat().map((cell, i) => {
        const c = getPixelColor(cell, color);
        return (
          <div
            key={i}
            style={{
              width: size,
              height: size,
              backgroundColor: c ?? "transparent",
            }}
          />
        );
      })}
    </div>
  );
}
