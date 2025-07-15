import validateCalcFields from './validateCalcFields';
import { areRequiredFieldsFilled } from './utils';

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          scroll = calcScroll();


        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target) e.preventDefault();
                
                if (modalSelector === '.popup_calc_profile') {
                    if (!areRequiredFieldsFilled('.popup_calc_content')) {
                        console.log('Заполните все поля в первом шаге');
                        return;
                    }
                } else if (modalSelector === '.popup_calc_end') {
                    if (!areRequiredFieldsFilled('.popup_calc_profile_content')) {
                        console.log('Заполните все поля во втором шаге');
                        return;
                    }
                }
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                
                modal.style.display = 'block';
                //document.body.overflow = 'hidden';
                document.body.classList.add('modal-open'); 
                document.body.style.marginRight = `${scroll}px`;  

                if (modalSelector === '.popup_calc') {
                    setTimeout(() => {
                        validateCalcFields('.popup_calc_content', '[data-next]');
                    }, 0);
                }

                if (modalSelector === '.popup_calc_profile') {
                    setTimeout(() => {
                        validateCalcFields('.popup_calc_profile_content', '[data-next]');
                    }, 0);
                }
            });
        });
        
        

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            //document.body.overflow = '';
            document.body.classList.remove('modal-open');
            document.body.style.marginRight = `0px`;
        }); 

        modal.addEventListener('click', (e) => {
            if(e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                //document.body.overflow = '';
                document.body.classList.remove('modal-open');  
                document.body.style.marginRight = `${scroll}px`;
            }
        })
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.classList.add('modal-open');


        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

   
    /* const callEngineerBtn = document.querySelector('.popup_engineer_btn'),
          modalEngineer = document.querySelector('.popup_engineer'),
          modalEngineerClose = document.querySelector('.popup_engineer .popup_close'); */

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    //showModalByTime('.popup', 60000);   
};

export default modals;