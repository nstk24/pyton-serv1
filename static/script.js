document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('btn');
    const output = document.getElementById('output');

    button.addEventListener('click', function() {
        button.textContent = 'Loading...'; // Устанавливаем текст кнопки
        fetch('/data', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            button.textContent = 'Get Data'; // Восстанавливаем текст кнопки
            const newMessage = document.createElement('p');
            newMessage.textContent = JSON.stringify(data);
            output.appendChild(newMessage); // Добавляем новое сообщение
        })
        .catch(error => {
            button.textContent = 'Get Data'; // Восстанавливаем текст кнопки
            console.error("Error:", error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error fetching data!';
            errorMessage.style.color = 'red';
            output.appendChild(errorMessage); // Показываем сообщение об ошибке
        });
    });

    // Добавление нового кода для обработки формы
    const form = document.getElementById('messageForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = document.getElementById('messageInput').value;
        
        fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const newMessage = document.createElement('p');
            newMessage.textContent = 'Server response: ' + JSON.stringify(data);
            output.appendChild(newMessage); // Выводим ответ сервера
        })
        .catch(error => {
            console.error("Error:", error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error sending message!';
            errorMessage.style.color = 'red';
            output.appendChild(errorMessage); // Показываем сообщение об ошибке
        });
    });
});
