import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Approve() {
  const [data, setData] = useState({ keyCode: 'D20240518100938SK'});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateData = async () => {
      try {
        const response = await axios.put('http://10.35.10.47:2003/api/FingerScanTime/LineTokenDetail/ApproverDetail?keyCode=D20240518100938SK', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setResponse(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    updateData();
  }, [data]); // Empty dependency array ensures this effect runs only once

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Approve successful!</h1>
      {response && (
        <div>
          <p>Response: {JSON.stringify(response)}</p>
        </div>
      )}
    </div>
  );
}

export default Approve;