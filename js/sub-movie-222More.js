window.addEventListener("load", function () {
    const scrollDown = document.querySelector(".scroll-down-wrap");
    if (scrollDown) {
        setTimeout(() => {
            scrollDown.classList.add("show");
        }, 500);
    }
});








const bgSlides = document.querySelectorAll(".bg-slide");

const bgImages = [
    "./images/movie-more/main/slide2img.jpg",
    "./images/movie-more/main/slide3img.jpg",
    "./images/movie-more/main/slide4img.jpg",
    "./images/movie-more/main/slide5img.jpg"
];

let current = 0;
let visible = 0; // 현재 보이는 레이어 인덱스

setInterval(() => {
    const next = (current + 1) % bgImages.length;

    const currentSlide = bgSlides[visible];
    const nextSlide = bgSlides[visible === 0 ? 1 : 0];

    nextSlide.style.backgroundImage = `url('${bgImages[next]}')`;
    nextSlide.classList.add("active");
    currentSlide.classList.remove("active");

    visible = visible === 0 ? 1 : 0;
    current = next;
}, 3500);







window.addEventListener("load", () => {
    const poster = document.querySelector(".intro-poster");
    const info = document.querySelector(".intro-info");

    setTimeout(() => {
        poster.classList.add("show");
        info.classList.add("show");
    }, 150);
});




const toggleBtn = document.getElementById("storyToggle");
const storyText = document.getElementById("storyText");

if (toggleBtn && storyText) {
    toggleBtn.addEventListener("click", function () {
        storyText.classList.toggle("open");

        if (storyText.classList.contains("open")) {
            toggleBtn.textContent = "접기";
        } else {
            toggleBtn.textContent = "더보기";
        }
    });
}


const mainTrailer = document.getElementById("mainTrailer");
const trailerThumbs = document.querySelectorAll(".trailer-thumb");

trailerThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        const videoUrl = thumb.dataset.video;

        trailerThumbs.forEach((item) => item.classList.remove("active"));
        thumb.classList.add("active");

        mainTrailer.src = videoUrl;
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const btnInfo = document.getElementById("btn-info");
    const btnReview = document.getElementById("btn-review");

    const panelInfo = document.getElementById("info");
    const panelReview = document.getElementById("review");
    const layout = document.querySelector(".trailer-layout");
    const mainTrailer = document.getElementById("mainTrailer");
    const trailerThumbs = document.querySelectorAll(".trailer-thumb");

    if (!btnInfo || !btnReview || !panelInfo || !panelReview || !mainTrailer) return;

    let currentTrailerSrc = mainTrailer.src;

    // 영화 상세정보 탭
    btnInfo.addEventListener("click", function () {
        layout.classList.remove("review-mode"); // 추가

        btnInfo.classList.add("active");
        btnReview.classList.remove("active");

        panelInfo.classList.add("active");
        panelReview.classList.remove("active");

        // review 갔다가 돌아오면 마지막 영상 복구
        if (!mainTrailer.src || mainTrailer.src === "about:blank") {
            mainTrailer.src = currentTrailerSrc;
        }
    });

    // 실관람자 후기 탭
    btnReview.addEventListener("click", function () {

        layout.classList.add("review-mode"); // 추가

        btnReview.classList.add("active");
        btnInfo.classList.remove("active");

        panelReview.classList.add("active");
        panelInfo.classList.remove("active");

        // 현재 영상 주소 저장 후 정지
        currentTrailerSrc = mainTrailer.src;
        mainTrailer.src = "about:blank";
    });

    // 썸네일 클릭 시 메인 영상 변경
    trailerThumbs.forEach((thumb) => {
        thumb.addEventListener("click", function () {
            const videoUrl = this.dataset.video;
            if (!videoUrl) return;

            trailerThumbs.forEach((item) => item.classList.remove("active"));
            this.classList.add("active");

            mainTrailer.src = videoUrl;
            currentTrailerSrc = videoUrl;
        });
    });
});

const trailerThumbList = document.getElementById("trailerThumbList");
const thumbPrev = document.querySelector(".thumb-prev");
const thumbNext = document.querySelector(".thumb-next");

function getThumbMoveWidth() {
    if (!trailerThumbList) return 0;
    const firstThumb = trailerThumbList.querySelector(".trailer-thumb");
    if (!firstThumb) return 0;

    const gap = parseInt(window.getComputedStyle(trailerThumbList).gap) || 0;
    return firstThumb.offsetWidth + gap;
}

