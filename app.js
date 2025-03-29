// 점수 계산을 위한 설정
const SCORE_CONFIG = {
  cardio: {
    targetDistance: 3.6, // km, 80점을 얻는 목표 거리
    extraPointsPer100m: 1, // 100m당 추가 점수
    weight: 0.2, // 총점수에서 차지하는 비율
  },
  strength: {
    targetMinutes: 70, // 분, 70점을 얻는 목표 시간
    pointsPerMinute: 1, // 1분당 1점
    weight: 0.5, // 총점수에서 차지하는 비율
  },
  spending: {
    targetAmount: 18000, // 원, 80점을 얻는 목표 지출
    extraPointsPer1000: 1, // 1000원 덜 쓸 때마다 1점 추가
    weight: 0.3, // 총점수에서 차지하는 비율
  },
};

// 데이터 저장 변수
let lifeData = [];

// DOM Elements
const datePicker = document.getElementById("date-picker");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const todayBtn = document.getElementById("today-btn");
const fileUpload = document.getElementById("file-upload");
const importBtn = document.getElementById("import-btn");
const resetBtn = document.getElementById("reset-btn");

// 탭 관련 요소
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanes = document.querySelectorAll(".tab-pane");

// 주간 통계 요소
const prevWeekBtn = document.getElementById("prev-week-btn");
const nextWeekBtn = document.getElementById("next-week-btn");
const currentWeekDisplay = document.getElementById("current-week-display");

// 월간 통계 요소
const prevMonthBtn = document.getElementById("prev-month-btn");
const nextMonthBtn = document.getElementById("next-month-btn");
const currentMonthDisplay = document.getElementById("current-month-display");

// 테이블 관련 요소
const cardioTableBody = document.getElementById("cardio-table-body");
const strengthTableBody = document.getElementById("strength-table-body");
const spendingTableBody = document.getElementById("spending-table-body");

// 통계 요소
const avgPace = document.getElementById("avg-pace");
const weeklyDistance = document.getElementById("weekly-distance");
const weeklyCardioTime = document.getElementById("weekly-cardio-time");
const weeklyStrengthTime = document.getElementById("weekly-strength-time");
const avgStrengthTime = document.getElementById("avg-strength-time");
const weeklySpending = document.getElementById("weekly-spending");
const avgSpending = document.getElementById("avg-spending");

// 점수 관련 요소
const scoreNumber = document.querySelector(".score-number");
const starsContainer = document.querySelector(".stars");
const cardioScoreFill = document.getElementById("cardio-score-fill");
const strengthScoreFill = document.getElementById("strength-score-fill");
const spendingScoreFill = document.getElementById("spending-score-fill");
const cardioScore = document.getElementById("cardio-score");
const strengthScore = document.getElementById("strength-score");
const spendingScore = document.getElementById("spending-score");

// 차트 초기화 변수
let cardioChart, strengthChart, spendingChart, weeklyTrendChart;

// 유산소 차트 컨트롤
let currentCardioChartType = "distance";

// 현재 주간 및 월간 범위
let currentWeekStart = new Date();
let currentMonthDate = new Date();

// 오늘 날짜를 기본값으로 설정
const today = new Date();
const todayStr = formatDate(today);
datePicker.value = todayStr;
datePicker.max = todayStr; // 미래 날짜 선택 불가

// DOMContentLoaded 이벤트에서 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 앱 초기화
  init();

  // 이벤트 리스너 설정
  datePicker.addEventListener("change", updateView);
  prevBtn.addEventListener("click", () => navigateDate(-1));
  nextBtn.addEventListener("click", () => navigateDate(1));
  todayBtn.addEventListener("click", goToToday);
  importBtn.addEventListener("click", importData);
  resetBtn.addEventListener("click", resetData);

  // 날짜 범위 입력 이벤트 리스너
  document
    .querySelectorAll('.date-range-controls input[type="date"]')
    .forEach((input) => {
      input.addEventListener("change", function () {
        // 각 차트의 시작 및 종료 날짜가 유효한 범위 내에 있는지 확인
        // 끝 날짜가 시작 날짜보다 앞에 있으면 시작 날짜를 변경
        if (input.id.includes("end")) {
          const startInputId = input.id.replace("end", "start");
          const startInput = document.getElementById(startInputId);
          if (new Date(input.value) < new Date(startInput.value)) {
            // 종료 날짜가 시작 날짜보다 이전이면 시작 날짜를 조정
            startInput.value = input.value;
          }
        } else if (input.id.includes("start")) {
          const endInputId = input.id.replace("start", "end");
          const endInput = document.getElementById(endInputId);
          if (new Date(endInput.value) < new Date(input.value)) {
            // 시작 날짜가 종료 날짜보다 이후이면 종료 날짜를 조정
            endInput.value = input.value;
          }
        }
      });
    });

  // 유산소 차트 버튼 이벤트 리스너
  document.querySelectorAll(".chart-type-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // 같은 컨테이너 내의 버튼들만 토글
      const container = btn.closest(".chart-controls");
      if (container) {
        container
          .querySelectorAll(".chart-type-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      } else {
        document
          .querySelectorAll(".chart-type-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      }

      // 유산소 차트 타입인 경우
      if (
        btn.dataset.type === "distance" ||
        btn.dataset.type === "time" ||
        btn.dataset.type === "pace"
      ) {
        currentCardioChartType = btn.dataset.type;
        updateCardioChart();
      }
      // 주간 차트 타입인 경우
      else if (btn.closest("#weekly-content")) {
        updateWeeklyTrendChart(btn.dataset.type);
      }
    });
  });

  // 탭 버튼 이벤트 리스너
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      button.classList.add("active");
      const targetId = button.id.split("-")[1] + "-content";
      document.getElementById(targetId).classList.add("active");

      // 특정 탭이 클릭되었을 때 추가 작업
      if (button.id === "tab-weekly") {
        updateWeeklyStats();
      } else if (button.id === "tab-monthly") {
        updateMonthlyStats();
      } else if (button.id === "tab-hall") {
        updateHallOfFame();
      }
    });
  });

  // 주간 통계 네비게이션 버튼
  if (prevWeekBtn && nextWeekBtn) {
    prevWeekBtn.addEventListener("click", () => navigateWeek(-1));
    nextWeekBtn.addEventListener("click", () => navigateWeek(1));
  }

  // 월간 통계 네비게이션 버튼
  if (prevMonthBtn && nextMonthBtn) {
    prevMonthBtn.addEventListener("click", () => navigateMonth(-1));
    nextMonthBtn.addEventListener("click", () => navigateMonth(1));
  }

  // D-day 계산 및 표시 함수
  function updateDday() {
    const targetDate = new Date("2024-12-08");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dDayElement = document.querySelector(".d-day-number");
    if (dDayElement) {
      dDayElement.textContent = `D${diffDays >= 0 ? "-" : "+"}${Math.abs(
        diffDays - 1
      )}`;
    }
  }

  // 초기 D-day 계산
  updateDday();
});

// 테이블 클릭 이벤트 리스너 추가
[cardioTableBody, strengthTableBody, spendingTableBody].forEach((tableBody) => {
  tableBody.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (row) {
      const date = row.dataset.date;
      if (date) {
        datePicker.value = date;
        updateView();
      }
    }
  });
});

// 유산소 차트 업데이트
function updateCardioChart() {
  renderCardioChart();
}

// 근력 차트 업데이트
function updateStrengthChart() {
  renderStrengthChart();
}

// 지출 차트 업데이트
function updateSpendingChart() {
  renderSpendingChart();
}

// 앱 초기화 함수 수정
function init() {
  loadData();
  setDefaultDateRange(); // 먼저 날짜 범위 설정
  updateView();
  updateAllTables();
  updateStatistics();

  // 주간 및 월간 날짜 초기화
  setCurrentWeek();
  setCurrentMonth();

  // 주간, 월간, 명예의 전당 통계 초기화
  updateWeeklyStats();
  updateMonthlyStats();
  updateHallOfFame();

  // 앱 초기화 시 모든 차트 정확히 렌더링
  setTimeout(() => {
    renderCardioChart();
    renderStrengthChart();
    renderSpendingChart();
  }, 100);
}

// localStorage에서 데이터 로드
function loadData() {
  const savedData = localStorage.getItem("lifeData");
  if (savedData) {
    lifeData = JSON.parse(savedData);
    // 날짜 내림차순 정렬
    lifeData.sort(
      (a, b) => new Date(parseDate(b.date)) - new Date(parseDate(a.date))
    );
  }
}

// localStorage에 데이터 저장
function saveData() {
  localStorage.setItem("lifeData", JSON.stringify(lifeData));
}

// 그래프 날짜 범위 설정
function setDefaultDateRange() {
  const today = new Date();
  const fifteenDaysAgo = new Date(today);
  fifteenDaysAgo.setDate(today.getDate() - 30);

  const dateInputs = [
    "cardio-start-date",
    "cardio-end-date",
    "strength-start-date",
    "strength-end-date",
    "spending-start-date",
    "spending-end-date",
  ];

  dateInputs.forEach((id) => {
    const input = document.getElementById(id);
    if (id.includes("end")) {
      input.value = formatDate(today);
      input.max = formatDate(today); // 오늘까지만 선택 가능하도록 제한
    } else {
      input.value = formatDate(fifteenDaysAgo);
    }
  });

  // 초기 차트 렌더링
  renderCardioChart();
  renderStrengthChart();
  renderSpendingChart();
}

