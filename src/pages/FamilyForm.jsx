// import React from 'react'

// function ClientForm() {
//   return (
//     <div className='bg-green-200'>ClientForm</div>
//   )
// }

// export default ClientForm


// src/pages/FamilyForm.jsx
import React, { useState } from "react";

const ClientForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    physicalDescription: {
      height: "",
      weight: "",
      eyeColor: "",
      hairColor: "",
      distinguishingMarks: "",
    },
    lastSeenLocation: "",
    lastSeenDate: "",
    clothingDescription: "",
    causeOfSeparation: "",
    photo: "",
    contactInfo: {
      name: "",
      relation: "",
      phone: "",
      email: "",
      address: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // API call logic here
  };

  return (
    <div className="min-h-screen bg-neutral-light flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl font-body"
      >
        <h2 className="text-3xl font-heading font-bold text-primary text-center mb-8">
          Missing Person Report
        </h2>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-neutral-dark mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-dark mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-dark mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
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

        {/* Last Seen */}
        <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
          Last Seen Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="lastSeenLocation"
            placeholder="Last Seen Location"
            value={formData.lastSeenLocation}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="date"
            name="lastSeenDate"
            value={formData.lastSeenDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="text"
            name="clothingDescription"
            placeholder="Clothing Description"
            value={formData.clothingDescription}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary col-span-2"
          />
        </div>

        {/* Cause of Separation */}
        <div className="mb-6">
          <label className="block text-neutral-dark mb-1">
            Cause of Separation
          </label>
          <select
            name="causeOfSeparation"
            value={formData.causeOfSeparation}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select</option>
            <option value="natural_disaster">Natural Disaster</option>
            <option value="accident">Accident</option>
            <option value="conflict/violence">Conflict / Violence</option>
            <option value="lost_while_evacuating">Lost While Evacuating</option>
            <option value="other">Other</option>
          </select>
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

        {/* Contact Info */}
        <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Contact Name"
            value={formData.contactInfo.name}
            onChange={(e) => handleChange(e, "contactInfo")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="text"
            name="relation"
            placeholder="Relation"
            value={formData.contactInfo.relation}
            onChange={(e) => handleChange(e, "contactInfo")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.contactInfo.phone}
            onChange={(e) => handleChange(e, "contactInfo")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.contactInfo.email}
            onChange={(e) => handleChange(e, "contactInfo")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.contactInfo.address}
            onChange={(e) => handleChange(e, "contactInfo")}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary col-span-2"
            rows="2"
          ></textarea>
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

export default ClientForm;
