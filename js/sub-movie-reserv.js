document.addEventListener('DOMContentLoaded', () => {
    function createSlider(wrapEl, itemsPerView = 4) {
        const ul = wrapEl.querySelector('ul');
        const items = ul.querySelectorAll('li');
        const total = items.length;
        let current = 0;
        const maxIndex = total - itemsPerView;

        const GAP = 45;

        function getItemWidth() {
            return items[0].getBoundingClientRect().width;
        }
        function move(index) {
            current = Math.max(0, Math.min(index, maxIndex));
            const itemW = getItemWidth();
            const offset = current * (itemW + GAP);
            ul.style.transition = 'transform 0.4s ease';
            ul.style.transform = `translateX(-${offset}px)`;
        }

        // 화살표
        const leftBtn = wrapEl.closest('.popular-wrap, .new-list-wrap')
            ?.querySelector('.arrow-btn-left a');
        const rightBtn = wrapEl.closest('.popular-wrap, .new-list-wrap')
            ?.querySelector('.arrow-btn-right a');
        if (leftBtn) {
            leftBtn.addEventListener('click', (e) => {
                e.preventDefault();
                move(current - itemsPerView);
            });
        }
        if (rightBtn) {
            rightBtn.addEventListener('click', (e) => {
                e.preventDefault();
                move(current + itemsPerView);
            });
        }
    }

    // 인기상영작
    const popularList = document.querySelector('.popular-list');
    if (popularList) createSlider(popularList, 4);

    // 신규개봉작
    const newList = document.querySelector('.new-list');
    if (newList) createSlider(newList, 4);

    const tabItems = document.querySelectorAll('.tab-menu li');
    const allMovieItems = document.querySelectorAll('.all-list li');

    tabItems.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            tabItems.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const genre =
                tab.querySelector('a').textContent.trim();

            allMovieItems.forEach(item => {
                if (genre === '전체') {
                    item.style.display = '';
                } else {
                    const itemGenre = item.dataset.genre || '';
                    item.style.display = itemGenre === genre ? '' : 'none';
                }
            });
        });
    });


})