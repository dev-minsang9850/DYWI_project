

//새로운 요소
document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'df333e8c6c05a0c2916457f70b53c04b'; // 여기에 OpenWeatherMap API 키를 입력하세요

    function fetchWeatherData(lat, lon) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

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

    function getLocationAndFetchWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeatherData(latitude, longitude);
            }, (error) => {
                const locationElement = document.getElementById('location');
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        locationElement.textContent = "사용자가 위치 정보 제공을 거부했습니다.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationElement.textContent = "위치 정보를 사용할 수 없습니다.";
                        break;
                    case error.TIMEOUT:
                        locationElement.textContent = "위치 정보를 가져오는 요청이 시간 초과되었습니다.";
                        break;
                    case error.UNKNOWN_ERROR:
                        locationElement.textContent = "알 수 없는 오류가 발생했습니다.";
                        break;
                    }
            });
        } else {
            document.getElementById('location').textContent = "이 브라우저는 Geolocation을 지원하지 않습니다.";
        }
    }

    document.getElementById('back_button').addEventListener('click', getLocationAndFetchWeather);

    // 페이지 로드 시 위치 정보를 가져와 날씨 정보 가져오기
    getLocationAndFetchWeather();
    
});

//메뉴버튼 생성 -> menu button added
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu_button');
    const menuScreen = document.getElementById('menu_screen');
    const closeMenuButton = document.getElementById('close_menu');

    function toggleMenu() {
        menuScreen.classList.toggle('hidden');
    }

    menuButton.addEventListener('click', toggleMenu);
    closeMenuButton.addEventListener('click', toggleMenu);
});