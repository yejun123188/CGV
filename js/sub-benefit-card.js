//dom 선택자
//버튼을 넣어줄 영역
let btnWrap = document.querySelector(".btn-wrap");

//목록을 보여줄 영역 
let benefitShow = document.querySelector(".benefit-card-list");

//object 파일을 저장할 배열 변수
let allBenefits = [];

//조건에 맞는 카드를 보여줄 함수 
function renderBenefit(info){
    benefitShow.innerHTML = "";
    let filteredBenefit = info ==="전체"? allBenefits : allBenefits.filter(item => item.partnerInfo === info);

   // let filteredBenefit = allBenefits;
    console.log("보여질내용:",filteredBenefit);
    filteredBenefit.forEach(item => {
        let liItem = document.createElement("li");
        liItem.classList.add("benefit-card");

        liItem.innerHTML=`
        <a href="#">
        <div class="card-img">
              <img src="./images/benefit-card/${item.img}" alt="">
          </div>
        <div class="card-info">
              <span class="card-date">${item.date}</span>
          </div>
        </a>
        `

        benefitShow.append(liItem);
   })

}

//카테고리에 맞는 버튼 생성 함수
function benefitTab(tabMenu){
    console.log("받은메뉴:",tabMenu);
    tabMenu.forEach(tab => {
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.textContent= tab;
        button.setAttribute("data-filter",tab);
        button.setAttribute("class","btn");
        li.append(button);
        btnWrap.append(li);

    })

    //모든 버튼을 저정할 배열변수
    let allTabs = btnWrap.querySelectorAll("button");
    
    //첫번째 버튼 active 클래스 추가
    console.log(allTabs);
    allTabs[0].classList.add("active");

    //버튼 이벤트 등록
    allTabs.forEach(tab =>{
        tab.addEventListener("click",()=>{
           // let tabType = tab.getAttribute("data-filter");
           let tabType = tab.textContent;
            console.log(tabType);
            //모든 버튼 클래스 제거
            allTabs.forEach(b=>b.classList.remove("active"))
            //클릭한 버튼만 클래스 추가
            
            tab.classList.add("active");
            renderBenefit(tabType);

        })
    })
    
}

//데이터를 불러올 함수
async function fetchBenefit(){
    try { 
        //외부 데이터를 불러와서 저장할 변수
        //비동기 처리, 데이터가 다 불려질 때까지 기다려야, response가 들어온다
        //await를 안하면 promis 가 반환된다 
        let benefit = await fetch("./data/cgvPartnerData.json");
        console.log(benefit);
        //받은 결과가 json파일 이니까 object로 변형해서 사용해야 된다.
        //await 중요행!! 
        let data = await benefit.json();
        console.log(data);
        allBenefits = data;

        //탭메뉴에 해당하는 카테고리(partnerInfo) 추출하기 
        //카테고리를 추출해서 저장할 배열
        let benefitMenus = [];
        //benefitMenus의 첫번째 요소로 all
        benefitMenus.push("전체");
       //카테고리(partneInfo)가 중복되지 않게 메뉴 추출하여 benefitMenus에 넣어주기
       allBenefits.forEach(item => {
        if(!benefitMenus.includes(item.partnerInfo)) {
            benefitMenus.push(item.partnerInfo)
        }

       })
       console.log(benefitMenus);

       //메뉴생성하기
       benefitTab(benefitMenus);

       //
       renderBenefit("전체");

    }

    catch(error){
        console.log("데이터 로드 실패:",error);
    }
}

//데이터를 불러올 함수 호출
fetchBenefit();