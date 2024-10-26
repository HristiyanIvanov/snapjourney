export function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const secondsAgo = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (let interval in intervals) {
    const seconds = intervals[interval];
    const count = Math.floor(secondsAgo / seconds);
    if (count >= 1) {
      return count === 1 ? `1 ${interval} ago` : `${count} ${interval}s ago`;
    }
  }

  return "Just now";
}
