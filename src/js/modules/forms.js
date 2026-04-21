import checkNumInputs from "./checkNumInputs";
import { clearObject } from "./utils";


const forms = (state) => {
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
          
          

    checkNumInputs('input[name="user_phone"]');
    
       
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скоро с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInput = () => {
        inputs.forEach(item => {
            item.value = "";
        });
    };

    function removeModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'none';
            document.body.classList.remove('modal-open');
        }, time);
    }

     // отправка формы
    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if(item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                    
                    removeModalByTime('.popup_calc_end', 3000);
                    clearObject(state);
                    console.log('state после очистки:', state);
                    
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInput();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });

};

export default forms;



