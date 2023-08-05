import { ping } from "../../controllers/ping.js";

describe("Ping controller Test Suite", () => {
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
      locals: {
        newRecordId: 124,
      },
    };
    jest.clearAllMocks();
  });
  it("ping should console log ip and return airTableRecordId 201 http code", () => {
    console.log = jest.fn();
    ping(validReqMockFixture, resMock);
    expect(resMock.status).toHaveBeenCalledWith(201);
    expect(resMock.json).toHaveBeenCalledWith({
      airTableRecordId: resMock.locals.newRecordId,
    });
    expect(console.log).toHaveBeenCalledWith(
      "** API SERVER REQUEST -> ping()",
      validReqMockFixture.body.ip
    );
  });
});
