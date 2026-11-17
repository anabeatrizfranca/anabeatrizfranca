/* =========================================
   LANGUAGE SWITCHER (EN / PT / ES)
   Must load BEFORE script.js so it can capture
   the original English text untouched.
   English is the default text written in the HTML;
   PT and ES are listed below, keyed by the English text.
========================================= */
/* =========================================
   IMAGE FALLBACK
   Live servers (GitHub Pages, Netlify...) are case-sensitive,
   local ones (Windows / macOS) usually are not. If an image
   fails, try common name variants (case, spaces, extension).
========================================= */
(function () {
    function variants(src) {
        var m = src.match(/^(.*\/)?([^\/?#]+?)(\.[a-z0-9]+)$/i);
        if (!m) return [];
        var dir = m[1] || '', name = decodeURIComponent(m[2]), ext = m[3].toLowerCase();
        var low = name.toLowerCase();
        var names = [name, low, low.charAt(0).toUpperCase() + low.slice(1), name.toUpperCase(),
                     low.replace(/ /g, '-'), low.replace(/ /g, '_'), name.replace(/ /g, '-')];
        var exts = [ext, '.png', '.jpg', '.jpeg', '.webp'];
        var out = [], seen = {};
        seen[src] = true;
        exts.forEach(function (e) {
            names.forEach(function (n) {
                var u = dir + encodeURI(n) + e;
                if (!seen[u]) { seen[u] = true; out.push(u); }
            });
        });
        return out;
    }
    function tryNext(img) {
        var src = img.getAttribute('src');
        if (!src || src.indexOf('data:') === 0) return;
        if (!img._fb) img._fb = variants(src);
        var next = img._fb.shift();
        if (next) img.setAttribute('src', next);
    }
    document.addEventListener('error', function (e) {
        if (e.target && e.target.tagName === 'IMG') tryNext(e.target);
    }, true);
    window.addEventListener('load', function () {
        document.querySelectorAll('img').forEach(function (img) {
            if (img.complete && img.naturalWidth === 0) tryNext(img);
        });
    });
})();

(function () {

    var STORE_KEY = 'ab-portfolio-lang';
    var LANGS = { en: 'en', pt: 'pt-BR', es: 'es' };

    /* ---- text translations: "English text": [Português, Español] ---- */
    var T = {
        'Achievements': ['Conquistas', 'Logros'],
        'Skills': ['Habilidades', 'Habilidades'],
        'Education': ['Formação', 'Formación'],
        'Beyond Code': ['Além do Código', 'Más allá del código'],
        'Research': ['Pesquisa', 'Investigación'],
        'Projects': ['Projetos', 'Proyectos'],
        'Resume': ['Currículo', 'Currículum'],
        "Let's talk": ['Vamos conversar', 'Hablemos'],
        'Contact': ['Contato', 'Contacto'],
        'Resume ↓': ['Currículo ↓', 'Currículum ↓'],
        'Switch to dark mode': ['Mudar para o modo escuro', 'Cambiar a modo oscuro'],

        'My interests lie at the intersection of technology, people and purpose.': [
            'Meus interesses estão na interseção entre tecnologia, pessoas e propósito.',
            'Mis intereses están en la intersección entre tecnología, personas y propósito.'],
        'Especially Human-Computer Interaction, impactful software and the ways technology can improve real experiences. I enjoy learning independently, experimenting with ideas and turning what I learn into something tangible.': [
            'Especialmente Interação Humano-Computador, software de impacto e as formas como a tecnologia pode melhorar experiências reais. Gosto de aprender de forma independente, experimentar ideias e transformar o que aprendo em algo concreto.',
            'Especialmente la Interacción Humano-Computadora, el software de impacto y las formas en que la tecnología puede mejorar experiencias reales. Disfruto aprender de forma independiente, experimentar con ideas y convertir lo que aprendo en algo tangible.'],
        'Explore my work': ['Conheça meu trabalho', 'Explora mi trabajo'],
        'Download CV': ['Baixar CV', 'Descargar CV'],
        'Currently': ['Atualmente', 'Actualmente'],
        'Building, learning & exploring': ['Construindo, aprendendo e explorando', 'Construyendo, aprendiendo y explorando'],

        'ACHIEVEMENTS': ['CONQUISTAS', 'LOGROS'],
        'Two-time competitor': ['Duas participações', 'Dos participaciones'],
        'WorldSkills Brazil — Pernambuco': ['WorldSkills Brasil — Pernambuco', 'WorldSkills Brasil — Pernambuco'],
        'I competed twice at the state level in the WorldSkills Brazil Pernambuco competition as a mobile developer, winning 2nd place both times.': [
            'Competi duas vezes na etapa estadual do WorldSkills Brasil Pernambuco como desenvolvedora mobile, conquistando o 2º lugar nas duas ocasiões.',
            'Competí dos veces en la etapa estatal de WorldSkills Brasil Pernambuco como desarrolladora móvil, obteniendo el 2.º lugar en ambas ocasiones.'],
        'Award winner · 2023': ['Premiada · 2023', 'Premiada · 2023'],
        'Start-Up Competition': ['Competição de Startups', 'Competencia de Startups'],
        'I was awarded 1st place in my category at the 2023 SENAI Innovation Grand Prix for developing and presenting an entrepreneurial project. The competition brought together 8,894 students and 1,902 teams from across Brazil.': [
            'Fui premiada com o 1º lugar na minha categoria no Grande Prêmio SENAI de Inovação 2023 pelo desenvolvimento e apresentação de um projeto empreendedor. A competição reuniu 8.894 estudantes e 1.902 equipes de todo o Brasil.',
            'Obtuve el 1.er lugar en mi categoría en el Gran Premio SENAI de Innovación 2023 por desarrollar y presentar un proyecto emprendedor. La competencia reunió a 8.894 estudiantes y 1.902 equipos de todo Brasil.'],
        'Technology Residency': ['Residência Tecnológica', 'Residencia Tecnológica'],
        'During the Porto Digital Technology Residency, I developed a solution focused on inclusion through technology: a mobile app that helps visually impaired people navigate indoor environments through voice commands and audio-guided mapping. We presented it at Hack and Play, one of the biggest technology events in Brazil, and I delivered the project pitch at Demo Day.': [
            'Durante a Residência Tecnológica do Porto Digital, desenvolvi uma solução voltada à inclusão por meio da tecnologia: um aplicativo mobile que ajuda pessoas com deficiência visual a se locomoverem em ambientes internos por meio de comandos de voz e mapeamento guiado por áudio. Apresentamos o projeto no Hack and Play, um dos maiores eventos de tecnologia do Brasil, e fiz o pitch no Demo Day.',
            'Durante la Residencia Tecnológica de Porto Digital, desarrollé una solución enfocada en la inclusión a través de la tecnología: una aplicación móvil que ayuda a personas con discapacidad visual a desplazarse en espacios interiores mediante comandos de voz y mapeo guiado por audio. Presentamos el proyecto en Hack and Play, uno de los mayores eventos de tecnología de Brasil, y realicé el pitch en el Demo Day.'],
        'Leadership · LALA': ['Liderança · LALA', 'Liderazgo · LALA'],
        'Selected to be a LALA Leader': ['Selecionada para ser Líder LALA', 'Seleccionada para ser Líder LALA'],
        "I was selected from a large pool of applicants for the Latin American Leadership Academy (LALA) leadership camp, after an application process with interviews and multiple stages that recognized my leadership potential. LALA is a non-profit organization that finds, develops and connects young leaders across Latin America to help them tackle the region's biggest challenges.": [
            'Fui selecionada entre diversos candidatos para participar do camp de liderança da Latin American Leadership Academy (LALA), após um processo seletivo com entrevistas e várias etapas que reconheceu meu potencial de liderança. A LALA é uma organização sem fins lucrativos que encontra, desenvolve e conecta jovens líderes da América Latina para ajudá-los a enfrentar os maiores desafios da região.',
            'Fui seleccionada entre numerosos postulantes para participar en el campamento de liderazgo de la Latin American Leadership Academy (LALA), tras un proceso con entrevistas y varias etapas que reconoció mi potencial de liderazgo. LALA es una organización sin fines de lucro que encuentra, desarrolla y conecta a jóvenes líderes de América Latina para ayudarlos a enfrentar los mayores desafíos de la región.'],

        'SKILLS & TECHNOLOGIES': ['HABILIDADES E TECNOLOGIAS', 'HABILIDADES Y TECNOLOGÍAS'],
        'Development': ['Desenvolvimento', 'Desarrollo'],
        'Frameworks & Libraries': ['Frameworks e Bibliotecas', 'Frameworks y Bibliotecas'],
        'Tools': ['Ferramentas', 'Herramientas'],
        'View my GitHub ↗': ['Ver meu GitHub ↗', 'Ver mi GitHub ↗'],

        'EDUCATION': ['FORMAÇÃO', 'FORMACIÓN'],
        'CURRENT': ['ATUAL', 'ACTUAL'],
        'System Analysis and Development': ['Análise e Desenvolvimento de Sistemas', 'Análisis y Desarrollo de Sistemas'],
        'Undergraduate degree · Aug 2026 – Dec 2028': ['Graduação · Ago 2026 – Dez 2028', 'Grado universitario · Ago 2026 – Dic 2028'],
        'CERTIFICATES': ['CERTIFICADOS', 'CERTIFICADOS'],
        'Courses & Certifications': ['Cursos e Certificações', 'Cursos y Certificaciones'],
        'A collection of courses, certifications and independent learning experiences.': [
            'Uma coleção de cursos, certificações e experiências de aprendizado independente.',
            'Una colección de cursos, certificaciones y experiencias de aprendizaje independiente.'],
        'View courses ↗': ['Ver cursos ↗', 'Ver cursos ↗'],

        'BEYOND CODE': ['ALÉM DO CÓDIGO', 'MÁS ALLÁ DEL CÓDIGO'],
        'Volunteering': ['Voluntariado', 'Voluntariado'],
        'TURKEY': ['TURQUIA', 'TURQUÍA'],
        'Volunteer work supporting an international animal rescue NGO, contributing to digital initiatives, communication and tools that support international partnerships.': [
            'Trabalho voluntário apoiando uma ONG internacional de resgate animal, contribuindo com iniciativas digitais, comunicação e ferramentas que apoiam parcerias internacionais.',
            'Trabajo voluntario apoyando a una ONG internacional de rescate animal, contribuyendo con iniciativas digitales, comunicación y herramientas que apoyan alianzas internacionales.'],
        'Visit project ↗': ['Ver projeto ↗', 'Ver proyecto ↗'],
        'View project ↗': ['Ver projeto ↗', 'Ver proyecto ↗'],
        'RWANDA': ['RUANDA', 'RUANDA'],
        'Volunteer work with CIDO, an African organization in Rwanda, contributing to initiatives connected to community, education and social impact.': [
            'Trabalho voluntário com a CIDO, uma organização africana em Ruanda, contribuindo com iniciativas ligadas à comunidade, educação e impacto social.',
            'Trabajo voluntario con CIDO, una organización africana en Ruanda, contribuyendo con iniciativas ligadas a la comunidad, la educación y el impacto social.'],
        'Learning Beyond Borders': ['Aprendendo Além das Fronteiras', 'Aprendiendo Más Allá de las Fronteras'],
        'Learning languages is one of the ways I challenge myself to understand different cultures, perspectives and ways of communicating.': [
            'Aprender idiomas é uma das formas como me desafio a entender diferentes culturas, perspectivas e formas de se comunicar.',
            'Aprender idiomas es una de las formas en que me desafío a comprender diferentes culturas, perspectivas y maneras de comunicarse.'],
        'Languages I speak': ['Idiomas que falo', 'Idiomas que hablo'],
        'Portuguese': ['Português', 'Portugués'],
        'English': ['Inglês', 'Inglés'],
        'Spanish': ['Espanhol', 'Español'],
        'French': ['Francês', 'Francés'],
        'Native': ['Nativo', 'Nativo'],
        'Fluent': ['Fluente', 'Fluido'],
        'Basic': ['Básico', 'Básico'],

        'RESEARCH & PROJECTS': ['PESQUISA E PROJETOS', 'INVESTIGACIÓN Y PROYECTOS'],
        'Curiosity drives the work.': ['A curiosidade move o trabalho.', 'La curiosidad impulsa el trabajo.'],
        'My Google Scholar profile': ['Meu perfil no Google Scholar', 'Mi perfil de Google Scholar'],
        'View profile ↗': ['Ver perfil ↗', 'Ver perfil ↗'],
        'Published at': ['Publicado em', 'Publicado en'],
        'PAPER · ARTIFICIAL INTELLIGENCE · WORK': ['ARTIGO · INTELIGÊNCIA ARTIFICIAL · TRABALHO', 'ARTÍCULO · INTELIGENCIA ARTIFICIAL · TRABAJO'],
        'This paper examines how artificial intelligence and immediate-reward culture are reshaping the modern workforce. Drawing on psychology, neuroscience, organizational behavior and labor economics, it explores how speed, instant gratification and short-term results influence motivation, learning and career development.': [
            'Este artigo examina como a inteligência artificial e a cultura da recompensa imediata estão remodelando a força de trabalho moderna. Com base em psicologia, neurociência, comportamento organizacional e economia do trabalho, explora como a velocidade, a gratificação instantânea e os resultados de curto prazo influenciam a motivação, o aprendizado e o desenvolvimento de carreira.',
            'Este artículo examina cómo la inteligencia artificial y la cultura de la recompensa inmediata están remodelando la fuerza laboral moderna. A partir de la psicología, la neurociencia, el comportamiento organizacional y la economía laboral, explora cómo la velocidad, la gratificación instantánea y los resultados a corto plazo influyen en la motivación, el aprendizaje y el desarrollo profesional.'],
        'It also examines purpose-driven careers, skills-based hiring, signaling theory and the distinction between deep and surface learning.': [
            'Também examina carreiras orientadas por propósito, contratação baseada em habilidades, teoria da sinalização e a distinção entre aprendizado profundo e superficial.',
            'También examina las carreras orientadas por propósito, la contratación basada en habilidades, la teoría de la señalización y la distinción entre aprendizaje profundo y superficial.'],
        'Read publication ↗': ['Ler publicação ↗', 'Leer publicación ↗'],
        'Selected Projects': ['Projetos Selecionados', 'Proyectos Seleccionados'],
        'WEBSITE · COP31 · NGO': ['SITE · COP31 · ONG', 'SITIO WEB · COP31 · ONG'],
        '“Where are the dogs?”': ['“Onde estão os cães?”', '“¿Dónde están los perros?”'],
        "A website developed for COP31 in Türkiye to support KİMCANKO's mission, raising awareness for animal rescue and welfare during the event.": [
            'Um site desenvolvido para a COP31, na Türkiye, para apoiar a missão da KİMCANKO, aumentando a conscientização sobre resgate e bem-estar animal durante o evento.',
            'Un sitio web desarrollado para la COP31 en Türkiye para apoyar la misión de KİMCANKO, aumentando la conciencia sobre el rescate y el bienestar animal durante el evento.'],
        'DIGITAL PLATFORM · NGO': ['PLATAFORMA DIGITAL · ONG', 'PLATAFORMA DIGITAL · ONG'],
        'KİMCANKO International Rescue Partnership Platform': ['Plataforma de Parcerias Internacionais de Resgate da KİMCANKO', 'Plataforma de Alianzas Internacionales de Rescate de KİMCANKO'],
        'A digital platform for KİMCANKO, a Turkey-based animal rescue NGO, supporting international partnerships and increasing visibility for rescued animals and adoption initiatives. I contributed to the structure, responsive interface and user experience, including animal profiles, filters, media galleries and adoption/logistics information.': [
            'Uma plataforma digital para a KİMCANKO, ONG de resgate animal sediada na Turquia, que apoia parcerias internacionais e aumenta a visibilidade de animais resgatados e iniciativas de adoção. Contribuí com a estrutura, a interface responsiva e a experiência do usuário, incluindo perfis de animais, filtros, galerias de mídia e informações de adoção/logística.',
            'Una plataforma digital para KİMCANKO, ONG de rescate animal con sede en Turquía, que apoya alianzas internacionales y aumenta la visibilidad de animales rescatados e iniciativas de adopción. Contribuí con la estructura, la interfaz responsiva y la experiencia de usuario, incluyendo perfiles de animales, filtros, galerías multimedia e información de adopción/logística.'],

        'CERTIFICATION': ['CERTIFICAÇÃO', 'CERTIFICACIÓN'],
        '← Back to portfolio': ['← Voltar ao portfólio', '← Volver al portafolio'],
        'Built with curiosity.': ['Feito com curiosidade.', 'Hecho con curiosidad.']
    };

    /* ---- blocks with inline markup (translated as HTML) ---- */
    var OBLI = '<span class="badge-inline"><img src="assets/obli.png" alt="" loading="lazy">OBLI</span>';
    var HCGEC = '<span class="badge-inline"><img src="assets/hcgeclogo.png" alt="" loading="lazy">Harvard Crimson Global Essay Competition</span>';
    var H = {
        heroEyebrow: { pt: "OLÁ, EU SOU", es: "HOLA, SOY" },
        touch: { pt: 'ENTRE EM CONTATO', es: 'PONTE EN CONTACTO' },
        build: {
            pt: 'Vamos construir<br>algo <span class="accent">incrível.</span>',
            es: 'Construyamos<br>algo <span class="accent">grandioso.</span>'
        },
        langPara: {
            pt: 'Recebi uma bolsa da Santander Academy e atualmente estudo espanhol pelo Open Mundo. Também participei da competição de língua inglesa ' + OBLI + ' e da ' + HCGEC + ', experiências que me ajudaram a desenvolver minha comunicação e escrita em inglês.',
            es: 'Recibí una beca de Santander Academy y actualmente estudio español a través de Open Mundo. También participé en la competencia de inglés ' + OBLI + ' y en la ' + HCGEC + ', experiencias que me ayudaron a desarrollar mi comunicación y escritura en inglés.'
        }
    };

    var titleEl = document.querySelector('title');
    var TITLE = {
        en: document.title,
        pt: (titleEl && titleEl.getAttribute('data-pt')) || 'Ana Beatriz — Desenvolvimento de Software',
        es: (titleEl && titleEl.getAttribute('data-es')) || 'Ana Beatriz — Desarrollo de Software'
    };

    function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

    /* ---- capture original (English) content ---- */
    var nodes = [];
    var htmlEls = [];

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
        htmlEls.push({ el: el, key: el.getAttribute('data-i18n-html'), en: el.innerHTML });
    });

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
            var p = n.parentElement;
            if (!p || /^(SCRIPT|STYLE)$/.test(p.tagName)) return NodeFilter.FILTER_REJECT;
            if (p.closest('[data-i18n-html], .lang-switch, .mobile-lang')) return NodeFilter.FILTER_REJECT;
            var k = norm(n.nodeValue);
            return (k && T[k]) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
    while (walker.nextNode()) {
        var n = walker.currentNode;
        nodes.push({ node: n, orig: n.nodeValue, key: norm(n.nodeValue) });
    }

    /* ---- apply a language ---- */
    function apply(lang) {
        var idx = lang === 'pt' ? 0 : 1;

        nodes.forEach(function (o) {
            if (lang === 'en') { o.node.nodeValue = o.orig; return; }
            var lead = o.orig.match(/^\s*/)[0];
            var trail = o.orig.match(/\s*$/)[0];
            o.node.nodeValue = lead + T[o.key][idx] + trail;
        });

        htmlEls.forEach(function (o) {
            o.el.innerHTML = (lang === 'en') ? o.en : H[o.key][lang];
        });

        document.title = TITLE[lang];
        document.documentElement.setAttribute('lang', LANGS[lang]);

        var cur = document.getElementById('langCurrent');
        if (cur) cur.textContent = lang.toUpperCase();

        document.querySelectorAll('[data-lang]').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });

        try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    }

    /* ---- initial language (saved choice, otherwise English) ---- */
    var saved = 'en';
    try { saved = localStorage.getItem(STORE_KEY) || 'en'; } catch (e) {}
    if (!LANGS[saved]) saved = 'en';
    apply(saved);

    /* ---- UI ---- */
    var sw = document.getElementById('langSwitch');
    var btn = document.getElementById('langBtn');

    function setOpen(open) {
        if (!sw) return;
        sw.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (btn) btn.addEventListener('click', function (e) {
        e.stopPropagation();
        setOpen(!sw.classList.contains('open'));
    });
    document.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    document.querySelectorAll('[data-lang]').forEach(function (b) {
        b.addEventListener('click', function () {
            apply(b.getAttribute('data-lang'));
            setOpen(false);
        });
    });

})();