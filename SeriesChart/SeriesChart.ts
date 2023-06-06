import { createCavnas, resizeCanvas } from "./utils";
import type { SeriesData } from "./type";

const TEN_MIN = 1000 * 30 * 1;

class SereisChart {
  private data: Array<Array<SeriesData>> = [[], []];
  private width = 0;
  private height = 0;

  private resizeObserver;
  private root;
  private canvas;
  private ctx!: CanvasRenderingContext2D;
  private duration = TEN_MIN;
  private maxValue = 100;
  constructor(root: HTMLDivElement) {
    this.root = root;
    const { canvas, ctx } = createCavnas();
    this.canvas = canvas;
    this.ctx = ctx;
    this.resizeObserver = new ResizeObserver(this.resizeCanvas);
    this.resizeObserver.observe(this.root);
    this.root.appendChild(this.canvas);
  }
  public drawChart = () => {
    const { width, height, duration, maxValue, ctx } = this;
    const endTime = Date.now() - 2000;
    const startTime = endTime - this.duration;
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "red";
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 2;
    const barX = (startTime / duration) * width;
    const barX2 = ((startTime + 1000 * 0.8) / duration) * width;
    const barWidth = Math.floor(barX2 - barX);
    this.data.forEach((dataset, i) => {
      ctx.save();
      ctx.beginPath();
      dataset.forEach(([time, value], j) => {
        const y = height - (value / maxValue) * height;
        const x = ((time - startTime) / duration) * width;

        if (!i) {
          if (!j) {
            ctx.moveTo(x, height);
          }
          ctx.lineTo(x, y);
          if (j === dataset.length - 1) {
            ctx.lineTo(x, height);
          }
        } else {
          ctx.rect(x - barWidth / 2, height, barWidth, -(height - y));
        }
      });

      if (!i) {
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.globalAlpha = 0.5;
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fill();
      }
      ctx.restore();
    });

    window.requestAnimationFrame(this.drawChart);
  };
  private resizeCanvas: ResizeObserverCallback = (
    entries: ResizeObserverEntry[]
  ) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      this.width = width;
      this.height = height;
      resizeCanvas(entry, this.canvas, this.ctx);
    }
    requestAnimationFrame(this.drawChart);
  };
  public updateData = (data: SeriesData[][]) => {
    this.data = this.data.map((d, i) => {
      return d.concat(data[i]);
    });
  };

  public unmount = () => {
    this.resizeObserver.unobserve(this.root);
  };
}

export default SereisChart;
