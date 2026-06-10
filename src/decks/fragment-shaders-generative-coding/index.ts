import type { Deck } from "../../model/types";
import { Title } from "./title";
import { GenerativeCoding } from "./generative-coding";
import { HappyLittleTrees } from "./happy-little-trees";
import { WhatIsAShader } from "./what-is-a-shader";
import { PrintingPress } from "./printing-press";
import { ShaderRules } from "./shader-rules";
import { IAmAPixel } from "./i-am-a-pixel";
import { Sinelines } from "./sinelines";
import { DrawingARectangle } from "./drawing-a-rectangle";
import { AddingMovement } from "./adding-movement";
import { PuttingItAllTogether } from "./putting-it-all-together";
import { ResourcesAndEnd } from "./resources-and-end";
import { Questions } from "./questions";
import { ShaderShowcase } from "./shaderShowcase";
import { Noise } from "./noise";
import { TruchetTiles } from "./truchet-tiles";
import { Voronoi } from "./voronoi";

export const deck: Deck = {
  title: "Fragment Shaders & Generative Art",
  slides: [
    ShaderShowcase,
    Title,
    GenerativeCoding,
    HappyLittleTrees,
    WhatIsAShader,
    PrintingPress,
    ShaderRules,
    IAmAPixel,
    Sinelines,
    DrawingARectangle,
    AddingMovement,
    PuttingItAllTogether,
    Noise,
    TruchetTiles,
    Voronoi,
    ResourcesAndEnd,
    Questions,
  ],
};
