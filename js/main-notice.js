let swiper = new Swiper(".slider-wrap", {
    loop: true,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    speed: 800,
    navigation: {
        nextEl: ".arrow-btn-right",
        prevEl: ".arrow-btn-left",
    },
    breakpoints: {
        // 480px 이상
        480: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true,
        },
        // 768px 이상
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false,
        },
        // 1280px 이상
        1280: {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
        }
    },



    observer: true,
    observeParents: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});