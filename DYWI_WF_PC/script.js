document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'df333e8c6c05a0c2916457f70b53c04b'; // 여기에 OpenWeatherMap API 키를 입력하세요
    const city = 'Seoul'; // 원하는 도시 이름을 입력하세요

    function fetchWeatherData() {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data); // 데이터 확인용

                document.getElementById('location').textContent = `위치: ${data.name}`;
                document.getElementById('temperature').textContent = `온도: ${data.main.temp}°C`;
                document.getElementById('description').textContent = `날씨: ${data.weather[0].description}`;

                // 현재 시간을 최종 업데이트 시간으로 설정
                const currentDateTime = new Date();
                document.getElementById('last-updated').textContent = `최종 업데이트: ${currentDateTime.toLocaleString()}`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    document.getElementById('back_button').addEventListener('click', fetchWeatherData);

    // 페이지 로드 시 날씨 정보 가져오기
    fetchWeatherData();
});

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');

    menuBtn.addEventListener('click', function() {
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });
});
