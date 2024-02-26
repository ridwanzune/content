// document.addEventListener("DOMContentLoaded", function() {
//     // Initialize Locomotive Scroll
//     const locoScroll = new LocomotiveScroll({
//         el: document.querySelector("#main"),
//         smooth: true
//     });

//     // Update ScrollTrigger to sync with Locomotive Scroll
//     locoScroll.on("scroll", ScrollTrigger.update);
//     ScrollTrigger.scrollerProxy("#main", {
//         scrollTop(value) {
//             return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//         },
//         getBoundingClientRect() {
//             return {
//                 top: 0,
//                 left: 0,
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//         },
//         pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
//     });

//     // Refresh ScrollTrigger and Locomotive Scroll after setup
//     ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
//     ScrollTrigger.refresh();

//     // Initialize other GSAP animations and ScrollTriggers here
// });




document.addEventListener("DOMContentLoaded", function() {
    const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)");
    const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)");

    gsap.set(photos, {yPercent: 101});

    const allPhotos = gsap.utils.toArray(".desktopPhoto");

    let mm = gsap.matchMedia();

    mm.add("(min-width: 600px)", () => {
        console.log("desktop");

        ScrollTrigger.create({
            trigger: ".gallery",
            start: "top top",
            end: "bottom bottom",
            pin: ".right"
        });

        details.forEach((detail, index) => {
            let headline = detail.querySelector("h1");
            let animation = gsap.timeline()
                .to(photos[index], {yPercent: 0})
                .set(allPhotos[index], {autoAlpha: 0});

            ScrollTrigger.create({
                trigger: headline,
                start: "top 60%",
                end: "top 25%",
                animation: animation,
                scrub: 2,
                markers: false
            });
        });

        return () => {
            console.log("mobile");
        };
    });
});