// 선택된 날짜에 따라 뷰 업데이트
function updateView() {
  const selectedDate = datePicker.value;
  console.log("선택된 날짜:", selectedDate);

  const matchingItem = lifeData.find((item) => {
    const itemDate = parseDate(item.date);
    const formattedItemDate = formatDate(itemDate);
    const match = formattedItemDate === selectedDate;
    console.log(
      `비교: ${item.date} (${formattedItemDate}) vs ${selectedDate} = ${match}`
    );
    return match;
  });

  const dayData = matchingItem || {
    date: selectedDate,
    cardioDistance: 0,
    cardioMinute: 0,
    isOutdoorRunning: false,
    strengthTrainingMinutes: 0,
    spendMoney: 0,
  };

  // DOM 요소 가져오기
  const cardioDistanceInput = document.getElementById("cardio-distance");
  const cardioMinuteInput = document.getElementById("cardio-minute");
  const isOutdoorRunningInput = document.getElementById("is-outdoor-running");
  const strengthTrainingMinutesInput = document.getElementById(
    "strength-training-minutes"
  );
  const spendMoneyInput = document.getElementById("spend-money");

  // 입력 필드 업데이트 (null 체크 추가)
  if (cardioDistanceInput) cardioDistanceInput.value = dayData.cardioDistance;
  if (cardioMinuteInput) cardioMinuteInput.value = dayData.cardioMinute;
  if (isOutdoorRunningInput)
    isOutdoorRunningInput.checked = dayData.isOutdoorRunning;
  if (strengthTrainingMinutesInput)
    strengthTrainingMinutesInput.value = dayData.strengthTrainingMinutes;
  if (spendMoneyInput) spendMoneyInput.value = dayData.spendMoney;

  // 점수 업데이트
  updateScoreDisplay(dayData);

  // 테이블과 차트 업데이트
  renderCardioTable();
  renderStrengthTable();
  renderSpendingTable();
  updateAllCharts();
  updateStatistics();
}

// 날짜 간 이동
function navigateDate(direction) {
  const currentDate = new Date(datePicker.value);
  currentDate.setDate(currentDate.getDate() + direction);

  // 오늘 이후로 이동 불가
  if (currentDate > today) {
    currentDate = new Date(today);
  }

  datePicker.value = formatDate(currentDate);
  updateView();

  // 점수 업데이트를 위해 dayData 다시 가져오기
  const selectedDate = datePicker.value;
  const matchingItem = lifeData.find((item) => {
    const itemDate = parseDate(item.date);
    const formattedItemDate = formatDate(itemDate);
    return formattedItemDate === selectedDate;
  });

  const dayData = matchingItem || {
    date: selectedDate,
    cardioDistance: 0,
    cardioMinute: 0,
    isOutdoorRunning: false,
    strengthTrainingMinutes: 0,
    spendMoney: 0,
  };

  // 점수 명시적 업데이트
  updateScoreDisplay(dayData);
}

// 오늘 날짜로 이동
function goToToday() {
  datePicker.value = todayStr;
  updateView();
}

// 모든 차트 업데이트
function updateAllCharts() {
  renderCardioChart();
  renderStrengthChart();
  renderSpendingChart();
}

// 모든 테이블 업데이트
function updateAllTables() {
  renderCardioTable();
  renderStrengthTable();
  renderSpendingTable();
}

// 유산소 차트 렌더링
function renderCardioChart() {
  let startDate = new Date(document.getElementById("cardio-start-date").value);
  const endDate = new Date(document.getElementById("cardio-end-date").value);

  // 시작 날짜와 종료 날짜가 동일한 경우, 시작 날짜를 30일 전으로 설정
  if (startDate.getTime() === endDate.getTime()) {
    startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
    document.getElementById("cardio-start-date").value = formatDate(startDate);
  }

  const filteredData = lifeData.filter((item) => {
    const itemDate = parseDate(item.date);
    return (
      itemDate >= startDate && itemDate <= endDate && item.cardioDistance > 0
    );
  });

  // 모든 필터링된 데이터를 날짜순으로 정렬해서 사용
  const recentData = [...filteredData].sort(
    (a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date))
  );

  const dates = recentData.map((item) => formatDateShort(parseDate(item.date)));

  // 차트 상태 계산
  const ctx = document.getElementById("cardioChart").getContext("2d");

  if (cardioChart) {
    cardioChart.destroy();
  }

  let datasets = [];
  switch (currentCardioChartType) {
    case "distance":
      datasets = [
        {
          label: "거리 (km)",
          data: recentData.map((item) => item.cardioDistance),
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          tension: 0.1,
          pointRadius: 5,
        },
      ];
      break;
    case "time":
      datasets = [
        {
          label: "시간 (분)",
          data: recentData.map((item) => item.cardioMinute),
          borderColor: "#42A5F5",
          backgroundColor: "rgba(66, 165, 245, 0.2)",
          tension: 0.1,
          pointRadius: 5,
        },
      ];
      break;
    case "pace":
      datasets = [
        {
          label: "페이스 (분/km)",
          data: recentData.map((item) => {
            if (item.cardioDistance > 0 && item.cardioMinute > 0) {
              return item.cardioMinute / item.cardioDistance;
            }
            return null;
          }),
          borderColor: "#FF9800",
          backgroundColor: "rgba(255, 152, 0, 0.2)",
          tension: 0.1,
          pointRadius: 5,
        },
      ];
      break;
  }

  // 야외 러닝 표시를 위한 포인트 스타일
  const pointStyles = recentData.map((item) => ({
    backgroundColor: item.isOutdoorRunning ? "#4CAF50" : "#FF9800",
    borderColor: item.isOutdoorRunning ? "#4CAF50" : "#FF9800",
  }));

  cardioChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: datasets,
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: getYAxisLabel(),
          },
        },
        x: {
          title: {
            display: true,
            text: "날짜",
          },
        },
      },
      elements: {
        point: {
          radius: 5,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const dataIndex = context.dataIndex;
              const item = recentData[dataIndex];
              const isOutdoor = item.isOutdoorRunning ? "야외" : "실내";
              return `${context.dataset.label}: ${context.parsed.y} (${isOutdoor})`;
            },
          },
        },
      },
    },
  });
}

function getYAxisLabel() {
  switch (currentCardioChartType) {
    case "distance":
      return "거리 (km)";
    case "time":
      return "시간 (분)";
    case "pace":
      return "페이스 (분/km)";
    default:
      return "";
  }
}

// 근력 차트 렌더링
function renderStrengthChart() {
  let startDate = new Date(
    document.getElementById("strength-start-date").value
  );
  const endDate = new Date(document.getElementById("strength-end-date").value);

  // 시작 날짜와 종료 날짜가 동일한 경우, 시작 날짜를 30일 전으로 설정
  if (startDate.getTime() === endDate.getTime()) {
    startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
    document.getElementById("strength-start-date").value =
      formatDate(startDate);
  }

  const filteredData = lifeData.filter((item) => {
    const itemDate = parseDate(item.date);
    return (
      itemDate >= startDate &&
      itemDate <= endDate &&
      item.strengthTrainingMinutes > 0
    );
  });

  // 모든 필터링된 데이터를 날짜순으로 정렬해서 사용
  const recentData = [...filteredData].sort(
    (a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date))
  );

  const dates = recentData.map((item) => formatDateShort(parseDate(item.date)));

  // 차트 상태 계산
  const ctx = document.getElementById("strengthChart").getContext("2d");

  if (strengthChart) {
    strengthChart.destroy();
  }

  strengthChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "근력 운동 시간 (분)",
          data: recentData.map((item) => item.strengthTrainingMinutes),
          borderColor: "#673AB7",
          backgroundColor: "rgba(103, 58, 183, 0.2)",
          tension: 0.1,
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "시간 (분)",
          },
        },
        x: {
          title: {
            display: true,
            text: "날짜",
          },
        },
      },
    },
  });
}

// 지출 차트 렌더링
function renderSpendingChart() {
  let startDate = new Date(
    document.getElementById("spending-start-date").value
  );
  const endDate = new Date(document.getElementById("spending-end-date").value);

  // 시작 날짜와 종료 날짜가 동일한 경우, 시작 날짜를 30일 전으로 설정
  if (startDate.getTime() === endDate.getTime()) {
    startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
    document.getElementById("spending-start-date").value =
      formatDate(startDate);
  }

  const filteredData = lifeData.filter((item) => {
    const itemDate = parseDate(item.date);
    return itemDate >= startDate && itemDate <= endDate && item.spendMoney > 0;
  });

  // 모든 필터링된 데이터를 날짜순으로 정렬해서 사용
  const recentData = [...filteredData].sort(
    (a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date))
  );

  const dates = recentData.map((item) => formatDateShort(parseDate(item.date)));

  // 차트 상태 계산
  const ctx = document.getElementById("spendingChart").getContext("2d");

  if (spendingChart) {
    spendingChart.destroy();
  }

  spendingChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "지출 금액 (원)",
          data: recentData.map((item) => item.spendMoney),
          borderColor: "#FF9800",
          backgroundColor: "rgba(255, 152, 0, 0.2)",
          tension: 0.1,
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "금액 (원)",
          },
        },
        x: {
          title: {
            display: true,
            text: "날짜",
          },
        },
      },
    },
  });
}

