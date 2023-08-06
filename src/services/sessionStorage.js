import aireTableStorage from "./airTable/aireTableStorage.js";

const storeSession = (session) => {
  return aireTableStorage.storeSessionInAirTable(session);
};

const pullSessions = (maxItems) => {
  return aireTableStorage.pullSessionsInAirTable(maxItems);
};

export { storeSession, pullSessions };
