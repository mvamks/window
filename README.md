# Ирвас окна

Интерфейс сайта оконной компании с модальными окнами, слайдером, формами и интерактивными элементами, написанный на **чистом JavaScript** с использованием **Gulp**, **Webpack** и **Babel**.

---

## 🚀 Функционал

- Галерея работ с превью и полноразмерными изображениями.
- Кастомный слайдер изображений.
- Модальные окна с шаговыми формами и валидацией.
- Сборка и разработка с помощью Gulp и Webpack.
- Поддержка старых браузеров с помощью Babel и CoreJS.

---

## 📦 Установка

1. Клонировать репозиторий:

   ```bash
   git clone https://github.com/mvamks/window.git
   cd window
    ```

2. Установить зависимости:

    ```bash
    npm install
    ```

🛠️ Скрипты
Команда	Описание
gulp	Запуск разработки (локальный сервер + watch)
gulp build	Сборка проекта в режиме разработки
gulp build-prod	Сборка проекта для продакшна (минификация)

## 📂 Структура проекта
    
```bash 
src/
├── index.html
├── js/
│   ├── main.js
│   ├── modules/
│   │   ├── images.js
│   │   ├── slider.js
│   │   ├── modals.js
│   │   └── ...
├── assets/
│   ├── img/
│   ├── css/
│   └── slick/
dist/
gulpfile.js
package.json
README.md
```

## 🧰 Технологии
- JavaScript (ES6+)
- Babel + CoreJS
- Gulp
- Webpack
- Slick Carousel
- BrowserSync