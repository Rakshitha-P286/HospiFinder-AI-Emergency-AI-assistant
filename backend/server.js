const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("HospiFinder AI Backend Running");
});
app.post("/analyze", (req, res) => {
 const { symptoms = [] } = req.body;

  if (symptoms.length === 0) {
    return res.status(400).json({
      error: "Select at least one symptom"
    });
  }

  let severity = "Low";
  let specialist = "general";

  const lowerSymptoms = symptoms.map(s => s.toLowerCase());

  // ❤️ HEART
  if (
    lowerSymptoms.includes("chest pain") &&
    (lowerSymptoms.includes("dizziness") ||
      lowerSymptoms.includes("vomiting") ||
      lowerSymptoms.includes("low energy"))
  ) {
    severity = "High";
    specialist = "cardiology";
  }

  // 🧠 NEURO
  else if (
    lowerSymptoms.includes("unconscious") ||
    lowerSymptoms.includes("seizure")
  ) {
    severity = "High";
    specialist = "neurology";
  }

  // 🩸 BLEEDING
  else if (lowerSymptoms.includes("bleeding")) {
    severity = "Medium";
    specialist = "general";
  }

  // 🦴 FRACTURE
  else if (lowerSymptoms.includes("fracture")) {
    severity = "Medium";
    specialist = "orthopedics";
  }

  // 🏥 HOSPITALS
  const hospitals = [
    {
      name: "Narayana Hrudayalaya",
      ICU: true,
      specialist: "cardiology",
      distance: 6,
      lat: 12.8095069,
      lng: 77.6953293
    },
    {
      name: "Oxford Medical College",
      ICU: true,
      specialist: "general",
      distance: 5,
      lat: 12.7882637,
      lng: 77.7574664
    },
    {
      name: "NIMHANS",
      ICU: true,
      specialist: "neurology",
      distance: 12,
      lat: 12.9396085,
      lng: 77.5930259
    }
  ];

  let scoredHospitals = hospitals.map(h => ({
    ...h,
    score: (h.ICU ? 50 : 0) + (10 - h.distance)
  })).sort((a, b) => b.score - a.score);

  // 🩹 FIRST AID + CPR + VIDEO
  let firstAid = [];
  let cprVideo = null;

  if (severity === "High" && specialist === "cardiology") {
    firstAid = [
      "Make patient sit and stay calm",
      "Call emergency immediately",
      "Check breathing",
      "Start CPR if needed"
    ];

    cprVideo = "https://youtu.be/Plse2FOkV4Q?si=K5kSAhZW8DJZZ8En"; // CPR demo
  }

  else if (lowerSymptoms.includes("unconscious")) {
    firstAid = [
      "Check breathing",
      "Call emergency services",
      "Start CPR if no breathing",
      "30 compressions + 2 breaths"
    ];

    cprVideo = "https://youtu.be/Plse2FOkV4Q?si=K5kSAhZW8DJZZ8En";
  }

  else if (lowerSymptoms.includes("bleeding")) {
    firstAid = [
      "Apply pressure on wound",
      "Use clean cloth",
      "Drink water"
    ];
  }
else if (lowerSymptoms.includes("fracture")) {
    firstAid = [
      "Stay calm + drink water",
      "Don't move the fractured part",
      "Immobolise"
    ];
  }

  else {
    firstAid = [
      "Stay calm",
      "Monitor symptoms",
      "Seek medical help"
    ];
  }

  res.json({
    severity,
    specialist,
    hospitals: scoredHospitals,
    firstAid,
    cprVideo
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});