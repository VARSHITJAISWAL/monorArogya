import { useEffect, useState } from "react";

export default function Card() {
  const [data, setData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("arogyaUser"));
    const id = localStorage.getItem("uniqueID");
    setData({ ...user, id });
  }, []);

  if (!data.name) return <h4 className="text-center text-danger">No data found! Please register first.</h4>;

  return (
    <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <h3 className="text-center text-success mb-4">Arogya Health Card</h3>
      <p><b>Full Name:</b> {data.name}</p>
      <p><b>Father’s Name:</b> {data.father}</p>
      <p><b>Mother’s Name:</b> {data.mother}</p>
      <p><b>Date of Birth:</b> {data.dob}</p>
      <p><b>Blood Group:</b> {data.blood}</p>
      <p><b>Address:</b> {data.address}</p>
      <hr />
      <h5><b>Arogya ID:</b> {data.id}</h5>
    </div>
  );
}
