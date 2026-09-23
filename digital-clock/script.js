const clocks = document.querySelectorAll(".clock-card");
const localTime = document.querySelector("#local-time");

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function getTimeZoneOffset(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(date);

  return parts.find((part) => part.type === "timeZoneName")?.value
    .replace("GMT", "UTC") || "UTC";
}

function updateClocks() {
  const now = new Date();

  clocks.forEach((clock) => {
    const timeZone = clock.dataset.timeZone;
    const timeElement = clock.querySelector(".time");
    const dateElement = clock.querySelector(".date");
    const offsetElement = clock.querySelector(".offset");
    const statusElement = clock.querySelector(".day-status");

    const time = new Intl.DateTimeFormat(undefined, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);

    const date = new Intl.DateTimeFormat(undefined, {
      timeZone,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(now);

    const hour = Number(new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      hour12: false,
    }).format(now));

    timeElement.textContent = time;
    timeElement.dateTime = now.toISOString();
    dateElement.textContent = date;
    offsetElement.textContent = getTimeZoneOffset(now, timeZone);
    statusElement.classList.toggle("night", hour < 6 || hour >= 18);
    statusElement.setAttribute("aria-label", hour < 6 || hour >= 18 ? "Night" : "Day");
  });

  localTime.textContent = timeFormatter.format(now);
}

updateClocks();
setInterval(updateClocks, 1000);
