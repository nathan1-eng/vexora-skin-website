/** Vexora Skin's single continuous product-film journey. */
import { createElement } from "react";
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#D8B77A",
  background: "#19080F",
  ink: "#F7F3EF",
  muted: "#D2C3C4",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    body: "Meet the Vexora Skin LED Light Therapy Mask, designed to bring a considered beauty ritual into your own space.",
    clip: "/assets/world/vexora-hero.mp4",
    id: "glow",
    kicker: "VEXORA SKIN",
    label: "The glow",
    mobileClip: "/assets/world/vexora-hero-mobile.mp4",
    mobilePoster: "/assets/world/vexora-hero-mobile-poster.png",
    poster: "/assets/world/vexora-hero-poster.png",
    tags: ["At-home skincare", "Red LED light"],
    title: "Glow With Confidence",
    scroll: 1.3,
    linger: 0.12,
    objectPosition: "50% 50%",
    mobileObjectPosition: "50% 50%",
    actions: createElement("a", { className: "hero-chapter-link", href: "#shop" }, "Shop the mask ", createElement("span", { "aria-hidden": true }, "↗")),
  },
];
