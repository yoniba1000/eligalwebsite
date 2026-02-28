/**
 * EliGal - Component Loader
 * Centralizes Header, Footer, and Floating Action components
 */

const components = {
    header: `
    <div class="bsd-text">בס״ד</div>
    <div class="wrap">
        <a href="{{root}}index.html" class="brandlock">
            <img src="{{root}}assets/logo-symbol-transparent.png"
                alt="EliGal Logo">
            <span class="brand-name">ELIGAL</span>
        </a>
        <nav class="desktop-nav" aria-label="תפריט">
            <button class="navlink" data-section="home">בית</button>
            <button class="navlink" data-section="about">אודות</button>
            <button class="navlink" data-section="services">שירותים</button>
            <button class="navlink" data-section="projects">פרויקטים</button>
            <button class="navlink" data-section="contact">צור קשר</button>
            <a href="{{root}}blog/index.html" class="navlink">מאמרים</a>
        </nav>
        <a href="{{root}}calculator.html" class="nav-calc-btn">מחשבון סולארי</a>
        <button class="hamburger-btn" aria-label="תפריט" aria-expanded="false"></button>
    </div>
    <nav class="mobile-menu" aria-label="תפריט נייד">
        <button class="mobile-navlink" data-section="home">בית</button>
        <button class="mobile-navlink" data-section="about">אודות</button>
        <button class="mobile-navlink" data-section="services">שירותים</button>
        <button class="mobile-navlink" data-section="projects">פרויקטים</button>
        <button class="mobile-navlink" data-section="contact">צור קשר</button>
        <a href="{{root}}calculator.html" class="mobile-navlink">מחשבון סולארי</a>
        <a href="{{root}}blog/index.html" class="mobile-navlink">מאמרים</a>
    </nav>
  `,
    footer: `
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <img src="{{root}}assets/logo-symbol-transparent.png"
                    alt="EliGal" class="logo-big" width="300" height="200">
                <h2 class="footer-brand-name">ELIGAL</h2>
                <p>העידן החדש של עצמאות אנרגטית. לוכדים את האור, משחררים את התלות.</p>
            </div>
            <div class="footer-col">
                <p class="footer-heading">ניווט</p>
                <ul>
                    <li><a href="{{root}}index.html">דף הבית</a></li>
                    <li><a href="{{root}}index.html#about">אודות החברה</a></li>
                    <li><a href="{{root}}index.html#services">פתרונות אנרגיה</a></li>
                    <li><a href="{{root}}index.html#projects">פרויקטים בשטח</a></li>
                    <li><a href="{{root}}index.html#contact">יצירת קשר</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <p class="footer-heading">מרכז הידע</p>
                <ul>
                    <li><a href="{{root}}blog/index.html">מאמרים ותובנות</a></li>
                    <li><a href="{{root}}calculator.html">מחשבון היתכנות</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <p class="footer-heading">צור קשר</p>
                <ul>
                    <li><a href="tel:+972548582640">054-8582640</a></li>
                    <li><a href="mailto:eligal.pb@gmail.com">eligal.pb@gmail.com</a></li>
                    <li style="margin-top: 20px;"><a href="{{root}}terms-and-conditions.html">תנאי שימוש</a></li>
                    <li><a href="{{root}}privacy-policy.html">מדיניות פרטיות</a></li>
                    <li><a href="{{root}}accessibility-statement.html">הצהרת נגישות</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2026 אליגל פ.ב בע״מ. כל הזכויות שמורות.</p>
        </div>
    </div>
  `,
    floatingActions: `
    <div class="floating-stack">
        <a href="mailto:eligal.pb@gmail.com" class="float-bubble mail" aria-label="שלחו לנו מייל">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22 6 12 13 2 6" />
            </svg>
        </a>
        <a href="https://wa.me/972548582640" class="float-bubble whatsapp" target="_blank"
            aria-label="דברו איתנו בוואטסאפ">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        </a>
    </div>
  `
};

function injectComponents() {
    const isInsideBlog = window.location.pathname.includes('/blog/');
    const root = isInsideBlog ? '../' : '';

    const render = (template) => template.replace(/{{root}}/g, root);

    const headerEl = document.getElementById('header-placeholder');
    const footerEl = document.getElementById('footer-placeholder');
    const floatEl = document.getElementById('float-placeholder');

    if (headerEl) {
        headerEl.outerHTML = `<header class="topbar">` + render(components.header) + `</header>`;
    }
    if (footerEl) {
        footerEl.outerHTML = `<footer>` + render(components.footer) + `</footer>`;
    }
    if (floatEl) {
        floatEl.innerHTML = render(components.floatingActions);
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', injectComponents);
