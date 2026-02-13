import { useState } from "react";
import axios from "axios";

function Verify() {
  const [batchId, setBatchId] = useState("");
  const [result, setResult] = useState(null);

  const verifyBatch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/verify/${batchId}`
      );
      setResult(res.data);
    } catch (err) {
      alert("Error verifying");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Agri Certificate Verification</h2>

      <input
        placeholder="Enter Batch ID"
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
      />

      <button onClick={verifyBatch}>Verify</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          {result.verified ? (
            <>
              <h3 style={{ color: "green" }}>VERIFIED ✅</h3>
              <p>Status: {result.certificate.status}</p>
              <p>Inspector: {result.inspection.inspector}</p>
              <p>Remarks: {result.inspection.remarks}</p>
            </>
          ) : (
            <h3 style={{ color: "red" }}>NOT VERIFIED ❌</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default Verify;
