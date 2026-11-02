
/* ==============================
   SCREEN NAVIGATION
============================== */

/* ==============================
   MUSIC CONTROL
   music1: Bab 02, Bab 03 + halaman menu kenangan, Bab 04
   music2: Bab terakhir
   Bab 01: tanpa musik
============================== */

const chapterMusic = {
    first: new Audio('music1.mp3'),
    final: new Audio('music2.mp3')
};

chapterMusic.first.loop = true;
chapterMusic.final.loop = true;
chapterMusic.first.preload = 'auto';
chapterMusic.final.preload = 'auto';

function updateMusic(screenId) {
    const isOpening = screenId === 'opening';
    const isFinal = screenId === 'final';
    const music = isFinal ? chapterMusic.final : chapterMusic.first;

    // Hentikan lagu yang tidak sesuai dengan halaman aktif.
    Object.values(chapterMusic).forEach(track => {
        if (track !== music || isOpening) {
            track.pause();
            track.currentTime = 0;
        }
    });

    // Bab pembuka sengaja tidak memakai musik.
    if (isOpening) return;

    // Play dipanggil dari navigasi yang dipicu pengguna.
    music.play().catch(error => {
        console.warn('Musik belum dapat diputar. Coba klik tombol navigasi lagi.', error);
    });
}

/* ==============================
   SCREEN NAVIGATION
============================== */

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    const target = document.getElementById(screenId);

    if (!target) {
        console.warn(`Halaman "${screenId}" tidak ditemukan.`);
        return;
    }

    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    target.classList.add('active');
    updateMusic(screenId);

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* ==============================
   START JOURNEY
============================== */

function startJourney() {
    showScreen('journey');
}

/* ==============================
   NEXT CHAPTER
============================== */

function nextChapter(chapterId) {
    showScreen(chapterId);
}

/* ==============================
   OPEN MEMORY PAGE
============================== */

function openMemoryPage(pageId) {
    showScreen(pageId);
}

/* ==============================
   REVEAL MEMORY
============================== */

function revealMemory(card) {
    card.classList.toggle('revealed');
}

/* ==============================
   RESTART JOURNEY
============================== */

function restartJourney() {
    document.querySelectorAll('.memory-card').forEach(card => {
        card.classList.remove('revealed');
    });

    showScreen('opening');
}

/* ==============================
   FLOATING LOVE DECORATIONS
============================== */

const heartContainer = document.getElementById('floatingHearts');

const heartSymbols = [
    '♡', '♥', '❤',  '❣', 'ღ'
];

const heartColors = [
    '#ff7497', '#ff4d79', '#ba0459', '#d40fd1',
    '#ee01cb', '#74053b', '#ffffff'
];

/* ==============================
   CREATE FLOATING HEART
============================== */

function createHeart() {
    if (!heartContainer) return;

    // Batasi jumlah hati agar animasi tetap ringan.
    if (heartContainer.children.length >= 45) return;

    const heart = document.createElement('span');
    heart.classList.add('floating-heart');

    heart.textContent = heartSymbols[
        Math.floor(Math.random() * heartSymbols.length)
    ];

    heart.style.left = Math.random() * 100 + '%';
    heart.style.color = heartColors[
        Math.floor(Math.random() * heartColors.length)
    ];
    heart.style.fontSize = (Math.random() * 18 + 12) + 'px';
    heart.style.marginLeft = (Math.random() * 30 - 15) + 'px';

    const duration = Math.random() * 5 + 6;
    heart.style.animationDuration = duration + 's';

    heartContainer.appendChild(heart);

    window.setTimeout(() => {
        heart.remove();
    }, duration * 1000 + 500);
}

/* ==============================
   INITIALIZE FLOATING HEARTS
============================== */

function initializeHearts() {
    if (!heartContainer) return;

    // Langsung munculkan banyak hati saat halaman dibuka.
    for (let i = 0; i < 20; i++) {
        window.setTimeout(createHeart, i * 100);
    }

    // Hati terus dibuat selama website terbuka,
    // termasuk ketika pengguna berpindah halaman.
    window.setInterval(createHeart, 450);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHearts, { once: true });
} else {
    initializeHearts();
}
