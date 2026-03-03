(function () {

  /* ── 1. 팝업 HTML 삽입 ── */
  document.body.insertAdjacentHTML('beforeend', `
    <div class="rp-overlay" id="rpOverlay">
      <div class="rp-modal">

        <!-- 헤더 -->
        <div class="rp-header">
          <div class="rp-header-info">
            <span class="rp-badge">빠른예매</span>
            <h2 class="rp-movie-title" id="rpTitle">영화 제목</h2>
            <div class="rp-meta" id="rpMeta">
              <span id="rpTheater"></span>
              <span class="rp-dot">·</span>
              <span id="rpTime"></span>
              <span class="rp-dot">·</span>
              <span id="rpScreen"></span>
            </div>
          </div>
          <button class="rp-close" id="rpClose">✕</button>
        </div>

        <!-- 스크린 -->
        <div class="rp-screen-wrap">
          <div class="rp-screen">SCREEN</div>
        </div>

        <!-- 좌석 그리드 -->
        <div class="rp-seat-area" id="rpSeatArea"></div>

        <!-- 범례 -->
        <div class="rp-legend">
          <span class="rp-legend-item"><i class="rp-dot-icon available"></i>선택가능</span>
          <span class="rp-legend-item"><i class="rp-dot-icon selected"></i>선택됨</span>
          <span class="rp-legend-item"><i class="rp-dot-icon sold"></i>매진</span>
        </div>

        <!-- 하단 바 -->
        <div class="rp-footer">
          <div class="rp-selected-info">
            <span class="rp-sel-label">선택좌석</span>
            <span class="rp-sel-seats" id="rpSelSeats">없음</span>
          </div>
          <div class="rp-person-wrap">
            <button class="rp-person-btn" id="rpMinus">−</button>
            <span class="rp-person-count"><span id="rpCount">1</span>명</span>
            <button class="rp-person-btn" id="rpPlus">＋</button>
          </div>
          <button class="rp-pay-btn" id="rpPay">결제하기</button>
        </div>

      </div>
    </div>
  `);

  /* ── 2. CSS 삽입 ── */
  const style = document.createElement('style');
  style.textContent = `
    /* === 오버레이 === */
    .rp-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.75);
      backdrop-filter: blur(6px);
      z-index: 100000;
      align-items: center;
      justify-content: center;
    }
    .rp-overlay.open { display: flex; animation: rpFadeIn .25s ease; }
    @keyframes rpFadeIn { from { opacity:0 } to { opacity:1 } }

    /* === 모달 === */
    .rp-modal {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 20px;
      width: min(900px, 95vw);
      max-height: 90vh;
      overflow-y: auto;
      padding: 36px 40px 28px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      animation: rpSlideUp .3s cubic-bezier(.22,1,.36,1);
    }
    @keyframes rpSlideUp { from { transform:translateY(30px); opacity:0 } to { transform:translateY(0); opacity:1 } }

    /* === 헤더 === */
    .rp-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .rp-badge {
      display: inline-block;
      background: #EE3123;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
      padding: 3px 10px;
      border-radius: 20px;
      margin-bottom: 8px;
    }
    .rp-movie-title {
      font-size: 26px;
      font-weight: 800;
      color: #fff;
      margin: 0 0 8px;
    }
    .rp-meta {
      font-size: 13px;
      color: #aaa;
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .rp-dot { color: #555; }
    .rp-close {
      background: #2e2e2e;
      border: none;
      color: #aaa;
      font-size: 18px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      flex-shrink: 0;
      transition: background .15s;
    }
    .rp-close:hover { background: #EE3123; color: #fff; }

    /* === 스크린 === */
    .rp-screen-wrap { text-align: center; }
    .rp-screen {
      display: inline-block;
      width: 60%;
      padding: 6px 0;
      background: linear-gradient(180deg, #444 0%, #2a2a2a 100%);
      border-radius: 4px 4px 0 0;
      font-size: 11px;
      letter-spacing: .2em;
      color: #888;
    }

    /* === 좌석 === */
    .rp-seat-area {
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: center;
    }
    .rp-row {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .rp-row-label {
      width: 22px;
      text-align: center;
      font-size: 11px;
      color: #555;
      flex-shrink: 0;
    }
    .rp-seat {
      width: 32px;
      height: 28px;
      border-radius: 6px 6px 4px 4px;
      border: none;
      cursor: pointer;
      font-size: 9px;
      font-weight: 600;
      transition: transform .1s, background .15s;
      position: relative;
    }
    .rp-seat.available  { background: #2e2e2e; color: #666; }
    .rp-seat.available:hover { background: #3a3a3a; transform: scale(1.1); }
    .rp-seat.selected   { background: #EE3123; color: #fff; transform: scale(1.1); }
    .rp-seat.sold       { background: #111; color: #333; cursor: not-allowed; }
    .rp-seat-gap { width: 10px; } /* 통로 */

    /* === 범례 === */
    .rp-legend {
      display: flex;
      justify-content: center;
      gap: 24px;
    }
    .rp-legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #777;
    }
    .rp-dot-icon {
      width: 14px; height: 14px;
      border-radius: 3px;
      display: inline-block;
    }
    .rp-dot-icon.available { background: #2e2e2e; border: 1px solid #444; }
    .rp-dot-icon.selected  { background: #EE3123; }
    .rp-dot-icon.sold      { background: #111; border: 1px solid #222; }

    /* === 하단 바 === */
    .rp-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #111;
      border-radius: 14px;
      padding: 18px 24px;
      gap: 20px;
    }
    .rp-sel-label { font-size: 11px; color: #666; display: block; margin-bottom: 4px; }
    .rp-sel-seats { font-size: 15px; font-weight: 700; color: #fff; }
    .rp-person-wrap {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .rp-person-btn {
      background: #2a2a2a;
      border: 1px solid #333;
      color: #fff;
      width: 32px; height: 32px;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
      line-height: 1;
      transition: background .15s;
    }
    .rp-person-btn:hover { background: #EE3123; border-color: #EE3123; }
    .rp-person-count { font-size: 15px; font-weight: 700; color: #fff; min-width: 36px; text-align: center; }
    .rp-pay-btn {
      background: #EE3123;
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 14px 44px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: background .15s, transform .1s;
    }
    .rp-pay-btn:hover { background: #c9291d; transform: scale(1.03); }
  `;
  document.head.appendChild(style);

  /* ── 3. 좌석 데이터 생성 헬퍼 ── */
  const ROWS = ['A','B','C','D','E','F','G','H'];
  const COLS = 14;
  // 랜덤으로 일부 좌석 매진 처리 (실제 프로젝트에선 서버 데이터로 교체)
  function makeSeats() {
    return ROWS.map(r =>
      Array.from({ length: COLS }, (_, i) => ({
        id: `${r}${i + 1}`,
        row: r,
        col: i + 1,
        status: Math.random() < 0.25 ? 'sold' : 'available'
      }))
    );
  }

  /* ── 4. 팝업 렌더 ── */
  const overlay   = document.getElementById('rpOverlay');
  const seatArea  = document.getElementById('rpSeatArea');
  const selSeats  = document.getElementById('rpSelSeats');
  const countEl   = document.getElementById('rpCount');

  let selectedSeats = [];
  let personCount   = 1;

  function renderSeats(seats2d) {
    seatArea.innerHTML = '';
    seats2d.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'rp-row';

      // 행 라벨
      const label = document.createElement('span');
      label.className = 'rp-row-label';
      label.textContent = row[0].row;
      rowEl.appendChild(label);

      row.forEach((seat, idx) => {
        // 가운데 통로
        if (idx === 7) {
          const gap = document.createElement('div');
          gap.className = 'rp-seat-gap';
          rowEl.appendChild(gap);
        }
        const btn = document.createElement('button');
        btn.className = `rp-seat ${seat.status}`;
        btn.textContent = seat.col;
        btn.dataset.id = seat.id;
        btn.disabled = seat.status === 'sold';

        btn.addEventListener('click', () => toggleSeat(btn, seat.id));
        rowEl.appendChild(btn);
      });
      seatArea.appendChild(rowEl);
    });
  }

  function toggleSeat(btn, id) {
    const idx = selectedSeats.indexOf(id);
    if (idx === -1) {
      if (selectedSeats.length >= personCount) {
        // 인원수 초과 시 가장 먼저 선택된 좌석 해제
        const old = selectedSeats.shift();
        document.querySelector(`.rp-seat[data-id="${old}"]`)?.classList.replace('selected', 'available');
      }
      selectedSeats.push(id);
      btn.classList.replace('available', 'selected');
    } else {
      selectedSeats.splice(idx, 1);
      btn.classList.replace('selected', 'available');
    }
    updateFooter();
  }

  function updateFooter() {
    selSeats.textContent = selectedSeats.length ? selectedSeats.join(', ') : '없음';
  }

  /* ── 5. 팝업 열기/닫기 ── */
  function openPopup({ title, theater, time, screen }) {
    document.getElementById('rpTitle').textContent    = title;
    document.getElementById('rpTheater').textContent  = theater;
    document.getElementById('rpTime').textContent     = time;
    document.getElementById('rpScreen').textContent   = screen;

    selectedSeats = [];
    personCount   = 1;
    countEl.textContent = '1';
    updateFooter();
    renderSeats(makeSeats());

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('rpClose').addEventListener('click', closePopup);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });

  /* 인원수 조절 */
  document.getElementById('rpMinus').addEventListener('click', () => {
    if (personCount > 1) { personCount--; countEl.textContent = personCount; }
  });
  document.getElementById('rpPlus').addEventListener('click', () => {
    if (personCount < 8) { personCount++; countEl.textContent = personCount; }
  });

  /* 결제 버튼 */
  document.getElementById('rpPay').addEventListener('click', () => {
    if (!selectedSeats.length) { alert('좌석을 선택해주세요.'); return; }
    alert(`결제 페이지로 이동합니다.\n좌석: ${selectedSeats.join(', ')}`);
  });

  /* ── 6. 상영 카드 클릭 이벤트 바인딩 ── */
  // .table-list-wrap 클릭 시 해당 영화 정보 파싱하여 팝업 열기
  document.querySelectorAll('.table-list-wrap').forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      // 매진된 카드는 팝업 안 열기
      if (card.querySelector('.no-seat')) {
        alert('해당 상영회는 매진되었습니다.');
        return;
      }

      // 영화 제목: 카드에서 위로 올라가며 h3 찾기
      let titleEl = null;
      let el = card;
      while (el && !titleEl) {
        el = el.parentElement;
        titleEl = el?.querySelector(':scope > .title h3') || el?.querySelector(':scope > h3');
      }
      const title = titleEl ? titleEl.textContent.trim() : '영화 제목';

      // 시간
      const timeEl  = card.querySelector('.clock strong');
      const endEl   = card.querySelector('.clock p');
      const time    = timeEl ? `${timeEl.textContent} ${endEl?.textContent ?? ''}` : '';

      // 관
      const screenEl = card.querySelector('.theater-info p:first-child');
      const screen   = screenEl ? screenEl.textContent : '';

      // 현재 선택된 극장 (local-select 첫 번째 li 기준)
      const theaterEl = document.querySelector('.local-select li:first-child a');
      const theater   = theaterEl ? `CGV ${theaterEl.textContent.trim()}` : 'CGV';

      openPopup({ title, theater, time, screen });
    });
  });

})();