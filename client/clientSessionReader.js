function ping () {
 // First read the client's ip address
  fetch('https://api.ipify.org?format=json')
 .then(response => response.json())
 .then(data => {
    var ip = data.ip 
    var querystring = window.location.search;
    var sessionid = createSessionID(1000, Number.MAX_SAFE_INTEGER).toString();
    var clienttimestamp = new Date().toISOString();
    // Ping to service to store session
    fetch('http://localhost:3000/v1/ping', { method: 'POST', body: JSON.stringify({
        ip, querystring, sessionid, clienttimestamp
    }),
    headers: {
      "Content-Type": "application/json"
    }});
  });
}

function createSessionID(min, max) {
    return Math.random() * (max - min) + min;
  }