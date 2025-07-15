const getSlider = (container, firstImageSrc) => {

    // Создаём контейнер для слайдера
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slider-container');

    const slider = document.createElement('div');
    slider.classList.add('slider');

    //Находим все <a href="..."><img class="preview"></a>
    const previews = document.querySelectorAll('.preview');

     // Собираем список путей к большим картинкам (из href родителя)
    const images = Array.from(previews).map(img => img.parentNode.getAttribute('href'));

      // Создаём <img> элементы для каждого пути
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.style.display = src === firstImageSrc ? 'block' : 'none';
        slider.appendChild(img);
    })

    // Кнопки и логика листания
    const prevButton = document.createElement('button');
    prevButton.classList.add('prev-button');
    prevButton.textContent = '<';


    const nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    nextButton.textContent = '>';

    
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(nextButton);
    container.appendChild(sliderContainer);

     // --- Логика перелистывания ---
    let slideIndex = images.findIndex(src => src === firstImageSrc);
    const slides = slider.querySelectorAll('img');

    const updateSlider = () => {
        slides.forEach((img, i) => {
            img.style.display = i === slideIndex ? 'block' : 'none';
        });
    };

    function showPreviousSlide() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function showNextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        updateSlider();
    }

    prevButton.addEventListener('click', showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);

    updateSlider();
    };

export default getSlider;