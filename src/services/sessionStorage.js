import AirTableStorage from "./airTable/aireTableStorage.js";

const storage = () => {
  // With DI change other storage tech stack, for now well just AireTable
  return AirTableStorage;
};

const storeSession = (session) => {
  return storage().store(session);
};

const pullSessions = (maxItems) => {
  return storage().pull(maxItems);
};

export { storeSession, pullSessions };
