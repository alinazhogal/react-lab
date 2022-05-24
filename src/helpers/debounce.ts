function debounce(timeout = 300) {
  let timer: NodeJS.Timeout;

  return (func: () => void) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, timeout);
  };
}

export default debounce();
