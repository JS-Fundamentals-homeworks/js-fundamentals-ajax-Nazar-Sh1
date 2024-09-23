// На сторінці index.html знаходяться поля зазначені коментарем Task2
// При введені імені користувача в поле #userNameInput та натиску на кнопку
// #getUserButton потрібно зробити запит Fetch за посиланням - https://jsonplaceholder.typicode.com/users
// Віднайти користувача із введеним ім'ям, отримати місто його проживанння та
// відобразити у тезі #userCity
// Запустити програму потрібно за допомогою Live Server
// Перевірити правильність програми - команда node tests/task2.test.js


function fetchUserByName() {
    const getUserButton = document.getElementById('getUserButton');
    const userNameInput = document.getElementById('userNameInput');
    const userCity = document.getElementById('userCity');

    getUserButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim(); 

        if (userName === "") {
            userCity.textContent = "Please enter a user name."; 
            return;
        }

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                const user = users.find(u => u.name.toLowerCase() === userName.toLowerCase());
                if (user) {
                    userCity.textContent = `User's city: ${user.address.city}`; 
                } else {
                    userCity.textContent = "User not found."; 
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                userCity.textContent = "Error fetching user data."; 
            });
    });
}

fetchUserByName();
