document.addEventListener("DOMContentLoaded", () => {
    const tabBtns = document.querySelectorAll(".m-button-list a");
    const movieContents = document.querySelectorAll(".movie-content");
    const movieWrap = document.querySelector(".movie-wrap");

    // 탭 전환
    tabBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const tabName = btn.dataset.tab;

            tabBtns.forEach(tab => tab.classList.remove("active"));
            btn.classList.add("active");

            movieContents.forEach(content => {
                content.classList.remove("active");

                if (content.dataset.content === tabName) {
                    content.classList.add("active");
                }
            });
        });
    });

    // 하트 토글
    movieWrap.addEventListener("click", (e) => {
        const heartBtn = e.target.closest(".heart-btn");
        if (!heartBtn) return;

        const posterBox = heartBtn.closest(".poster-box");
        if (!posterBox) return;

        posterBox.classList.toggle("liked");
    });
});