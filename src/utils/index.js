const MONTH_STR = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月"
];
function fz(num) {
  return num < 10 ? `0${num}` : num;
}
function formatYMD(dateObj) {
  return `${dateObj.getFullYear()}${fz(dateObj.getMonth() + 1)}${fz(
    dateObj.getDate()
  )}`;
}
function formatYM(dateObj) {
  return `${dateObj.getFullYear()}${fz(dateObj.getMonth() + 1)}`;
}
function formatHM(dateObj) {
  return `${fz(dateObj.getHours())}:${fz(dateObj.getMinutes())}`;
}
function formatMD(dateObj) {
  return `${fz(dateObj.getMonth() + 1)}月${fz(dateObj.getDate())}日`;
}
function formatYMD_(dateObj) {
  return `${dateObj.getFullYear()}年${fz(dateObj.getMonth() + 1)}月${fz(
    dateObj.getDate()
  )}日`;
}
function formatYMDHM(dateObj) {
  return `${formatYMD_(dateObj)} ${formatHM(dateObj)}`;
}
function formatMDHM(dateObj) {
  return `${formatMD(dateObj)} ${formatHM(dateObj)}`;
}
function formatMonth(dateObj) {
  return MONTH_STR[dateObj.getMonth()];
}
function formatYM__(dateObj) {
  return `${dateObj.getFullYear()}年${fz(dateObj.getMonth() + 1)}月`;
}

export function formatNoteTitle(value) {
  const dateObj = new Date(Number(value));
  const today = new Date();

  if (dateObj.getFullYear() === today.getFullYear()) {
    return formatMonth(dateObj);
  }
  return formatYM__(dateObj);
}
export function formatNoteTime(value) {
  const dateObj = new Date(Number(value));
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const dateStr = formatYMD(dateObj);
  const todayStr = formatYMD(today);
  const yesStr = formatYMD(yesterday);

  if (dateStr === todayStr) {
    return `今天 ${formatHM(dateObj)}`;
  }
  if (dateStr === yesStr) {
    return `昨天 ${formatHM(dateObj)}`;
  }
  if (dateStr < yesStr && dateObj.getFullYear() === today.getFullYear()) {
    return formatMDHM(dateObj);
  }
  return formatYMDHM(dateObj);
}

export function getPlatform() {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) {
    return "android";
  } else if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
    return "ios";
  }
  return "other";
}

export function throttle(fn, time) {
  let canRun = true;
  return function(...args) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, time);
  };
}