// 유산소 테이블 렌더링
function renderCardioTable() {
  cardioTableBody.innerHTML = "";

  const filteredData = lifeData.filter(
    (item) => item.cardioDistance > 0 || item.cardioMinute > 0
  );

  filteredData.forEach((item) => {
    const row = document.createElement("tr");
    row.dataset.date = formatDate(parseDate(item.date));

    // 페이스 계산 (km당 분)
    let pace = "-";
    if (item.cardioDistance > 0 && item.cardioMinute > 0) {
      const paceValue = item.cardioMinute / item.cardioDistance;
      const paceMinutes = Math.floor(paceValue);
      const paceSeconds = Math.round((paceValue - paceMinutes) * 60);
      pace = `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")}`;
    }

    // 유산소 시간을 분:초 형식으로 표시
    let cardioMinuteDisplay = "-";
    if (item.cardioMinute > 0) {
      const minutes = Math.floor(item.cardioMinute);
      const seconds = Math.round((item.cardioMinute - minutes) * 60);
      cardioMinuteDisplay = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    row.innerHTML = `
      <td>${formatDateKorean(parseDate(item.date))}</td>
      <td>${item.cardioDistance.toFixed(1)}</td>
      <td>${cardioMinuteDisplay}</td>
      <td>${pace}</td>
      <td>${item.isOutdoorRunning ? "✔️" : "❌"}</td>
    `;

    cardioTableBody.appendChild(row);
  });
}

// 근력 테이블 렌더링
function renderStrengthTable() {
  strengthTableBody.innerHTML = "";

  const filteredData = lifeData.filter(
    (item) => item.strengthTrainingMinutes > 0
  );

  filteredData.forEach((item) => {
    const row = document.createElement("tr");
    row.dataset.date = formatDate(parseDate(item.date));

    row.innerHTML = `
      <td>${formatDateKorean(parseDate(item.date))}</td>
      <td>${item.strengthTrainingMinutes}</td>
    `;

    strengthTableBody.appendChild(row);
  });
}

// 지출 테이블 렌더링
function renderSpendingTable() {
  spendingTableBody.innerHTML = "";

  const filteredData = lifeData.filter((item) => item.spendMoney > 0);

  filteredData.forEach((item) => {
    const row = document.createElement("tr");
    row.dataset.date = formatDate(parseDate(item.date));

    row.innerHTML = `
      <td>${formatDateKorean(parseDate(item.date))}</td>
      <td>${item.spendMoney.toLocaleString()}</td>
    `;

    spendingTableBody.appendChild(row);
  });
}

// 통계 업데이트
function updateStatistics() {
  // 주간 데이터 가져오기 (월요일~일요일)
  const weekData = getWeekData();

  // 유산소 통계
  const cardioData = weekData.filter(
    (item) => item.cardioDistance > 0 || item.cardioMinute > 0
  );
  const totalCardioDistance = cardioData.reduce(
    (sum, item) => sum + item.cardioDistance,
    0
  );
  const totalCardioMinutes = cardioData.reduce(
    (sum, item) => sum + (item.cardioMinute || 0),
    0
  );

  // 평균 페이스 계산
  let avgPaceValue = 0;
  if (totalCardioDistance > 0 && totalCardioMinutes > 0) {
    avgPaceValue = totalCardioMinutes / totalCardioDistance;
    const paceMinutes = Math.floor(avgPaceValue);
    const paceSeconds = Math.round((avgPaceValue - paceMinutes) * 60);
    avgPace.textContent = `${paceMinutes}:${paceSeconds
      .toString()
      .padStart(2, "0")} 분/km`;
  } else {
    avgPace.textContent = "-";
  }

  weeklyDistance.textContent = `${totalCardioDistance.toFixed(1)} km`;

  // 유산소 시간을 분:초 형식으로 표시
  let cardioTimeDisplay = "-";
  if (totalCardioMinutes > 0) {
    const minutes = Math.floor(totalCardioMinutes);
    const seconds = Math.round((totalCardioMinutes - minutes) * 60);
    cardioTimeDisplay = `${minutes}:${seconds.toString().padStart(2, "0")} 분`;
  }
  weeklyCardioTime.textContent = cardioTimeDisplay;

  // 근력 통계
  const strengthData = weekData.filter(
    (item) => item.strengthTrainingMinutes > 0
  );
  const totalStrengthMinutes = strengthData.reduce(
    (sum, item) => sum + (item.strengthTrainingMinutes || 0),
    0
  );
  const avgStrengthMinutes =
    strengthData.length > 0 ? Math.round(totalStrengthMinutes / 7) : 0;

  weeklyStrengthTime.textContent = `${totalStrengthMinutes} 분`;
  avgStrengthTime.textContent = `${avgStrengthMinutes} 분/일`;

  // 지출 통계
  const spendingData = weekData.filter((item) => item.spendMoney > 0);
  const totalSpending = spendingData.reduce(
    (sum, item) => sum + item.spendMoney,
    0
  );
  const avgSpendingAmount =
    totalSpending > 0 ? Math.round(totalSpending / 7) : 0;

  weeklySpending.textContent = `${totalSpending.toLocaleString()} 원`;
  avgSpending.textContent = `${avgSpendingAmount.toLocaleString()} 원/일`;

  // 최고 기록 업데이트
  updateBestRecords();

  // 연속 기록 업데이트
  updateStreakInfo();

  // 캘린더 뷰 업데이트
  updateCalendarView();
}

// 주간 데이터 가져오기 (월요일~일요일)
function getWeekData() {
  const today = new Date();
  const currentDay = today.getDay();
  const diff = currentDay === 0 ? 6 : currentDay - 1; // 일요일이면 6일 전, 아니면 (현재 요일 - 1)일 전
  const monday = new Date(today);
  monday.setDate(today.getDate() - diff);

  return lifeData.filter((item) => {
    const itemDate = parseDate(item.date);
    return itemDate >= monday && itemDate <= today;
  });
}

// 최고 기록 업데이트
function updateBestRecords() {
  const cardioData = lifeData.filter(
    (item) => item.cardioDistance > 0 && item.cardioMinute > 0
  );
  const strengthData = lifeData.filter(
    (item) => item.strengthTrainingMinutes > 0
  );

  // 최고 페이스
  const bestPace = cardioData.reduce(
    (best, item) => {
      const pace = item.cardioMinute / item.cardioDistance;
      return pace < best.pace ? { pace, date: item.date } : best;
    },
    { pace: Infinity, date: null }
  );

  if (bestPace.date) {
    const paceMinutes = Math.floor(bestPace.pace);
    const paceSeconds = Math.round((bestPace.pace - paceMinutes) * 60);
    document.getElementById(
      "best-pace"
    ).textContent = `${paceMinutes}:${paceSeconds
      .toString()
      .padStart(2, "0")} (${formatDateKorean(parseDate(bestPace.date))})`;
  }

  // 최장 거리
  const bestDistance = cardioData.reduce(
    (best, item) =>
      item.cardioDistance > best.distance
        ? { distance: item.cardioDistance, date: item.date }
        : best,
    { distance: 0, date: null }
  );

  if (bestDistance.date) {
    document.getElementById(
      "best-distance"
    ).textContent = `${bestDistance.distance.toFixed(1)}km (${formatDateKorean(
      parseDate(bestDistance.date)
    )})`;
  }

  // 최장 시간
  const bestTime = cardioData.reduce(
    (best, item) =>
      item.cardioMinute > best.time
        ? { time: item.cardioMinute, date: item.date }
        : best,
    { time: 0, date: null }
  );

  if (bestTime.date) {
    const minutes = Math.floor(bestTime.time);
    const seconds = Math.round((bestTime.time - minutes) * 60);
    document.getElementById("best-time").textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")} (${formatDateKorean(parseDate(bestTime.date))})`;
  }

  // 최장 무산소 시간
  const bestStrengthTime = strengthData.reduce(
    (best, item) =>
      item.strengthTrainingMinutes > best.time
        ? { time: item.strengthTrainingMinutes, date: item.date }
        : best,
    { time: 0, date: null }
  );

  if (bestStrengthTime.date) {
    document.getElementById("best-strength-time").textContent = `${
      bestStrengthTime.time
    }분 (${formatDateKorean(parseDate(bestStrengthTime.date))})`;
  }

  // 최고 총점
  const bestTotalScore = lifeData.reduce(
    (best, item) => {
      const score = updateScoreDisplay(item);
      return score > best.score ? { score, date: item.date } : best;
    },
    { score: 0, date: null }
  );

  if (bestTotalScore.date) {
    document.getElementById("best-total-score").textContent = `${
      bestTotalScore.score
    }점 (${formatDateKorean(parseDate(bestTotalScore.date))})`;
  }
}

// 연속 기록 업데이트
function updateStreakInfo() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 현재 연속 운동
  let currentStreak = 0;
  let currentDate = today;

  // 오늘 데이터가 있는지 확인
  const hasTodayData = lifeData.some((item) => {
    const itemDate = parseDate(item.date);
    itemDate.setHours(0, 0, 0, 0);
    return (
      itemDate.getTime() === currentDate.getTime() &&
      (item.cardioDistance > 0 || item.strengthTrainingMinutes > 0)
    );
  });

  // 오늘 데이터가 없으면 어제부터 시작
  if (!hasTodayData) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  while (true) {
    const hasData = lifeData.some((item) => {
      const itemDate = parseDate(item.date);
      itemDate.setHours(0, 0, 0, 0);
      return (
        itemDate.getTime() === currentDate.getTime() &&
        (item.cardioDistance > 0 || item.strengthTrainingMinutes > 0)
      );
    });

    if (!hasData) break;

    currentStreak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // 최장 연속 운동
  let maxStreak = 0;
  let tempStreak = 1;

  const sortedData = [...lifeData].sort(
    (a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date))
  );

  for (let i = 1; i < sortedData.length; i++) {
    const currentDate = parseDate(sortedData[i].date);
    const prevDate = parseDate(sortedData[i - 1].date);

    const diffDays = Math.floor(
      (currentDate - prevDate) / (1000 * 60 * 60 * 24)
    );

    if (
      diffDays === 1 &&
      (sortedData[i].cardioDistance > 0 ||
        sortedData[i].strengthTrainingMinutes > 0) &&
      (sortedData[i - 1].cardioDistance > 0 ||
        sortedData[i - 1].strengthTrainingMinutes > 0)
    ) {
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  document.getElementById("current-streak").textContent = `${currentStreak}일`;
  document.getElementById("max-streak").textContent = `${maxStreak}일`;
}

// 캘린더 뷰 업데이트
function updateCalendarView() {
  const calendarView = document.querySelector(".calendar-view");
  calendarView.innerHTML = "";

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  // 이전 달의 마지막 날짜들
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfWeek = firstDay.getDay();

  // 이전 달의 날짜들 추가
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = document.createElement("div");
    day.className = "calendar-day";
    day.textContent = prevMonthLastDay - i;
    calendarView.appendChild(day);
  }

  // 현재 달의 날짜들 추가
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = document.createElement("div");
    day.className = "calendar-day";
    if (i === today.getDate() && currentMonth === today.getMonth()) {
      day.classList.add("today");
    }

    const dateStr = `${currentYear}.${String(currentMonth + 1).padStart(
      2,
      "0"
    )}.${String(i).padStart(2, "0")}`;
    const hasData = lifeData.some((item) => item.date === dateStr);

    if (hasData) {
      day.classList.add("has-data");
      day.title = "운동 기록 있음";
    }

    day.textContent = i;
    calendarView.appendChild(day);
  }
}

