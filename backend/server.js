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

 // 🩹 SMART FIRST AID SYSTEM
let firstAid = [];
let cprVideo = null;

// ❤️ HEART ATTACK
if (
  lowerSymptoms.includes("chest pain") &&
  (lowerSymptoms.includes("dizziness") ||
    lowerSymptoms.includes("vomiting") ||
    lowerSymptoms.includes("low energy"))
) {

  firstAid = [
    "Make patient sit calmly",
    "Loosen tight clothes",
    "Call ambulance immediately",
    "Give aspirin if available",
    "Check breathing continuously"
  ];

  cprVideo = "https://youtu.be/Plse2FOkV4Q?si=K5kSAhZW8DJZZ8En";
}

// 🧠 UNCONSCIOUS
else if (lowerSymptoms.includes("unconscious")) {

  firstAid = [
    "Check breathing immediately",
    "Lay patient on side",
    "Do not give food/water",
    "Start CPR if not breathing",
    "Call emergency services"
  ];

  cprVideo = "https://youtu.be/Plse2FOkV4Q?si=K5kSAhZW8DJZZ8En";
}

// 🩸 BLEEDING
else if (lowerSymptoms.includes("bleeding")) {

  firstAid = [
    "Apply direct pressure on wound",
    "Use clean cloth or bandage",
    "Raise injured area if possible",
    "Do not touch deep wounds",
    "Visit nearest emergency hospital"
  ];
}

// 🔥 BURNS
else if (lowerSymptoms.includes("burn")) {

  firstAid = [
    "Cool burn under running water",
    "Do not apply ice",
    "Cover with clean cloth",
    "Avoid touching blisters",
    "Seek medical attention"
  ];
}

// 🦴 FRACTURE
else if (lowerSymptoms.includes("fracture")) {

  firstAid = [
    "Do not move injured part",
    "Use support to immobilize",
    "Apply ice pack gently",
    "Avoid pressure on fracture",
    "Go to orthopedic hospital"
  ];
}

// 🤒 FEVER
else if (lowerSymptoms.includes("fever")) {

  firstAid = [
    "Drink plenty of water",
    "Take proper rest",
    "Monitor body temperature",
    "Use light clothing",
    "Consult doctor if fever increases"
  ];
}

// 😵 DIZZINESS
else if (lowerSymptoms.includes("dizziness")) {

  firstAid = [
    "Sit or lie down safely",
    "Drink water slowly",
    "Avoid sudden movements",
    "Rest for some time",
    "Seek medical help if persistent"
  ];
}

// 🤕 GENERAL
else {

  firstAid = [
    "Stay calm",
    "Monitor symptoms carefully",
    "Avoid self-medication",
    "Contact nearby hospital",
    "Follow doctor advice"
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
