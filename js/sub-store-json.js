let btnWrap = document.querySelector(".btn-wrap");

let showWrap = document.querySelector(".grid-wrap");
let allStores = [];

//조건에 맞는 카드를 보여줄 함수
function renderStore(info) {
    // let filteredBenefit = allBenefits;
    showWrap.innerHTML = "";
    let filteredStore = allStores.filter(item => item.category == info);
    console.log(filteredStore);
    filteredStore.forEach(item => {
        let box = document.createElement("div");
        box.classList.add("box-wrap");

        box.innerHTML = `
<a href="#">
    <div class="img-box">
        <img src="./images/hy-sub/${item.img}.png" alt="${item.title}">
    </div>
    <div class="text-box">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <p class="price">${item.price}</p>
    </div>
</a>
`;

        showWrap.append(box);

    })

}
//버튼생성할 함수
function storeTab(storeMenus) {
    console.log("받은메뉴:", storeMenus);
    storeMenus.forEach((tab) => {

        let button = document.createElement("button");
        button.textContent = tab;
        // button.setAttribute("data-filter", tab);
        button.setAttribute("class", "btn");

        btnWrap.append(button);
    })
    //모든 버튼을 저장할 배열변수
    let allTabs = btnWrap.querySelectorAll("button")
    //첫번째 버튼 active클래스 추가
    allTabs[0].classList.add("active");

    //버튼이벤트 등록
    allTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // let tabType = tab.getAttribute("data-filter");
            let tabType = tab.textContent;
            console.log(tabType);
            //모든버튼에 클래스 제거
            allTabs.forEach(b => b.classList.remove("active"));
            //클릭한 버튼에 클래스 추가
            tab.classList.add("active");
            renderStore(tabType);
        })
    })
}


//데이터를 불러올 함수
async function fetchStore() {
    try {

        let store = await fetch("./data/storeMenuData.json");
        console.log(store);

        let data = await store.json();
        console.log(data);

        allStores = data;

        //탭매뉴에 해당하는 카테고리 추출하기
        //카테고리를 추출하여 저장할 배열
        let StoreMenus = [];


        //카테고리(partnerinfo)가 중복되지 않게 메뉴 추출하여 benefitMenus에 넣기
        allStores.forEach(item => {
            if (!StoreMenus.includes(item.category)) {
                StoreMenus.push(item.category);
            }
        });
        console.log(StoreMenus);
        //메뉴 생성하기 함수 호출
        storeTab(StoreMenus);


        renderStore("콤보");
    }
    catch (error) {
        console.log("데이터 불러오기 실패", error);
    }
}
//데이터를 불러울 함수 호출
fetchStore();