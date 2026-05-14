const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#nav');
const header = document.querySelector('.site-header');
const themeToggle = document.querySelector('#themeToggle');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  const icon = menuBtn.querySelector('i');
  icon.className = nav.classList.contains('open') ? 'ri-close-line' : 'ri-menu-3-line';
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.querySelector('i').className = 'ri-menu-3-line';
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Theme toggle
const savedTheme = localStorage.getItem('eventor-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.querySelector('i').className = 'ri-sun-line';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeToggle.querySelector('i').className = isLight ? 'ri-sun-line' : 'ri-moon-line';
  localStorage.setItem('eventor-theme', isLight ? 'light' : 'dark');
});

// Countdown: always shows a future event date for practice.
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 45);
targetDate.setHours(12, 30, 42, 0);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.querySelector('#days').textContent = String(days).padStart(2, '0');
  document.querySelector('#hours').textContent = String(hours).padStart(2, '0');
  document.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');
  document.querySelector('#seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Schedule filter
const tabButtons = document.querySelectorAll('.tab-btn');
const scheduleItems = document.querySelectorAll('.schedule-item');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const day = button.dataset.day;
    scheduleItems.forEach((item) => {
      const showItem = day === 'all' || item.dataset.day === day;
      item.classList.toggle('hide', !showItem);
    });
  });
});

// Active nav link while scrolling
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

function setActiveLink() {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();
