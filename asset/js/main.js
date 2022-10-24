var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerView: "auto",
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
});

const currentDay = moment().format('ddd, MMM DD YYYY');
$('#today').text(currentDay);

const date = moment().format('MM/DD/YY');

let searchInput = $('#userInput');
let searchBtn = $('#searchBtn');
let recent = $('#recentBox');

// display main city 1 temp. 
let displayMainTemp1 = function(){
    let cityName = "Toronto"
    $(`#cityName1`).text(cityName);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1d4fe92726b0d3cc08e41e30f8f8511d&units=metric`;

    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(data) {
                let icon = data.weather[0].icon;
                $(`#icon1`).html(`<img src = http://openweathermap.org/img/wn/${icon}.png>`);
                let temp = Math.round(data.main.temp); 
                $(`#mainTemp1`).text(`${temp}°C`);

                //default display
                let cityName = data.name;        
                $(`#searchCity`).text(`${cityName} (${date})`);
                $(`#searchIcon`).html(`<img src = http://openweathermap.org/img/wn/${icon}.png>`);

                $(`#Temp`).text(`Temp: ${temp}°C`);

                let wind = data.wind.speed;
                $('#Wind').text(`Wind: ${wind} MPS`);

                let humid = data.main.humidity;
                $(`#Hum`).text(`Humidity: ${humid}%`)

        });
    } 

})
    .catch(function() {
        alert("Unable to connect, please try again later");
    });
};

// display main city 2 temp. 
let displayMainTemp2 = function(){
    let cityName = "Vancouver"
    $(`#cityName2`).text(cityName);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1d4fe92726b0d3cc08e41e30f8f8511d&units=metric`;

    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(data) {
                let icon = data.weather[0].icon;
                $(`#icon2`).html(`<img src = http://openweathermap.org/img/wn/${icon}.png>`);
                let temp = Math.round(data.main.temp); 
                $(`#mainTemp2`).text(`${temp}°C`);
                console.log(data);
        });
    } 

})
    .catch(function() {
        alert("Unable to connect, please try again later");
    });
};

displayMainTemp1();
displayMainTemp2();

let forecast = function(){
    let defaultCity = 'Toronto'
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=1d4fe92726b0d3cc08e41e30f8f8511d&units=metric`;

    fetch(url).then(function(response){

        if(response.ok){
            response.json().then(function(data) {
                console.log(data);
                for(let i = 0; i < data.list.length; i+=8){
                    let forecastDetail ={
                        date:data.list[i].dt,
                        icon:data.list[i].weather[0].icon,
                        temp:Math.round(data.list[i].main.temp),
                        wind:data.list[i].wind.speed,
                        humid:data.list[i].main.humidity
                    };
                    let displayDate = moment.unix(forecastDetail.date).format("MM/DD/YYYY");
                    let weatherIcon = `<img src = http://openweathermap.org/img/wn/${forecastDetail.icon}.png>`
                    console.log(forecastDetail.temp)
                    $(`#day${i} h2`).text(displayDate);
                    $(`#day${i} .c-img`).html(weatherIcon);
                    $(`#day${i} .temp`).text(`Temp:${forecastDetail.temp}°C`)
                    $(`#day${i} .wind`).text(`Wind:${forecastDetail.wind}MPS`)
                    $(`#day${i} .humid`).text(`Humidity:${forecastDetail.humid}%`)
                }
                
        });
        
    } 

})
    .catch(function() {
        alert("Unable to connect, please try again later");
    });
}
//default city 
forecast();

let searchResult = function(){

    let searchCityName = searchInput.val().trim().toUpperCase();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityName}&appid=1d4fe92726b0d3cc08e41e30f8f8511d&units=metric`;

    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(data) {
                console.log(data);
                let cityName = data.name;        
                $(`#searchCity`).text(`${cityName} (${date})`);
                let icon = data.weather[0].icon;
                $(`#searchIcon`).html(`<img src = http://openweathermap.org/img/wn/${icon}.png>`);
                localStorage.setItem('city', JSON.stringify(cityName));
                searchInput.value= '';

                let temp = Math.round(data.main.temp); 
                $(`#Temp`).text(`Temp: ${temp}°C`);

                let wind = data.wind.speed;
                $('#Wind').text(`Wind: ${wind} MPS`);

                let humid = data.main.humidity;
                $(`#Hum`).text(`Humidity: ${humid}%`)

        });
    } 

})
    .catch(function() {
        alert("Unable to connect, please try again later");
    });

    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCityName}&appid=1d4fe92726b0d3cc08e41e30f8f8511d&units=metric`;
    fetch(forecastUrl).then(function(response){

        if(response.ok){
            response.json().then(function(data) {
                console.log(data);
                for(let i = 0; i < data.list.length; i+=8){
                    let forecastDetail ={
                        date:data.list[i].dt,
                        icon:data.list[i].weather[0].icon,
                        temp:Math.round(data.list[i].main.temp),
                        wind:data.list[i].wind.speed,
                        humid:data.list[i].main.humidity
                    };
                    let displayDate = moment.unix(forecastDetail.date).format("MM/DD/YYYY");
                    let weatherIcon = `<img src = http://openweathermap.org/img/wn/${forecastDetail.icon}.png>`
                    console.log(forecastDetail.temp)
                    $(`#day${i} h2`).text(displayDate);
                    $(`#day${i} .c-img`).html(weatherIcon);
                    $(`#day${i} .temp`).text(`Temp:${forecastDetail.temp}°C`)
                    $(`#day${i} .wind`).text(`Wind:${forecastDetail.wind}MPS`)
                    $(`#day${i} .humid`).text(`Humidity:${forecastDetail.humid}%`)
                }
                
        });
        
    } 

})
    .catch(function() {
        alert("Unable to connect, please try again later");
    });

}


searchBtn.click(searchResult);

