import { DateTime } from "luxon";
import {
  FAILED_TO_SAVE,
  FAILED_TO_SAVE_AIRTABLE,
  GENERIC_INVALID_SCHEMA,
  INVALID_DATE_TIME_ISO_FORMAT,
} from "../constants/error_messages.js";
import { storeSession } from "../services/sessionStorage.js";

const validateInput = (body) => {
  if (!body) {
    return { isValid: false, mesasge: GENERIC_INVALID_SCHEMA };
  }

  const { ip, sessionid, querystring, clienttimestamp } = body;

  if (!ip || !sessionid || !querystring || !clienttimestamp) {
    return { isValid: false, mesasge: GENERIC_INVALID_SCHEMA };
  }

  const date = DateTime.fromISO(clienttimestamp);

  if (!date.isValid) {
    return { isValid: false, mesasge: INVALID_DATE_TIME_ISO_FORMAT };
  }

  return { isValid: true };
};

const sessionReader = async (req, res, next) => {
  let storageInfoId;
  const { isValid } = validateInput(req.body);

  if (!isValid) {
    return res.status(400).json(errorMessage);
  }

  try {
    storageInfoId = await storeSession(req.body);
  } catch (e) {
    console.log("--> sessionReader() Error", e?.message);
    return res.status(500).json(FAILED_TO_SAVE);
  }

  if (storageInfoId) {
    console.log("--> session stored saved with id: ", storageInfoId);
    res.locals.newRecordId = storageInfoId;
    next();
  } else {
    return res.status(500).json(FAILED_TO_SAVE_AIRTABLE);
  }
};

export { sessionReader };
