const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);

    function hideTabContent () {
        content.forEach(item => {
            item.style.display = display;
            item.classList.remove('show', 'animated', 'zoomIn');
            item.classList.add('hide');
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent (i = 0) {
        //content[i].style.display = 'block';
        const el = content[i];
        // Сброс классов анимации перед повторным добавлением
        el.classList.remove('hide', 'animated', 'zoomIn');

         // Принудительный reflow, чтобы анимация сработала заново
        void el.offsetWidth;

        // Добавляем классы анимации
        el.classList.add('animated', 'zoomIn');

        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target && 
            (target.classList.contains(tabSelector.replace(/\./, "")) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            tab.forEach((item, i) => {
                if(target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};

export default tabs;