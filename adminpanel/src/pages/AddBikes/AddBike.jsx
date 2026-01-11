import React, { useState } from "react";
import {assets} from "../../assets/assets"
import { addBike } from "../../services/BikeService";
import { toast } from "react-toastify";

const AddBike = () => {
  const [form, setForm] = useState({
    bike_id: "",
    brand: "",
    model: "",
    mileage: "",
    engine: "",
    weight: "",
    state: "",
    year: "",
    incentives: "",
    price: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
  // Validate that image is selected
  if (!form.image) {
    toast.error("Please select an image!");
    return;
  }

  // Create the bike object
  const bikeData = {
    bike_id: Number(form.bike_id),
    bike_desp: [form.brand, form.model],
    spec: [Number(form.mileage), Number(form.engine), Number(form.weight)],
    state: form.state,
    year: Number(form.year),
    incentives: form.incentives.split(",").map((i) => i.trim()),
    price: Number(form.price),
  };

  try {
    await addBike(bikeData, form.image); 
    setForm({
        bike_id: "",
        brand: "",
        model: "",
        mileage: "",
        engine: "",
        weight: "",
        state: "",
        year: "",
        incentives: "",
        price: "",
        image: null,
    });
    setImagePreview(null); 
} catch(e) {
    toast.error("Error Adding bike!");
    throw e;
}

//   // Create FormData
//   const formData = new FormData();
//   formData.append("bike", JSON.stringify(bikeData));
//   formData.append("file", form.image);

//   try {
//     const response = await fetch("http://localhost:8080/api/bikes/", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       const result = await response.json();
//       console.log("Success:", result);
//       alert("Bike added successfully!");
      
//       // Reset form
//       setForm({
//         bike_id: "",
//         brand: "",
//         model: "",
//         mileage: "",
//         engine: "",
//         weight: "",
//         state: "",
//         year: "",
//         incentives: "",
//         price: "",
//         image: null,
//       });
//       setImagePreview(null);
//     } else {
//       const errorText = await response.text();
//       console.error("Error response:", errorText);
//       alert("Failed to add bike: " + errorText);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Error adding bike: " + error.message);
//   }
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
        }

        .bike-bg {
          min-height: 100vh;
          background: 
            linear-gradient(
              rgba(0, 0, 0, 0.55),
              rgba(0, 0, 0, 0.55)
            ),
            url('/src/assets/bike-bg.jpg') no-repeat center center / cover;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
        }

        .glass-card {
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 18px;
          padding: 40px;
          width: 100%;
          max-width: 900px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .glass-card h3 {
          color: white;
          font-weight: 600;
          margin-bottom: 30px;
          text-align: center;
          font-size: 28px;
        }

        .image-upload-section {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .image-upload-wrapper {
          position: relative;
          width: 180px;
          height: 180px;
          border: 2px dashed rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .image-upload-wrapper:hover {
          border-color: rgba(102, 126, 234, 0.8);
          background: rgba(255, 255, 255, 0.08);
          transform: scale(1.02);
        }

        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.6);
        }

        .upload-icon {
          width: 60px;
          height: 60px;
          background: rgba(102, 126, 234, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
        }

        .upload-text {
          font-size: 14px;
          text-align: center;
        }

        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 13px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        .glass-card input[type="text"],
        .glass-card input:not([type="file"]) {
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white !important;
          padding: 14px 18px;
          border-radius: 10px;
          font-size: 15px;
          width: 100%;
          transition: all 0.3s ease;
          outline: none;
        }

        .glass-card input:focus {
          border-color: rgba(102, 126, 234, 0.8);
          background: rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }

        .glass-card input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .save-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .save-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <div className="bike-bg">
        <div className="glass-card">
          <h3>Add Bike</h3>

          <div>
            <div className="image-upload-section">
              <label htmlFor="image" className="image-upload-wrapper">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">📷</div>
                    <div className="upload-text">Upload Bike Image</div>
                  </div>
                )}
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>

            <div className="form-grid">
              <input
                name="bike_id"
                placeholder="Bike ID"
                value={form.bike_id}
                onChange={handleChange}
              />

              <input
                name="year"
                placeholder="Year"
                value={form.year}
                onChange={handleChange}
              />

              <input
                name="brand"
                placeholder="Brand (Royal Enfield)"
                value={form.brand}
                onChange={handleChange}
              />

              <input
                name="model"
                placeholder="Model (Hunter 350)"
                value={form.model}
                onChange={handleChange}
              />

              <input
                name="mileage"
                placeholder="Mileage"
                value={form.mileage}
                onChange={handleChange}
              />

              <input
                name="engine"
                placeholder="Engine CC"
                value={form.engine}
                onChange={handleChange}
              />

              <input
                name="weight"
                placeholder="Weight"
                value={form.weight}
                onChange={handleChange}
              />

              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
              />

              <input
                name="incentives"
                placeholder="Incentives (comma separated)"
                value={form.incentives}
                onChange={handleChange}
              />

              <input
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <button onClick={handleSubmit} className="save-btn">
              Save Bike
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBike;