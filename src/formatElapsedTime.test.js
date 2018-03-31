import { formatElapsedTime } from './formatElapsedTime';

test('Formating invalid value, "ABC" results in "00:00.00"', () => {
    expect(formatElapsedTime('ABC')).toBe('00:00.00');
});

test('Returns "00:00.00" when no argument is passed', () => {
    expect(formatElapsedTime()).toBe('00:00.00');
});

test('129100 ms is formatted to "02:09.10"', () => {
    expect(formatElapsedTime(129100)).toBe('02:09.10');
    expect(formatElapsedTime('129100')).toBe('02:09.10');
});

test('100000000 ms is formatted to "27:46:40.00"', () => {
    expect(formatElapsedTime(100000000)).toBe('27:46:40.00');
    expect(formatElapsedTime('100000000')).toBe('27:46:40.00');
});

test('3600000 ms is formatted to "01:00:00.00"', () => {
    expect(formatElapsedTime(3600000)).toBe('01:00:00.00');
    expect(formatElapsedTime('3600000')).toBe('01:00:00.00');
});

