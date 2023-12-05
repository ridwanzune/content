// // script.js
// document.addEventListener("DOMContentLoaded", function () {
//   const logoContainer = document.getElementById("logoContainer");
//   const logos = logoContainer.querySelectorAll('img');

//   let distance = 0;
//   let speed = 1; // Adjust the speed as needed (higher values make it faster)

//   function animateLogos() {
//       logos.forEach((logo) => {
//           logo.style.transform = `translateX(${distance}px)`;
//       });

//       distance -= speed;

//       if (distance <= -170) {
//           distance = logoContainer.offsetWidth;
//           logoContainer.appendChild(logos[0]);
//       }

//       requestAnimationFrame(animateLogos);
//   }

//   animateLogos();
// });


// Helper function to debounce scroll event
function debounce(func, wait) {
	let timeout;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(context, args);
		}, wait);
	};
}

// Detect scroll event with debounce
window.addEventListener(
	"scroll",
	debounce(function () {
		// Get the projects div and calculate the scroll percentage
		var projectsDiv = document.querySelector(".image-container");
		var rotateImg = document.querySelector(".rotating-image");
		var scrollPercentage =
			(window.scrollY /
				(document.documentElement.scrollHeight - window.innerHeight)) *
			100;

		// Calculate the offset for the images
		var offset = -scrollPercentage * 50; // Adjust the factor as needed

		// Apply the offset to the images with smooth scrolling
		projectsDiv.style.transform = `translateX(${offset}px)`;

		// Calculate the rotation angle based on the scroll position
		var rotationSpeedFactor = 0.01; // Adjust this value to control rotation speed
		var rotationAngle = scrollPercentage * 360 * rotationSpeedFactor;

		// Apply rotation to the image
		rotateImg.style.transform = `rotate(${rotationAngle}deg)`;
	}, 10)
);

// Debounce function to limit the frequency of scroll event handling
function debounce(func, wait) {
	var timeout;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(func, wait);
	};
}

// Adjust .projects div width to match total width of images
window.addEventListener("load", function () {
	var projectsDiv = document.querySelector(".projects");
	var images = projectsDiv.querySelectorAll("img");
	var totalWidth = 0;

	images.forEach(function (img) {
		totalWidth += img.offsetWidth + 20; // Account for margin-right
	});

	projectsDiv.style.width = totalWidth + "px";
});

//scroll and reveal
const elementsToReveal = document.querySelectorAll(".content");

function revealOnScroll() {
	elementsToReveal.forEach((element) => {
		const elementTop = element.getBoundingClientRect().top;
		const windowHeight = window.innerHeight;

		if (elementTop - windowHeight <= 0) {
			element.style.opacity = 1;
			element.style.transform = "translateY(0px)";
		}
	});
}

window.addEventListener("scroll", revealOnScroll);
// Initial reveal in case elements are already visible on page load
revealOnScroll();

window.addEventListener("load", function () {
	var navbar = document.querySelector(".navbar");

	// Apply the entrance animation
	navbar.style.opacity = 0;
	navbar.style.transform = "translateX(-50%) translateY(20px)";

	setTimeout(function () {
		navbar.style.transition = "opacity 1s ease, transform 0.5s ease";
		navbar.style.opacity = 1;
		navbar.style.transform = "translateX(-50%) translateY(0)";
	}, 1000); // No delay, animation starts immediately
});

// Function to check if an element is in the viewport
function isElementInViewport(element) {
	var rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	);
}

