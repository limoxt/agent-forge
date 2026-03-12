"use client";

import { AvatarType } from "@/lib/rpg";

interface PixelAvatarProps {
  type: AvatarType;
  color: string;
  size?: number;
}

// 12x12 face-only pixel avatars
// 0=transparent, 1=skin, 2=hair/helmet(accent), 3=eye, 4=mouth,
// 5=skin shadow, 6=hair highlight, 7=eye white, 8=accessory detail
type Pixel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const SKIN = "#f0c8a0";
const SKIN_SHADOW = "#c8a078";
const SKIN_LIGHT = "#f8dcc0";
const EYE = "#1a1a2e";
const EYE_WHITE = "#e8e8e8";
const MOUTH = "#c06048";

function getPixelColor(pixel: Pixel, accent: string, accentLight: string): string | null {
  switch (pixel) {
    case 0: return null;
    case 1: return SKIN;
    case 2: return accent;
    case 3: return EYE;
    case 4: return MOUTH;
    case 5: return SKIN_SHADOW;
    case 6: return accentLight;
    case 7: return EYE_WHITE;
    case 8: return SKIN_LIGHT;
    default: return null;
  }
}

// Lighten a hex color for highlights
function lighten(hex: string): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 50);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + 50);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + 50);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

const AVATAR_SPRITES: Record<AvatarType, Pixel[][]> = {
  warrior: [
    // Horned helmet with visor
    [0,0,0,2,2,2,2,2,2,0,0,0],
    [0,0,2,6,6,2,2,6,6,2,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,2,6,2,2,2,2,6,2,2,0],
    [0,0,2,2,2,2,2,2,2,2,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,7,3,1,1,7,3,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,8,8,1,1,1,1,0],
    [0,5,1,1,4,4,4,4,1,1,5,0],
    [0,0,5,5,1,1,1,1,5,5,0,0],
    [0,0,0,5,5,5,5,5,5,0,0,0],
  ],
  mage: [
    // Tall pointed wizard hat
    [0,0,0,0,0,2,2,0,0,0,0,0],
    [0,0,0,0,2,6,6,2,0,0,0,0],
    [0,0,0,2,2,6,6,2,2,0,0,0],
    [0,0,2,2,2,2,2,2,2,2,0,0],
    [0,2,6,2,2,2,2,2,2,6,2,0],
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,1,7,3,1,1,7,3,1,0,0],
    [0,0,1,1,1,8,8,1,1,1,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,0,5,1,1,4,4,1,1,5,0,0],
    [0,0,0,5,1,1,1,1,5,0,0,0],
    [0,0,0,0,5,5,5,5,0,0,0,0],
  ],
  ranger: [
    // Hood pulled forward, sharp look
    [0,0,2,2,2,2,2,2,2,2,0,0],
    [0,2,2,6,6,2,2,6,6,2,2,0],
    [2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,1,1,1,1,1,1,1,1,2,2],
    [2,1,1,1,1,1,1,1,1,1,1,2],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,7,3,1,1,1,1,7,3,1,0],
    [0,1,1,1,1,8,8,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,5,1,1,1,4,4,1,1,1,5,0],
    [0,0,5,5,1,1,1,1,5,5,0,0],
    [0,0,0,5,5,5,5,5,5,0,0,0],
  ],
  healer: [
    // Glowing halo/circlet, gentle face
    [0,0,0,2,6,6,6,6,2,0,0,0],
    [0,0,2,6,0,0,0,0,6,2,0,0],
    [0,0,2,0,0,0,0,0,0,2,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,8,1,1,8,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,7,3,1,1,1,1,7,3,1,0],
    [0,1,1,1,1,8,8,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,5,1,1,1,4,4,1,1,1,5,0],
    [0,0,5,1,1,1,1,1,1,5,0,0],
    [0,0,0,5,5,5,5,5,5,0,0,0],
  ],
  rogue: [
    // Spiky hair + mask across eyes
    [0,0,2,0,2,0,0,2,0,2,0,0],
    [0,0,2,2,2,2,2,2,2,2,0,0],
    [0,2,6,2,6,2,2,6,2,6,2,0],
    [0,0,2,2,2,2,2,2,2,2,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,2,2,7,3,2,2,7,3,2,2,0],
    [0,1,1,1,1,8,8,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,5,1,1,1,4,4,1,1,1,5,0],
    [0,0,5,1,1,1,1,1,1,5,0,0],
    [0,0,0,5,5,5,5,5,5,0,0,0],
  ],
  sage: [
    // Flat wide cap + long beard
    [0,0,2,2,2,2,2,2,2,2,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,0],
    [2,2,6,6,6,6,6,6,6,6,2,2],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,7,3,1,1,1,1,7,3,1,0],
    [0,1,1,1,1,8,8,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,5,8,8,1,4,4,1,8,8,5,0],
    [0,0,5,8,8,1,1,8,8,5,0,0],
    [0,0,0,5,8,8,8,8,5,0,0,0],
    [0,0,0,0,5,5,5,5,0,0,0,0],
  ],
};

export default function PixelAvatar({ type, color, size = 3 }: PixelAvatarProps) {
  const sprite = AVATAR_SPRITES[type];
  const accentLight = lighten(color);
  const w = 12;
  const h = 12;
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
        const c = getPixelColor(cell, color, accentLight);
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
