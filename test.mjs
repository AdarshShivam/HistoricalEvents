import * as chai from 'chai';
const { expect } = chai;

import { getHistoricalEvents } from "./historicalEvents.mjs";

describe("getHistoricalEvents", () => {
  it("should throw error if maxLength is invalid", () => {
    expect(() => getHistoricalEvents("2020-01-01", "invalid")).to.throw();
    expect(() => getHistoricalEvents("2020-01-01", -1)).to.throw(Error);
  });

  it("should throw error if date is invalid", () => {
    expect(() => getHistoricalEvents("invalid date", 1)).to.throw(Error);
  });

  it("should throw error if no events found", () => {
    expect(() => {
      getHistoricalEvents("2000-01-01");
    }).to.throw(Error);
  });

  const newEvents = [
    { date: '1776-07-04', event: 'New Event 1' },
    { date: '1863-11-19', event: 'New Event 2' },
    { date: '1945-09-02', event: 'New Event 3' }
  ];

  it("should return all matching events if maxLength not specified", () => {

    const nevents = getHistoricalEvents("2020-01-01", undefined, newEvents);
    expect(nevents).to.have.lengthOf(3);
  });

  const testEvents = [
    { date: '1776-07-04', event: 'Test 1' },
    { date: '1863-11-19', event: 'Test 2' },
    { date: '1945-09-02', event: 'Test 3' }
  ];

  it("should limit events based on maxLength", () => {
    const levents = getHistoricalEvents("2020-01-01", 2, testEvents);
    expect(levents).to.have.lengthOf(2);
  });
});
