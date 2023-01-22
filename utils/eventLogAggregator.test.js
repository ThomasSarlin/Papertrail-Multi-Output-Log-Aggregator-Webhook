import { getMessageFromEventLogs, formatLogRowFromEvent, sortPaperTrailEventEntries, groupPaperTrailEventsByMessage } from './eventLogAggregator.js'

import papertrailExamplePayload from './papertrail_example_payload.json' assert {type: json};


describe('test', () => {
    it('correct message', () => {
        const message = getMessageFromEventLogs(papertrailExamplePayload);
        expect(query).toBe('Aggregated result of your search "Important stuff":\n[Info] "message body", 1 rows\n[Info] "A short event", 1 rows');
    });
});