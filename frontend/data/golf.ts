export type GolfDetail = {
  description: string;
  image: string;
  nightImage: string;
  label: string;
  number: string;
};

export type GolfShaftColor = {
  description: string;
  image: string;
  label: string;
  swatch: string;
  tone: "dark" | "light";
};

export const golfDetails: GolfDetail[] = [
  {
    description: "Golf ball inspired texture with a sculpted, dimensional surface.",
    image: "/images/golf/golf-day-detail-ball.jpg",
    label: "BALL TEXTURE",
    nightImage: "/images/golf/golf-night-detail-ball.jpg",
    number: "01"
  },
  {
    description: "Club face grooves translated into a polished jewelry-scale form.",
    image: "/images/golf/golf-day-detail-face.jpg",
    label: "CLUB FACE",
    nightImage: "/images/golf/golf-night-detail-face.jpg",
    number: "02"
  },
  {
    description: "Precise lines keep the silhouette sharp from every angle.",
    image: "/images/golf/golf-day-detail-line.jpg",
    label: "PRECISE LINE",
    nightImage: "/images/golf/golf-night-detail-line.jpg",
    number: "03"
  },
  {
    description: "A soft curve around the wrist keeps the piece refined and wearable.",
    image: "/images/golf/golf-day-detail-curve.jpg",
    label: "PERFECT CURVE",
    nightImage: "/images/golf/golf-night-detail-curve.jpg",
    number: "04"
  }
];

export const golfShaftColors: GolfShaftColor[] = [
  {
    description: "Deep black brings quiet strength and contrast.",
    image: "/images/golf/golf-day-shaft-black.jpg",
    label: "BLACK",
    swatch: "#0b0b0d",
    tone: "dark"
  },
  {
    description: "White keeps the bracelet crisp, clean, and light.",
    image: "/images/golf/golf-day-shaft-white.jpg",
    label: "WHITE",
    swatch: "#f4f1ec",
    tone: "light"
  },
  {
    description: "Burgundy adds depth with a refined sporting mood.",
    image: "/images/golf/golf-day-shaft-burgundy.jpg",
    label: "BURGUNDY",
    swatch: "#601426",
    tone: "dark"
  },
  {
    description: "Navy carries a classic club-house elegance.",
    image: "/images/golf/golf-day-shaft-navy.jpg",
    label: "NAVY",
    swatch: "#0a2348",
    tone: "dark"
  }
];

export const golfPackagingNotes = [
  "Signature emboss",
  "Premium interior",
  "Thoughtful detail",
  "Branded card"
];
