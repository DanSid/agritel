

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${header.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });


//  Popup feature
document.addEventListener("DOMContentLoaded", function() {
  const carouselItems = document.querySelectorAll(".carousel-item");
  const statisticContainer = document.getElementById("statistic-container");
  const headlineElement = document.getElementById("headline");
  const statisticElement = document.getElementById("statistic");

  carouselItems.forEach(item => {
    item.addEventListener("click", function() {
      const headline = item.getAttribute("data-headline");
      const statistic = item.getAttribute("data-statistic");

      // Update content
      headlineElement.textContent = headline;
      statisticElement.textContent = statistic;

      // Display the statistic container
      statisticContainer.style.display = "block";

      // Position the container dynamically over the clicked item
      const rect = item.getBoundingClientRect();
      statisticContainer.style.top = `${rect.top + window.scrollY + rect.height / 2}px`;
      statisticContainer.style.left = `${rect.left + rect.width / 2}px`;
      statisticContainer.style.transform = "translate(-50%, -50%)";
    });
  });

  // Hide the statistic box when clicking outside of it
  document.addEventListener("click", function(event) {
    if (!statisticContainer.contains(event.target) && !event.target.closest(".carousel-item")) {
      statisticContainer.style.display = "none";
    }
  });
});



  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const swiperElements = document.querySelectorAll('.init-swiper');
    swiperElements.forEach(element => {
      const config = JSON.parse(element.querySelector('.swiper-config').textContent);
      new Swiper(element, config);
    });
  });
  


// Contact form
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  document.getElementById("loading").style.display = "block";
  document.getElementById("error-message").style.display = "none";
  document.getElementById("sent-message").style.display = "none";

  fetch("forms/contact.php", {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("loading").style.display = "none";
      if (data.status === "success") {
        document.getElementById("sent-message").style.display = "block";
        form.reset();
      } else {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("error-message").textContent = data.message;
      }
    })
    .catch(error => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("error-message").style.display = "block";
      document.getElementById("error-message").textContent = "An error occurred. Please try again.";
    });
});

// Sending mail
function sendMail(){
  let params={
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  }
  emailjs.send(("service_60h1ace", "template_pzu2oke", params).then(alert("Email Message sent successfully")))
}


  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();