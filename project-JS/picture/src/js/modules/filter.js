const filter = () => {
   const menu = document.querySelector('.portfolio-menu'),
         items = menu.querySelectorAll('li'),
        
         wrapper = document.querySelector('.portfolio-wrapper'),
         markAll = wrapper.querySelectorAll('.all'),
       
         no = document.querySelector('.portfolio-no');

   const typeFilter = (markType) => { //скрываем все элементы
       markAll.forEach(mark => {
           mark.style.display = 'none';
           mark.classList.remove('animated', 'fadeIn');
       });

       no.style.display = "none";
       no.classList.remove('animated', 'fadeIn');

       if (markType) {
           markType.forEach(mark => { // показываем элементы той кнопки, на которую кликнул пользователь
               mark.style.display = 'block';
               mark.classList.add('animated', 'fadeIn');
           });
       } else {
           no.style.display = 'block'; 
           no.classList.add('animated', 'fadeIn');
       }
   };

  
   menu.addEventListener('click', (e) => {
        let target = e.target;

       if (target && target.tagName == "LI") { //устанавливаем активность на элемент, котрый кликнул пользователь с помощью деллегирования событий
           items.forEach(btn => btn.classList.remove('active'));
           target.classList.add('active');
       }

       let listSelect = target.classList[0]; //добавляем фильтрацию
      
      typeFilter(wrapper.querySelectorAll(`.${listSelect}`));

        if (listSelect == 'grandmother' || listSelect == 'granddad') {
         typeFilter();
       }
   });
};

export default filter;