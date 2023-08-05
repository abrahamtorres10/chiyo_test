jest.mock("../../services/sessionStorage.js", () => ({
  storeSession: jest.fn(),
}));
import {
  FAILED_TO_SAVE,
  FAILED_TO_SAVE_AIRTABLE,
  GENERIC_INVALID_SCHEMA,
  INVALID_DATE_TIME_ISO_FORMAT,
  INVALID_SCHEMA_MISSING_FIELDS,
} from "../../constants/error_messages";
import { sessionReader } from "../../middlewares/session.js";
import { storeSession } from "../../services/sessionStorage.js";

describe("Session Storage Middleware Test Suite", () => {
  let resMock;
  const validReqMockFixture = {
    body: {
      ip: "177.228.41.589",
      sessionid: "SS2343223342344",
      querystring: "oneParam=2332&twoParam=11",
      clienttimestamp: "2020-03-10T04:05:06.157Z",
    },
  };
  beforeEach(() => {
    resMock = {
      status: jest.fn(() => resMock),
      json: jest.fn(),
      locals: {},
    };
    jest.clearAllMocks();
  });
  describe("given an empty body", () => {
    it("should return 400 HTTP ERROR code with INVALID SCHEMA message", () => {
      const reqMock = {
        body: null,
      };
      sessionReader(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith(GENERIC_INVALID_SCHEMA);
    });
  });
  describe("given an incomplete body with missing params", () => {
    it("should return 400 HTTP ERROR code with MISSING FIELDS INVALID SCHEMA message", () => {
      const reqMock = {
        body: {
          ip: "fake ip",
          sessionid: "fake session",
        },
      };
      sessionReader(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith(INVALID_SCHEMA_MISSING_FIELDS);
    });
  });

  describe("given an invalid clienttimestamp date time value", () => {
    it("should return 400 HTTP ERROR code with INVALID DATE TIME format message", () => {
      const reqMock = {
        body: {
          ip: "177.228.41.210",
          sessionid: "SS2343223342344",
          querystring: "oneParam=2332&twoParam=11",
          clienttimestamp: "MALFORMED DATETIME",
        },
      };
      sessionReader(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith(INVALID_DATE_TIME_ISO_FORMAT);
    });
  });

  describe("given a valid session input", () => {
    describe("when storeSession returns a successful response", () => {
      it("should run next fn to with newRecordId", async () => {
        const mockAirTableInsertionId = 12345;
        const nextMock = jest.fn();
        storeSession.mockReturnValue(mockAirTableInsertionId);
        await sessionReader(validReqMockFixture, resMock, nextMock);
        expect(storeSession).toHaveBeenCalledWith(validReqMockFixture.body);
        expect(nextMock).toHaveBeenCalled();
        expect(resMock.locals.newRecordId).toEqual(mockAirTableInsertionId);
      });
    });
    describe("when storeSession does not return the insertion id", () => {
      it("should return 500 http error code with failure message", async () => {
        storeSession.mockReturnValue(0);
        await sessionReader(validReqMockFixture, resMock);
        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.json).toHaveBeenCalledWith(FAILED_TO_SAVE_AIRTABLE);
        expect(storeSession).toHaveBeenCalledWith(validReqMockFixture.body);
      });
    });

    describe("when storeSession throws error", () => {
      it("should return 500 http error code with generic failure message", async () => {
        storeSession.mockRejectedValue(0);
        await sessionReader(validReqMockFixture, resMock);
        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.json).toHaveBeenCalledWith(FAILED_TO_SAVE);
        expect(storeSession).toHaveBeenCalledWith(validReqMockFixture.body);
      });
    });
  });
});
