export type SlideComponent = React.ComponentType & {
  /** Hide the progress indicator and footer for this slide (e.g. a title). */
  hideChrome?: boolean;
};

export type Deck = {
  title: string;
  slides: SlideComponent[];
  breakoutSlide?: React.ComponentType;
};
