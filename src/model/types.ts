export type Deck = {
  title: string;
  slides: React.ComponentType[];
  breakoutSlide?: React.ComponentType;
};
