const storeSessionInAirTable = async ({
  ip,
  sessionid,
  querystring,
  clienttimestamp,
}) => {
  const records = {
    fields: {
      ip,
      sessionid,
      querystring,
      clienttimestamp,
    },
  };

  const response = await fetch(process.env.AIRTABLE_BASE_URL + "/sessions", {
    method: "POST",
    body: JSON.stringify(records),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.AIRTABLE_ACCESS_TOKEN,
    },
  });
  // Failure in insertion
  if (!response.ok) {
    console.log(
      "--> storeSessionInAirTable() unsuccessful! ",
      response.statusText
    );
    return null;
  }

  // Success saving new record and returning the record id
  const savedData = await response.json();
  return savedData.id;
};

export default {
  storeSessionInAirTable,
};
