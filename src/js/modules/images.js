import getSlider from "./slider";

const images = () => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img');
    
    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImage);
    
    workSection.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target;

        if(target && target.classList.contains('preview')) {
            const path = target.parentNode.getAttribute('href');
            imgPopup.innerHTML = '';
            getSlider(imgPopup, path);
            imgPopup.style.display = 'flex';
            
            document.body.classList.add('modal-open');  
        }

        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
};

export default images;