// 점수 표시 업데이트
function updateScoreDisplay(data) {
  // 유산소 점수 계산 (0~100+)
  let cardioValue = 0;
  if (data.cardioDistance > 0) {
    // 기본 점수 (3.6km = 80점)
    cardioValue = Math.min(
      80,
      Math.round(
        (data.cardioDistance / SCORE_CONFIG.cardio.targetDistance) * 80
      )
    );

    // 추가 거리에 대한 보너스 점수 (100m당 1점)
    if (data.cardioDistance > SCORE_CONFIG.cardio.targetDistance) {
      const extraDistance =
        data.cardioDistance - SCORE_CONFIG.cardio.targetDistance;
      const extraPoints = Math.floor(extraDistance * 10); // 100m당 1점이므로 1km당 10점
      cardioValue += extraPoints;
    }
  }

  // 근력 점수 계산 (0~70+)
  let strengthValue = 0;
  if (data.strengthTrainingMinutes > 0) {
    strengthValue = data.strengthTrainingMinutes;
  }

  // 지출 점수 계산 (0~100+)
  let spendingValue = 0;
  if (data.spendMoney >= 0) {
    // 18,000원이 80점
    if (data.spendMoney <= SCORE_CONFIG.spending.targetAmount) {
      spendingValue = 80;
      // 1000원 덜 쓸 때마다 1점 추가
      const savedAmount = SCORE_CONFIG.spending.targetAmount - data.spendMoney;
      spendingValue += Math.floor(savedAmount / 1000);
    } else {
      // 더 많은 지출은 더 낮은 점수
      const excess = data.spendMoney - SCORE_CONFIG.spending.targetAmount;
      spendingValue = Math.max(0, 80 - Math.floor(excess / 1000));
    }
  }

  // 표시 업데이트
  cardioScoreFill.style.width = `${Math.min(100, cardioValue)}%`;
  strengthScoreFill.style.width = `${Math.min(100, strengthValue)}%`;
  spendingScoreFill.style.width = `${Math.min(100, spendingValue)}%`;

  cardioScore.textContent = cardioValue;
  strengthScore.textContent = strengthValue;
  spendingScore.textContent = spendingValue;

  // 총점 계산 (0~100+)
  const totalScore = Math.round(
    cardioValue * SCORE_CONFIG.cardio.weight +
      strengthValue * SCORE_CONFIG.strength.weight +
      spendingValue * SCORE_CONFIG.spending.weight
  );

  scoreNumber.textContent = totalScore;

  // 별점 표시 (최대 5개)
  const stars = "\u2605".repeat(5);
  const percent = Math.min(1, totalScore / 100);
  const width = Math.min(100, Math.max(0, percent * 100));
  starsContainer.innerHTML = stars;
  starsContainer.style.width = `${width}%`;

  return totalScore;
}

// 엑셀 데이터 가져오기
function importData() {
  const file = fileUpload.files[0];

  if (!file) {
    alert("파일을 선택해주세요.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // 첫 번째 시트 가져오기
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

      // JSON으로 변환
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      // 데이터 형식 변환
      console.log("Excel 데이터:", jsonData);

      const processedData = jsonData.map((row) => {
        console.log("처리 중인 행:", row);

        // 날짜 처리
        let dateValue = row.date;
        if (typeof dateValue === "number") {
          // Excel의 날짜 시리얼 넘버를 Date 객체로 변환
          const date = new Date((dateValue - 25569) * 86400 * 1000);
          dateValue = `${date.getFullYear()}.${String(
            date.getMonth() + 1
          ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
        } else if (dateValue instanceof Date) {
          // Date 객체를 yyyy.m.d 형식으로 변환
          dateValue = `${dateValue.getFullYear()}.${String(
            dateValue.getMonth() + 1
          ).padStart(2, "0")}.${String(dateValue.getDate()).padStart(2, "0")}`;
        } else if (typeof dateValue === "string") {
          // 문자열인 경우 YYYY.MM.DD 형식으로 변환
          const date = new Date(dateValue);
          if (!isNaN(date)) {
            dateValue = `${date.getFullYear()}.${String(
              date.getMonth() + 1
            ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
          }
        }
        console.log("변환된 날짜:", dateValue);

        // 유산소 시간 처리
        let cardioMinuteValue = 0;
        const cardioMinute = row.cardioMinute || row.cardioMinutes;

        if (cardioMinute !== undefined && cardioMinute !== "") {
          if (typeof cardioMinute === "string" && cardioMinute.includes(":")) {
            // 분:초 형식 처리
            const [minutes, seconds] = cardioMinute.split(":").map(Number);
            cardioMinuteValue = minutes + seconds / 60;
          } else if (typeof cardioMinute === "number") {
            // 숫자 형식 처리
            cardioMinuteValue = cardioMinute;
          } else {
            // 기타 형식은 숫자로 변환 시도
            cardioMinuteValue = parseFloat(cardioMinute) || 0;
          }
        }
        console.log("변환된 유산소 시간:", cardioMinuteValue);

        return {
          date: dateValue,
          cardioDistance: parseFloat(row.cardioDistance) || 0,
          cardioMinute: cardioMinuteValue,
          isOutdoorRunning:
            row.isOutdoorRunning === true ||
            row.isOutdoorRunning === "O" ||
            row.isOutdoorRunning === "o" ||
            row.isOutdoorRunning === "✔️" ||
            row.isOutdoorRunning === 1,
          strengthTrainingMinutes: parseInt(row.strengthTrainingMinutes) || 0,
          spendMoney: parseInt(row.spendMoney) || 0,
        };
      });

      // 기존 차트 상태 저장
      const currentCardioChartType = window.currentCardioChartType;

      // 데이터 업데이트
      lifeData = processedData;
      lifeData.sort(
        (a, b) => new Date(parseDate(b.date)) - new Date(parseDate(a.date))
      );
      saveData();

      // 차트 상태 복원
      window.currentCardioChartType = currentCardioChartType;

      // UI 업데이트
      updateView();
      alert("데이터를 성공적으로 가져왔습니다.");
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
      alert("데이터 가져오기에 실패했습니다. 날짜 형식을 확인해주세요.");
    }
  };

  reader.readAsArrayBuffer(file);
}

// 엑셀 데이터 내보내기
function exportData() {
  if (lifeData.length === 0) {
    alert("내보낼 데이터가 없습니다.");
    return;
  }

  // 데이터를 날짜 오름차순으로 정렬
  const sortedData = [...lifeData].sort(
    (a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date))
  );

  // 워크시트 생성
  const ws = XLSX.utils.json_to_sheet(sortedData);

  // 워크북 생성 및 워크시트 추가
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "라이프 데이터");

  // 파일 다운로드
  XLSX.writeFile(wb, "마이라이프_데이터.xlsx");
}

