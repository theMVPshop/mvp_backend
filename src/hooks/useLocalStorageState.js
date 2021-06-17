export default function UseLocalStorageState(key, defaultVal) {
  const [state, setState] = React.useState(() => {
    let val;
    try {
      val = JSON.parse(localStorage.getItem(key) || String(defaultVal));
    } catch (e) {
      val = defaultVal;
    }
    return val;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}
