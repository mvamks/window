export function areRequiredFieldsFilled(containerSelector) {
     console.log('Проверка обязательных полей...');
  
  const container = document.querySelector(containerSelector);
  if (!container) return true; // если контейнера нет — считаем валидным

  const requiredFields = container.querySelectorAll('input[required], select[required]');
  let allFilled = true;

  requiredFields.forEach(field => {
    if (field.type === 'checkbox') {
      const group = container.querySelectorAll(`input[name="${field.name}"]`);
      const checkedInGroup = Array.from(group).some(box => box.checked);
      console.log(`Чекбокс группа "${field.name}", выбран ли хоть один?`, checkedInGroup);
      if (!checkedInGroup) {
        allFilled = false;
      }
    } else {
      const valueTrimmed = field.value.trim();
      console.log(`Поле "${field.name || field.id}", значение: "${valueTrimmed}"`);
      if (valueTrimmed === '') allFilled = false;
    }
  });

  console.log('Итог проверки полей:', allFilled);
  return allFilled;
};

export function clearObject(obj) {
  Object.keys(obj).forEach(key => delete obj[key]);
};