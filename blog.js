window.addEventListener("load", function () {
  const cursorDot = document.querySelector(".cursor-dot");

  window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

  });
});



document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');

  fetch('jsons/blogs.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch blog data');
      }
      return response.json();
    })
    .then(data => {
      const blog = data.find(blog => blog.id === parseInt(blogId));

      // Set blog image
      const blogImageElement = document.querySelector('.home img');
      blogImageElement.src = blog.image;
      blogImageElement.alt = blog.title;

      // Set blog title
      const blogTitleElement = document.querySelector('.overlay .title');
      blogTitleElement.textContent = blog.title;

      // Add link to section title in subject list
      const subjectList = document.querySelector('.subject_list');

      // Clear existing items in the subject list
      subjectList.innerHTML = '';

      // Loop through each section in the blog data
      blog.sections.forEach((section, index) => {
        // Create a list item element
        const listItem = document.createElement('li');
        // Add the class "item" to the list item
        listItem.classList.add('item');

        // Create an anchor element for the link
        const link = document.createElement('a');
        // Set the href attribute of the anchor element to link to the corresponding section
        link.href = `#subject-${index + 1}`;
        // Set the text content of the anchor element to the section title
        link.textContent = section.title;

        // Append the anchor element to the list item
        listItem.appendChild(link);

        // Append the list item to the subject list
        subjectList.appendChild(listItem);
      });

      // Populate sections
      const subjectSections = document.querySelector('.subject_sections');
      subjectSections.innerHTML = ''; // Clear existing sections

      blog.sections.forEach((section, index) => {
        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = section.title;
        const sectionContent = document.createElement('p');

        // Replace \n with <br> for line breaks
        const contentWithLineBreaks = section.content.replace(/\n/g, '<br>');
        sectionContent.innerHTML = contentWithLineBreaks;

        // Create section container
        const sectionContainer = document.createElement('div');
        sectionContainer.classList.add('section-container');
        sectionContainer.id = `subject-${index + 1}`;
        sectionContainer.appendChild(sectionTitle);
        sectionContainer.appendChild(sectionContent);
        if (section.link) {
          const link = document.createElement('a');
          link.href = section.link;
          link.textContent = 'Click to visit';
          link.target = '_blank'; // Open link in a new window
          link.style.textDecoration = 'none'; // Remove underline
          link.style.fontSize = '15px'; // Set font size to 20px
          link.style.color = 'blue'; // Set text color to blue
          link.style.fontWeight = '500'; // Set font weight to 500
          link.style.color = 'orange'; // Set font weight to 500
          sectionContainer.appendChild(link);
        }
        // Conditionally add image if it exists
        if (section.image) {
          const sectionImage = document.createElement('img');
          sectionImage.src = section.image;
          sectionImage.alt = section.title;
          sectionImage.style.marginTop = '50px';
          sectionContainer.appendChild(sectionImage);
        }
        subjectSections.appendChild(sectionContainer);
      });

    })
    .catch(error => {
      console.error('Error fetching blog data:', error);
      // Display an error message to the user
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Failed to load blog data. Please try again later.';
      document.body.appendChild(errorMessage);
    });
});





// For Modal
document.addEventListener("DOMContentLoaded", function () {
  const burgerOpenElements = document.querySelectorAll("#burger-open");

  burgerOpenElements.forEach(function (element) {
    element.addEventListener("click", function () {
      const meny = document.getElementById("meny");
      meny.classList.toggle("open");
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const closeBtn = document.getElementById("burger-close");
  const meny = document.getElementById("meny");

  closeBtn.addEventListener("click", function () {
    meny.classList.remove("open");
  });
});

// Email Form

function sendMail() {
  var email = document.getElementById("email_id").value;
  var message = document.getElementById("message").value;

  // Simple form validation
  if (!email.trim() || !message.trim()) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill out both email and message fields.',
    });
    return;
  }

  var params = {
    email_id: email,
    message: message
  };

  emailjs.send("service_46rv23h", "template_3s6151r", params)
    .then(function (res) {
      if (res.status === 200) {
        // Clear the input fields
        document.getElementById("email_id").value = "";
        document.getElementById("message").value = "";

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Thank you for contacting. We will get back to you soon',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while sending your message. Please try again later.',
        });
      }
    })
    .catch(function (error) {
      console.error('Error sending email:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while sending your message. Please try again later.',
      });
    });
}


document.addEventListener("DOMContentLoaded", function () {
  fetch('jsons/blogs.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(blog => {
        const card = document.getElementById(`right-blog-${blog.id}`);
        const imageElement = card.querySelector('img');
        const titleElement = document.getElementById(`title-right-blog-${blog.id}`);

        titleElement.innerHTML = `<a href="blog.html?id=${blog.id}">${blog.title}</a>`;
        imageElement.src = blog.image;
        imageElement.alt = blog.title;

        // Add event listener to blog card
        card.addEventListener('click', function () {
          // Redirect user to single blog page with blog ID as query parameter
          window.location.href = `blog.html?id=${blog.id}`;
        });
      });
    })
    .catch(error => console.error('Error fetching blog data:', error));
});
