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
console.log(currentDay)
$('#today').text(currentDay);

let searchInput = $('#userInput');

let recent = $('#recentBox');

let lat = "";
let lon = "";

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
        });
    } 

})
    .catch(function() {
        alert("Unable to connect, please try again later");
    });
};

//call function
displayMainTemp1();
displayMainTemp2();
