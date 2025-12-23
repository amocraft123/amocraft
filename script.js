let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Initial Setup
updateSlides();

function updateSlides() {
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
            slide.style.display = 'flex'; // Ensure flex layout is applied
        } else {
            slide.classList.remove('active');
            slide.style.display = 'none'; // Hide non-active slides completely
        }
    });

    // Update nav dot style if we had them or just console log
    console.log(`Viewing slide ${currentSlide + 1} of ${totalSlides}`);
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlides();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlides();
    }
}

// Mouse Wheel Navigation
let isScrolling = false;
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    isScrolling = true;

    if (e.deltaY > 0) {
        nextSlide();
    } else {
        prevSlide();
    }

    setTimeout(() => {
        isScrolling = false;
    }, 1000); // Cooldown
});

// Demo Animation
async function runDemo() {
    const statusText = document.getElementById('status-text');
    const packets = document.querySelectorAll('.packet');

    // Reset
    packets.forEach(p => p.classList.remove('animate-packet'));

    // Step 1: Expodat -> Server
    statusText.innerText = 'Получение данных от Expodat...';
    packets[0].classList.add('animate-packet');

    await new Promise(r => setTimeout(r, 1500));

    // Step 2: Processing
    statusText.innerText = 'Генерация PDF билета...';
    // Small flicker effect on server node?
    document.getElementById('node-server').style.borderColor = '#00e5ff';
    document.getElementById('node-server').style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.4)';

    await new Promise(r => setTimeout(r, 1000));
    document.getElementById('node-server').style.borderColor = '';
    document.getElementById('node-server').style.boxShadow = '';

    // Step 3: Server -> amoCRM
    statusText.innerText = 'Отправка в amoCRM...';
    packets[1].classList.add('animate-packet');

    await new Promise(r => setTimeout(r, 1500));

    // Finish
    statusText.innerText = 'Готово! Сделка создана.';
    statusText.style.color = '#00ff88';

    setTimeout(() => {
        statusText.innerText = 'Ожидание...';
        statusText.style.color = '';
        packets.forEach(p => p.classList.remove('animate-packet'));
    }, 3000);
}
