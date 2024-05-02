import initHero from "./hero.js";
import initTour from "./tour.js";
import initFeatures from "./features.js";
import initSpecs from "./specs.js";
import "./styles/main.scss";

document.addEventListener("DOMContentLoaded", () => {
    initHero(document.querySelector("#hero"));
    initTour(document.querySelector("#tour"));
    initFeatures(document.querySelector("#features-section-1"));
    initFeatures(document.querySelector("#features-section-2"));
    initSpecs(document.querySelector("#specs"));
});
