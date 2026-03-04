let swiper = new Swiper(".slider-wrap", {
    loop: true,
    centeredSlides: true,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
    speed: 800,
    navigation: {
        nextEl: ".arrow-btn-right",
        prevEl: ".arrow-btn-left",
    },

    slidesPerView: 3,
    spaceBetween: 30,


    observer: true,
    observeParents: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});