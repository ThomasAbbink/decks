import type { Deck } from "../model/types";
import { deck as tailwind } from "./tailwind-4.0";
import { deck as showAndTell } from "./show-and-tell-2025-09-25";
import { deck as fragmentShaders } from "./fragment-shaders-generative-coding";

export type DeckEntry = {
  id: string;
  deck: Deck;
};

export const decks: DeckEntry[] = [
  { id: "fragment-shaders", deck: fragmentShaders },
  { id: "tailwind-4.0", deck: tailwind },
  { id: "show-and-tell", deck: showAndTell },
];

export const defaultDeckId = "fragment-shaders";

export const getDeckId = (): string => {
  const fromHash = window.location.hash.replace(/^#\/?/, "").trim();
  if (fromHash && decks.some((entry) => entry.id === fromHash)) {
    return fromHash;
  }
  return defaultDeckId;
};

export const getDeck = (id: string): Deck | undefined =>
  decks.find((entry) => entry.id === id)?.deck;
