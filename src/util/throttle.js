let timer = null;
export const throttle = (func, time = 20) => () => {
  if (timer) return;
  timmer = setTimeout(() => {
    func();
    clearInterval(timmer);
    timmer = null;
  }, time);
};
