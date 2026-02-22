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

function formatDateRange(startDate, endDate) {
    const polishDaysShort = ['nie', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end.getTime() !== start.getTime()) {
        const startDay = polishDaysShort[start.getDay()];
        const endDay = polishDaysShort[end.getDay()];
        const year = start.getFullYear();
        
        if (start.getMonth() === end.getMonth()) {
            return `${startDay} - ${endDay}, ${start.getDate()}-${end.getDate()} ${start.toLocaleDateString('pl-PL', { month: 'long' })} ${year}`;
        } else {
            const startDateStr = start.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
            const endDateStr = end.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
            return `${startDay} - ${endDay}, ${startDateStr}-${endDateStr} ${year}`;
        }
    }
    return start.toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function generateRecurringEvents(event) {
    if (!event.schedule) return [];
    
    const parts = event.schedule.split(' ');
    if (parts.length !== 5) return [];
    
    const [minute, hour, , , dayOfWeek] = parts;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    
    const current = new Date(oneWeekAgo);
    current.setHours(parseInt(hour), parseInt(minute), 0, 0);
    
    while (current.getDay() !== parseInt(dayOfWeek)) {
        current.setDate(current.getDate() + 1);
    }
    
    const recurringEvents = [];
    while (current <= sixMonthsLater) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, '0');
        const day = String(current.getDate()).padStart(2, '0');
        const hourStr = String(current.getHours()).padStart(2, '0');
        const minuteStr = String(current.getMinutes()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}T${hourStr}:${minuteStr}`;
        const dateOnly = `${year}-${month}-${day}`;
        
        const isCancelled = event.cancelled && event.cancelled.includes(dateOnly);
        if (!isCancelled) {
            recurringEvents.push({
                ...event,
                start: dateStr,
                end: null,
                title: event.title,
                allDay: false,
                isRecurring: true
            });
        }
        current.setDate(current.getDate() + 7);
    }
    
    return recurringEvents;
}

function updateEventPageDate() {
    const dateEl = document.getElementById('event-date');
    if (!dateEl) return;
    
    const schedule = dateEl.getAttribute('data-schedule');
    const endDate = dateEl.getAttribute('data-end-date');
    
    if (schedule) {
        const formatted = formatRecurringDate(schedule);
        dateEl.textContent = formatted;
    } else if (endDate) {
        const polishDaysShort = ['nie', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];
        const start = new Date(dateEl.getAttribute('data-start-date'));
        const end = new Date(endDate);
        
        if (start.getTime() !== end.getTime()) {
            const startDay = polishDaysShort[start.getDay()];
            const endDay = polishDaysShort[end.getDay()];
            const startDateStr = start.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
            const endDateStr = end.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
            const year = start.getFullYear();
            dateEl.textContent = `${startDay} - ${endDay}, ${startDateStr}-${endDateStr} ${year}`;
        }
    }
}
