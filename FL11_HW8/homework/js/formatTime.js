function formatTime(a) {
    const minutesDay = 1440;
    const minutesHour = 60;
    const days = Math.floor(a/minutesDay); 
    const hours = Math.floor((a-days*minutesDay)/minutesHour);
    const minutes = Math.floor(a-days*minutesDay-hours*minutesHour);
    return `${days}day(s) ${hours}hour(s) ${minutes}minute(s)`;
}
console.log(formatTime(7));
console.log(formatTime(120));
console.log(formatTime(59));
console.log(formatTime(3601));
console.log(formatTime(1501));
console.log(formatTime(10507));
