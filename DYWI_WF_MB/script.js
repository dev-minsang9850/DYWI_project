document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    const API_KEY = 'df333e8c6c05a0c2916457f70b53c04b'; // 여기에 발급받은 OpenWeatherMap API 키를 입력하세요
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=' + API_KEY + '&units=metric'; // 가져올 도시 이름에 따라 수정 가능

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const location = data.name + ', ' + data.sys.country;
            const temperature = data.main.temp + '℃';
            const description = data.weather[0].description;

            document.getElementById('location').textContent = location;
            document.getElementById('temperature').textContent = '온도: ' + temperature;
            document.getElementById('description').textContent = '날씨: ' + description;
        })
        .catch(error => console.error('날씨 정보를 가져오는 동안 오류가 발생했습니다.', error));
}

document.getElementById('back_button').addEventListener('click', function() {
    location.reload();
});