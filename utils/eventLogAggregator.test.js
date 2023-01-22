import { getMessageFromEventLogs, groupPaperTrailEventsByMessage, formatLogRowFromEvent, sortPaperTrailEventEntries } from './eventLogAggregator.js'

import papertrailExamplePayload from './papertrail_example_payload.json';

const oneGroupMockEvents = [
    {
        message:'Error message',
        severity: 'Error'
    },
    {
        message:'Error message',
        severity: 'Error'
    }
]

const multipleGroupMockEvents = [
    {
        message:'Error message',
        severity: 'Error'
    },
    {
        message:'Another error message',
        severity: 'Error'
    },
    {
        message:'Warning message',
        severity: 'Warning'
    },
    {
        message:'Warning message',
        severity: 'Warning'
    }
]


describe('getMessageFromEventLogs', () => {

    it('returns correct message from papertrail example log', () => {
        const message = getMessageFromEventLogs(papertrailExamplePayload.events, papertrailExamplePayload.saved_search.name);

        expect(message).toBe('Aggregated result of your search "Important stuff":\n[INFO] "message body", 1 row\n[INFO] "A short event", 1 row');
    });

    it('returns correct message from multiple event-logs', () => {
        const message = getMessageFromEventLogs(multipleGroupMockEvents, 'Imaginary search term');

        expect(message).toBe('Aggregated result of your search "Imaginary search term":\n[WARNING] "Warning message", 2 rows\n[ERROR] "Error message", 1 row\n[ERROR] "Another error message", 1 row');
    });
    it('returns correct message from empty event', () => {
        const message = getMessageFromEventLogs([], 'Imaginary search term');

        expect(message).toBe('Aggregated result of your search "Imaginary search term":\nNo event-logs available');
    });

});


describe('groupPaperTrailEventsByMessage', () => {
    it('returns correct number of aggregations when recieving duplicated messages', () => {
        const eventGroups = oneGroupMockEvents.reduce(groupPaperTrailEventsByMessage,{});

        expect(Object.keys(eventGroups).length).toBe(1);
    });
    it('returns correct number of aggregations when recieving multiple messages', () => {
        const eventGroups = multipleGroupMockEvents.reduce(groupPaperTrailEventsByMessage,{});

        expect(Object.keys(eventGroups).length).toBe(3);
    });
    it('returns correct count on a single aggregated log', () => {
        const eventGroups = oneGroupMockEvents.reduce(groupPaperTrailEventsByMessage,{});

        expect(eventGroups['Error message'].count).toBe(2);
    });
    it('returns correct count on multiple aggregated logs', () => {
        const eventGroups = multipleGroupMockEvents.reduce(groupPaperTrailEventsByMessage,{});

        expect(eventGroups['Error message'].count).toBe(1);
        expect(eventGroups['Another error message'].count).toBe(1);
        expect(eventGroups['Warning message'].count).toBe(2);
    });
});




const mockEventEntries=[
    ["Error message", {count: 1235, severity: "Error"}],
    ["Error message 2", {count: 1, severity: "Error"}],
    ["Error message 3", {count: 231, severity: "Error"}],
    ["Error message 4", {count: 1133, severity: "Error"}],
    ["Error message 5", {count: 420, severity: "Error"}],
]

describe('sortPaperTrailEventEntries', () => {
    it('sorts events in descending order', () => {
        let sortedEventGroups = [...mockEventEntries].sort(sortPaperTrailEventEntries)
        expect(sortedEventGroups[0][1].count).toBe(1235);
        expect(sortedEventGroups[1][1].count).toBe(1133);
        expect(sortedEventGroups[2][1].count).toBe(420);
        expect(sortedEventGroups[3][1].count).toBe(231);
    });
    it('sorts events in descending order (combined with groupPaperTrailEventsByMessage)', () => {
        const eventGroups = multipleGroupMockEvents.reduce(groupPaperTrailEventsByMessage,{});
        let sortedEventGroups = Object.entries(eventGroups).sort(sortPaperTrailEventEntries)
        expect(sortedEventGroups[0][1].count).toBe(2);
        expect(sortedEventGroups[1][1].count).toBe(1);
        expect(sortedEventGroups[2][1].count).toBe(1);
    });
});


describe('formatLogRowFromEvent', () => {
    it('returns correct format on multiple logged rows', () => {
        const logRow = formatLogRowFromEvent(mockEventEntries[0]);
        expect(logRow).toBe('[ERROR] "Error message", 1235 rows');
    });
    it('returns correct format on single logged row', () => {
        const logRow = formatLogRowFromEvent(mockEventEntries[1]);
        expect(logRow).toBe('[ERROR] "Error message 2", 1 row');
    });
});