// 업데이트된 데이터 자동 내보내기
function exportUpdatedData() {
  if (lifeData.length === 0) {
    return;
  }

  // 데이터를 날짜 오름차순으로 정렬
  const sortedData = [...lifeData].sort(
    (a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date))
  );

  // 워크시트 생성
  const ws = XLSX.utils.json_to_sheet(sortedData);

  // 워크북 생성 및 워크시트 추가
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "라이프 데이터");

  // 현재 날짜로 파일명 생성
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  // 파일 다운로드
  XLSX.writeFile(
    wb,
    `UpdatedData_${year}${month}${day}_${hours}${minutes}.xlsx`
  );
}

// 날짜 파싱 함수 (YYYY-MM-DD, YYYY.MM.DD, etc)
function parseDate(dateStr) {
  if (!dateStr) return new Date();

  // YYYY.MM.DD 형식
  if (dateStr.match(/^\d{4}\.\d{1,2}\.\d{1,2}$/)) {
    const [year, month, day] = dateStr.split(".").map(Number);
    return new Date(year, month - 1, day);
  }

  // YYYY-MM-DD 형식
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  // 기타 형식 (YYYY.MM.DD 슬래시나 대시 등 구분자 포함)
  const parts = dateStr.split(/[.\-\/]/);
  if (parts.length >= 3) {
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // 월은 0부터 시작
    const day = parseInt(parts[2]);
    return new Date(year, month, day);
  }

  // 기타 형식
  console.log("날짜 파싱 시도:", dateStr);
  return new Date(dateStr);
}

// YYYY-MM-DD 형식으로 날짜 포맷
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// MM/DD 형식으로 날짜 포맷
function formatDateShort(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
}

// YYYY년 MM월 DD일 형식으로 날짜 포맷
function formatDateKorean(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

// 디버깅을 위한 함수
window.onload = function () {
  console.log("앱 로딩 완료!");

  // 데이터 로드 상태 확인
  if (lifeData.length > 0) {
    console.log("데이터 로드 성공:", lifeData.length, "항목");
    lifeData.forEach((item) => {
      console.log("날짜:", item.date, "파싱결과:", parseDate(item.date));
      console.log(
        "유산소:",
        item.cardioDistance,
        "km,",
        item.cardioMinute,
        "분"
      );
    });
  } else {
    console.log("로드된 데이터 없음");
  }

  // 초기 주간 및 월간 날짜 설정
  setCurrentWeek();
  setCurrentMonth();
};

// 데이터 초기화
function resetData() {
  if (confirm("모든 데이터가 삭제됩니다. 정말 초기화하시겠습니까?")) {
    lifeData = [];
    saveData();

    // 점수 초기화
    updateScoreDisplay({
      cardioDistance: 0,
      cardioMinute: 0,
      isOutdoorRunning: false,
      strengthTrainingMinutes: 0,
      spendMoney: 0,
    });

    // 차트, 테이블, 통계 초기화
    updateAllCharts();
    updateAllTables();
    updateStatistics();
    updateWeeklyStats();
    updateMonthlyStats();
    updateHallOfFame();

    alert("데이터가 초기화되었습니다.");
  }
}

// 현재 주 설정 (월요일 기준)
function setCurrentWeek() {
  const today = new Date();
  const day = today.getDay(); // 0=일요일, 1=월요일, ..., 6=토요일
  const diff = day === 0 ? 6 : day - 1; // 월요일을 시작으로 설정

  currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - diff);
  currentWeekStart.setHours(0, 0, 0, 0);

  updateWeekDisplay();
}

// 주간 디스플레이 업데이트
function updateWeekDisplay() {
  if (!currentWeekDisplay) return;

  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(currentWeekStart.getDate() + 6);

  const year = currentWeekStart.getFullYear();
  const month = currentWeekStart.getMonth() + 1;
  const weekNum = getWeekNumber(currentWeekStart);

  currentWeekDisplay.textContent = `${year}년 ${month}월 ${weekNum - 1}주`;
}

// 주 번호 계산 (1~5주)
function getWeekNumber(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayWeekday = firstDayOfMonth.getDay() || 7; // 일요일이면 7로 변환

  // 첫째주 시작일 계산 (월요일 기준)
  const firstWeekStart = new Date(firstDayOfMonth);
  firstWeekStart.setDate(firstWeekStart.getDate() - firstDayWeekday + 1);

  // 날짜 차이를 일 단위로 계산
  const diffDays = Math.floor((date - firstWeekStart) / (1000 * 60 * 60 * 24));

  // 주 번호 계산
  return Math.floor(diffDays / 7) + 1;
}

// 주간 이동
function navigateWeek(direction) {
  currentWeekStart.setDate(currentWeekStart.getDate() + direction * 7);

  // 오늘보다 미래로 이동하지 않도록 제한
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextWeekStart = new Date(currentWeekStart);
  nextWeekStart.setDate(currentWeekStart.getDate() + 7);

  if (nextWeekStart > today) {
    // 현재 주가 끝나는 날짜가 오늘보다 미래면 현재 주로 설정
    setCurrentWeek();
  } else {
    updateWeekDisplay();
    updateWeeklyStats();
  }
}

// 월간 날짜 설정
function setCurrentMonth() {
  currentMonthDate = new Date();
  updateMonthDisplay();
}

// 월간 디스플레이 업데이트
function updateMonthDisplay() {
  if (!currentMonthDisplay) return;

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth() + 1;

  currentMonthDisplay.textContent = `${year}년 ${month}월`;
}

// 월간 이동
function navigateMonth(direction) {
  currentMonthDate.setMonth(currentMonthDate.getMonth() + direction);

  // 오늘보다 미래로 이동하지 않도록 제한
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();

  if (
    currentMonthDate.getFullYear() > todayYear ||
    (currentMonthDate.getFullYear() === todayYear &&
      currentMonthDate.getMonth() > todayMonth)
  ) {
    currentMonthDate = new Date(todayYear, todayMonth, 1);
  }

  updateMonthDisplay();
  updateMonthlyStats();
}

