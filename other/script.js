document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("form").addEventListener("submit", function (event) {

        event.preventDefault();

        

        let questionType = document.getElementById("question-type").value;

        let message = document.getElementById("message").value.trim();

        let fileInput = document.getElementById("file");

        let file = fileInput.files.length > 0 ? fileInput.files[0].name : null;

        let city = document.getElementById("city").value;

        let name = document.getElementById("name").value.trim();

        let email = document.getElementById("email").value.trim();

        

        if (!questionType || !message || !city || !name || !email || !file) {

            alert("Пожалуйста, заполните все поля!");

            return;

        }



        let info = `Тип вопроса: ${questionType}\nСообщение: ${message}\nФайл: ${file}\nГород: ${city}\nИмя: ${name}\nE-mail: ${email}`;

        alert(info);

    });

});

