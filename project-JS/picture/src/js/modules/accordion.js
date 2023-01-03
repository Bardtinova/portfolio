const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function() {

            btns.forEach(btn => {  //удаляются стили со всех кнопок
                btn.classList.remove('active-style');
                btn.nextElementSibling.classList.remove('active-content');
                btn.nextElementSibling.style.maxHeight = '0px';
            });

            this.classList.add('active-style'); //добавляются стили на активные кнопки
            this.nextElementSibling.classList.add('active-content');
            this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
            
        });
    });


          //blocks = document.querySelectorAll(itemsSelector);

     /* blocks.forEach(block => {
        block.classList.add('animated', 'fadeInDown'); // работа с css анимацией
     });
     
     btns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                btns.forEach(btn => {
                    btn.classList.remove('active', 'active-style');
                });
                this.classList.add('active', 'active-style');
            }
        });
     }); */
};

export default accordion;