// 주간 통계 업데이트
function updateWeeklyStats() {
  if (!document.getElementById("weekly-workout-days")) return;

  // 선택된 주의 시작일과 종료일
  const weekStart = new Date(currentWeekStart);
  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  // 주간 데이터 필터링
  const weekData = lifeData.filter((item) => {
    const itemDate = parseDate(item.date);
    return itemDate >= weekStart && itemDate <= weekEnd;
  });

  // 주간 총 운동 일수
  const workoutDays = weekData.filter(
    (item) => item.cardioDistance > 0 || item.strengthTrainingMinutes > 0
  ).length;

  // 유산소 운동 일수
  const cardioDays = weekData.filter((item) => item.cardioDistance > 0).length;

  // 근력 운동 일수
  const strengthDays = weekData.filter(
    (item) => item.strengthTrainingMinutes > 0
  ).length;

  // 총 거리
  const totalDistance = weekData.reduce(
    (sum, item) => sum + item.cardioDistance,
    0
  );

  // 총 유산소 시간
  const totalCardioTime = weekData.reduce(
    (sum, item) => sum + item.cardioMinute,
    0
  );

  // 총 근력 시간
  const totalStrengthTime = weekData.reduce(
    (sum, item) => sum + item.strengthTrainingMinutes,
    0
  );

  // 총 지출
  const totalSpending = weekData.reduce(
    (sum, item) => sum + item.spendMoney,
    0
  );

  // 주간 요약 업데이트
  document.getElementById(
    "weekly-workout-days"
  ).textContent = `${workoutDays}일`;
  document.getElementById("weekly-cardio-days").textContent = `${cardioDays}일`;
  document.getElementById(
    "weekly-strength-days"
  ).textContent = `${strengthDays}일`;
  document.getElementById(
    "week-total-distance"
  ).textContent = `${totalDistance.toFixed(1)} km`;
  document.getElementById("week-total-cardio-time").textContent = `${Math.round(
    totalCardioTime
  )}분`;
  document.getElementById(
    "week-total-strength-time"
  ).textContent = `${totalStrengthTime}분`;
  document.getElementById(
    "week-total-spending"
  ).textContent = `${totalSpending.toLocaleString()}원`;

  // 주간 최고 기록 계산
  if (weekData.length > 0) {
    // 최고 페이스
    const bestPaceData = weekData
      .filter((item) => item.cardioDistance > 0 && item.cardioMinute > 0)
      .reduce(
        (best, item) => {
          const pace = item.cardioMinute / item.cardioDistance;
          return pace < best.pace ? { pace, date: item.date } : best;
        },
        { pace: Infinity, date: null }
      );

    if (bestPaceData.date) {
      const paceMinutes = Math.floor(bestPaceData.pace);
      const paceSeconds = Math.round((bestPaceData.pace - paceMinutes) * 60);
      document.getElementById(
        "week-best-pace"
      ).textContent = `${paceMinutes}:${paceSeconds
        .toString()
        .padStart(2, "0")} (${formatDateKorean(parseDate(bestPaceData.date))})`;
    } else {
      document.getElementById("week-best-pace").textContent = "-";
    }

    // 최장 거리
    const bestDistanceData = weekData.reduce(
      (best, item) =>
        item.cardioDistance > best.distance
          ? { distance: item.cardioDistance, date: item.date }
          : best,
      { distance: 0, date: null }
    );

    if (bestDistanceData.date) {
      document.getElementById(
        "week-best-distance"
      ).textContent = `${bestDistanceData.distance.toFixed(
        1
      )}km (${formatDateKorean(parseDate(bestDistanceData.date))})`;
    } else {
      document.getElementById("week-best-distance").textContent = "-";
    }

    // 최장 시간
    const bestTimeData = weekData.reduce(
      (best, item) =>
        item.cardioMinute > best.time
          ? { time: item.cardioMinute, date: item.date }
          : best,
      { time: 0, date: null }
    );

    if (bestTimeData.date) {
      const minutes = Math.floor(bestTimeData.time);
      const seconds = Math.round((bestTimeData.time - minutes) * 60);
      document.getElementById(
        "week-best-time"
      ).textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")} (${formatDateKorean(parseDate(bestTimeData.date))})`;
    } else {
      document.getElementById("week-best-time").textContent = "-";
    }

    // 최장 근력 시간
    const bestStrengthTimeData = weekData.reduce(
      (best, item) =>
        item.strengthTrainingMinutes > best.time
          ? { time: item.strengthTrainingMinutes, date: item.date }
          : best,
      { time: 0, date: null }
    );

    if (bestStrengthTimeData.date) {
      document.getElementById("week-best-strength-time").textContent = `${
        bestStrengthTimeData.time
      }분 (${formatDateKorean(parseDate(bestStrengthTimeData.date))})`;
    } else {
      document.getElementById("week-best-strength-time").textContent = "-";
    }

    // 최고 총점
    const bestTotalScoreData = weekData.reduce(
      (best, item) => {
        const score = calculateTotalScore(item);
        return score > best.score ? { score, date: item.date } : best;
      },
      { score: 0, date: null }
    );

    if (bestTotalScoreData.date) {
      document.getElementById("week-best-total-score").textContent = `${
        bestTotalScoreData.score
      }점 (${formatDateKorean(parseDate(bestTotalScoreData.date))})`;
    } else {
      document.getElementById("week-best-total-score").textContent = "-";
    }
  } else {
    // 데이터가 없는 경우 모든 최고 기록 초기화
    document.getElementById("week-best-pace").textContent = "-";
    document.getElementById("week-best-distance").textContent = "-";
    document.getElementById("week-best-time").textContent = "-";
    document.getElementById("week-best-strength-time").textContent = "-";
    document.getElementById("week-best-total-score").textContent = "-";
  }

  // 주간 일별 활동 테이블 업데이트
  updateWeeklyActivityTable(weekStart);

  // 주간 추이 차트 업데이트
  updateWeeklyTrendChart("score");
}

// 총점 계산 함수 (아이템 기반)
function calculateTotalScore(item) {
  // 유산소 점수 계산
  let cardioValue = 0;
  if (item.cardioDistance > 0) {
    // 기본 점수 (3.6km = 80점)
    cardioValue = Math.min(
      80,
      Math.round(
        (item.cardioDistance / SCORE_CONFIG.cardio.targetDistance) * 80
      )
    );

    // 추가 거리에 대한 보너스 점수 (100m당 1점)
    if (item.cardioDistance > SCORE_CONFIG.cardio.targetDistance) {
      const extraDistance =
        item.cardioDistance - SCORE_CONFIG.cardio.targetDistance;
      const extraPoints = Math.floor(extraDistance * 10); // 100m당 1점이므로 1km당 10점
      cardioValue += extraPoints;
    }
  }

  // 근력 점수 계산 (0~70+)
  let strengthValue = 0;
  if (item.strengthTrainingMinutes > 0) {
    strengthValue = item.strengthTrainingMinutes;
  }

  // 지출 점수 계산 (0~100+)
  let spendingValue = 0;
  if (item.spendMoney >= 0) {
    // 18,000원이 80점
    if (item.spendMoney <= SCORE_CONFIG.spending.targetAmount) {
      spendingValue = 80;
      // 1000원 덜 쓸 때마다 1점 추가
      const savedAmount = SCORE_CONFIG.spending.targetAmount - item.spendMoney;
      spendingValue += Math.floor(savedAmount / 1000);
    } else {
      // 더 많은 지출은 더 낮은 점수
      const excess = item.spendMoney - SCORE_CONFIG.spending.targetAmount;
      spendingValue = Math.max(0, 80 - Math.floor(excess / 1000));
    }
  }

  // 총점 계산
  return Math.round(
    cardioValue * SCORE_CONFIG.cardio.weight +
      strengthValue * SCORE_CONFIG.strength.weight +
      spendingValue * SCORE_CONFIG.spending.weight
  );
}

