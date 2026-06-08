import type { Deck } from "../../model/types";
import { Title } from "./title";
import { GenerativeCoding } from "./generative-coding";
import { HappyLittleTrees } from "./happy-little-trees";
import { WhatIsAShader } from "./what-is-a-shader";
import { PrintingPress } from "./printing-press";
import { ShaderRules } from "./shader-rules";
import { VertexVsFragment } from "./vertex-vs-fragment";
import { IAmAPixel } from "./i-am-a-pixel";
import { Sinelines } from "./sinelines";

import { DrawingARectangle } from "./drawing-a-rectangle";
import { AddingMovement } from "./adding-movement";
import { PuttingItAllTogether } from "./putting-it-all-together";

import { ResourcesAndEnd } from "./resources-and-end";
import { Questions } from "./questions";

export const deck: Deck = {
  title: "Fragment Shaders & Generative Art",
  slides: [
    Title,
    GenerativeCoding,
    HappyLittleTrees,
    WhatIsAShader,
    PrintingPress,
    ShaderRules,
    VertexVsFragment,
    IAmAPixel,
    // up

    Sinelines,
    DrawingARectangle,
    AddingMovement,
    PuttingItAllTogether,

    ResourcesAndEnd,
    Questions,
  ],
};
