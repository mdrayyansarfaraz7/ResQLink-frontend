// FamilyForm.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * FamilyForm - Government-styled missing person report form
 * - Uses functional setState to avoid cursor loss while typing
 * - Shows uploaded image preview and file info (type/size)
 * - Posts to /api/missing and reads report id from response.report._id
 * - Shows potential matches returned from backend
 * - Provides a button to re-run search (navigates to /search-match?reportId=...)
 */

export default function FamilyForm() {
  const navigate = useNavigate?.() ?? (() => {});
  const fileRef = useRef(null);

  const initialForm = {
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
    photoFile: null, // actual File object
    contactInfo: {
      name: "",
      relation: "",
      phone: "",
      email: "",
      address: "",
    },
    additionalNotes: "",
  };

  const [form, setForm] = useState(initialForm);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportId, setReportId] = useState(null);
  const [potentialMatches, setPotentialMatches] = useState([]); // array of matches from backend
  const [error, setError] = useState("");

  // cleanup preview URL on unmount or when file changes
  useEffect(() => {
    return () => {
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    };
  }, [photoPreviewUrl]);

  // Stable handler that uses functional updates to avoid input losing focus
  const handleChange = (e, parent = null) => {
    const { name, value } = e.target;
    if (parent) {
      setForm((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, photoFile: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreviewUrl((prev) => {
        // revoke previous if exists
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } else {
      setPhotoPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    }
  };

  const clearPhoto = () => {
    setForm((prev) => ({ ...prev, photoFile: null }));
    if (fileRef.current) fileRef.current.value = "";
    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
      setPhotoPreviewUrl(null);
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setReportId(null);
    setPotentialMatches([]);

    try {
      // Basic client-side validation
      if (!form.photoFile) {
        setError("Please upload a clear photo (required).");
        setLoading(false);
        return;
      }

      const fd = new FormData();
      // simple fields
      fd.append("fullName", form.fullName);
      fd.append("age", form.age);
      fd.append("gender", form.gender);
      fd.append("lastSeenLocation", form.lastSeenLocation);
      fd.append("lastSeenDate", form.lastSeenDate);
      fd.append("clothingDescription", form.clothingDescription);
      fd.append("causeOfSeparation", form.causeOfSeparation);
      fd.append("additionalNotes", form.additionalNotes);

      // nested objects as JSON strings
      fd.append(
        "physicalDescription",
        JSON.stringify(form.physicalDescription)
      );
      fd.append("contactInfo", JSON.stringify(form.contactInfo));

      // file
      fd.append("photo", form.photoFile);

      // POST to backend (make sure your backend allows CORS from the front-end origin)
      const res = await axios.post("http://localhost:8080/api/missing", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // backend (per your server code) returns: { message, report: newReport, potentialMatches: aiMatches }
      const returnedReport = res.data?.report ?? res.data?.reportId ?? res.data;
      const backendMatches =
        res.data?.potentialMatches ?? res.data?.aiMatches ?? [];

      // Grab id robustly
      const id =
        returnedReport?._id ?? returnedReport?.id ?? res.data?.reportId ?? null;
      if (!id && res.data?.report) {
        // fallback: if report is an object but without _id, stringify for debug
        console.warn("Report returned but missing _id:", res.data.report);
      }

      setReportId(id);
      setPotentialMatches(Array.isArray(backendMatches) ? backendMatches : []);
      // keep soothing note; do not reset form so user can see what was submitted
      // optionally, you can reset to initialForm here:
      // setForm(initialForm); clearPhoto();
    } catch (err) {
      console.error("Submit error:", err);
      // show friendly message
      const msg =
        err?.response?.data?.message ||
        "Unable to submit report right now. Please check your connection or try later.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to search-match page with reportId as query param
  const goToSearchMatch = () => {
    if (!reportId) return;
    // prefer query param so the search page can pick it up
    navigate?.(`/search-match?reportId=${encodeURIComponent(reportId)}`);
  };

  // Government-like palette: calm, formal blue accents
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-sm">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100">
          <h1 className="text-2xl font-semibold text-slate-800">
            Official Missing Person Report
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            This is an official reporting form. Provide accurate details —
            submissions go to the Disaster Response & Missing Persons
            Coordination Team.
          </p>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Soothing note */}
          <div className="bg-slate-50 border-l-4 border-slate-200 p-4 rounded-md">
            <p className="text-sm text-slate-700">
              We know this can be distressing. Please provide the most accurate
              details you can. Our team will begin matching immediately — you
              will receive a secure Report ID to track updates.
            </p>
          </div>

          {/* Form or matches */}
          {potentialMatches.length === 0 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject Personal Info */}
              <section className="grid grid-cols-1 gap-4">
                <h2 className="text-lg font-medium text-slate-800">
                  1. Subject Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm text-slate-700">
                      Full name <span className="text-red-600">*</span>
                    </span>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className="mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                      required
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm text-slate-700">
                      Age <span className="text-red-600">*</span>
                    </span>
                    <input
                      name="age"
                      type="number"
                      value={form.age}
                      onChange={handleChange}
                      min={0}
                      className="mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                      required
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm text-slate-700">
                      Gender <span className="text-red-600">*</span>
                    </span>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                      required
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Unknown</option>
                    </select>
                  </label>
                </div>
              </section>

              {/* Physical characteristics */}
              <section>
                <h2 className="text-lg font-medium text-slate-800">
                  2. Physical Characteristics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                  <input
                    name="height"
                    type="number"
                    placeholder="Height (cm)"
                    value={form.physicalDescription.height}
                    onChange={(e) => handleChange(e, "physicalDescription")}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                  <input
                    name="weight"
                    type="number"
                    placeholder="Weight (kg)"
                    value={form.physicalDescription.weight}
                    onChange={(e) => handleChange(e, "physicalDescription")}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                  <input
                    name="eyeColor"
                    placeholder="Eye color"
                    value={form.physicalDescription.eyeColor}
                    onChange={(e) => handleChange(e, "physicalDescription")}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                  <input
                    name="hairColor"
                    placeholder="Hair color"
                    value={form.physicalDescription.hairColor}
                    onChange={(e) => handleChange(e, "physicalDescription")}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-sm text-slate-700">
                    Distinguishing marks (scars, tattoos, moles)
                  </label>
                  <textarea
                    name="distinguishingMarks"
                    value={form.physicalDescription.distinguishingMarks}
                    onChange={(e) => handleChange(e, "physicalDescription")}
                    rows={2}
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>
              </section>

              {/* When and where last seen */}
              <section>
                <h2 className="text-lg font-medium text-slate-800">
                  3. Last Seen Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <input
                    name="lastSeenLocation"
                    placeholder="Last seen location (street / landmark / city)"
                    value={form.lastSeenLocation}
                    onChange={handleChange}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                    required
                  />
                  <input
                    name="lastSeenDate"
                    type="date"
                    value={form.lastSeenDate}
                    onChange={handleChange}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                    required
                  />
                  <select
                    name="causeOfSeparation"
                    value={form.causeOfSeparation}
                    onChange={handleChange}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                    required
                  >
                    <option value="">Cause of separation</option>
                    <option value="natural_disaster">
                      Natural disaster (storm/flood/quake)
                    </option>
                    <option value="accident">Accident (traffic/fall)</option>
                    <option value="medical">Medical emergency</option>
                    <option value="conflict/violence">
                      Conflict / violence / crime
                    </option>
                    <option value="separated_in_crowd">
                      Separated in crowd / evacuation
                    </option>
                    <option value="ran_away">
                      Ran away / voluntary separation
                    </option>
                    <option value="other">Other / unknown</option>
                  </select>
                </div>
              </section>

              {/* Photo and clothing & notes */}
              <section>
                <h2 className="text-lg font-medium text-slate-800">
                  4. Photo & Contextual Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 items-start">
                  <div>
                    <label className="block text-sm text-slate-700">
                      Recent Photo <span className="text-red-600">*</span>
                    </label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="mt-1 cursor-pointer border border-dashed border-slate-300 rounded-md p-4 flex items-center justify-center bg-white hover:border-slate-400"
                    >
                      {photoPreviewUrl ? (
                        <div className="flex items-center gap-4">
                          <img
                            src={photoPreviewUrl}
                            alt="preview"
                            className="w-40 h-40 object-cover rounded-md border border-slate-200 shadow-sm"
                          />
                          <div className="text-left">
                            <div className="text-sm font-medium text-slate-800">
                              {form.photoFile?.name}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              {form.photoFile
                                ? formatBytes(form.photoFile.size)
                                : ""}{" "}
                              • {form.photoFile?.type}
                            </div>
                            <div className="mt-3 flex gap-2">
                              <button
                                type="button"
                                onClick={clearPhoto}
                                className="px-3 py-1 rounded-md bg-red-50 text-red-700 border border-red-100 text-sm"
                              >
                                Remove
                              </button>
                              <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-sm"
                              >
                                Replace
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-slate-500">
                          <div className="mb-2">Click to upload</div>
                          <div className="text-xs">
                            A clear face photo (PNG / JPG recommended)
                          </div>
                        </div>
                      )}
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700">
                      Clothing description{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="clothingDescription"
                      value={form.clothingDescription}
                      onChange={handleChange}
                      placeholder="Colour, style, any logos, bags carried"
                      className="mt-1 px-3 py-2 border border-slate-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-slate-300"
                      required
                    />

                    <label className="block text-sm text-slate-700 mt-4">
                      Additional notes (optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={form.additionalNotes}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 px-3 py-2 border border-slate-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-slate-300"
                    />
                  </div>
                </div>
              </section>

              {/* Reporter contact (separate: first name / last name etc) */}
              <section>
                <h2 className="text-lg font-medium text-slate-800">
                  5. Your Contact Information (reporter)
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  We will only use this to contact you about this report.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <input
                    name="name"
                    placeholder="Your full name"
                    value={form.contactInfo.name}
                    onChange={(e) => handleChange(e, "contactInfo")}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                    required
                  />
                  <input
                    name="relation"
                    placeholder="Relation (e.g., parent, friend)"
                    value={form.contactInfo.relation}
                    onChange={(e) => handleChange(e, "contactInfo")}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                  <input
                    name="phone"
                    placeholder="Phone number"
                    value={form.contactInfo.phone}
                    onChange={(e) => handleChange(e, "contactInfo")}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <input
                    name="email"
                    placeholder="Email (optional)"
                    value={form.contactInfo.email}
                    onChange={(e) => handleChange(e, "contactInfo")}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                  <input
                    name="address"
                    placeholder="Address (optional)"
                    value={form.contactInfo.address}
                    onChange={(e) => handleChange(e, "contactInfo")}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>
              </section>

              {/* Submit */}
              <div className="pt-4 border-t border-slate-100">
                {error && (
                  <div className="mb-3 text-sm text-red-700 bg-red-50 p-2 rounded">
                    {error}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-5 py-2 rounded-md font-medium ${
                      loading
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-slate-800 text-white hover:bg-slate-900"
                    }`}
                  >
                    {loading
                      ? "Submitting — please wait…"
                      : "Submit Official Report"}
                  </button>

                  <div className="text-sm text-slate-600">
                    After submission you will receive a secure Report ID to
                    track status. Please keep it safe.
                  </div>
                </div>
              </div>
            </form>
          ) : (
            /* Matches view */
            <div className="space-y-6">
              <div className="bg-emerald-50 border-l-4 border-emerald-300 p-4 rounded-md">
                <p className="text-sm text-emerald-800 font-medium">
                  Report submitted — potential matches identified.
                </p>
                <p className="text-sm text-slate-700 mt-1">
                  Your secure Report ID:{" "}
                  <span className="font-mono font-semibold text-slate-800 ml-1">
                    {reportId ?? "N/A"}
                  </span>
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Keep this ID — you can search again at any time using it.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {potentialMatches.map((m) => (
                  <div
                    key={m._id ?? m.id ?? Math.random()}
                    className="bg-white border border-slate-100 p-4 rounded-md shadow-sm"
                  >
                    <div className="flex gap-4 items-start">
                      <img
                        src={m.photo || "/no-photo.png"}
                        alt="match"
                        className="w-28 h-28 object-cover rounded-md border border-slate-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-slate-800">
                            {m.gender ?? "N/A"} • Age: {m.estimatedAge ?? "N/A"}
                          </h3>
                          <span className="text-xs font-mono text-slate-600">
                            ID: {m._id ?? m.id ?? "—"}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">
                          Found at:{" "}
                          <strong>{m.foundAtLocation ?? "Unknown"}</strong>
                        </p>
                        <p className="text-sm text-slate-600">
                          Date:{" "}
                          {m.foundDate
                            ? new Date(m.foundDate).toLocaleDateString()
                            : "Unknown"}
                        </p>
                        <p className="text-sm text-slate-600 mt-2">
                          Clothing: {m.clothingDescription ?? "Not provided"}
                        </p>
                        <p className="text-sm text-slate-600">
                          Marks:{" "}
                          {(m.physicalDescription &&
                            m.physicalDescription.distinguishingMarks) ??
                            "Not provided"}
                        </p>
                        <div className="mt-3">
                          <button
                            onClick={() =>
                              alert(
                                "Secure contact flow — contact authorities with the Report ID and the match ID."
                              )
                            }
                            className="text-sm bg-slate-800 text-white px-3 py-1 rounded-md hover:bg-slate-900"
                          >
                            Request Contact Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="text-sm text-slate-700">
                  If you want to run the search again later, use this Report ID:{" "}
                  <span className="font-mono font-semibold text-slate-800">
                    {reportId}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={goToSearchMatch}
                    className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900"
                  >
                    🔍 Search Again with Report ID
                  </button>
                  <button
                    onClick={() => {
                      /* optional: clear matches and keep reportId */ setPotentialMatches(
                        []
                      );
                    }}
                    className="px-4 py-2 border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50"
                  >
                    Return to Form
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="px-8 py-4 border-t border-slate-100 text-xs text-slate-500">
          <div>Disaster Response & Missing Persons Coordination Team</div>
          <div className="mt-1">
            If this is a life-threat emergency, please contact local emergency
            services immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
