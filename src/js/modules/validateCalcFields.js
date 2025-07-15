import { areRequiredFieldsFilled } from './utils';

const validateCalcFields = (containerSelector, nextBtnSelector) => {
  console.log("validateCalcFields модуль загружен"); // ← должен выводиться всегда

  console.log('validateCalcFields вызван');
  const container = document.querySelector(containerSelector);
  if (!container) return;

  if (container.dataset.validated) return;
  container.dataset.validated = 'true';

  const requiredFields = container.querySelectorAll('input[required], select[required]');
  const nextBtn = container.querySelector(nextBtnSelector);
  if (!nextBtn) return;

  // Создаем сообщение об ошибке и вставляем его в DOM
  let statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  statusMessage.style.color = 'red';
  statusMessage.textContent = "Заполните все поля";
  statusMessage.style.display = 'none';
  nextBtn.parentNode.insertBefore(statusMessage, nextBtn);

  // Функция проверки всех полей
  const checkFields = () => {
    // Проверяем, что все required поля заполнены корректно
    const allFilled = areRequiredFieldsFilled(containerSelector);
    let finalValid = allFilled;

    // Дополнительно проверяем выбор иконки балкона
    if(containerSelector === '.popup_calc_content') {
      const balconIcons = container.querySelectorAll('.balcon_icons_img');
      const isBalconSelected = Array.from(balconIcons).some(icon =>
        icon.classList.contains('do_image_more') 
      );
      finalValid = allFilled && isBalconSelected;
    }
    console.log('finalValid:', finalValid);
    
    if (finalValid) {
      nextBtn.disabled = false;
      statusMessage.style.display = 'none';
    } else {
      nextBtn.disabled = true;
    }
    return finalValid;
  };
  

  // Кнопка должна быть активна при загрузке
  nextBtn.disabled = false;

  // Отслеживаем ввод и изменения
  requiredFields.forEach(field => {
    field.addEventListener('input', () => {
      statusMessage.style.display = 'none';
      checkFields();
    });
    field.addEventListener('change', () => {
      statusMessage.style.display = 'none';
      checkFields();
    });
  });

  if(containerSelector === '.popup_calc_content'){
    const balconIcons = container.querySelectorAll('.balcon_icons_img');
    balconIcons.forEach(i => i.classList.remove('do_image_more'));

    balconIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        // Удаляем класс у всех
        balconIcons.forEach(i => i.classList.remove('do_image_more'));
        // Добавляем класс только к тому, по которому кликнули
        icon.classList.add('do_image_more');
        // Перезапускаем проверку, но НЕ всю функцию валидации
        statusMessage.style.display = 'none';
        checkFields();
      });
    });
  }


  // Обработчик клика по кнопке
  nextBtn.addEventListener('click', (e) => {
    const valid = checkFields();
    console.log('Валидация при клике: ', valid);
    if (!valid) {
      e.preventDefault(); // блокируем переход/отправку
      nextBtn.disabled = true; // блокируем кнопку
      statusMessage.style.display = 'block'; // показываем ошибку
    } else {
      statusMessage.style.display = 'none';
    }
  });

}

export default validateCalcFields;
