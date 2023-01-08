import {postData} from '../services/requests';

const drop = () => {
    const fileInputns = document.querySelectorAll('[name="upload"]');

    ['dragenter','dragleave','dragover', 'drop'].forEach(eventName => {  //создаём массив событий и на каждый эл-т навешиваем обработчик
            fileInputns.forEach(input => {
                input.addEventListener(eventName, preventDefaults, false);
            });
    });

    function preventDefaults(e) { //отмена стандартного поведения
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) { // показываем пользователю область загрузки
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7";
    }

    function unhighlight(item) {  // востанавливаем цвет области загрузки
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter','dragover'].forEach(eventName => {
        fileInputns.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave','drop'].forEach(eventName => {
        fileInputns.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputns.forEach(input => {
        input.addEventListener('drop', (e) => { // обрабатывам событие drop и отправляем данные на сервер
            preventDefaults(e);
                        
            input.files = e.dataTransfer.files;

            const formData = new FormData();
            [...input.files].forEach(file => {
                formData.append('file', file);
                postData('assets/server.php', formData)
               .then(res => {
                  console.log(res);
                })
               .catch(() => {
                let textMessage = document.createElement('div');
                textMessage.textContent = 'нет загрузки';
                input.parentNode.appendChild(textMessage);
                })
            })
            
            let dots;
            const arr = input.files[0].name.split('.'); // изменяем длину названия файла

            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
       });
    });
};

export default drop;