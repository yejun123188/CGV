movies.forEach(movie => {
    const card = `
        <div class="card">
            <img src="${"src", "./images/ky-sub/movie-list/movie porster/footer-poster-02.jpg"}">
            <h3>${movie.title}</h3>
            <p>${movie.price}원</p>
            <button>예매하기</button>
            <button>상세보기</button>
        </div>
    `;

    document.write("movie")
    document.querySelector(".card-container")
});