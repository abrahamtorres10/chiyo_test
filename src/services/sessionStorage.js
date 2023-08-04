import aireTableStorage from "./airTable/aireTableStorage.js";

const storeSession = (session) => {
  return aireTableStorage.storeSessionInAirTable(session);
};

export { storeSession };
