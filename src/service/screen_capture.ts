import html2canvas from "html2canvas";

const channel = new BroadcastChannel("screen-capture");
export const sendScreen = (element: HTMLElement) => {
  html2canvas(element, {
    scale: 0.25,
  }).then((canvas) => {
    channel.postMessage({ base64: canvas.toDataURL() });
  });
};

export const receiveScreen = (): Promise<string> => {
  return new Promise((resolve) => {
    channel.addEventListener(
      "message",
      (event: MessageEvent) => {
        const data = event.data as { base64: string };
        resolve(data.base64);
      },
      { once: true },
    );
  });
};
