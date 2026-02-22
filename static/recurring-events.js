// Date formatting utilities for recurring events

const polishDays = {
    0: 'niedziela',
    1: 'poniedziałek',
    2: 'wtorek',
    3: 'środa',
    4: 'czwartek',
    5: 'piątek',
    6: 'sobota'
};

const polishDaysShort = ['nie', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];

function getNextOccurrence(schedule) {
    const parts = schedule.split(' ');
    if (parts.length !== 5) return null;
    
    const [minute, hour, , , dayOfWeek] = parts;
    const next = new Date();
    next.setHours(parseInt(hour), parseInt(minute), 0, 0);
    
    while (next.getDay() !== parseInt(dayOfWeek)) {
        next.setDate(next.getDate() + 1);
    }
    return next;
}

function formatRecurringDate(schedule) {
    const parts = schedule.split(' ');
    if (parts.length !== 5) return '';
    
    const [minute, hour, , , dayOfWeek] = parts;
    const dayName = polishDays[parseInt(dayOfWeek)] || 'dzień';
    const nextDate = getNextOccurrence(schedule);
    
    if (!nextDate) return `Każdy ${dayName}`;
    
    const formattedDate = nextDate.toLocaleDateString('pl-PL', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    const timeStr = `${hour}:${minute.padStart(2, '0')}`;
    
    return `Każdy ${dayName} o ${timeStr}: ${formattedDate}`;
}
