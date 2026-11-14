(()=>{
  const $ = (selector, root=document) => root.querySelector(selector);
  const nav = $('.main-nav');
  const menu = $('.menu-toggle');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }
  const theme = $('#themeToggle');
  if (theme) {
    try {
      if (localStorage.getItem('sada-theme') === 'dark') document.body.classList.add('dark-mode');
      theme.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('sada-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
      });
    } catch (_) {
      theme.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
    }
  }
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
  let fontSize = 17;
  $('#increaseText')?.addEventListener('click', () => {
    fontSize = Math.min(24, fontSize + 1);
    const article = $('.article-content');
    if (article) article.style.fontSize = fontSize + 'px';
  });
  $('#decreaseText')?.addEventListener('click', () => {
    fontSize = Math.max(14, fontSize - 1);
    const article = $('.article-content');
    if (article) article.style.fontSize = fontSize + 'px';
  });
  document.querySelectorAll('.evidence-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const panelId = button.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : button.nextElementSibling;
      if (!panel) return;
      const opening = panel.hidden;
      panel.hidden = !opening;
      button.setAttribute('aria-expanded', String(opening));
      button.textContent = opening ? 'إخفاء الشواهد' : 'اقرأ الشواهد';
    });
  });
  const revealItems = document.querySelectorAll('.content-card,.stat-card,.article-content h2,.note-box');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach((element) => {
      element.classList.add('reveal-item');
      observer.observe(element);
    });
  }
})();
