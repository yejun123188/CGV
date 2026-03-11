document.addEventListener("DOMContentLoaded", function () {

    // ─── 스크롤 다운 버튼 ───────────────────────────────────────
    const scrollDownWrap = document.getElementById("scrollDownWrap");
    const scrollDownBtn = document.querySelector(".scroll-down-btn");
    const targetSection = document.getElementById("movie-detail");

    if (scrollDownWrap) {
        setTimeout(() => scrollDownWrap.classList.add("show"), 500);

        if (scrollDownBtn && targetSection) {
            scrollDownBtn.addEventListener("click", function (e) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }

        window.addEventListener("scroll", function () {
            if (window.scrollY > 80) {
                scrollDownWrap.classList.remove("show");
            } else {
                scrollDownWrap.classList.add("show");
            }
        });
    }


    // ─── 배경 슬라이드 ───────────────────────────────────────────
    const bgSlides = document.querySelectorAll(".bg-slide");
    const bgImages = [
        "./images/movie-more/main/slide2img.jpg",
        "./images/movie-more/main/slide3img.jpg",
        "./images/movie-more/main/slide4img.jpg",
        "./images/movie-more/main/slide5img.jpg"
    ];

    let current = 0;
    let visible = 0;

    if (bgSlides.length >= 2) {
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
    }


    // ─── 인트로 포스터 등장 ──────────────────────────────────────
    const poster = document.querySelector(".intro-poster");
    const info = document.querySelector(".intro-info");

    if (poster && info) {
        setTimeout(() => {
            poster.classList.add("show");
            info.classList.add("show");
        }, 150);
    }


    // ─── 스토리 더보기 ───────────────────────────────────────────
    const toggleBtn = document.getElementById("storyToggle");
    const storyText = document.getElementById("storyText");

    if (toggleBtn && storyText) {
        toggleBtn.addEventListener("click", function () {
            storyText.classList.toggle("open");
            toggleBtn.textContent = storyText.classList.contains("open") ? "접기" : "더보기";
        });
    }


    // ─── 트레일러 플레이어 ───────────────────────────────────────
    const mainTrailer = document.getElementById("mainTrailer");
    const trailerThumbs = document.querySelectorAll(".trailer-thumb");
    const btnInfo = document.getElementById("btn-info");
    const btnReview = document.getElementById("btn-review");
    const panelInfo = document.getElementById("info");
    const panelReview = document.getElementById("review");
    const layout = document.querySelector(".trailer-layout");

    // youtu.be or watch URL → embed URL 변환 함수
    function toEmbedUrl(url) {
        if (!url) return "";

        // 이미 embed 형식이면 그대로 (autoplay만 보장)
        if (url.includes("/embed/")) {
            const id = url.split("/embed/")[1].split("?")[0];
            return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
        }

        // youtu.be 단축 URL
        if (url.includes("youtu.be/")) {
            const id = url.split("youtu.be/")[1].split("?")[0];
            return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
        }

        // youtube.com/watch?v=
        if (url.includes("watch?v=")) {
            const id = new URL(url).searchParams.get("v");
            return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
        }

        return url;
    }

    let currentTrailerSrc = mainTrailer ? mainTrailer.src : "";

    // 썸네일 클릭 → 메인 영상 변경 (단 한 곳에서만 등록)
    if (mainTrailer && trailerThumbs.length > 0) {
        trailerThumbs.forEach((thumb) => {
            thumb.addEventListener("click", function () {
                const embedUrl = toEmbedUrl(this.dataset.video);
                if (!embedUrl) return;

                trailerThumbs.forEach((t) => t.classList.remove("active"));
                this.classList.add("active");

                mainTrailer.src = embedUrl;
                currentTrailerSrc = embedUrl;
            });
        });
    }

    // 탭 전환 (영화정보 / 실관람자 후기)
    if (btnInfo && btnReview && panelInfo && panelReview && mainTrailer) {
        btnInfo.addEventListener("click", function () {
            layout && layout.classList.remove("review-mode");
            btnInfo.classList.add("active");
            btnReview.classList.remove("active");
            panelInfo.classList.add("active");
            panelReview.classList.remove("active");

            if (!mainTrailer.src || mainTrailer.src === "about:blank") {
                mainTrailer.src = currentTrailerSrc;
            }
        });

        btnReview.addEventListener("click", function () {
            layout && layout.classList.add("review-mode");
            btnReview.classList.add("active");
            btnInfo.classList.remove("active");
            panelReview.classList.add("active");
            panelInfo.classList.remove("active");

            currentTrailerSrc = mainTrailer.src;
            mainTrailer.src = "about:blank";
        });
    }


    // ─── 트레일러 썸네일 슬라이더 ───────────────────────────────
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
            trailerThumbList.scrollBy({ left: getThumbMoveWidth(), behavior: "smooth" });
        });
        thumbPrev.addEventListener("click", () => {
            trailerThumbList.scrollBy({ left: -getThumbMoveWidth(), behavior: "smooth" });
        });
    }


    // ─── 스틸컷 더보기 ───────────────────────────────────────────
    const gallery = document.getElementById("steelGallery");
    const moreBtn = document.getElementById("steelMoreBtn");

    if (gallery && moreBtn) {
        moreBtn.addEventListener("click", (e) => {
            e.preventDefault();
            gallery.classList.toggle("expanded");
            moreBtn.querySelector(".more-text").textContent =
                gallery.classList.contains("expanded") ? "접기" : "+3";
        });
    }


    // ─── 이벤트 Swiper ───────────────────────────────────────────
    if (typeof Swiper !== "undefined") {
        const pageEl = document.querySelector(".event-pagination");

        const eventSwiper = new Swiper(".eventSwiper", {
            slidesPerView: 2,
            spaceBetween: 24,
            navigation: {
                nextEl: ".event-next",
                prevEl: ".event-prev",
            },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 16 },
                900: { slidesPerView: 2, spaceBetween: 24 }
            },
            on: {
                init: function () { updateEventPagination(this); },
                slideChange: function () { updateEventPagination(this); }
            }
        });

        function updateEventPagination(swiper) {
            if (!pageEl) return;
            const totalPages = Math.ceil(swiper.slides.length / swiper.params.slidesPerView);
            const currentPage = Math.floor(swiper.activeIndex / swiper.params.slidesPerView) + 1;
            pageEl.innerHTML = `<span class="current">${currentPage}</span> / ${totalPages}`;
        }
    }


    // ─── 배우 슬라이더 ───────────────────────────────────────────
    const actorList = document.getElementById("actorList");
    const actorPrev = document.querySelector(".actor-prev");
    const actorNext = document.querySelector(".actor-next");

    function getActorMoveWidth() {
        if (!actorList) return 0;
        const first = actorList.querySelector(".cast");
        if (!first) return 0;
        return first.offsetWidth + 16;
    }

    if (actorList && actorPrev && actorNext) {
        actorNext.addEventListener("click", () => {
            actorList.scrollBy({ left: getActorMoveWidth(), behavior: "smooth" });
        });
        actorPrev.addEventListener("click", () => {
            actorList.scrollBy({ left: -getActorMoveWidth(), behavior: "smooth" });
        });
    }


    // ─── 실관람자 후기 슬라이더 ──────────────────────────────────
    const reviewTrack = document.getElementById("reviewTrack");
    const rvPrev = document.querySelector(".rv-prev");
    const rvNext = document.querySelector(".rv-next");

    if (reviewTrack && rvPrev && rvNext) {
        const reviewPages = reviewTrack.querySelectorAll(".review-page");
        let reviewIndex = 0;
        const totalPages = reviewPages.length;

        function moveReview(index) {
            reviewIndex = Math.max(0, Math.min(index, totalPages - 1));
            reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;

            // 버튼 비활성화 처리
            rvPrev.disabled = reviewIndex === 0;
            rvNext.disabled = reviewIndex === totalPages - 1;
        }

        // 초기 상태
        reviewTrack.style.transition = "transform 0.4s ease";
        moveReview(0);

        rvPrev.addEventListener("click", () => moveReview(reviewIndex - 1));
        rvNext.addEventListener("click", () => moveReview(reviewIndex + 1));
    }


    // ─── 하트 버튼 ───────────────────────────────────────────────
    const heartBtn = document.querySelector(".heart-btn");
    if (heartBtn) {
        const heartImg = heartBtn.querySelector("img");
        heartBtn.addEventListener("click", function (e) {
            e.preventDefault();
            heartBtn.classList.toggle("active");
            if (heartImg) {
                heartImg.src = heartBtn.classList.contains("active")
                    ? "./images/movie-more/main/heart-red.png"
                    : "./images/movie-more/main/heart-white-1.png";
            }
        });
    }

});
