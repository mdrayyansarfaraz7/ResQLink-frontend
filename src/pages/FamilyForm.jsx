import React, { useState } from "react";
import axios from "axios";

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

  const [Loader, setLoader] = useState(false);
  const [reportId, setReportId] = useState(null);
  const [error, setError] = useState("");
  const [potentialMatches, setPotentialMatches] = useState([]); // NEW

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");
    setReportId(null);

    try {
      const formDataToSend = new FormData();

      // Append simple fields
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("lastSeenLocation", formData.lastSeenLocation);
      formDataToSend.append("lastSeenDate", formData.lastSeenDate);
      formDataToSend.append("clothingDescription", formData.clothingDescription);
      formDataToSend.append("causeOfSeparation", formData.causeOfSeparation);
      formDataToSend.append("additionalNotes", formData.additionalNotes);

      // Append nested objects as JSON
      formDataToSend.append(
        "physicalDescription",
        JSON.stringify(formData.physicalDescription)
      );
      formDataToSend.append("contactInfo", JSON.stringify(formData.contactInfo));

      // Append file
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }

      const res = await axios.post(
        "http://localhost:8080/api/missing",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setReportId(res.data.reportId);
      setPotentialMatches(res.data.potentialMatches || []); // NEW

      // Reset form
      setFormData({
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
    } catch (err) {
      console.error("Error submitting report:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light flex flex-col justify-start items-center px-4 py-10">
      {potentialMatches.length === 0 ? (
        // ---------------- FORM SECTION ----------------
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-5xl font-body grid gap-8"
        >
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-6">
            Missing Person Report
          </h2>

          {/* Personal Info */}
          <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                min={0}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.physicalDescription.height}
              onChange={(e) => handleChange(e, "physicalDescription")}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              min={0}
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.physicalDescription.weight}
              onChange={(e) => handleChange(e, "physicalDescription")}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              min={0}
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
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary md:col-span-3"
            />
          </div>

          {/* Last Seen Details */}
          <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
            Last Seen Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <select
              name="causeOfSeparation"
              value={formData.causeOfSeparation}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Cause of Separation</option>
              <option value="natural_disaster">Natural Disaster</option>
              <option value="accident">Accident</option>
              <option value="conflict/violence">Conflict / Violence</option>
              <option value="lost_while_evacuating">
                Lost While Evacuating
              </option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Photo and Notes */}
          <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
            Photo and Additional Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
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
            <div>
              <label className="block text-neutral-dark mb-1">
                Additional Notes
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary h-full"
                rows="5"
              />
            </div>
          </div>

          {/* Contact Info */}
          <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary md:col-span-2"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.contactInfo.address}
              onChange={(e) => handleChange(e, "contactInfo")}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary md:col-span-3"
              rows="2"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white font-heading py-3 rounded-2xl hover:bg-secondary transition"
            disabled={Loader}
          >
            {Loader ? "Submitting..." : "Submit"}
          </button>

          {/* Messages */}
          {reportId && (
            <p className="text-green-600 font-semibold mt-4 text-center">
              ✅ Report submitted! Your Report ID:{" "}
              <span className="font-mono">{reportId}</span>
            </p>
          )}
          {error && (
            <p className="text-red-600 font-semibold mt-4 text-center">
              {error}
            </p>
          )}
        </form>
      ) : (
        // ---------------- MATCHES SECTION ----------------
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-8">
            Potential Matches Found
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {potentialMatches.map((person) => (
              <div
                key={person._id}
                className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center"
              >
                <img
                  src={person.photo}
                  alt="Potential Match"
                  className="w-40 h-40 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  {person.gender}, approx. age {person.estimatedAge}
                </h3>
                <p className="text-sm text-neutral-dark mb-2">
                  Found at:{" "}
                  <span className="font-medium">{person.foundAtLocation}</span>
                </p>
                <p className="text-sm text-neutral-dark mb-2">
                  Found on:{" "}
                  {new Date(person.foundDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-neutral-dark mb-2">
                  Clothing: {person.clothingDescription}
                </p>
                <p className="text-sm text-neutral-dark">
                  Marks: {person.physicalDescription.distinguishingMarks}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientForm;
