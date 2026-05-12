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

  const lowerSymptoms = symptoms.map(s => s.toLowerCase());

  let severity = "Low";
  let specialist = "general";

  // ❤️ HEART
  if (
    lowerSymptoms.includes("chest pain") ||
    lowerSymptoms.includes("shortness of breath")
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

  // 🔥 BURNS
  else if (lowerSymptoms.includes("burns")) {
    severity = "Medium";
    specialist = "burns";
  }

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
      name: "NIMHANS",
      ICU: true,
      specialist: "neurology",
      distance: 12,
      lat: 12.9396085,
      lng: 77.5930259
    },
    {
      name: "Oxford Medical College",
      ICU: true,
      specialist: "general",
      distance: 5,
      lat: 12.7882637,
      lng: 77.7574664
    }
  ];

  const scoredHospitals = hospitals
    .filter(h => specialist === "general" ? true : h.specialist === specialist)
    .map(h => ({
      ...h,
      score: (h.ICU ? 50 : 0) + (10 - h.distance)
    }))
    .sort((a, b) => b.score - a.score);

  let firstAid = [];

  if (severity === "High") {
    firstAid = [
      "Call emergency services immediately",
      "Keep patient stable",
      "Do not move unnecessarily",
      "Monitor breathing",
      "Stay with patient"
    ];
  } else if (severity === "Medium") {
    firstAid = [
      "Apply basic first aid",
      "Keep patient calm",
      "Visit hospital soon",
      "Avoid panic",
      "Monitor condition"
    ];
  } else {
    firstAid = [
      "Rest and hydrate",
      "Monitor symptoms",
      "Consult doctor if needed"
    ];
  }

  res.json({
    severity,
    specialist,
    hospitals: scoredHospitals,
    firstAid
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
