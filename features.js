import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function initFeatures(element) {
    if (!element) return;

    const pin = element.querySelectorAll(".features-pin");
    const progress = element.querySelector(".progress");
    const progressRect = progress.getBoundingClientRect();
    const panels = element.querySelectorAll(".panel");
    const media = element.querySelectorAll(".media-wrap img:not(:first-child), .media-wrap video:not(:first-child)");
    const lazyVideos = element.querySelectorAll("video[data-src]");
    const lists = element.querySelectorAll(".benefit ul");
    const contents = element.querySelectorAll(".heading, .benefit");
    const contentRects = Array.from(contents).map((el) => {
        return el.getBoundingClientRect();
    });
    const scrollTriggers = element.querySelectorAll("[data-scroll-target]");

    ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => {
            lazyVideos.forEach((el) => {
                if (!el.src) {
                    el.src = el.dataset.src;
                }
            });
        },
    });

    let matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1200px) and (min-height: 768px)", () => {
        gsap.set(
            media,
            {
                yPercent: 100,
                scale: 1.5,
            },
            0
        );

        gsap.set(
            lists,
            {
                height: 0,
            },
            0
        );

        const contentHeadings = element.querySelectorAll(".features-content h1, .features-content h2");
        const contentHeadingRects = Array.from(contentHeadings).map((el) => {
            return el.getBoundingClientRect();
        });

        const timeline = gsap.timeline({
            paused: true,
        });

        timeline.set(
            progress,
            {
                scaleY: contentRects[0].height / 100,
            },
            0
        );

        panels.forEach((el, i) => {
            const label = el.id;
            timeline.addLabel(label, i);

            // Skip the last panel
            if (i === panels.length - 1) {
                return;
            }

            timeline.to(
                media[i],
                {
                    yPercent: 0,
                    scale: 1,
                    ease: "none",
                    duration: 1,
                },
                i
            );

            if (i > 0) {
                timeline.to(
                    lists[i - 1],
                    {
                        height: 0,
                        ease: "none",
                        duration: 0.5,
                    },
                    i
                );
            }

            timeline.to(
                lists[i],
                {
                    height: "auto",
                    ease: "none",
                    duration: 0.5,
                },
                i
            );

            timeline.to(
                progress,
                {
                    y: () => {
                        return contentHeadingRects[i + 1].y - progressRect.y + 10;
                    },
                    scaleY: () => {
                        return contentRects[i + 1].height / 100;
                    },
                    ease: "power2.out",
                    duration: 1,
                },
                i
            );
        });

        const snap = gsap.utils.snap(1 / (panels.length - 1));

        const scrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: "top top",
                end: "bottom bottom",
                pin: pin,
                scrub: true,
                onUpdate: (self) => {
                    const snappedProgress = snap(self.progress);

                    gsap.to(timeline, {
                        progress: snappedProgress,
                        duration: 1,
                        ease: "power2.out",
                    });
                },
            },
        });

        scrollTimeline.to(
            { progress: 0 },
            {
                progress: 1,
                duration: panels.length - 1,
            }
        );

        panels.forEach((el, i) => {
            const label = el.id;
            scrollTimeline.addLabel(label, i);
        });

        scrollTimeline.duration(panels.length);

        // Add click handlers to scroll timeline from [data-scroll-target] to associated timeline label
        scrollTriggers.forEach((el) => {
            el.addEventListener("click", () => {
                const target = el.dataset.scrollTarget;

                gsap.to(window, {
                    scrollTo: {
                        y: scrollTimeline.scrollTrigger.labelToScroll(target),
                        duration: 1,
                        ease: "power2.out",
                        autoKill: true,
                    },
                });
            });
        });
    });
}
