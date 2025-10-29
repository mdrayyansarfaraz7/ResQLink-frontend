import React, { useState } from "react";
import axios from "axios";

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
    status: "unidentified",
    additionalNotes: "",
  });

  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  const resetForm = () => {
    setFormData({
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
      status: "unidentified",
      additionalNotes: "",
    });
    setPreview(null);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.photo || !(formData.photo instanceof File)) {
        alert("Please upload a photo before submitting.");
        return;
      }

      const submissionData = new FormData();
      submissionData.append("foundAtLocation", formData.foundAtLocation);
      submissionData.append("foundDate", formData.foundDate);
      submissionData.append("condition", formData.condition);
      submissionData.append("estimatedAge", formData.estimatedAge);
      submissionData.append("gender", formData.gender);
      submissionData.append(
        "clothingDescription",
        formData.clothingDescription
      );
      submissionData.append("status", formData.status);
      submissionData.append("additionalNotes", formData.additionalNotes);
      submissionData.append("photo", formData.photo);
      submissionData.append(
        "physicalDescription",
        JSON.stringify(formData.physicalDescription)
      );
      submissionData.append("belongings", JSON.stringify(formData.belongings));
      submissionData.append(
        "recoveryDetails",
        JSON.stringify(formData.recoveryDetails)
      );
      submissionData.append(
        "storageDetails",
        JSON.stringify(formData.storageDetails)
      );

      const res = await axios.post(
        "http://localhost:8080/api/unidentified",
        submissionData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 201) {
        setSuccessMessage("✅ Report submitted successfully!");
        resetForm();
        setTimeout(() => setSuccessMessage(""), 4000);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to submit report. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg border border-gray-200 rounded-2xl p-8 w-full max-w-5xl"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center">
          Official Unidentified Person Report Form
        </h2>
        <p className="text-gray-600 text-center mb-6">
          This report is for unidentified individuals found during rescue or
          relief operations. Please provide accurate details for proper
          coordination and matching.
        </p>

        {successMessage && (
          <div className="bg-green-50 text-green-700 border border-green-300 rounded-lg p-3 text-center mb-4">
            {successMessage}
          </div>
        )}

        {/* Section: Found Details */}
        <h3 className="text-lg font-semibold text-blue-800 mt-6 mb-3">
          1. Found Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="foundAtLocation"
            placeholder="Found At Location"
            value={formData.foundAtLocation}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <input
            type="date"
            name="foundDate"
            value={formData.foundDate}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          >
            <option value="">Select Condition</option>
            <option value="alive_injured">Alive – Injured</option>
            <option value="alive_unconscious">Alive – Unconscious</option>
            <option value="deceased">Deceased</option>
            <option value="other">Other</option>
          </select>
          <input
            type="number"
            name="estimatedAge"
            placeholder="Estimated Age"
            value={formData.estimatedAge}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Section: Physical Description */}
        <h3 className="text-lg font-semibold text-blue-800 mt-6 mb-3">
          2. Physical Description
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "height",
            "weight",
            "eyeColor",
            "hairColor",
            "distinguishingMarks",
          ].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={
                field === "distinguishingMarks"
                  ? "Distinguishing Marks (scars, tattoos)"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={formData.physicalDescription[field]}
              onChange={(e) => handleChange(e, "physicalDescription")}
              className="border rounded-lg p-2 w-full"
            />
          ))}
        </div>

        {/* Section: Clothing & Belongings */}
        <h3 className="text-lg font-semibold text-blue-800 mt-6 mb-3">
          3. Clothing & Belongings
        </h3>
        <input
          type="text"
          name="clothingDescription"
          placeholder="Clothing Description"
          value={formData.clothingDescription}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mb-2"
        />
        {formData.belongings.map((item, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Belonging ${index + 1}`}
            value={item}
            onChange={(e) => handleBelongingsChange(index, e.target.value)}
            className="border rounded-lg p-2 w-full mb-2"
          />
        ))}
        <button
          type="button"
          onClick={addBelonging}
          className="text-blue-600 text-sm mb-4 hover:underline"
        >
          + Add Another Belonging
        </button>

        {/* Section: Photo */}
        <h3 className="text-lg font-semibold text-blue-800 mt-6 mb-3">
          4. Upload Photo
        </h3>
        <div className="border border-dashed border-gray-400 rounded-lg p-4 text-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover mx-auto rounded-lg mb-3"
            />
          ) : (
            <p className="text-gray-500 mb-2">
              Upload a clear face photo (PNG/JPG recommended)
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full"
            required
          />
        </div>

        {/* Recovery & Storage Details */}
        <h3 className="text-lg font-semibold text-blue-800 mt-6 mb-3">
          5. Recovery & Storage Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="recoveredBy"
            placeholder="Recovered By (Team/Organization)"
            value={formData.recoveryDetails.recoveredBy}
            onChange={(e) => handleChange(e, "recoveryDetails")}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            name="contact"
            placeholder="Rescue Contact Number"
            value={formData.recoveryDetails.contact}
            onChange={(e) => handleChange(e, "recoveryDetails")}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            name="hospital"
            placeholder="Hospital / Morgue Name"
            value={formData.storageDetails.hospital}
            onChange={(e) => handleChange(e, "storageDetails")}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            name="wardOrUnit"
            placeholder="Ward / Unit"
            value={formData.storageDetails.wardOrUnit}
            onChange={(e) => handleChange(e, "storageDetails")}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Status & Notes */}
        <h3 className="text-lg font-semibold text-blue-800 mt-6 mb-3">
          6. Status & Notes
        </h3>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full mb-3"
        >
          <option value="unidentified">Unidentified</option>
          <option value="matched">Matched</option>
          <option value="claimed">Claimed</option>
          <option value="closed">Closed</option>
        </select>
        <textarea
          name="additionalNotes"
          placeholder="Additional notes or observations"
          value={formData.additionalNotes}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full"
          rows="3"
        />

        <button
          type="submit"
          className="bg-blue-900 text-white mt-8 py-3 rounded-lg font-semibold w-full hover:bg-blue-800 transition"
        >
          Submit Official Report
        </button>

        <p className="text-gray-500 text-xs text-center mt-3">
          After submission, you’ll receive a secure record ID for tracking.
          Please ensure all details are accurate.
        </p>
      </form>
    </div>
  );
};

export default ManagerForm;
