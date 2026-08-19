document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;


    /* ---------- Theme toggle (light / dark) ---------- */

    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const mobileToggleLabel = mobileThemeToggle
        ? mobileThemeToggle.querySelector('.toggle-label')
        : null;

    const STORAGE_KEY = 'ab-portfolio-theme';

    const applyTheme = (theme) => {

        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }

        const isDark = theme === 'dark';

        if (themeToggle) {
            themeToggle.setAttribute(
                'aria-label',
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }

        if (mobileToggleLabel) {
            mobileToggleLabel.textContent =
                isDark ? 'Switch to light mode' : 'Switch to dark mode';
        }

    };

    // Default is light, unless the person already chose dark before.
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    const toggleTheme = () => {

        const next = root.getAttribute('data-theme') === 'dark'
            ? 'light'
            : 'dark';

        applyTheme(next);

        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (e) {
            // Storage unavailable (e.g. private browsing) — theme
            // still applies for this session, just won't persist.
        }

    };

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }


    /* ---------- Mobile menu ---------- */

    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuButton && mobileMenu) {

        const setMenu = (isActive) => {
            mobileMenu.classList.toggle('active', isActive);
            menuButton.setAttribute('aria-expanded', String(isActive));
            menuButton.textContent = isActive ? '✕' : '☰';
        };

        menuButton.addEventListener('click', () => {
            setMenu(!mobileMenu.classList.contains('active'));
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenu(false));
        });

        // Close the mobile menu automatically if the viewport grows
        // past the breakpoint where the full nav is shown again.
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                setMenu(false);
            }
        });

    }


    /* ---------- "Let's talk" card ---------- */

    const talkModal = document.getElementById('talkModal');
    const openTalk = document.getElementById('openTalk');
    const closeTalk = document.getElementById('closeTalk');

    const getFocusable = (container) =>
        Array.from(
            container.querySelectorAll(
                'a[href], button:not([disabled])'
            )
        );

    const openTalkModal = () => {

        if (!talkModal) return;

        talkModal.classList.add('active');
        talkModal.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';

        if (closeTalk) closeTalk.focus();

    };

    const closeTalkModal = () => {

        if (!talkModal) return;

        talkModal.classList.remove('active');
        talkModal.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';

        if (openTalk) openTalk.focus();

    };

    if (openTalk) {
        openTalk.addEventListener('click', openTalkModal);
    }

    if (closeTalk) {
        closeTalk.addEventListener('click', closeTalkModal);
    }

    if (talkModal) {

        talkModal.addEventListener('click', (event) => {
            if (event.target === talkModal) closeTalkModal();
        });

        // Basic focus trap while the modal is open
        talkModal.addEventListener('keydown', (event) => {

            if (event.key !== 'Tab') return;
            if (!talkModal.classList.contains('active')) return;

            const focusable = getFocusable(talkModal);
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }

        });

    }

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            talkModal &&
            talkModal.classList.contains('active')
        ) {
            closeTalkModal();
        }
    });


    /* ---------- Reveal animation system ---------- */

    if (!prefersReducedMotion) {

        // Split the visual (aria-hidden) copy of .reveal-chars targets
        // into one <span class="char"> per character, so each letter
        // can animate in with its own delay. The element keeps a real
        // aria-label with the full text for screen readers.
        const wrapChars = (node) => {

            node.childNodes.forEach((child) => {

                if (child.nodeType === Node.TEXT_NODE) {

                    const frag = document.createDocumentFragment();

                    child.textContent.split('').forEach((ch) => {

                        const span = document.createElement('span');
                        span.className = 'char';
                        span.textContent = ch === ' ' ? '\u00A0' : ch;

                        frag.appendChild(span);

                    });

                    child.replaceWith(frag);

                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    wrapChars(child);
                }

            });

        };

        document.querySelectorAll('.reveal-chars').forEach((el) => {

            const visual = el.querySelector('[aria-hidden="true"]');
            if (!visual) return;

            wrapChars(visual);

            visual.querySelectorAll('.char').forEach((span, i) => {
                span.style.setProperty('--i', i);
            });

        });

        // Stagger index for grouped children (project lists, cards, etc.)
        document.querySelectorAll('.stagger').forEach((group) => {
            Array.from(group.children).forEach((child, i) => {
                child.style.setProperty('--i', i);
            });
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
        );

        document
            .querySelectorAll(
                '.reveal-chars, .fade-up, .stagger, .language-item'
            )
            .forEach((el) => revealObserver.observe(el));

    } else {

        // Reduced motion: everything visible immediately, no observers.
        document
            .querySelectorAll('.reveal-chars, .fade-up, .stagger, .language-item')
            .forEach((el) => el.classList.add('in-view'));

    }


    /* ---------- Scroll parallax on ambient glows ---------- */

    if (!prefersReducedMotion) {

        const glows = document.querySelectorAll('.ambient-glow');
        let ticking = false;

        const updateParallax = () => {

            const y = window.scrollY;

            glows.forEach((glow, i) => {
                const speed = 0.06 + i * 0.03;
                glow.style.transform = `translate3d(0, ${y * speed}px, 0)`;
            });

            ticking = false;

        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });

    }


    /* ---------- Scrollspy: highlight the nav link for the
       section currently in view, so navigation always reflects
       where the visitor actually is on the page. ---------- */

    const spySections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (spySections.length && navLinks.length) {

        const spyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {

                        const id = entry.target.getAttribute('id');

                        navLinks.forEach((link) => {
                            link.classList.toggle(
                                'active',
                                link.getAttribute('href') === `#${id}`
                            );
                        });

                    }
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );

        spySections.forEach((section) => spyObserver.observe(section));

    }


    /* ---------- Photo carousels (achievement galleries) ---------- */

    document.querySelectorAll('[data-carousel]').forEach((carousel) => {

        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const dotsWrap = carousel.querySelector('[data-carousel-dots]');

        if (slides.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        let index = 0;
        let autoplayTimer = null;

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        });

        const dots = Array.from(dotsWrap.children);

        function render() {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }

        function goTo(i) {
            index = (i + slides.length) % slides.length;
            render();
        }

        function startAutoplay() {
            if (prefersReducedMotion) return;
            stopAutoplay();
            autoplayTimer = setInterval(() => goTo(index + 1), 5000);
        }

        function stopAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goTo(index - 1);
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goTo(index + 1);
                startAutoplay();
            });
        }

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Basic swipe support for touch devices
        let touchStartX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            stopAutoplay();
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(deltaX) > 40) {
                goTo(deltaX < 0 ? index + 1 : index - 1);
            }
            startAutoplay();
        }, { passive: true });

        render();
        startAutoplay();

    });

});