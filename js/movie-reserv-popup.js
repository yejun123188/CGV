(function () {

  /* ── CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    .mrp-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.8);
      backdrop-filter: blur(8px);
      z-index: 100000;
      align-items: center;
      justify-content: center;
    }
    .mrp-overlay.open { display: flex; animation: mrpFade .25s ease; }
    @keyframes mrpFade { from{opacity:0} to{opacity:1} }

    .mrp-modal {
      background: #1a1a1a;
      border: 1px solid #2e2e2e;
      border-radius: 24px;
      width: min(960px, 95vw);
      max-height: 92vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      animation: mrpUp .3s cubic-bezier(.22,1,.36,1);
    }
    @keyframes mrpUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }

    /* 헤더 */
    .mrp-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 28px 36px 20px;
      border-bottom: 1px solid #2a2a2a;
      position: sticky;
      top: 0;
      background: #1a1a1a;
      z-index: 10;
    }
    .mrp-header-left { display: flex; align-items: center; gap: 16px; }
    .mrp-poster-thumb {
      width: 52px; height: 72px;
      border-radius: 8px;
      object-fit: cover;
    }
    .mrp-badge {
      display: inline-block;
      background: #EE3123;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .1em;
      padding: 2px 8px;
      border-radius: 20px;
      margin-bottom: 6px;
    }
    .mrp-movie-name {
      font-size: 22px;
      font-weight: 800;
      color: #fff;
      margin: 0;
    }
    .mrp-close {
      background: #2e2e2e;
      border: none;
      color: #aaa;
      font-size: 18px;
      width: 36px; height: 36px;
      border-radius: 50%;
      cursor: pointer;
      flex-shrink: 0;
      transition: background .15s;
    }
    .mrp-close:hover { background: #EE3123; color: #fff; }

    /* 스텝 인디케이터 */
    .mrp-steps {
      display: flex;
      justify-content: center;
      gap: 0;
      padding: 20px 36px 0;
    }
    .mrp-step {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #555;
      font-size: 13px;
      font-weight: 600;
    }
    .mrp-step.active { color: #fff; }
    .mrp-step.done { color: #EE3123; }
    .mrp-step-num {
      width: 26px; height: 26px;
      border-radius: 50%;
      background: #2a2a2a;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px;
    }
    .mrp-step.active .mrp-step-num { background: #EE3123; color: #fff; }
    .mrp-step.done .mrp-step-num { background: #EE312340; color: #EE3123; }
    .mrp-step-line {
      width: 60px; height: 1px;
      background: #2a2a2a;
      margin: 0 4px;
    }

    /* 공통 패널 */
    .mrp-panel { padding: 24px 36px 8px; display: none; }
    .mrp-panel.active { display: block; }
    .mrp-section-title {
      font-size: 13px;
      color: #777;
      font-weight: 600;
      letter-spacing: .08em;
      margin-bottom: 14px;
    }

    /* STEP1 - 날짜 / 극장 / 시간 */
    .mrp-date-list {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    .mrp-date-btn {
      background: #2a2a2a;
      border: 1px solid #333;
      border-radius: 12px;
      color: #aaa;
      padding: 10px 16px;
      cursor: pointer;
      text-align: center;
      min-width: 64px;
      transition: all .15s;
    }
    .mrp-date-btn .day { font-size: 18px; font-weight: 700; color: #fff; display: block; }
    .mrp-date-btn .dow { font-size: 11px; color: #666; }
    .mrp-date-btn.selected,
    .mrp-date-btn:hover { background: #EE3123; border-color: #EE3123; }
    .mrp-date-btn.selected .dow,
    .mrp-date-btn:hover .dow { color: #ffaaaa; }

    .mrp-theater-list {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .mrp-theater-btn {
      background: #2a2a2a;
      border: 1px solid #333;
      border-radius: 50px;
      color: #aaa;
      padding: 8px 18px;
      font-size: 13px;
      cursor: pointer;
      transition: all .15s;
    }
    .mrp-theater-btn.selected,
    .mrp-theater-btn:hover { background: #EE3123; border-color: #EE3123; color: #fff; }

    .mrp-time-list {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .mrp-time-card {
      background: #2a2a2a;
      border: 1px solid #333;
      border-radius: 14px;
      padding: 14px 18px;
      cursor: pointer;
      transition: all .15s;
      min-width: 130px;
    }
    .mrp-time-card:hover { border-color: #EE3123; }
    .mrp-time-card.selected { background: #EE312320; border-color: #EE3123; }
    .mrp-time-card.sold-out { opacity: .4; cursor: not-allowed; }
    .mrp-time-card .t-start { font-size: 20px; font-weight: 800; color: #fff; }
    .mrp-time-card .t-end { font-size: 12px; color: #777; margin-top: 2px; }
    .mrp-time-card .t-seat { font-size: 12px; margin-top: 6px; }
    .mrp-time-card .t-seat .ok { color: #3895ff; }
    .mrp-time-card .t-seat .warn { color: #ff6a00; }
    .mrp-time-card .t-seat .no { color: #EE3123; }
    .mrp-time-card .t-screen { font-size: 11px; color: #555; margin-top: 3px; }

    /* STEP2 - 좌석 */
    .mrp-screen-wrap { text-align: center; margin-bottom: 12px; }
    .mrp-screen {
      display: inline-block;
      width: 55%;
      padding: 6px 0;
      background: linear-gradient(180deg,#444 0%,#2a2a2a 100%);
      border-radius: 4px 4px 0 0;
      font-size: 10px;
      letter-spacing: .2em;
      color: #888;
    }
    .mrp-seat-area {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;
      margin-bottom: 16px;
    }
    .mrp-row { display: flex; gap: 5px; align-items: center; }
    .mrp-row-label { width: 20px; text-align: center; font-size: 10px; color: #555; flex-shrink: 0; }
    .mrp-seat {
      width: 30px; height: 26px;
      border-radius: 5px 5px 3px 3px;
      border: none;
      cursor: pointer;
      font-size: 8px;
      font-weight: 600;
      transition: transform .1s, background .15s;
    }
    .mrp-seat.available { background: #2e2e2e; color: #666; }
    .mrp-seat.available:hover { background: #3a3a3a; transform: scale(1.1); }
    .mrp-seat.selected { background: #EE3123; color: #fff; transform: scale(1.1); }
    .mrp-seat.sold { background: #111; color: #333; cursor: not-allowed; }
    .mrp-seat-gap { width: 10px; }

    .mrp-legend {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 10px;
    }
    .mrp-legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #666; }
    .mrp-dot-icon { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
    .mrp-dot-icon.available { background: #2e2e2e; border: 1px solid #444; }
    .mrp-dot-icon.selected  { background: #EE3123; }
    .mrp-dot-icon.sold      { background: #111; border: 1px solid #222; }

    /* 인원수 */
    .mrp-person-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    .mrp-person-label { font-size: 13px; color: #777; }
    .mrp-person-btn {
      background: #2a2a2a;
      border: 1px solid #333;
      color: #fff;
      width: 30px; height: 30px;
      border-radius: 50%;
      font-size: 16px;
      cursor: pointer;
      transition: background .15s;
    }
    .mrp-person-btn:hover { background: #EE3123; border-color: #EE3123; }
    .mrp-person-count { font-size: 15px; font-weight: 700; color: #fff; min-width: 32px; text-align: center; }

    /* 하단 바 */
    .mrp-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #111;
      border-radius: 0 0 24px 24px;
      padding: 18px 36px;
      gap: 20px;
      position: sticky;
      bottom: 0;
    }
    .mrp-summary { display: flex; flex-direction: column; gap: 4px; }
    .mrp-summary-item { font-size: 12px; color: #666; }
    .mrp-summary-item span { color: #fff; font-weight: 600; margin-left: 6px; }
    .mrp-btn-group { display: flex; gap: 12px; }
    .mrp-prev-btn {
      background: #2a2a2a;
      border: 1px solid #333;
      color: #aaa;
      border-radius: 50px;
      padding: 12px 28px;
      font-size: 14px;
      cursor: pointer;
      transition: background .15s;
    }
    .mrp-prev-btn:hover { background: #333; }
    .mrp-next-btn {
      background: #EE3123;
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 12px 36px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: background .15s, transform .1s;
    }
    .mrp-next-btn:hover { background: #c9291d; transform: scale(1.03); }
    .mrp-next-btn:disabled { background: #333; color: #555; cursor: not-allowed; transform: none; }
  `;
  document.head.appendChild(style);

  /* ── HTML ── */
  document.body.insertAdjacentHTML('beforeend', `
    <div class="mrp-overlay" id="mrpOverlay">
      <div class="mrp-modal">

        <!-- 헤더 -->
        <div class="mrp-header">
          <div class="mrp-header-left">
            <img class="mrp-poster-thumb" id="mrpThumb" src="" alt="">
            <div>
              <div class="mrp-badge">빠른예매</div>
              <h2 class="mrp-movie-name" id="mrpMovieName">영화 제목</h2>
            </div>
          </div>
          <button class="mrp-close" id="mrpClose">✕</button>
        </div>

        <!-- 스텝 -->
        <div class="mrp-steps">
          <div class="mrp-step active" id="mrpStep1Ind">
            <div class="mrp-step-num">1</div>
            <span>날짜 · 극장 · 시간</span>
          </div>
          <div class="mrp-step-line"></div>
          <div class="mrp-step" id="mrpStep2Ind">
            <div class="mrp-step-num">2</div>
            <span>좌석 선택</span>
          </div>
        </div>

        <!-- STEP 1 -->
        <div class="mrp-panel active" id="mrpPanel1">
          <div class="mrp-section-title">날짜 선택</div>
          <div class="mrp-date-list" id="mrpDateList"></div>

          <div class="mrp-section-title">극장 선택</div>
          <div class="mrp-theater-list" id="mrpTheaterList"></div>

          <div class="mrp-section-title">시간 선택</div>
          <div class="mrp-time-list" id="mrpTimeList"></div>
        </div>

        <!-- STEP 2 -->
        <div class="mrp-panel" id="mrpPanel2">
          <div class="mrp-person-row">
            <span class="mrp-person-label">인원</span>
            <button class="mrp-person-btn" id="mrpMinus">−</button>
            <span class="mrp-person-count"><span id="mrpCount">1</span>명</span>
            <button class="mrp-person-btn" id="mrpPlus">＋</button>
          </div>
          <div class="mrp-screen-wrap"><div class="mrp-screen">SCREEN</div></div>
          <div class="mrp-seat-area" id="mrpSeatArea"></div>
          <div class="mrp-legend">
            <span class="mrp-legend-item"><i class="mrp-dot-icon available"></i>선택가능</span>
            <span class="mrp-legend-item"><i class="mrp-dot-icon selected"></i>선택됨</span>
            <span class="mrp-legend-item"><i class="mrp-dot-icon sold"></i>매진</span>
          </div>
        </div>

        <!-- 하단 바 -->
        <div class="mrp-footer">
          <div class="mrp-summary">
            <div class="mrp-summary-item">날짜<span id="mrpSumDate">-</span></div>
            <div class="mrp-summary-item">극장<span id="mrpSumTheater">-</span></div>
            <div class="mrp-summary-item">시간<span id="mrpSumTime">-</span></div>
            <div class="mrp-summary-item" id="mrpSumSeatRow" style="display:none">좌석<span id="mrpSumSeats">-</span></div>
          </div>
          <div class="mrp-btn-group">
            <button class="mrp-prev-btn" id="mrpPrev" style="display:none">이전</button>
            <button class="mrp-next-btn" id="mrpNext" disabled>다음</button>
          </div>
        </div>

      </div>
    </div>
  `);

  /* ── 더미 데이터 ── */
  const DATES = [
    { label: '오늘', day: '01', dow: '토' },
    { label: '',     day: '02', dow: '일' },
    { label: '',     day: '03', dow: '월' },
    { label: '',     day: '04', dow: '화' },
    { label: '',     day: '05', dow: '수' },
    { label: '',     day: '06', dow: '목' },
    { label: '',     day: '07', dow: '금' },
  ];
  const THEATERS = ['CGV 강남', 'CGV 용산', 'CGV 홍대', 'CGV 여의도', 'CGV 왕십리'];
  const TIMES = [
    { start: '08:30', end: '10:42', seat: 132, total: 210, screen: '1관 / LASER', type: 'morning' },
    { start: '10:50', end: '13:02', seat: 58,  total: 210, screen: '2관 / 2D',    type: 'normal' },
    { start: '13:20', end: '15:32', seat: 0,   total: 210, screen: '1관 / LASER', type: 'normal' },
    { start: '15:45', end: '17:57', seat: 21,  total: 210, screen: '3관 / 4DX',   type: 'normal' },
    { start: '18:10', end: '20:22', seat: 189, total: 210, screen: '2관 / 2D',    type: 'normal' },
    { start: '21:30', end: '23:42', seat: 95,  total: 210, screen: '1관 / LASER', type: 'night' },
    { start: '23:50', end: '26:02', seat: 44,  total: 210, screen: '4관 / 2D',    type: 'night' },
  ];
  const ROWS = ['A','B','C','D','E','F','G','H'];

  /* ── 상태 ── */
  let state = {
    step: 1,
    movieName: '',
    thumbSrc: '',
    selectedDate: null,
    selectedTheater: null,
    selectedTime: null,
    selectedSeats: [],
    personCount: 1,
  };

  /* ── 엘리먼트 ── */
  const overlay      = document.getElementById('mrpOverlay');
  const step1Ind     = document.getElementById('mrpStep1Ind');
  const step2Ind     = document.getElementById('mrpStep2Ind');
  const panel1       = document.getElementById('mrpPanel1');
  const panel2       = document.getElementById('mrpPanel2');
  const nextBtn      = document.getElementById('mrpNext');
  const prevBtn      = document.getElementById('mrpPrev');
  const sumDate      = document.getElementById('mrpSumDate');
  const sumTheater   = document.getElementById('mrpSumTheater');
  const sumTime      = document.getElementById('mrpSumTime');
  const sumSeats     = document.getElementById('mrpSumSeats');
  const sumSeatRow   = document.getElementById('mrpSumSeatRow');
  const countEl      = document.getElementById('mrpCount');

  /* ── STEP1 렌더 ── */
  function renderStep1() {
    // 날짜
    const dateList = document.getElementById('mrpDateList');
    dateList.innerHTML = '';
    DATES.forEach((d, i) => {
      const btn = document.createElement('button');
      btn.className = 'mrp-date-btn' + (i === 0 ? ' selected' : '');
      btn.innerHTML = `<span class="day">${d.day}</span><span class="dow">${d.dow}</span>`;
      if (i === 0) state.selectedDate = `3월 ${d.day}일 · ${d.dow}`;
      btn.addEventListener('click', () => {
        dateList.querySelectorAll('.mrp-date-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.selectedDate = `3월 ${d.day}일 · ${d.dow}`;
        updateSummary(); checkStep1();
      });
      dateList.appendChild(btn);
    });

    // 극장
    const theaterList = document.getElementById('mrpTheaterList');
    theaterList.innerHTML = '';
    THEATERS.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'mrp-theater-btn';
      btn.textContent = t;
      btn.addEventListener('click', () => {
        theaterList.querySelectorAll('.mrp-theater-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.selectedTheater = t;
        updateSummary(); checkStep1();
      });
      theaterList.appendChild(btn);
    });

    // 시간
    const timeList = document.getElementById('mrpTimeList');
    timeList.innerHTML = '';
    TIMES.forEach(t => {
      const isSold = t.seat === 0;
      const seatClass = t.seat === 0 ? 'no' : t.seat < 30 ? 'warn' : 'ok';
      const card = document.createElement('div');
      card.className = 'mrp-time-card' + (isSold ? ' sold-out' : '');
      card.innerHTML = `
        <div class="t-start">${t.start}</div>
        <div class="t-end">~ ${t.end}</div>
        <div class="t-seat"><span class="${seatClass}">${t.seat}</span> / ${t.total}석</div>
        <div class="t-screen">${t.screen}</div>
      `;
      if (!isSold) {
        card.addEventListener('click', () => {
          timeList.querySelectorAll('.mrp-time-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          state.selectedTime = `${t.start} (${t.screen})`;
          updateSummary(); checkStep1();
        });
      }
      timeList.appendChild(card);
    });
  }

  function checkStep1() {
    nextBtn.disabled = !(state.selectedDate && state.selectedTheater && state.selectedTime);
  }

  /* ── STEP2 렌더 ── */
  function renderStep2() {
    const seatArea = document.getElementById('mrpSeatArea');
    seatArea.innerHTML = '';
    state.selectedSeats = [];
    updateSummary();

    ROWS.forEach(r => {
      const rowEl = document.createElement('div');
      rowEl.className = 'mrp-row';
      const label = document.createElement('span');
      label.className = 'mrp-row-label';
      label.textContent = r;
      rowEl.appendChild(label);

      Array.from({ length: 14 }, (_, i) => i + 1).forEach((col, idx) => {
        if (idx === 7) {
          const gap = document.createElement('div');
          gap.className = 'mrp-seat-gap';
          rowEl.appendChild(gap);
        }
        const status = Math.random() < 0.2 ? 'sold' : 'available';
        const btn = document.createElement('button');
        btn.className = `mrp-seat ${status}`;
        btn.textContent = col;
        btn.dataset.id = `${r}${col}`;
        btn.disabled = status === 'sold';
        btn.addEventListener('click', () => toggleSeat(btn, `${r}${col}`));
        rowEl.appendChild(btn);
      });
      seatArea.appendChild(rowEl);
    });
  }

  function toggleSeat(btn, id) {
    const idx = state.selectedSeats.indexOf(id);
    if (idx === -1) {
      if (state.selectedSeats.length >= state.personCount) {
        const old = state.selectedSeats.shift();
        document.querySelector(`.mrp-seat[data-id="${old}"]`)?.classList.replace('selected', 'available');
      }
      state.selectedSeats.push(id);
      btn.classList.replace('available', 'selected');
    } else {
      state.selectedSeats.splice(idx, 1);
      btn.classList.replace('selected', 'available');
    }
    updateSummary();
    nextBtn.disabled = state.selectedSeats.length === 0;
  }

  /* ── 요약 업데이트 ── */
  function updateSummary() {
    sumDate.textContent    = state.selectedDate    || '-';
    sumTheater.textContent = state.selectedTheater || '-';
    sumTime.textContent    = state.selectedTime    || '-';
    if (state.step === 2) {
      sumSeatRow.style.display = '';
      sumSeats.textContent = state.selectedSeats.length ? state.selectedSeats.join(', ') : '-';
    } else {
      sumSeatRow.style.display = 'none';
    }
  }

  /* ── 스텝 전환 ── */
  function goStep(n) {
    state.step = n;
    panel1.classList.toggle('active', n === 1);
    panel2.classList.toggle('active', n === 2);

    step1Ind.className = 'mrp-step' + (n === 1 ? ' active' : ' done');
    step2Ind.className = 'mrp-step' + (n === 2 ? ' active' : '');

    prevBtn.style.display = n === 1 ? 'none' : '';
    nextBtn.textContent   = n === 2 ? '결제하기' : '다음';
    nextBtn.disabled      = n === 2 ? state.selectedSeats.length === 0 : !checkAllStep1();

    if (n === 2) renderStep2();
    updateSummary();
  }

  function checkAllStep1() {
    return !!(state.selectedDate && state.selectedTheater && state.selectedTime);
  }

  nextBtn.addEventListener('click', () => {
    if (state.step === 1 && checkAllStep1()) goStep(2);
    else if (state.step === 2) {
      if (!state.selectedSeats.length) { alert('좌석을 선택해주세요.'); return; }
      alert(`결제 페이지로 이동합니다!\n영화: ${state.movieName}\n극장: ${state.selectedTheater}\n날짜: ${state.selectedDate}\n시간: ${state.selectedTime}\n좌석: ${state.selectedSeats.join(', ')}`);
    }
  });
  prevBtn.addEventListener('click', () => { if (state.step === 2) goStep(1); });

  /* ── 인원수 ── */
  document.getElementById('mrpMinus').addEventListener('click', () => {
    if (state.personCount > 1) { state.personCount--; countEl.textContent = state.personCount; }
  });
  document.getElementById('mrpPlus').addEventListener('click', () => {
    if (state.personCount < 8) { state.personCount++; countEl.textContent = state.personCount; }
  });

  /* ── 열기 / 닫기 ── */
  function openPopup(movieName, thumbSrc) {
    state = {
      step: 1,
      movieName,
      thumbSrc,
      selectedDate: `3월 01일 · 토`,  // 기본값: 오늘
      selectedTheater: null,
      selectedTime: null,
      selectedSeats: [],
      personCount: 1,
    };
    document.getElementById('mrpMovieName').textContent = movieName;
    document.getElementById('mrpThumb').src = thumbSrc;
    countEl.textContent = '1';
    renderStep1();
    goStep(1);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('mrpClose').addEventListener('click', closePopup);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });

  /* ── 포스터 클릭 바인딩 ── */
  // .popular-list, .new-list, .all-list 안의 li 클릭
  document.querySelectorAll('.popular-list li, .new-list li, .all-list li').forEach(li => {
    li.style.cursor = 'pointer';
    li.addEventListener('click', e => {
      e.preventDefault();
      const img = li.querySelector('img');
      const src = img?.src || '';
      const alt = img?.alt || '영화';
      // alt 텍스트에서 영화 이름 추출 (실제 프로젝트에선 data-* 속성 활용 권장)
      const title = li.dataset.title || alt;
      openPopup(title, src);
    });
  });

})();