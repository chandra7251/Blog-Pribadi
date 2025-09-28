(function () {
  'use strict';

  const body = document.body;
  const THEME_KEY = 'theme';

  // -----------------------
  // THEME FUNCTIONS
  // -----------------------
  function setDarkMode(on) {
    if (on) body.classList.add('dark');
    else body.classList.remove('dark');
    document.querySelectorAll('.toggle-theme').forEach(btn => {
      btn.textContent = on ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function saveTheme(isDark) {
    try { localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); } catch(e){}
  }

  function loadTheme() {
    try {
      const t = localStorage.getItem(THEME_KEY);
      if (t === 'dark') return 'dark';
      if (t === 'light') return 'light';
    } catch(e){}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // -----------------------
  // INIT THEME BEFORE DOM
  // -----------------------
  const theme = loadTheme();
  setDarkMode(theme === 'dark');

  // -----------------------
  // DOM CONTENT LOADED
  // -----------------------
  document.addEventListener('DOMContentLoaded', () => {

    // Toggle theme button
    document.querySelectorAll('.toggle-theme').forEach(btn => {
      btn.setAttribute('role','switch');
      btn.setAttribute('aria-checked', theme === 'dark' ? 'true':'false');
      btn.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark');
        btn.setAttribute('aria-checked', isDark ? 'true':'false');
        setDarkMode(isDark);
        saveTheme(isDark);
      });
    });

    // Burger menu
    const burger = document.getElementById('burgerMenu');
    const navMenu = document.querySelector('.navbar ul');
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Smooth scroll for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
          e.preventDefault();
          target.scrollIntoView({ behavior:'smooth', block:'start' });
        }
      });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if(backToTop){
      window.addEventListener('scroll', () => {
        if(window.scrollY>300) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
      });
      backToTop.addEventListener('click', () => {
        window.scrollTo({top:0,behavior:'smooth'});
      });
    }

  });

})();
