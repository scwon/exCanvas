export const createCavnas = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
};

export const resizeCanvas = (
  entry: ResizeObserverEntry,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  const { width, height } = entry.contentRect;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  const ratio = window.devicePixelRatio;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.scale(ratio, ratio);
  return ctx;
};
