/* ===========================
   EliGal – Main JavaScript
   Vanilla JS – No frameworks
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  // Wait a tiny bit for injection if needed, or just sequence it
  setTimeout(() => {
    initScrollSpy();
    initMobileMenu();
    initSlideshow();
    initAdvancedForm();
    initContactForm();
    initBlogSection();
  }, 0);
});

/* ---------- Scroll Spy ---------- */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.navlink, .mobile-navlink');
  const sectionIds = ['home', 'about', 'services', 'projects', 'blog', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if (sections.length === 0) return;

  function updateActive() {
    const y = window.scrollY + 70;
    let activeId = 'home';

    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= y) {
        activeId = sections[i].id;
        break;
      }
    }

    navLinks.forEach(link => {
      const linkTarget = link.getAttribute('data-section');
      link.classList.toggle('active', linkTarget === activeId);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}

/* ---------- Smooth Scroll Navigation ---------- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-section]');
  if (!link) return;

  const sectionId = link.getAttribute('data-section');

  // Calculator is a separate page
  if (sectionId === 'calculator') {
    window.location.href = 'calculator.html';
    return;
  }

  // If on a subpage, navigate to homepage with section hash
  const pathname = window.location.pathname;
  const isInsideBlog = pathname.includes('/blog/');
  const root = isInsideBlog ? '../' : '';

  // Homepage is ONLY the root or /index.html (not /blog/index.html)
  const isHomepage = pathname === '/' || pathname === '' || (pathname.endsWith('/index.html') && !pathname.includes('/blog/'));

  if (!isHomepage) {
    window.location.href = root + 'index.html#' + sectionId;
    return;
  }

  const target = document.getElementById(sectionId);
  if (target) {
    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 60,
      behavior: 'smooth'
    });
  }

  // Close mobile menu if open
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) mobileMenu.classList.remove('open');
});

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const btn = document.querySelector('.hamburger-btn');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  const menuIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  btn.innerHTML = menuIcon;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.innerHTML = isOpen ? closeIcon : menuIcon;
    btn.setAttribute('aria-expanded', isOpen);
  });
}

/* ---------- Image Slideshow ---------- */
function initSlideshow() {
  // Gallery is now static – no slideshow needed
  return;
}

/* ---------- Advanced Form Toggle ---------- */
function initAdvancedForm() {
  const toggleBtn = document.getElementById('toggle-advanced-btn');
  const advancedForm = document.getElementById('advanced-form');
  if (!toggleBtn || !advancedForm) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = advancedForm.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.querySelector('.toggle-arrow').textContent = isOpen ? '▼' : '▶';
  });
}

/* ---------- Contact Form → mailto ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('contact-submit-btn');
    const statusEl = document.getElementById('form-status');
    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'שולח...';
    statusEl.style.display = 'none';

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = 'thank-you.html';
        return;
      } else {
        throw new Error(result.message || 'שגיאה בשליחה');
      }
    } catch (err) {
      statusEl.textContent = '✗ שגיאה בשליחה. אנא נסו שנית או צרו קשר טלפונית.';
      statusEl.className = 'form-status error';
      statusEl.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ---------- Scroll to Top ---------- */
function scrollToTop() {
  const homeSection = document.getElementById('home');
  if (homeSection) {
    window.scrollTo({ top: homeSection.offsetTop - 60, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ---------- Handle hash on page load ---------- */
window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const target = document.getElementById(hash);
    if (target) {
      setTimeout(() => {
        window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
      }, 100);
    }
  }
});

/* ---------- Blog Section (Homepage) ---------- */
function initBlogSection() {
  const grid = document.getElementById('homepage-blog-grid');
  if (!grid) return;

  // Use globally loaded BLOG_POSTS if available (Skwiz pattern)
  // This avoids fetch() errors on file:// protocol
  if (typeof BLOG_POSTS !== 'undefined' && Array.isArray(BLOG_POSTS)) {
    console.log('Blog loading: using pre-loaded BLOG_POSTS data.');
    renderBlogPosts(BLOG_POSTS.slice(0, 3), grid);
    return;
  }

  // Fallback to fetch for environments where scripts might not be sequential or for older architecture
  const pathParts = window.location.pathname.split('/');
  const blogIndex = pathParts.indexOf('blog');
  const isInsideBlog = blogIndex !== -1 && blogIndex < pathParts.length - 1;
  const basePath = isInsideBlog ? '' : 'blog/';

  if (window.location.protocol === 'file:') {
    console.warn('Blog fetch disabled: Browsers block fetch() on file:// protocol. Use a local server or BLOG_POSTS variable.');
    grid.innerHTML = '<p style="text-align:center; color: var(--muted); padding: 20px;">יש להריץ את האתר על שרת (Local Server) או לטעון את נתוני המאמרים בסטטיות כדי להציגם.</p>';
    return;
  }

  fetch(basePath + 'posts.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(posts => renderBlogPosts(posts.slice(0, 3), grid))
    .catch(err => {
      console.error('Blog fetch failed:', err);
      grid.innerHTML = '<p style="text-align:center; color: var(--muted); padding: 20px;">חלה שגיאה בטעינת המאמרים. וודא שקובץ ה-JSON קיים ותקין.</p>';
    });
}

function renderBlogPosts(posts, container) {
  const isInsideBlog = window.location.pathname.includes('/blog/');
  const basePath = isInsideBlog ? '' : 'blog/';

  container.innerHTML = posts.map(post => `
    <a href="${basePath}post.html?slug=${post.slug}" class="blog-card">
      <span class="blog-tag">${post.tag}</span>
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <div class="blog-meta">
        <span>${post.dateFormatted} · ${post.readTime}</span>
        <span class="read-more">קרא עוד ←</span>
      </div>
    </a>
  `).join('');
}
