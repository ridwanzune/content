document.addEventListener("DOMContentLoaded", function () {
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
});

window.addEventListener("load", function () {
	const cursorDot = document.querySelector(".cursor-dot");
	// const cursorOutline = document.querySelector(".cursor-outline");

	window.addEventListener("mousemove", function (e) {
		const posX = e.clientX;
		const posY = e.clientY;
		cursorDot.style.left = `${posX}px`;
		cursorDot.style.top = `${posY}px`;

		// const animation = cursorOutline.animate(
		// 	[
		// 		{ left: `${posX}px`, top: `${posY}px` }
		// 	],
		// 	{
		// 		duration: 500,
		// 		fill: "forwards"
		// 	}
		// );
		// animation.onfinish = function () {
		// };
	});
});
