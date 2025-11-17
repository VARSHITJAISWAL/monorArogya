import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ArogyaCard() {
  const [formData, setFormData] = useState({
    name: "",
    father: "",
    mother: "",
    dob: "",
    blood: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("arogyaUser", JSON.stringify(formData));
    navigate("/uniqueid");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h3 className="text-center text-primary mb-4">Arogya Card Registration</h3>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Father's Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Father's Name</label>
            <input
              type="text"
              name="father"
              value={formData.father}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your father's name"
              required
            />
          </div>

          {/* Mother's Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Mother's Name</label>
            <input
              type="text"
              name="mother"
              value={formData.mother}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your mother's name"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label className="form-label fw-bold">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Blood Group */}
          <div className="mb-3">
            <label className="form-label fw-bold">Blood Group</label>
            <input
              type="text"
              name="blood"
              value={formData.blood}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your blood group"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label fw-bold">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Enter your full address"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-100">
            Finish & Register
          </button>
        </form>
      </div>
    </div>
  );
}
