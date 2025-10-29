import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  AlertTriangle,
  Loader,
  CheckCircle,
  Clock,
  User,
  MapPin,
  XCircle,
  ShieldCheck,
} from "lucide-react";

// Color Palette (same as before)
const PRIMARY_BLUE = "bg-[#0047AB]";
const DARK_TEXT = "text-slate-800";
const ACCENT_GREEN = "text-emerald-600";

const SearchMatch = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [match, setMatch] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!id.trim()) {
      setError(
        "Input Required: Please enter the official Report ID or Registry Number."
      );
      return;
    }

    setLoading(true);
    setError("");
    setMatch(null);

    try {
      const res = await fetch(`http://localhost:8080/api/missing/${id}/match`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Request failed");

      if (data.aiMatches && data.aiMatches.length > 0) {
        navigate("/matches", {
          state: { matches: data.aiMatches, searchId: id },
        });
      } else if (data.missingPerson) {
        setMatch(data.missingPerson);
        setError(
          "Search Complete: No AI-confirmed matches found in the database for this specific person."
        );
      } else {
        setError(
          "ID Not Found: The provided ID is not registered in our Active Records."
        );
      }
    } catch (err) {
      console.error("Error fetching match:", err);
      setError(
        "Critical Error: We encountered a system issue. Please check the ID or contact our support team."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-10 py-10 sm:py-16"
      style={{
        backgroundImage: "radial-gradient(at 50% 10%, #CCE5FF, #F7F7F7)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Responsive Container */}
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-blue-100/50 backdrop-blur-sm transition duration-500">
        {/* Header */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${DARK_TEXT} mb-3 sm:mb-4 text-center flex flex-col sm:flex-row items-center justify-center gap-2`}
        >
          <ShieldCheck className={`h-8 w-8 sm:h-9 sm:w-9 ${ACCENT_GREEN}`} />
          Verify & Locate: <br className="sm:hidden" /> Secure AI Match Search
        </h1>

        <p className="text-center text-slate-600 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
          This system provides a secure, single point of entry to initiate an
          instant matching process.
        </p>

        {/* Search Input Section */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-8 p-4 sm:p-5 rounded-xl bg-blue-50 border border-blue-200 shadow-md">
          <input
            type="text"
            placeholder="Enter Official Smart Reunite ID (e.g., SR-12345)"
            value={id}
            onChange={(e) => setId(e.target.value.toUpperCase())}
            className="flex-1 bg-transparent border-none focus:ring-0 rounded-lg px-3 py-3 outline-none text-gray-700 text-base sm:text-lg font-medium placeholder:text-gray-400"
            aria-label="Missing Person Report ID"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className={`px-6 sm:px-8 py-3 rounded-xl text-white text-base sm:text-lg font-semibold transition flex items-center justify-center whitespace-nowrap transform hover:scale-[1.02] shadow-lg ${
              loading
                ? "bg-slate-400 cursor-wait"
                : "bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950"
            }`}
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 sm:h-6 sm:w-6 animate-spin mr-2 sm:mr-3" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                <span>Intelligent Search</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-rose-50 border border-red-500 text-red-900 p-4 sm:p-5 rounded-xl flex items-start shadow-md">
            <XCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-3 mt-0.5 text-red-600" />
            <p className="font-medium text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Match Display */}
        {match && !loading && (
          <div className="mt-8 bg-amber-50 border border-amber-400 rounded-xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-extrabold text-amber-800 mb-4 flex items-center border-b border-amber-300 pb-3">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-amber-600" />
              Verified Record Found:
              <span className={`${DARK_TEXT} ml-2 font-extrabold`}>
                {match.fullName}
              </span>
            </h3>

            <div className="space-y-3 text-gray-700 text-sm sm:text-base ml-1 sm:ml-2 border-l-4 border-amber-300 pl-4 sm:pl-6 pt-2 sm:pt-3">
              <p className="flex items-center">
                <CheckCircle
                  className={`inline h-4 w-4 sm:h-5 sm:w-5 mr-3 ${ACCENT_GREEN}`}
                />
                Status:
                <span className="font-semibold ml-1">
                  Active Missing Person
                </span>
                (ID Confirmed)
              </p>
              <p className="flex items-center">
                <User className="inline h-4 w-4 sm:h-5 sm:w-5 mr-3 text-blue-500" />
                Age & Gender:
                <span className="font-semibold ml-1">{match.age}</span> /{" "}
                <span className="font-semibold">{match.gender}</span>
              </p>
              <p className="flex items-center">
                <Clock className="inline h-4 w-4 sm:h-5 sm:w-5 mr-3 text-slate-500" />
                Last Updated:
                <span className="font-semibold ml-1">
                  {new Date().toLocaleDateString()}
                </span>
              </p>
              <p className="flex items-center">
                <MapPin className="inline h-4 w-4 sm:h-5 sm:w-5 mr-3 text-red-500" />
                Last Known Location:
                <span className="font-semibold ml-1">
                  {match.lastSeenLocation}
                </span>
              </p>
            </div>

            <p className="mt-5 text-xs sm:text-sm text-amber-700 font-medium border-t border-amber-300 pt-4">
              The record is active and verified. No new AI matches were found in
              the latest scan. Please check back for updates or proceed to the
              detailed report submission.
            </p>
          </div>
        )}

        {/* Initial Prompt */}
        {!match && !error && !loading && (
          <div className="text-center mt-12 p-4 sm:p-5 border-t border-slate-200">
            <p className="text-slate-500 text-base sm:text-lg font-medium">
              Initiate your critical search now by entering the official ID.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              All search activities are confidential, secure, and fully
              auditable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMatch;
