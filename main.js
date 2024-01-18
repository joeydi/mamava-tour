import initHero from "./hero.js";
import initTour from "./tour.js";
import initFeatures from "./features.js";
import "./styles/main.scss";

initHero(document.querySelector("#hero"));
initTour(document.querySelector("#tour"));
initFeatures(document.querySelector("#features-section-1"));
initFeatures(document.querySelector("#features-section-2"));
