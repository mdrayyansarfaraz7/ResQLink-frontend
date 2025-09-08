// import React from 'react'

// function ManagerForm() {
//   return (
//     <div>ManagerForm</div>
//   )
// }

// export default ManagerForm

// src/pages/ManagerForm.jsx
import React, { useState } from "react";

const ManagerForm = () => {
  const [formData, setFormData] = useState({
    foundAtLocation: "",
    foundDate: "",
    condition: "",
    estimatedAge: "",
    gender: "Unknown",
    physicalDescription: {
      height: "",
      weight: "",
      eyeColor: "",
      hairColor: "",
      distinguishingMarks: "",
    },
    clothingDescription: "",
    belongings: [""],
    photo: "",
    recoveryDetails: {
      recoveredBy: "",
      contact: "",
      referenceId: "",
    },
    storageDetails: {
      hospital: "",
      morgue: "",
      wardOrUnit: "",
    },
    additionalNotes: "",
  });

  const handleChange = (e, parent = null) => {
    const { name, value } = e.target;
    if (parent) {
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBelongingsChange = (index, value) => {
    const updated = [...formData.belongings];
    updated[index] = value;
    setFormData({ ...formData, belongings: updated });
  };

  const addBelonging = () => {
    setFormData({ ...formData, belongings: [...formData.belongings, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Manager form submitted:", formData);
    // API call logic here
  };

  return (
    <div className="min-h-screen bg-neutral-light flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl font-body"
      >
        <h2 className="text-3xl font-heading font-bold text-primary text-center mb-8">
          Unidentified Person Report
        </h2>

        {/* Found Details */}
        <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
          Found Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="foundAtLocation"
            placeholder="Found At Location"
            value={formData.foundAtLocation}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="date"
            name="foundDate"
            value={formData.foundDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            required
          />
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select Condition</option>
            <option value="alive_injured">Alive - Injured</option>
            <option value="alive_unconscious">Alive - Unconscious</option>
            <option value="other">Other</option>
          </select>
          <input
            type="number"
            name="estimatedAge"
            placeholder="Estimated Age"
            value={formData.estimatedAge}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Unknown</option>
          </select>
        </div>

        {/* Physical Description */}
        <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
          Physical Description
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.physicalDescription.height}
            onChange={(e) => handleChange(e, "physicalDescription")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.physicalDescription.weight}
            onChange={(e) => handleChange(e, "physicalDescription")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="eyeColor"
            placeholder="Eye Color"
            value={formData.physicalDescription.eyeColor}
            onChange={(e) => handleChange(e, "physicalDescription")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="hairColor"
            placeholder="Hair Color"
            value={formData.physicalDescription.hairColor}
            onChange={(e) => handleChange(e, "physicalDescription")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="distinguishingMarks"
            placeholder="Distinguishing Marks"
            value={formData.physicalDescription.distinguishingMarks}
            onChange={(e) => handleChange(e, "physicalDescription")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary col-span-2"
          />
        </div>

        {/* Clothing & Belongings */}
        <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
          Clothing & Belongings
        </h3>
        <div className="mb-6">
          <input
            type="text"
            name="clothingDescription"
            placeholder="Clothing Description"
            value={formData.clothingDescription}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary mb-4"
          />
          {formData.belongings.map((item, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Belonging ${index + 1}`}
              value={item}
              onChange={(e) => handleBelongingsChange(index, e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addBelonging}
            className="text-primary font-heading text-sm hover:text-secondary transition"
          >
            + Add Another Belonging
          </button>
        </div>

        {/* Photo */}
        <div className="mb-6">
          <label className="block text-neutral-dark mb-1">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.files[0] })
            }
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Recovery Details */}
        <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
          Recovery Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="recoveredBy"
            placeholder="Recovered By (team/org)"
            value={formData.recoveryDetails.recoveredBy}
            onChange={(e) => handleChange(e, "recoveryDetails")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="contact"
            placeholder="Rescue Contact No."
            value={formData.recoveryDetails.contact}
            onChange={(e) => handleChange(e, "recoveryDetails")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="referenceId"
            placeholder="Case / Reference ID"
            value={formData.recoveryDetails.referenceId}
            onChange={(e) => handleChange(e, "recoveryDetails")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Storage Details */}
        <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
          Storage Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="hospital"
            placeholder="Hospital"
            value={formData.storageDetails.hospital}
            onChange={(e) => handleChange(e, "storageDetails")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="morgue"
            placeholder="Morgue"
            value={formData.storageDetails.morgue}
            onChange={(e) => handleChange(e, "storageDetails")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="wardOrUnit"
            placeholder="Ward / Unit"
            value={formData.storageDetails.wardOrUnit}
            onChange={(e) => handleChange(e, "storageDetails")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
        </div>

          <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
            Case Status
          </h3>
          <div className="mb-6">
            <select
              name="status"
              value={formData.status || "unidentified"}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            >
              <option value="unidentified">Unidentified</option>
              <option value="matched">Matched</option>
              <option value="claimed">Claimed</option>
              <option value="closed">Closed</option>
            </select>
          </div>


          {/* Additional Notes */}
          <div className="mb-6">
            <label className="block text-neutral-dark mb-1">Additional Notes</label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              rows="3"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white font-heading py-3 rounded-2xl hover:bg-secondary transition"
          >
            Submit Report
          </button>
        </form>
    </div>
  );
};

export default ManagerForm;