// 주간 활동 테이블 업데이트
function updateWeeklyActivityTable(weekStart) {
  const tableBody = document.getElementById("weekly-activity-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  // 요일 이름
  const weekdayNames = ["월", "화", "수", "목", "금", "토", "일"];

  // 주간 활동 테이블 생성
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStart);
    currentDate.setDate(weekStart.getDate() + i);

    const formattedDate = formatDate(currentDate);
    const dayItem = lifeData.find((item) => {
      const itemDate = parseDate(item.date);
      return formatDate(itemDate) === formattedDate;
    }) || {
      date: formattedDate,
      cardioDistance: 0,
      cardioMinute: 0,
      strengthTrainingMinutes: 0,
      spendMoney: 0,
    };

    const totalScore = calculateTotalScore(dayItem);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${weekdayNames[i]}</td>
      <td>${formatDateShort(currentDate)}</td>
      <td>${
        dayItem.cardioDistance > 0
          ? dayItem.cardioDistance.toFixed(1) + "km"
          : "-"
      }</td>
      <td>${
        dayItem.strengthTrainingMinutes > 0
          ? dayItem.strengthTrainingMinutes + "분"
          : "-"
      }</td>
      <td>${
        dayItem.spendMoney > 0
          ? dayItem.spendMoney.toLocaleString() + "원"
          : "-"
      }</td>
      <td>${totalScore > 0 ? totalScore + "점" : "-"}</td>
    `;

    tableBody.appendChild(row);
  }
}

// 주간 추이 차트 업데이트
function updateWeeklyTrendChart(chartType = "score") {
  const canvas = document.getElementById("weeklyTrendChart");
  if (!canvas) return;

  // 선택된 주의 시작일
  const weekStart = new Date(currentWeekStart);

  // 요일 라벨 생성
  const labels = ["월", "화", "수", "목", "금", "토", "일"];

  // 데이터 준비
  const chartData = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStart);
    currentDate.setDate(weekStart.getDate() + i);

    const formattedDate = formatDate(currentDate);
    const dayItem = lifeData.find((item) => {
      const itemDate = parseDate(item.date);
      return formatDate(itemDate) === formattedDate;
    }) || {
      date: formattedDate,
      cardioDistance: 0,
      cardioMinute: 0,
      strengthTrainingMinutes: 0,
      spendMoney: 0,
    };

    let value = 0;

    switch (chartType) {
      case "score":
        value = calculateTotalScore(dayItem);
        break;
      case "cardio":
        value = dayItem.cardioDistance;
        break;
      case "strength":
        value = dayItem.strengthTrainingMinutes;
        break;
      case "spending":
        value = dayItem.spendMoney;
        break;
      default:
        value = calculateTotalScore(dayItem);
    }

    chartData.push(value);
  }

  // 차트 색상 및 레이블 설정
  let chartColor, chartLabel, yAxisLabel;

  switch (chartType) {
    case "score":
      chartColor = "rgba(33, 150, 243, 0.7)";
      chartLabel = "일별 총점";
      yAxisLabel = "점수";
      break;
    case "cardio":
      chartColor = "rgba(76, 175, 80, 0.7)";
      chartLabel = "유산소 운동";
      yAxisLabel = "거리 (km)";
      break;
    case "strength":
      chartColor = "rgba(103, 58, 183, 0.7)";
      chartLabel = "근력 운동";
      yAxisLabel = "시간 (분)";
      break;
    case "spending":
      chartColor = "rgba(255, 152, 0, 0.7)";
      chartLabel = "지출";
      yAxisLabel = "금액 (원)";
      break;
    default:
      chartColor = "rgba(33, 150, 243, 0.7)";
      chartLabel = "일별 총점";
      yAxisLabel = "점수";
  }

  // 차트 생성
  if (weeklyTrendChart) {
    weeklyTrendChart.destroy();
  }

  const ctx = canvas.getContext("2d");
  weeklyTrendChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: chartLabel,
          data: chartData,
          backgroundColor: chartColor,
          borderColor: chartColor.replace("0.7", "1"),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: yAxisLabel,
          },
        },
      },
    },
  });
}

// 월간 통계 업데이트
function updateMonthlyStats() {
  if (!document.getElementById("monthly-workout-days")) return;

  // 선택된 월의 시작일과 종료일
  const monthStart = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth(),
    1
  );
  const monthEnd = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth() + 1,
    0
  );

  // 월간 데이터 필터링
  const monthData = lifeData.filter((item) => {
    const itemDate = parseDate(item.date);
    return itemDate >= monthStart && itemDate <= monthEnd;
  });

  // 월간 총 운동 일수
  const workoutDays = monthData.filter(
    (item) => item.cardioDistance > 0 || item.strengthTrainingMinutes > 0
  ).length;

  // 총 거리
  const totalDistance = monthData.reduce(
    (sum, item) => sum + item.cardioDistance,
    0
  );

  // 총 유산소 시간
  const totalCardioTime = monthData.reduce(
    (sum, item) => sum + item.cardioMinute,
    0
  );

  // 총 근력 시간
  const totalStrengthTime = monthData.reduce(
    (sum, item) => sum + item.strengthTrainingMinutes,
    0
  );

  // 총 지출
  const totalSpending = monthData.reduce(
    (sum, item) => sum + item.spendMoney,
    0
  );

  // 평균 총점
  let avgScore = 0;
  if (monthData.length > 0) {
    const totalScore = monthData.reduce(
      (sum, item) => sum + calculateTotalScore(item),
      0
    );
    avgScore = Math.round(totalScore / monthData.length);
  }

  // 월간 요약 업데이트
  document.getElementById(
    "monthly-workout-days"
  ).textContent = `${workoutDays}일`;
  document.getElementById(
    "month-total-distance"
  ).textContent = `${totalDistance.toFixed(1)} km`;
  document.getElementById(
    "month-total-cardio-time"
  ).textContent = `${Math.round(totalCardioTime)}분`;
  document.getElementById(
    "month-total-strength-time"
  ).textContent = `${totalStrengthTime}분`;
  document.getElementById(
    "month-total-spending"
  ).textContent = `${totalSpending.toLocaleString()}원`;
  document.getElementById("month-avg-score").textContent = `${avgScore}점`;

  // 월간 최고 기록 계산
  if (monthData.length > 0) {
    // 최고 페이스
    const bestPaceData = monthData
      .filter((item) => item.cardioDistance > 0 && item.cardioMinute > 0)
      .reduce(
        (best, item) => {
          const pace = item.cardioMinute / item.cardioDistance;
          return pace < best.pace ? { pace, date: item.date } : best;
        },
        { pace: Infinity, date: null }
      );

    if (bestPaceData.date) {
      const paceMinutes = Math.floor(bestPaceData.pace);
      const paceSeconds = Math.round((bestPaceData.pace - paceMinutes) * 60);
      document.getElementById(
        "month-best-pace"
      ).textContent = `${paceMinutes}:${paceSeconds
        .toString()
        .padStart(2, "0")} (${formatDateKorean(parseDate(bestPaceData.date))})`;
    } else {
      document.getElementById("month-best-pace").textContent = "-";
    }

    // 최장 거리
    const bestDistanceData = monthData.reduce(
      (best, item) =>
        item.cardioDistance > best.distance
          ? { distance: item.cardioDistance, date: item.date }
          : best,
      { distance: 0, date: null }
    );

    if (bestDistanceData.date) {
      document.getElementById(
        "month-best-distance"
      ).textContent = `${bestDistanceData.distance.toFixed(
        1
      )}km (${formatDateKorean(parseDate(bestDistanceData.date))})`;
    } else {
      document.getElementById("month-best-distance").textContent = "-";
    }

    // 최장 시간
    const bestTimeData = monthData.reduce(
      (best, item) =>
        item.cardioMinute > best.time
          ? { time: item.cardioMinute, date: item.date }
          : best,
      { time: 0, date: null }
    );

    if (bestTimeData.date) {
      const minutes = Math.floor(bestTimeData.time);
      const seconds = Math.round((bestTimeData.time - minutes) * 60);
      document.getElementById(
        "month-best-time"
      ).textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")} (${formatDateKorean(parseDate(bestTimeData.date))})`;
    } else {
      document.getElementById("month-best-time").textContent = "-";
    }

    // 최장 근력 시간
    const bestStrengthTimeData = monthData.reduce(
      (best, item) =>
        item.strengthTrainingMinutes > best.time
          ? { time: item.strengthTrainingMinutes, date: item.date }
          : best,
      { time: 0, date: null }
    );

    if (bestStrengthTimeData.date) {
      document.getElementById("month-best-strength-time").textContent = `${
        bestStrengthTimeData.time
      }분 (${formatDateKorean(parseDate(bestStrengthTimeData.date))})`;
    } else {
      document.getElementById("month-best-strength-time").textContent = "-";
    }

    // 최고 총점
    const bestTotalScoreData = monthData.reduce(
      (best, item) => {
        const score = calculateTotalScore(item);
        return score > best.score ? { score, date: item.date } : best;
      },
      { score: 0, date: null }
    );

    if (bestTotalScoreData.date) {
      document.getElementById("month-best-total-score").textContent = `${
        bestTotalScoreData.score
      }점 (${formatDateKorean(parseDate(bestTotalScoreData.date))})`;
    } else {
      document.getElementById("month-best-total-score").textContent = "-";
    }
  } else {
    // 데이터가 없는 경우 모든 최고 기록 초기화
    document.getElementById("month-best-pace").textContent = "-";
    document.getElementById("month-best-distance").textContent = "-";
    document.getElementById("month-best-time").textContent = "-";
    document.getElementById("month-best-strength-time").textContent = "-";
    document.getElementById("month-best-total-score").textContent = "-";
  }

  // 캘린더 업데이트
  updateMonthCalendars();
}

// 월간 캘린더 업데이트
function updateMonthCalendars() {
  updateCalendarView("cardio-calendar", "cardioDistance", " km");
  updateCalendarView("strength-calendar", "strengthTrainingMinutes", "분");
  updateCalendarView("spending-calendar", "spendMoney", "원");
  updateCalendarView("score-calendar", "score", "점");
}

// 캘린더 뷰 업데이트 (유형별)
function updateCalendarView(calendarId, dataType, unit) {
  const calendarElement = document.getElementById(calendarId);
  if (!calendarElement) return;

  calendarElement.innerHTML = "";

  // 요일 헤더 추가
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  weekdays.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = "weekday";
    dayElement.textContent = day;
    calendarElement.appendChild(dayElement);
  });

  // 현재 월의 첫날과 마지막 날
  const firstDay = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth(),
    1
  );
  const lastDay = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth() + 1,
    0
  );

  // 첫째 주 시작 전 빈 칸 추가
  const firstDayOfWeek = firstDay.getDay();
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-cell empty";
    calendarElement.appendChild(emptyCell);
  }

  // 월 내 모든 날짜에 대해 캘린더 셀 생성
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 데이터 범위 계산
  let maxValue = 0;
  const monthData = [];

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(
      currentMonthDate.getFullYear(),
      currentMonthDate.getMonth(),
      day
    );
    const formattedDate = formatDate(date);

    const dayItem = lifeData.find((item) => {
      const itemDate = parseDate(item.date);
      return formatDate(itemDate) === formattedDate;
    });

    let value = 0;
    if (dayItem) {
      if (dataType === "score") {
        value = calculateTotalScore(dayItem);
      } else {
        value = dayItem[dataType] || 0;
      }

      if (value > maxValue) {
        maxValue = value;
      }
    }

    monthData.push({ date, value });
  }

  // 캘린더 셀 생성
  monthData.forEach(({ date, value }) => {
    const cell = document.createElement("div");
    cell.className = "calendar-cell";

    // 오늘 날짜 표시
    if (date.getTime() === today.getTime()) {
      cell.classList.add("today");
    }

    // 값 표시
    if (value > 0) {
      const percentage = maxValue > 0 ? value / maxValue : 0;

      cell.classList.add("has-value");
      if (percentage >= 0.7) {
        cell.classList.add("value-very-high");
      } else if (percentage >= 0.4) {
        cell.classList.add("value-high");
      }

      const dateElement = document.createElement("div");
      dateElement.className = "date";
      dateElement.textContent = date.getDate();

      const valueElement = document.createElement("div");
      valueElement.className = "value";

      if (dataType === "spendMoney") {
        valueElement.textContent = value.toLocaleString() + unit;
      } else {
        valueElement.textContent =
          value.toFixed(dataType === "cardioDistance" ? 1 : 0) + unit;
      }

      cell.appendChild(dateElement);
      cell.appendChild(valueElement);
    } else {
      cell.textContent = date.getDate();
    }

    calendarElement.appendChild(cell);
  });

  // 마지막 주 이후 빈 칸 추가
  const lastDayOfWeek = lastDay.getDay();
  for (let i = lastDayOfWeek; i < 6; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-cell empty";
    calendarElement.appendChild(emptyCell);
  }
}

