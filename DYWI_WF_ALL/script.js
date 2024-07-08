const apiKey = 'df333e8c6c05a0c2916457f70b53c04b';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("사용자가 위치 정보 요청을 거부했습니다.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("위치 정보를 사용할 수 없습니다.");
            break;
        case error.TIMEOUT:
            alert("요청 시간이 초과되었습니다.");
            break;
        case error.UNKNOWN_ERROR:
            alert("알 수 없는 오류가 발생했습니다.");
            break;
    }
}

async function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status !== 200) {
            alert('날씨 데이터를 찾을 수 없습니다.');
            return;
        }

        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = '';

        // 각 날의 첫 번째 예보를 선택합니다.
        const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 7);

        dailyForecasts.forEach(day => {
            const date = new Date(day.dt * 1000);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.innerHTML = `
                <h3>${date.toLocaleDateString('ko-KR', options)}</h3>
                <p>기온: ${day.main.temp} °C</p>
                <p>날씨: ${day.weather[0].description}</p>
                <p>습도: ${day.main.humidity}%</p>
            `;
            forecastDiv.appendChild(dayDiv);
        });
    } catch (error) {
        console.error('날씨 데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
}
