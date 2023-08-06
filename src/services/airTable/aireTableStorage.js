const store = async ({ ip, sessionid, querystring, clienttimestamp }) => {
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
    return {
      data: null,
      error: true,
    };
  }

  // Success saving new record and returning the record id
  const savedData = await response.json();
  return {
    data: savedData.id,
    error: false,
  };
};

const pull = async (maxRecords) => {
  const response = await fetch(
    process.env.AIRTABLE_BASE_URL +
      `/sessions?maxRecords=${maxRecords}&view=Grid%20view`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.AIRTABLE_ACCESS_TOKEN,
      },
    }
  );

  // Failure fetching the data from AirTable
  if (!response.ok) {
    console.log(
      "--> pullSessionsInAirTable() unsuccessful! ",
      response.statusText
    );
    return {
      data: null,
      error: true,
    };
  }

  // Success fetching the data
  const data = await response.json();
  return {
    data,
    error: false,
  };
};

export default {
  store,
  pull,
};
