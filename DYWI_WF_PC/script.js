document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'df333e8c6c05a0c2916457f70b53c04b'; // 여기에 OpenWeatherMap API 키를 입력하세요

    function fetchWeatherData(lat, lon) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data); // 데이터 확인용

                // 도시 이름을 한국어로 표시
                const locationName = data.name; // API에서 반환된 도시 이름
                const koreanLocationName = translateLocationName(locationName); // 한국어로 변환된 도시 이름

                document.getElementById('location').textContent = `위치: ${koreanLocationName}`;
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

    function translateLocationName(locationName) {
        // 도시 이름을 한국어로 변환하는 함수
        const locationMapping = {
            "Seoul": "서울특별시",
            "Busan": "부산광역시",
            "Incheon": "인천광역시",
            "Daegu": "대구광역시",
            "Daejeon": "대전광역시",
            "Gwangju": "광주광역시",
            "Ulsan": "울산광역시",
            "Sejong": "세종특별자치시",
            "Suwon": "수원시",
            "Changwon": "창원시",
            "Goyang": "고양시",
            "Yongin": "용인시",
            "Cheongju": "청주시",
            "Jeonju": "전주시",
            "Cheonan": "천안시",
            "Ansan": "안산시",
            "Bucheon": "부천시",
            "Gimhae": "김해시",
            "Pohang": "포항시",
            "Jinju": "진주시",
            "Hwaseong": "화성시",
            "Namyangju": "남양주시",
            "Siheung": "시흥시",
            "Gumi": "구미시",
            "Pyeongtaek": "평택시",
            "Uijeongbu": "의정부시",
            "Paju": "파주시",
            "Gimpo": "김포시",
            "Gwangmyeong": "광명시",
            "Wonju": "원주시",
            "Asan": "아산시",
            "Iksan": "익산시",
            "Gunsan": "군산시",
            "Gyeongju": "경주시",
            "Yangsan": "양산시",
            "Gwangju (Gyeonggi)": "광주시 (경기도)",
            "Suncheon": "순천시",
            "Chuncheon": "춘천시",
            "Gyeongsan": "경산시",
            "Mokpo": "목포시",
            "Gangneung": "강릉시",
            "Pocheon": "포천시",
            "Tongyeong": "통영시",
            "Yeosu": "여수시",
            "Miryang": "밀양시",
            "Geoje": "거제시",
            "Sacheon": "사천시",
            "Gunpo": "군포시",
            "Icheon": "이천시",
            "Osan": "오산시",
            "Hanam": "하남시",
            "Guri": "구리시",
            "Anseong": "안성시",
            "Pyeongchang": "평창군",
            "Jeju": "제주시",
            "Seogwipo": "서귀포시"
            // 필요에 따라 더 많은 매핑 추가
        };

        return locationMapping[locationName] || locationName; // 매핑된 이름이 없으면 원래 이름 반환
    }

    function getLocationAndFetchWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchWeatherData(latitude, longitude);
                },
                (error) => {
                    const locationElement = document.getElementById('location');
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            locationElement.textContent = "사용자가 위치 정보 제공을 거부했습니다.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            locationElement.textContent = "위치 정보를 사용할 수 없습니다.";
                            console.error('위치 정보를 사용할 수 없습니다:', error.message);
                            break;
                        case error.TIMEOUT:
                            locationElement.textContent = "위치 정보를 가져오는 요청이 시간 초과되었습니다.";
                            console.error('위치 정보를 가져오는 요청이 시간 초과되었습니다:', error.message);
                            break;
                        case error.UNKNOWN_ERROR:
                            locationElement.textContent = "알 수 없는 오류가 발생했습니다.";
                            console.error('알 수 없는 오류가 발생했습니다:', error.message);
                            break;
                    }
                },
                {
                    timeout: 10000 // 10초 후에 타임아웃 발생
                }
            );
        } else {
            document.getElementById('location').textContent = "이 브라우저는 Geolocation을 지원하지 않습니다.";
        }
    }

    // 요소가 존재하는지 확인한 후 이벤트 리스너 추가
    const backButton = document.getElementById('back_button');
    if (backButton) {
        backButton.addEventListener('click', getLocationAndFetchWeather);
    }

    // 페이지 로드 시 위치 정보를 가져와 날씨 정보 가져오기
    getLocationAndFetchWeather();

    const menuButton = document.getElementById('menu_button');
    const menuScreen = document.getElementById('menu_screen');
    const closeMenuButton = document.getElementById('close_menu');

    function toggleMenu() {
        if (menuScreen) {
            menuScreen.classList.toggle('hidden');
        }
    }

    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }

    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', toggleMenu);
    }
});
