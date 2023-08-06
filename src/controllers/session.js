import { FAILED_TO_PULL_SESSIONS_AIRTABLE, FAILED_TO_PULL_SESSIONS_GENERAL_ERROR } from "../constants/error_messages.js";
import { pullSessions } from "../services/sessionStorage.js";

const fetchSessions = async (req, res) => {
  console.log("** API SERVER REQUEST -> fetchSessions()");
  const { maxItems } = req.query
  try {
    const { data, error } = await pullSessions(maxItems);
    return res.status(200).json({ error, data: data?.records, message: error ? FAILED_TO_PULL_SESSIONS_AIRTABLE : 'ok' });
  } catch (e) {
    console.log("-> fetchSessions() error!", e?.message)
    return res.status(500).json({
      error: true,
      message: FAILED_TO_PULL_SESSIONS_GENERAL_ERROR,
    });
  }
};

export { fetchSessions };