window.addEventListener("scroll", function () {
	var navbar = document.querySelector(".column");

	if (isElementInViewport(navbar)) {
		// Apply the entrance animation
		navbar.style.opacity = 0;
		navbar.style.transform = "translateY(40px)";

		setTimeout(function () {
			navbar.style.transition = "opacity 1s ease, transform 1s ease";
			navbar.style.opacity = 1;
			navbar.style.transform = "translateY(0)";
		}, 0); // No delay, animation starts immediately
	}
});
window.addEventListener("scroll", function () {
	var navbar = document.querySelector(".row");

	if (isElementInViewport(navbar)) {
		// Apply the entrance animation
		navbar.style.opacity = 0;
		navbar.style.transform = "translateY(50px)";

		setTimeout(function () {
			navbar.style.transition = "opacity 1s ease, transform 1s ease";
			navbar.style.opacity = 1;
			navbar.style.transform = "translateY(0)";
		}, 0); // No delay, animation starts immediately
	}
});
window.addEventListener("scroll", function () {
	var navbar = document.querySelector(".pink-column");

	if (isElementInViewport(navbar)) {
		// Apply the entrance animation
		navbar.style.opacity = 0;
		navbar.style.transform = "translateY(50px)";

		setTimeout(function () {
			navbar.style.transition = "opacity 1s ease, transform 1s ease";
			navbar.style.opacity = 1;
			navbar.style.transform = "translateY(0)";
		}, 0); // No delay, animation starts immediately
	}
});
window.addEventListener("scroll", function () {
	var navbar = document.querySelector(".blue-container");

	if (isElementInViewport(navbar)) {
		// Apply the entrance animation
		navbar.style.opacity = 0;
		navbar.style.transform = "translateY(50px)";

		setTimeout(function () {
			navbar.style.transition = "opacity 1s ease, transform 1s ease";
			navbar.style.opacity = 1;
			navbar.style.transform = "translateY(0)";
		}, 0); // No delay, animation starts immediately
	}
});
window.addEventListener("scroll", function () {
	var navbar = document.querySelector(".h1-column");

	if (isElementInViewport(navbar)) {
		// Apply the entrance animation
		navbar.style.opacity = 0;
		navbar.style.transform = "translateY(50px)";

		setTimeout(function () {
			navbar.style.transition = "opacity 1s ease, transform 1s ease";
			navbar.style.opacity = 1;
			navbar.style.transform = "translateY(0)";
		}, 0); // No delay, animation starts immediately
	}
});

window.addEventListener("scroll", function () {
	var navbar = document.querySelector(".six-grid");

	if (isElementInViewport(navbar)) {
		// Apply the entrance animation
		navbar.style.opacity = 0;
		navbar.style.transform = "translateY(20px)";

		setTimeout(function () {
			navbar.style.transition = "opacity 1s ease, transform 1s ease";
			navbar.style.opacity = 1;
			navbar.style.transform = "translateY(0)";
		}, 0);
	}
});

window.addEventListener("scroll", function () {
	var navbar = document.querySelector(".recent-works img");

	if (isElementInViewport(navbar)) {
		// Apply the entrance animation
		navbar.style.opacity = 1;
		navbar.style.transform = "translateY(-50px)";

		setTimeout(function () {
			navbar.style.transition = "opacity 1s ease, transform 1s ease";
			navbar.style.opacity = 1;
			navbar.style.transform = "translateY(0)";
		}, 0);
	}
});
window.addEventListener("scroll", function () {
	var navbar = document.querySelector(".recent-works h1");

	if (isElementInViewport(navbar)) {
		// Apply the entrance animation
		navbar.style.opacity = 1;
		navbar.style.transform = "translateY(20px)";

		setTimeout(function () {
			navbar.style.transition = "opacity 1s ease, transform 2s ease";
			navbar.style.opacity = 1;
			navbar.style.transform = "translateY(0)";
		}, 100);
	}
});
window.addEventListener("scroll", function () {
	var navbar = document.querySelector(".projects-grid ");

	if (isElementInViewport(navbar)) {
		// Apply the entrance animation
		navbar.style.opacity = 1;
		navbar.style.transform = "translateY(50px)";

		setTimeout(function () {
			navbar.style.transition = "opacity 1s ease, transform 1s ease";
			navbar.style.opacity = 1;
			navbar.style.transform = "translateY(0)";
		}, 50);
	}
});

