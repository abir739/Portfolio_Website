document.addEventListener("DOMContentLoaded", function () {
  const aboutButtons = document.querySelectorAll('.about-btn button');
  const contents = document.querySelectorAll('.content');

  aboutButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
          aboutButtons.forEach(button => button.classList.remove('active'));
          btn.classList.add('active');
          contents.forEach(content => content.classList.remove('active'));
          contents[idx].classList.add('active');
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  var options = {
      strings: ["Frontend Developer 🚀", "Flutter Developer", "Web Developer"],
      // strings: ["Frontend Developer 🚀"],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true
  };

  var typed = new Typed("#animated-text", options);
});