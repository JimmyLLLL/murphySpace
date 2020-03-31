let timmer = null;
export const throttle = (func, time = 20) => {
  return e => {
    if (timmer) return;
    timmer = setTimeout(() => {
      func(e);
      clearTimeout(timmer);
      timmer = null;
    }, time);
  };
};
