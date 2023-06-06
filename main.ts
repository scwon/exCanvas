import SeriesChart from "./SeriesChart";
import "./style.css";
import type { Time, SeriesData } from "./SeriesChart/type";
// 애청 지수
// 받은 스푼
// 시청자 수

// 총 누적, 일자별, 가장 최근, 금일 누적,

// 그냥 숫자로 보여주기
const createData = (): SeriesData => {
  const time: Time = Date.now();
  return [time, Math.floor(Math.random() * 100)];
};

document.addEventListener("DOMContentLoaded", () => {
  const seriesChart = new SeriesChart(
    document.getElementById("chartRoot") as HTMLDivElement
  );

  window.setInterval(() => {
    seriesChart.updateData([[createData()], [createData()]]);
  }, 1000);
});
