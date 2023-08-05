import airTableService from "../../services/airTable/aireTableStorage.js";
describe("AirTable session storage Test Suite", () => {
  const body = {
    ip: "177.228.41.589",
    sessionid: "SS2343223342344",
    querystring: "oneParam=2332&twoParam=11",
    clienttimestamp: "2020-03-10T04:05:06.157Z",
  };
  describe("when AirTable responds with a success save operation", () => {
    it("should return the insertion Id", async () => {
      const mockAirInsertId = "FAKE INSERTION ID";
      const mockFetchResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: mockAirInsertId,
        }),
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);
      const response = await airTableService.storeSessionInAirTable(body);
      expect(response).toEqual(mockAirInsertId);
    });
  });

  describe("when AirTable responds with a failure in insertion", () => {
    it("should log error and return null value", async () => {
      const mockFetchResponse = {
        ok: false,
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);
      const response = await airTableService.storeSessionInAirTable(body);
      expect(response).toEqual(null);
    });
  });
});
