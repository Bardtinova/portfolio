//import checkNumInputs from './checkNumInputs';
import {postData} from '../services/requests';

const forms = () => {
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');
    const size = document.querySelector('#size'),
          material = document.querySelector('#material'),
          options = document.querySelector('#options'),
          result = document.querySelector('.calc-price'),
          textArea = document.querySelector('textarea[name="message"]'); 
          
          

     //checkNumInputs('input[name="user_phone"]');
      
     const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скро свяжемcя',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
     };

     const path = {
      designer: 'assets/server.php',
      question: 'assets/question.php'
     };
     
     const clearInputs = () => { //clear inputs
         inputs.forEach(i => {
            i.value = '';
         });
         upload.forEach(i => {
            i.previousElementSibling.textContent = 'Файл не выбран';
         });
         textArea.value = '';
         result.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
         size.selectedIndex = 0;
         material.selectedIndex = 0;
         options.selectedIndex = 0;
     };

     upload.forEach(i => {                      //set filename limit
         i.addEventListener('input', () => {
            console.log(i.files[0]);
            let dots;
            const arr = i.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            i.previousElementSibling.textContent = name;
         });
     });
     
     forms.forEach(item => {   // send data
         item.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let statusMessage = document.createElement('div'); //set message
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated','fadeOutUp');
            setTimeout(() => {
               item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img'); //set image
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);  //send  formData
           
            let api;
           item.closest('.popup-design') || item.classList.contains("calc_form") ? api = path.designer : api = path.question;
            console.log(api);
            console.log(textArea.value);
            formData.append('size', size.value);
            formData.append('material', material.value);
            formData.append('options', options.value);
            formData.append('result', result.textContent); 
            formData.append('message', textArea.value);
            
            postData(api, formData)
               .then(res => {
                  console.log(res);
                  statusImg.setAttribute('src', message.ok);
                  textMessage.textContent = message.success;
               })
               .catch(() => {
                  statusImg.setAttribute('src', message.fail);
                  textMessage.textContent = message.failure;
               })
               .finally(() => {
                  clearInputs();
                  setTimeout(() => {
                     statusMessage.remove();
                     item.style.display = 'block';
                     item.classList.remove('fadeOutUp');
                     item.classList.add('fadeInUp');
                  }, 5000);
               });
         });
     });
};

export default forms;