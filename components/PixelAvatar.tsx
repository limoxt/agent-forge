"use client";

import { AvatarType } from "@/lib/rpg";

interface PixelAvatarProps {
  type: AvatarType;
  color: string;
  size?: number;
}

// Each avatar is a 7x9 grid where 1 = filled pixel
// Designed to look like tiny RPG character silhouettes
const AVATAR_SPRITES: Record<AvatarType, number[][]> = {
  warrior: [
    // Helmet with horns
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [1,1,1,1,1,1,1],
    [0,0,1,1,1,0,0],
    [0,1,1,0,1,1,0],
    [0,1,0,0,0,1,0],
  ],
  mage: [
    // Wizard hat
    [0,0,0,1,0,0,0],
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,0,1,0,1,0,0],
    [0,1,1,0,1,1,0],
  ],
  ranger: [
    // Hood with bow
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [1,0,1,1,1,0,1],
    [1,1,1,1,1,1,1],
    [1,0,1,1,1,0,0],
    [0,0,1,0,1,0,0],
    [0,0,1,0,1,0,0],
  ],
  healer: [
    // Halo + cross staff
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,0,1,0,1,0,0],
    [0,1,1,0,1,1,0],
  ],
  rogue: [
    // Mask + daggers
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,1,0,1,0,1,0],
    [0,0,1,1,1,0,0],
    [1,0,1,1,1,0,1],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,1,0,0,0,1,0],
    [0,1,0,0,0,1,0],
  ],
  sage: [
    // Long beard + book
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,0,1,0,1,0,0],
    [0,1,1,0,1,1,0],
  ],
};

export default function PixelAvatar({ type, color, size = 3 }: PixelAvatarProps) {
  const sprite = AVATAR_SPRITES[type];
  const w = sprite[0].length;
  const h = sprite.length;

  return (
    <div
      className="pixel-avatar"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${w}, ${size}px)`,
        gridTemplateRows: `repeat(${h}, ${size}px)`,
        gap: 0,
        imageRendering: "pixelated",
        filter: `drop-shadow(0 0 4px ${color}66)`,
      }}
    >
      {sprite.flat().map((cell, i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            backgroundColor: cell ? color : "transparent",
          }}
        />
      ))}
    </div>
  );
}
