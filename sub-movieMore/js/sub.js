// tab-title-list>li를 저장
let tabTitles = document.querySelectorAll(".tab-title-list>li"
);
// tab-content를 저장
let tabContents = document.querySelectorAll(".tab-content-wrap>div");
console.log(tabContents);
// 이벤트 줄 버튼 찾기 /밖안요소 포이치 => 안에요소전부선택 포이치
tabTitles.forEach((tab, id) => {
    console.log(tabTitles);
    tab.addEventListener("click", () => {
        tabTitles.forEach((t, i) => {
            t.classList.remove("active");
            tabContents[i].classList.remove("active");
        })
        tab.classList.add("active");
        tabContents[id].classList.add("active");

    })
})
