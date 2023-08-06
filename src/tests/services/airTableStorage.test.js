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
      expect(response).toEqual({ data: mockAirInsertId, error: false });
    });
  });

  describe("when AirTable responds with a failure in insertion", () => {
    it("should log error and return error flag", async () => {
      const mockFetchResponse = {
        ok: false,
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);
      const response = await airTableService.storeSessionInAirTable(body);
      expect(response).toEqual({ data: null, error: true });
    });
  });

  describe("when AirTable responds with success in pulling session records", () => {
    it("should return session records", async () => {
      const mockSessionRecords = [{ r: 1 }, { r: 2 }];
      const mockFetchResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockSessionRecords),
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);
      const response = await airTableService.pullSessionsInAirTable();
      expect(response).toEqual({
        data: mockSessionRecords,
        error: false,
      });
    });
  });

  describe("when AirTable responds with failure in pulling session records", () => {
    it("should return error flag", async () => {
      const mockFetchResponse = {
        ok: false
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);
      const response = await airTableService.pullSessionsInAirTable();
      expect(response).toEqual({ data: null, error: true });
    });
  });
});
