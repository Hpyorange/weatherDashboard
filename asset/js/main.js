var swiper = new Swiper(".mySwiper", {
    // effect: "coverflow",
    // grabCursor: true,
    // centeredSlides: true,
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