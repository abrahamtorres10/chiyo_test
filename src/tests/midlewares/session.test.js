import { GENERIC_INVALID_SCHEMA, INVALID_DATE_TIME_ISO_FORMAT, INVALID_SCHEMA_MISSING_FIELDS } from "../../constants/error_messages";
import { sessionReader } from "../../middlewares/session"

describe('Session Storage Middleware Test Suite', () => {
    let resMock;
    beforeEach(() => {
        resMock = {
          status: jest.fn(() => resMock),
          json: jest.fn(),
        }
        jest.clearAllMocks()
      })
    describe('given an empty body', () => {
      it('should return 400 HTTP ERROR code with INVALID SCHEMA message', () => {
        const reqMock = {
            body: null,
          }
        sessionReader(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledWith(400)
        expect(resMock.json).toHaveBeenCalledWith(GENERIC_INVALID_SCHEMA)

      })
    })
    describe('given an incomplete body with missing params', () => {
        it('should return 400 HTTP ERROR code with MISSING FIELDS INVALID SCHEMA message', () => {
          const reqMock = {
              body: {
                ip: "fake ip",
                sessionid: "fake session"
              },
            }
          sessionReader(reqMock, resMock);
          expect(resMock.status).toHaveBeenCalledWith(400)
          expect(resMock.json).toHaveBeenCalledWith(INVALID_SCHEMA_MISSING_FIELDS)
  
        })
      })

      describe('given an invalid clienttimestamp date time value', () => {
        it('should return 400 HTTP ERROR code with INVALID DATE TIME format message', () => {
          const reqMock = {
              body: {
                "ip": "177.228.41.210",
                "sessionid": "SS2343223342344",
                "querystring": "oneParam=2332&twoParam=11",
                "clienttimestamp": "MALFORMED DATETIME"
              },
            }
          sessionReader(reqMock, resMock);
          expect(resMock.status).toHaveBeenCalledWith(400)
          expect(resMock.json).toHaveBeenCalledWith(INVALID_DATE_TIME_ISO_FORMAT)
  
        })
      })
})