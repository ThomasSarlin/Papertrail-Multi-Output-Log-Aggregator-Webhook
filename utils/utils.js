/**
 * Method for aggregating event-logs into a message string.
 */

const getMessageFromEventLogs = (eventlogs, searchName) => {
    let header = `Aggregated result of your search "${searchName}":\n`;

    let eventLogAggregations = eventlogs.reduce(groupPaperTrailEventsByMessage, {});
    
    eventLogAggregations = Object.entries(eventLogAggregations).sort(sortPaperTrailEventEntries);

    return header + eventGroups.map(formatLogRowFromEvent).join('\n');
}

/**
 * Reducer function for grouping the event logs by message into a key/value object
 * and count each occurance of an individual message
 */

const groupPaperTrailEventsByMessage = (event_group, {message, severity}) => {
    if(event_group[message])
        event_group[message].count = event_group[message].count+1;
    else
        event_group[message] = { severity, count: 1 };
    return event_groupM
};

/**
 * Sort function for our key/value pair object for log messages.
 * The key/value pair is required to be convertied 
 * with Object.entries before use.
 */

const sortPaperTrailEventEntries = (event1, event2) => {
    return event1[1].count - event2[1].count;
}

/**
 * Formats our event-log-groups into the desired log format
 * [SEVERITY] "message string", {count} rows.
 */

const formatLogRowFromEvent = (event) => {
    const message = event[0];
    const { severity, count } = event[1];

    return `[${severity.toUpperCase()}] "${message}", ${count} rows`;
}

export { getMessageFromEventLogs };
