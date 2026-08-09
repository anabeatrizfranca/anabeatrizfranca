document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile menu ---------- */

    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuButton && mobileMenu) {

        menuButton.addEventListener('click', () => {

            const isActive = mobileMenu.classList.toggle('active');

            menuButton.setAttribute('aria-expanded', String(isActive));
            menuButton.textContent = isActive ? '✕' : '☰';

        });

        mobileMenu.querySelectorAll('a').forEach((link) => {

            link.addEventListener('click', () => {

                mobileMenu.classList.remove('active');

                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.textContent = '☰';

            });

        });

    }


    /* ---------- "Let's talk" card ---------- */

    const talkModal = document.getElementById('talkModal');
    const openTalk = document.getElementById('openTalk');
    const closeTalk = document.getElementById('closeTalk');

    const openTalkModal = () => {

        if (!talkModal) return;

        talkModal.classList.add('active');
        talkModal.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';

    };

    const closeTalkModal = () => {

        if (!talkModal) return;

        talkModal.classList.remove('active');
        talkModal.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';

    };

    if (openTalk) {
        openTalk.addEventListener('click', openTalkModal);
    }

    if (closeTalk) {
        closeTalk.addEventListener('click', closeTalkModal);
    }

    if (talkModal) {

        talkModal.addEventListener('click', (event) => {

            if (event.target === talkModal) {
                closeTalkModal();
            }

        });

    }

    document.addEventListener('keydown', (event) => {

        if (event.key === 'Escape' && talkModal && talkModal.classList.contains('active')) {
            closeTalkModal();
        }

    });

});