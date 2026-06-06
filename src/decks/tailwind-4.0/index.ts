import { Tooling } from "./tooling";
import { Inhoud } from "./inhoud";
import { ContainerQueries } from "./container-queries";
import { ReviewCode } from "./review-code";
import { ProductCardSlide } from "./product-card-slide";
import { HtmlStructuurEnSemantiek } from "./html-structuur-en-semantiek";
import { CommonPitfalls } from "./common-pitfalls";
import { CnUtil } from "./cn-util";
import { AnimateDiscreteProperties } from "./animate-discrete-properties";
import { ProgressiveEnhancements } from "./progressive-enhancements";
import type { Deck } from "../../model/types";
import { Einde } from "./einde";

export const deck: Deck = {
  breakoutSlide: ReviewCode,
  slides: [
    Inhoud,
    ProductCardSlide,
    ReviewCode,
    Tooling,
    HtmlStructuurEnSemantiek,
    CommonPitfalls,
    CnUtil,
    ProgressiveEnhancements,
    ContainerQueries,
    AnimateDiscreteProperties,
    Einde,
  ],
};
