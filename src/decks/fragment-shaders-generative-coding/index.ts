import type { Deck } from "../../model/types";
import { Title } from "./title";
import { WhatIsAShader } from "./what-is-a-shader";
import { VertexVsFragment } from "./vertex-vs-fragment";
import { WhyFragmentShaders } from "./why-fragment-shaders";
import { TwoMindShifts } from "./two-mind-shifts";
import { GenerativeDoodling } from "./generative-doodling";
import { TruchetTiles } from "./truchet-tiles";
import { ProceduralCanvas } from "./procedural-canvas";
import { PixelQuestion } from "./pixel-question";
import { FirstShape } from "./first-shape";
import { SinelinesBefore } from "./sinelines-before";
import { SinelinesAfter } from "./sinelines-after";
import { WhyItFeelsWeird } from "./why-it-feels-weird";
import { ResourcesAndEnd } from "./resources-and-end";

export const deck: Deck = {
  title: "Fragment Shaders & Generative Coding",
  slides: [
    Title,
    WhatIsAShader,
    VertexVsFragment,
    WhyFragmentShaders,
    TwoMindShifts,
    GenerativeDoodling,
    TruchetTiles,
    ProceduralCanvas,
    PixelQuestion,
    FirstShape,
    SinelinesBefore,
    SinelinesAfter,
    WhyItFeelsWeird,
    ResourcesAndEnd,
  ],
};
