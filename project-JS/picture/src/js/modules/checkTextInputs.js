const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector); // прроверка ввода русских букв || цифр

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }
        });
    });

};

export default checkTextInputs;