// 명예의 전당 업데이트
function updateHallOfFame() {
  if (!document.getElementById("hall-best-distance")) return;

  // 모든 데이터 이용
  if (lifeData.length > 0) {
    // 유산소 부문
    // 최장 거리
    const bestDistanceData = lifeData.reduce(
      (best, item) =>
        item.cardioDistance > best.distance
          ? { distance: item.cardioDistance, date: item.date }
          : best,
      { distance: 0, date: null }
    );

    if (bestDistanceData.date) {
      document.getElementById(
        "hall-best-distance"
      ).textContent = `${bestDistanceData.distance.toFixed(1)}km`;
      document.getElementById(
        "hall-best-distance-date"
      ).textContent = `${formatDateKorean(parseDate(bestDistanceData.date))}`;
    }

    // 최고 페이스
    const bestPaceData = lifeData
      .filter((item) => item.cardioDistance > 0 && item.cardioMinute > 0)
      .reduce(
        (best, item) => {
          const pace = item.cardioMinute / item.cardioDistance;
          return pace < best.pace ? { pace, date: item.date } : best;
        },
        { pace: Infinity, date: null }
      );

    if (bestPaceData.date) {
      const paceMinutes = Math.floor(bestPaceData.pace);
      const paceSeconds = Math.round((bestPaceData.pace - paceMinutes) * 60);
      document.getElementById(
        "hall-best-pace"
      ).textContent = `${paceMinutes}:${paceSeconds
        .toString()
        .padStart(2, "0")} 분/km`;
      document.getElementById(
        "hall-best-pace-date"
      ).textContent = `${formatDateKorean(parseDate(bestPaceData.date))}`;
    }

    // 최장 러닝 시간
    const bestCardioTimeData = lifeData.reduce(
      (best, item) =>
        item.cardioMinute > best.time
          ? { time: item.cardioMinute, date: item.date }
          : best,
      { time: 0, date: null }
    );

    if (bestCardioTimeData.date) {
      const minutes = Math.floor(bestCardioTimeData.time);
      const seconds = Math.round((bestCardioTimeData.time - minutes) * 60);
      document.getElementById(
        "hall-best-cardio-time"
      ).textContent = `${minutes}:${seconds.toString().padStart(2, "0")} 분`;
      document.getElementById(
        "hall-best-cardio-time-date"
      ).textContent = `${formatDateKorean(parseDate(bestCardioTimeData.date))}`;
    }

    // 근력 부문
    // 최장 근력 운동 시간
    const bestStrengthTimeData = lifeData.reduce(
      (best, item) =>
        item.strengthTrainingMinutes > best.time
          ? { time: item.strengthTrainingMinutes, date: item.date }
          : best,
      { time: 0, date: null }
    );

    if (bestStrengthTimeData.date) {
      document.getElementById(
        "hall-best-strength-time"
      ).textContent = `${bestStrengthTimeData.time}분`;
      document.getElementById(
        "hall-best-strength-time-date"
      ).textContent = `${formatDateKorean(
        parseDate(bestStrengthTimeData.date)
      )}`;
    }

    // 연속 근력 운동
    const sortedData = [...lifeData].sort(
      (a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date))
    );

    let maxStrengthStreak = 0;
    let currentStrengthStreak = 0;
    let strengthStreakEndDate = null;

    for (let i = 0; i < sortedData.length; i++) {
      if (sortedData[i].strengthTrainingMinutes > 0) {
        currentStrengthStreak++;

        if (currentStrengthStreak > maxStrengthStreak) {
          maxStrengthStreak = currentStrengthStreak;
          strengthStreakEndDate = sortedData[i].date;
        }
      } else {
        currentStrengthStreak = 0;
      }
    }

    if (strengthStreakEndDate) {
      document.getElementById(
        "hall-best-strength-streak"
      ).textContent = `${maxStrengthStreak}일 연속`;
      document.getElementById(
        "hall-best-strength-streak-date"
      ).textContent = `${formatDateKorean(
        parseDate(strengthStreakEndDate)
      )} 달성`;
    }

    // 전체 성취 부문
    // 최고 일일 총점
    const bestTotalScoreData = lifeData.reduce(
      (best, item) => {
        const score = calculateTotalScore(item);
        return score > best.score ? { score, date: item.date } : best;
      },
      { score: 0, date: null }
    );

    if (bestTotalScoreData.date) {
      document.getElementById(
        "hall-best-total-score"
      ).textContent = `${bestTotalScoreData.score}점`;
      document.getElementById(
        "hall-best-total-score-date"
      ).textContent = `${formatDateKorean(parseDate(bestTotalScoreData.date))}`;
    }

    // 최장 연속 운동
    let maxStreak = 0;
    let streakEndDate = null;

    for (let i = 0; i < sortedData.length; i++) {
      const item = sortedData[i];
      if (item.cardioDistance > 0 || item.strengthTrainingMinutes > 0) {
        let streak = 1;
        let currentDate = parseDate(item.date);

        for (let j = i + 1; j < sortedData.length; j++) {
          const nextItem = sortedData[j];
          const nextDate = parseDate(nextItem.date);

          // 다음 날이 연속되는지 확인
          const diffDays = Math.round(
            (nextDate - currentDate) / (1000 * 60 * 60 * 24)
          );

          if (
            diffDays === 1 &&
            (nextItem.cardioDistance > 0 ||
              nextItem.strengthTrainingMinutes > 0)
          ) {
            streak++;
            currentDate = nextDate;
          } else {
            break;
          }
        }

        if (streak > maxStreak) {
          maxStreak = streak;
          streakEndDate = parseDate(
            sortedData[i + streak - 1]?.date || item.date
          );
        }
      }
    }

    if (streakEndDate) {
      document.getElementById(
        "hall-best-streak"
      ).textContent = `${maxStreak}일 연속`;
      document.getElementById(
        "hall-best-streak-date"
      ).textContent = `${formatDateKorean(streakEndDate)} 달성`;
    }

    // 최고 주간 총점
    // 주간 데이터 그룹화
    const weeklyData = [];
    const weekMap = new Map();

    sortedData.forEach((item) => {
      const date = parseDate(item.date);
      const weekYear = date.getFullYear();
      const weekNum = getISOWeek(date);
      const weekKey = `${weekYear}-W${weekNum}`;

      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, {
          weekKey,
          year: weekYear,
          week: weekNum,
          items: [],
          endDate: date,
        });
      }

      const weekData = weekMap.get(weekKey);
      weekData.items.push(item);

      // 주의 마지막 날짜 업데이트
      if (date > weekData.endDate) {
        weekData.endDate = date;
      }
    });

    // 주간 총점 계산
    let bestWeeklyScore = 0;
    let bestWeekEndDate = null;

    weekMap.forEach((weekData) => {
      let weeklyTotal = 0;

      weekData.items.forEach((item) => {
        weeklyTotal += calculateTotalScore(item);
      });

      if (weeklyTotal > bestWeeklyScore) {
        bestWeeklyScore = weeklyTotal;
        bestWeekEndDate = weekData.endDate;
      }
    });

    if (bestWeekEndDate) {
      document.getElementById(
        "hall-best-weekly-score"
      ).textContent = `${bestWeeklyScore}점`;
      document.getElementById(
        "hall-best-weekly-score-date"
      ).textContent = `${formatDateKorean(bestWeekEndDate)} 주`;
    }

    // 특별 성취 업데이트
    updateAchievements();
  }
}

// ISO 주차 계산 (1~53)
function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

// 특별 성취 업데이트
function updateAchievements() {
  // 100일 기록 업데이트
  const totalDays = new Set(
    lifeData.map((item) => formatDate(parseDate(item.date)))
  ).size;
  const achievement100Days = document.getElementById("achievement-100-days");

  if (totalDays >= 100) {
    achievement100Days.classList.add("achieved");
    achievement100Days.querySelector(".achievement-status").textContent =
      "달성 완료!";
  } else {
    achievement100Days.querySelector(
      ".achievement-status"
    ).textContent = `${totalDays}/100일`;
  }

  // 마라톤 거리 업데이트
  const totalDistance = lifeData.reduce(
    (sum, item) => sum + item.cardioDistance,
    0
  );
  const marathonDistance = 42.195;
  const achievementMarathon = document.getElementById("achievement-marathon");

  if (totalDistance >= marathonDistance) {
    achievementMarathon.classList.add("achieved");
    achievementMarathon.querySelector(".achievement-status").textContent =
      "달성 완료!";
  } else {
    achievementMarathon.querySelector(
      ".achievement-status"
    ).textContent = `${totalDistance.toFixed(1)}/${marathonDistance}km`;
  }

  // 30일 연속 운동 업데이트
  const sortedData = [...lifeData].sort(
    (a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date))
  );

  let maxStreak = 0;
  let currentStreak = 0;
  let previousDate = null;

  for (const item of sortedData) {
    if (item.cardioDistance > 0 || item.strengthTrainingMinutes > 0) {
      const currentDate = parseDate(item.date);

      if (previousDate) {
        const diffDays = Math.round(
          (currentDate - previousDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      previousDate = currentDate;
      maxStreak = Math.max(maxStreak, currentStreak);
    }
  }

  const achievement30Streak = document.getElementById("achievement-30-streak");

  if (maxStreak >= 30) {
    achievement30Streak.classList.add("achieved");
    achievement30Streak.querySelector(".achievement-status").textContent =
      "달성 완료!";
  } else {
    achievement30Streak.querySelector(
      ".achievement-status"
    ).textContent = `${maxStreak}/30일`;
  }
}
