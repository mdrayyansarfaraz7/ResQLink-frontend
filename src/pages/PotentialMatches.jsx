import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  X,
  ShieldCheck,
  ArrowLeft,
  Eye,
  CheckSquare,
} from "lucide-react";

const PRIMARY_BLUE = "bg-[#0047AB]";
const PRIMARY_BLUE_HOVER = "hover:bg-[#003B8A]";
const DARK_TEXT = "text-slate-800";
const ACCENT_GREEN = "text-emerald-600";

const PotentialMatches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchId = location.state?.searchId;
  const matches = location.state?.matches || [];

  const [selectedPerson, setSelectedPerson] = useState(null);

  if (!matches.length) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 sm:px-10 py-10"
        style={{
          backgroundImage: "radial-gradient(at 50% 10%, #FFFAEB, #F7F7F7)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center w-full max-w-md p-8 sm:p-10 bg-white rounded-2xl shadow-xl border border-yellow-200">
          <AlertTriangle className="h-14 w-14 sm:h-16 sm:w-16 mx-auto text-yellow-600 mb-5" />
          <h2
            className={`text-2xl sm:text-3xl font-extrabold ${DARK_TEXT} mb-3`}
          >
            No Confirmed Matches Found
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6">
            The system completed the cross-check but found no immediate matches
            for the ID {searchId || "N/A"}.
          </p>
          <button
            onClick={() => navigate("/search-match")}
            className={`w-full ${PRIMARY_BLUE} text-white px-5 py-3 rounded-xl ${PRIMARY_BLUE_HOVER} transition font-semibold shadow-lg text-base sm:text-lg flex items-center justify-center`}
          >
            <Search className="h-5 w-5 mr-2" />
            <span>Initiate a New Search</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 p-5 sm:p-8"
      style={{
        backgroundImage: "radial-gradient(at 50% 10%, #E0F7FA, #F7F7F7)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1
          className={`text-3xl sm:text-4xl font-extrabold ${DARK_TEXT} mb-3 text-center`}
        >
          <Users
            className={`h-8 w-8 sm:h-10 sm:w-10 mr-2 ${ACCENT_GREEN} inline-block`}
          />
          Potential Registry Matches
        </h1>
        <p className="text-center text-slate-600 text-base sm:text-lg mb-10 sm:mb-12">
          The following records were algorithmically matched against Report ID:{" "}
          <span className="font-semibold text-blue-600">
            {searchId || "N/A"}
          </span>
          . Tap on any card for detailed insights.
        </p>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {matches.map((person, index) => (
            <div
              key={person._id || index}
              onClick={() => setSelectedPerson(person)}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 transition transform hover:-translate-y-1 hover:shadow-2xl duration-300 overflow-hidden cursor-pointer"
            >
              <img
                src={
                  person.photo ||
                  "https://via.placeholder.com/600x400?text=Photo+Not+Available"
                }
                alt={person.fullName || "Registry Record"}
                className="w-full h-56 sm:h-64 md:h-72 object-cover"
              />

              <div className="p-5 sm:p-6">
                <h3
                  className={`text-lg sm:text-xl font-extrabold ${DARK_TEXT} mb-2`}
                >
                  Registry Record:{" "}
                  {person.gender === "Male" ? "Male" : "Female"}
                </h3>

                <div className="space-y-2 mt-2 text-gray-600 text-sm sm:text-base">
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-red-500" />
                    Found Location:{" "}
                    <span className="font-medium ml-1">
                      {person.foundAtLocation || "Unknown"}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-500" />
                    Estimated Age:{" "}
                    <span className="font-medium ml-1">
                      {person.estimatedAge || "N/A"}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <CheckSquare className="h-4 w-4 mr-2 text-yellow-500" />
                    Condition:{" "}
                    <span className="font-medium ml-1">
                      {person.condition?.replace("_", " ") || "Unknown"}
                    </span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="text-blue-600 text-sm font-semibold flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Comprehensive Report
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-8 mt-12 sm:mt-16">
          <button
            onClick={() => navigate("/search-match")}
            className={`flex items-center justify-center ${PRIMARY_BLUE} text-white px-6 py-3 rounded-xl font-semibold ${PRIMARY_BLUE_HOVER} transition shadow-xl text-base sm:text-lg`}
          >
            <Search className="h-5 w-5 mr-2" />
            <span>New Search</span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition shadow-xl text-base sm:text-lg"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Home</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-6 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-3xl w-full max-w-4xl overflow-hidden border-t-8 border-blue-600 transform scale-100 transition duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative h-72 sm:h-96 md:h-full">
                <img
                  src={
                    selectedPerson.photo ||
                    "https://via.placeholder.com/800x600?text=Photo+Not+Available"
                  }
                  alt={selectedPerson.fullName || "Registry Record"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-6 sm:p-8 relative">
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="absolute top-4 right-4 bg-gray-100 text-gray-700 rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-200 transition"
                  aria-label="Close details"
                >
                  <X className="h-5 w-5" />
                </button>

                <h2
                  className={`text-xl sm:text-2xl font-extrabold ${DARK_TEXT} mb-1`}
                >
                  Record Details: {selectedPerson.gender}
                </h2>
                <p className="text-sm text-blue-600 font-semibold mb-4 sm:mb-6 flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-1" /> Registry ID:{" "}
                  {selectedPerson._id || "N/A"}
                </p>

                <div className="space-y-3 sm:space-y-4 text-gray-700 border-l-4 border-blue-200 pl-4 py-2 text-sm sm:text-base">
                  <p className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-0.5 text-red-500 shrink-0" />
                    <span>
                      <strong>Found Location:</strong>{" "}
                      {selectedPerson.foundAtLocation || "Unknown"}
                    </span>
                  </p>

                  <p className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 mt-0.5 text-slate-500 shrink-0" />
                    <span>
                      <strong>Found Date:</strong>{" "}
                      {selectedPerson.foundDate
                        ? new Date(
                            selectedPerson.foundDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </p>

                  <p className="flex items-start">
                    <User className="h-5 w-5 mr-3 mt-0.5 text-blue-500 shrink-0" />
                    <span>
                      <strong>Estimated Age:</strong>{" "}
                      {selectedPerson.estimatedAge || "N/A"}
                    </span>
                  </p>

                  <p className="flex items-start">
                    <CheckSquare className="h-5 w-5 mr-3 mt-0.5 text-green-600 shrink-0" />
                    <span>
                      <strong>Condition Status:</strong>{" "}
                      <span className="font-extrabold text-green-700">
                        {selectedPerson.condition?.replace("_", " ") ||
                          "Unknown"}
                      </span>
                    </span>
                  </p>
                </div>

                {selectedPerson.distinguishingFeatures && (
                  <div className="mt-5 sm:mt-6 border-t border-gray-200 pt-4">
                    <strong className="text-gray-800">
                      Distinguishing Features:
                    </strong>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      {selectedPerson.distinguishingFeatures}
                    </p>
                  </div>
                )}

                <div className="mt-6 sm:mt-8">
                  <button
                    className={`w-full ${PRIMARY_BLUE} text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition font-extrabold shadow-lg text-sm sm:text-base`}
                  >
                    Initiate Contact Protocol
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PotentialMatches;