if (thumbPrev && thumbNext && trailerThumbList) {
    thumbNext.addEventListener("click", () => {
        trailerThumbList.scrollBy({
            left: getThumbMoveWidth(),
            behavior: "smooth"
        });
    });

    thumbPrev.addEventListener("click", () => {
        trailerThumbList.scrollBy({
            left: -getThumbMoveWidth(),
            behavior: "smooth"
        });
    });
}



document.addEventListener("DOMContentLoaded", function () {
    const scrollDownWrap = document.getElementById("scrollDownWrap");
    const scrollDownBtn = document.getElementById("scrollDownBtn");
    const targetSection = document.getElementById("movie-detail");

    if (!scrollDownWrap) return;

    // 첫 진입 시 서서히 등장
    setTimeout(() => {
        scrollDownWrap.classList.add("show");
    }, 500);

    // 버튼 클릭 시 아래 섹션으로 이동
    if (scrollDownBtn && targetSection) {
        scrollDownBtn.addEventListener("click", function (e) {
            e.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    // 스크롤 위치에 따라 숨김/표시
    window.addEventListener("scroll", function () {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            scrollDownWrap.classList.remove("show");
            scrollDownWrap.classList.add("hide");
        } else {
            scrollDownWrap.classList.remove("hide");
            scrollDownWrap.classList.add("show");
        }
    });
});

// 스틸컷자바

document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.getElementById("steelGallery");
    const moreBtn = document.getElementById("steelMoreBtn");

    if (!gallery || !moreBtn) return;

    moreBtn.addEventListener("click", (e) => {

        e.preventDefault();

        gallery.classList.toggle("expanded");

        if (gallery.classList.contains("expanded")) {
            moreBtn.querySelector(".more-text").textContent = "접기";
        } else {
            moreBtn.querySelector(".more-text").textContent = "+3";
        }

    });

});

// 이벤트
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Swiper === "undefined") return;

    const pageEl = document.querySelector(".event-pagination");

    const eventSwiper = new Swiper(".eventSwiper", {
        slidesPerView: 2,
        spaceBetween: 24,
        navigation: {
            nextEl: ".event-next",
            prevEl: ".event-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            900: {
                slidesPerView: 2,
                spaceBetween: 24,
            }
        },
        on: {
            init: function () {
                updateEventPagination(this);
            },
            slideChange: function () {
                updateEventPagination(this);
            }
        }
    });

    function updateEventPagination(swiper) {
        if (!pageEl) return;

        const totalPages = Math.ceil(swiper.slides.length / swiper.params.slidesPerView);
        const currentPage = Math.floor(swiper.activeIndex / swiper.params.slidesPerView) + 1;

        pageEl.innerHTML = `<span class="current">${currentPage}</span> / ${totalPages}`;
    }
});


const actorList = document.getElementById("actorList");
const actorPrev = document.querySelector(".actor-prev");
const actorNext = document.querySelector(".actor-next");

function getActorMoveWidth() {
    const first = actorList.querySelector(".cast");
    if (!first) return 0;

    const gap = 16;
    return first.offsetWidth + gap;
}

actorNext.addEventListener("click", () => {
    actorList.scrollBy({
        left: getActorMoveWidth(),
        behavior: "smooth"
    });
});

actorPrev.addEventListener("click", () => {
    actorList.scrollBy({
        left: -getActorMoveWidth(),
        behavior: "smooth"
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const heartBtn = document.querySelector(".heart-btn");
    const heartImg = heartBtn.querySelector("img");

    heartBtn.addEventListener("click", function (e) {
        e.preventDefault();

        heartBtn.classList.toggle("active");

        if (heartBtn.classList.contains("active")) {
            heartImg.src = "./images/movie-more/main/heart-red.png";
        } else {
            heartImg.src = "./images/movie-more/main/heart-white-1.png";
        }
    });
});

document.querySelectorAll('.trailer-thumb').forEach(thumb => {
    thumb.querySelector('button').addEventListener('click', function () {
        // active 클래스 이동
        document.querySelectorAll('.trailer-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        // data-video URL을 embed 형식으로 변환
        let videoUrl = thumb.dataset.video;

        // youtu.be 단축 URL → embed 변환
        videoUrl = videoUrl.replace('https://youtu.be/', 'https://www.youtube.com/embed/');

        // 쿼리스트링 앞 ? 처리 (si= 파라미터 제거 후 autoplay 추가)
        const videoId = videoUrl.split('/embed/')[1]?.split('?')[0];
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;

        // iframe src 교체
        document.getElementById('mainTrailer').src = embedUrl;
    });
});