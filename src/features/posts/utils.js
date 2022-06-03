export const getPostTime = (dateCreated) => {
  let now = Date.now();
  let numberOfMillisecondsPassed = now - dateCreated;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let days = 0;

  seconds = Math.floor(numberOfMillisecondsPassed / 1000);

  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
  } else {
    return `${seconds}S`;
  }

  if (minutes > 60) {
    hours = Math.floor(minutes / 60);
  } else {
    return `${minutes}M`;
  }

  if (hours > 24) {
    days = Math.floor(hours / 24);
  } else {
    return `${hours}H`;
  }

  if (days) return `${days}D`;
};
