// Единая структура данных для слайдов
const slidesData = [
    {
        city: 'Rostov-on-Don, Admiral',
        area: '81 m2',
        time: '3.5 months',
        cost: 'Upon request',
        image: './img/rostov_admiral.jpg'
    },
    {
        city: 'Sochi, Thieves',
        area: '105 m2',
        time: '4 months',
        cost: 'Upon request',
        image: './img/sochi.jpg'
    },
    {
        city: 'Rostov-on-Don, Patriotic',
        area: '93 m2',
        time: '3 months',
        cost: 'Upon request',
        image: './img/rostov_patriotic.jpg'
    }
];

// Текущий активный слайд
let currentSlide = 0;
let totalSlides = slidesData.length;

// Элементы DOM
let slides = [];
let navLinks = [];
let dots = [];
let arrowLeft;
let arrowRight;
let detailCity;
let detailArea;
let detailTime;
let detailCost;

// Генерация навигационных ссылок из массива данных
function generateNavLinks() {
    const navContainer = document.getElementById('slider-nav');
    navContainer.innerHTML = '';
    navLinks = [];

    slidesData.forEach((slideData, index) => {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'slider-nav-link';
        link.textContent = slideData.city.toUpperCase();
        link.setAttribute('data-slide', index);
        link.setAttribute('aria-label', `Слайд ${index + 1}`);
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(index);
        });

        navContainer.appendChild(link);
        navLinks.push(link);
    });
}

// Генерация слайдов с изображениями из массива данных
function generateSlides() {
    const slidesContainer = document.getElementById('slider-slides');
    slidesContainer.innerHTML = '';
    slides = [];

    slidesData.forEach((slideData, index) => {
        const slide = document.createElement('div');
        slide.className = 'slider-slide';
        
        const img = document.createElement('img');
        img.src = slideData.image;
        img.alt = slideData.city;
        
        slide.appendChild(img);
        slidesContainer.appendChild(slide);
        slides.push(slide);
    });
}

// Генерация точек (индикаторов) из массива данных
function generateDots() {
    const dotsContainer = document.getElementById('slider-dots');
    dotsContainer.innerHTML = '';
    dots = [];

    slidesData.forEach((slideData, index) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        dot.setAttribute('data-slide', index);
        dot.setAttribute('aria-label', `Слайд ${index + 1}`);
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });

        dotsContainer.appendChild(dot);
        dots.push(dot);
    });
}

// Универсальная функция переключения слайда
function switchSlide(slideIndex) {
    // Проверка корректности индекса и применение кольцевой логики
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }

    // Обновление текущего индекса
    currentSlide = slideIndex;

    // Получение данных текущего слайда
    const currentSlideData = slidesData[currentSlide];

    // Обновление слайдов (изображения)
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Обновление навигационных ссылок
    navLinks.forEach((link, index) => {
        if (index === currentSlide) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Обновление точек (индикаторов)
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // Обновление деталей проекта
    if (detailCity) detailCity.textContent = currentSlideData.city;
    if (detailArea) detailArea.textContent = currentSlideData.area;
    if (detailTime) detailTime.textContent = currentSlideData.time;
    if (detailCost) detailCost.textContent = currentSlideData.cost;
}

//Переключение на следующий слайд
function nextSlide() {
    switchSlide(currentSlide + 1);
}

/**
 * Переключение на предыдущий слайд
 */
function prevSlide() {
    switchSlide(currentSlide - 1);
}

// Переключение на конкретный слайд по индексу
function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        switchSlide(index);
    }
}

// Инициализация слайдера
function initSlider() {
    // Получение элементов DOM
    arrowLeft = document.querySelector('.slider-arrow-left');
    arrowRight = document.querySelector('.slider-arrow-right');
    detailCity = document.getElementById('detail-city');
    detailArea = document.getElementById('detail-area');
    detailTime = document.getElementById('detail-time');
    detailCost = document.getElementById('detail-cost');

    // Обновление количества слайдов
    totalSlides = slidesData.length;

    // Генерация всех элементов из массива данных
    generateNavLinks();
    generateSlides();
    generateDots();

    // Обновление ссылок на элементы после генерации
    slides = document.querySelectorAll('.slider-slide');
    navLinks = document.querySelectorAll('.slider-nav-link');
    dots = document.querySelectorAll('.slider-dot');

    // Обработчик для стрелки вправо
    arrowRight.addEventListener('click', () => {
        nextSlide();
    });

    // Обработчик для стрелки влево
    arrowLeft.addEventListener('click', () => {
        prevSlide();
    });

    // Поддержка клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Инициализация первого слайда
    switchSlide(0);
}

// Инициализация слайдера при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
});