// window.addEventListener('scroll', function() {
//   var navbar = document.querySelector('.recent-works-img-top-right');

//   if (isElementInViewport(navbar)) {
//     // Apply the entrance animation
//     navbar.style.opacity = 1;
//     navbar.style.transform = 'translateX(60px)';

//     setTimeout(function() {
//       navbar.style.transition = 'opacity 1s ease, transform 2s ease';
//       navbar.style.opacity = 1;
//       navbar.style.transform = 'translateX(0)';
//     }, 100);
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
	const toggleButtons = document.querySelectorAll(".toggle-btn");

	toggleButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const answer = this.parentElement.nextElementSibling;

			if (answer.style.maxHeight) {
				answer.style.maxHeight = null;
				this.textContent = "▼";
			} else {
				answer.style.maxHeight = answer.scrollHeight + "px";
				this.textContent = "▲";
			}
		});
	});
});

document
	.getElementById("openModalButton")
	.addEventListener("click", function () {
		document.getElementById("modalOverlay").style.display = "flex";
	});

// Close the modal when the overlay is clicked
document
	.getElementById("modalOverlay")
	.addEventListener("click", function (event) {
		if (event.target === this) {
			this.style.display = "none";
		}
	});
document
	.getElementById("openModalButton2")
	.addEventListener("click", function () {
		document.getElementById("modalOverlay").style.display = "flex";
	});

// Close the modal when the overlay is clicked
document
	.getElementById("modalOverlay")
	.addEventListener("click", function (event) {
		if (event.target === this) {
			this.style.display = "none";
		}
	});
document
	.getElementById("openModalButton3")
	.addEventListener("click", function () {
		document.getElementById("modalOverlay").style.display = "flex";
	});

// Close the modal when the overlay is clicked
document
	.getElementById("modalOverlay")
	.addEventListener("click", function (event) {
		if (event.target === this) {
			this.style.display = "none";
		}
	});
document
	.getElementById("openModalButton4")
	.addEventListener("click", function () {
		document.getElementById("modalOverlay").style.display = "flex";
	});

// Close the modal when the overlay is clicked
document
	.getElementById("modalOverlay")
	.addEventListener("click", function (event) {
		if (event.target === this) {
			this.style.display = "none";
		}
	});
document
	.getElementById("openModalButton5")
	.addEventListener("click", function () {
		document.getElementById("modalOverlay").style.display = "flex";
	});

// Close the modal when the overlay is clicked
document
	.getElementById("modalOverlay")
	.addEventListener("click", function (event) {
		if (event.target === this) {
			this.style.display = "none";
		}
	});


//************EDITED************EDITED*************EDITED***********//
//************EDITED************EDITED*************EDITED***********//


//Navbar Show/Hide
var menu = document.getElementById("menu"),
	navBar = document.getElementById("navbar-mobile");
menu.addEventListener("click", () => {
	navBar.classList.toggle("navbar-show");
});

//Price Cancel Button
var priceCancelBtn = document.getElementById("price-pop-up-cancel"),
	priceOverlay = document.getElementById("modalOverlay");
priceCancelBtn.addEventListener("click", () => {
	priceOverlay.style.display = "none";
});

//Close Menubar when Navbar links are clicked
var menuLinks = document.querySelectorAll(".navbar-mobile li");
menuLinks.forEach((menuLink) => {
	menuLink.addEventListener("click", () => {
		navBar.classList.toggle("navbar-show");
	});
});

//Display CALL TO ACTION onclick *Mobile* Price Grid Buttons
document
.getElementById("openModalButton6")
.addEventListener("click", function () {
  document.getElementById("modalOverlay").style.display = "flex";
});

document
.getElementById("openModalButton7")
.addEventListener("click", function () {
  document.getElementById("modalOverlay").style.display = "flex";
});