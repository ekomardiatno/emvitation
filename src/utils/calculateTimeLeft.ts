export default function calculateTimeLeft(
  targetDate: Date,
  currentDate: Date,
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const diff = targetDate.getTime() - currentDate.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function displayCountdownText(timeLeft: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  const countdown = [];

  if (timeLeft.days > 0) {
    countdown.push(`${timeLeft.days} Hari`);
  }

  if (timeLeft.hours > 0) {
    countdown.push(`${timeLeft.hours} Jam`);
  }

  if (timeLeft.minutes > 0) {
    countdown.push(`${timeLeft.minutes} Menit`);
  }

  if (timeLeft.seconds > 0) {
    countdown.push(`${timeLeft.seconds} Detik`);
  }

  return countdown.join(' ');
}
