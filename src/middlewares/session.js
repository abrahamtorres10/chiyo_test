import { DateTime } from "luxon";
import {
  FAILED_TO_SAVE,
  FAILED_TO_SAVE_AIRTABLE,
  GENERIC_INVALID_SCHEMA,
  INVALID_DATE_TIME_ISO_FORMAT,
  INVALID_SCHEMA_MISSING_FIELDS,
} from "../constants/error_messages.js";
import { storeSession } from "../services/sessionStorage.js";

const validateInput = (body) => {
  if (!body) {
    return { isValid: false, errorMessage: GENERIC_INVALID_SCHEMA };
  }

  const { ip, sessionid, querystring, clienttimestamp } = body;

  if (!ip || !sessionid || !querystring || !clienttimestamp) {
    return { isValid: false, errorMessage: INVALID_SCHEMA_MISSING_FIELDS };
  }

  const date = DateTime.fromISO(clienttimestamp);

  if (!date.isValid) {
    return { isValid: false, errorMessage: INVALID_DATE_TIME_ISO_FORMAT };
  }

  return { isValid: true };
};

const sessionReader = async (req, res, next) => {
  const { isValid, errorMessage } = validateInput(req.body);

  if (!isValid) {
    return res.status(400).json(errorMessage);
  }

  try {
    const { error, data } = await storeSession(req.body);

    if (data && !error) {
      console.log("--> session stored saved with id: ", data);
      res.locals.newRecordId = data;
      next();
    } else {
      return res.status(500).json(FAILED_TO_SAVE_AIRTABLE);
    }
  } catch (e) {
    console.log("--> sessionReader() Error", e?.message);
    return res.status(500).json(FAILED_TO_SAVE);
  }
};

export { sessionReader };
