const analyzeEmergency = () => {
  if (selectedSymptoms.length === 0) {
    alert("Please select at least one symptom");
    return;
  }

  setLoading(true);

  setTimeout(() => {

    let severity = 35;
    let warning = "Low Severity";
    let matchedHospitals = [];
    let dynamicFirstAid = [];

    // ----------------------------
    // ❤️ HEART / CARDIAC
    // ----------------------------
    if (
      selectedSymptoms.includes("Chest Pain") ||
      selectedSymptoms.includes("Shortness of Breath")
    ) {

      severity = 95;
      warning = "Critical Cardiac Emergency";

      matchedHospitals = [
        {
          name: "Narayana Hrudayalaya",
          distance: "1.2 km",
          time: "4 min drive",
          rating: "4.9",
          phone: "+91 9876543210",
          specialties: ["Cardiology", "Emergency", "ICU"],
          map: "https://maps.google.com",
        },
      ];

      dynamicFirstAid = [
        "Make patient sit calmly",
        "Loosen tight clothes",
        "Call ambulance immediately",
        "Check breathing continuously",
        "Start CPR if patient becomes unconscious",
      ];
    }

    // ----------------------------
    // 🧠 NEUROLOGY
    // ----------------------------
    else if (
      selectedSymptoms.includes("Loss of Consciousness") ||
      selectedSymptoms.includes("Seizures")
    ) {

      severity = 90;
      warning = "Critical Neurological Emergency";

      matchedHospitals = [
        {
          name: "NIMHANS",
          distance: "3.1 km",
          time: "9 min drive",
          rating: "4.8",
          phone: "+91 9988776655",
          specialties: ["Neurology", "Brain Trauma", "ICU"],
          map: "https://maps.google.com",
        },
      ];

      dynamicFirstAid = [
        "Lay patient on side safely",
        "Do not forcefully hold patient",
        "Clear nearby dangerous objects",
        "Check breathing",
        "Call emergency services immediately",
      ];
    }

    // ----------------------------
    // 🔥 BURNS
    // ----------------------------
    else if (selectedSymptoms.includes("Burns")) {

      severity = 72;
      warning = "Burn Injury Emergency";

      matchedHospitals = [
        {
          name: "Victoria Burn Care",
          distance: "5 km",
          time: "14 min drive",
          rating: "4.5",
          phone: "+91 9011223344",
          specialties: ["Burn Care", "Trauma", "Emergency"],
          map: "https://maps.google.com",
        },
      ];

      dynamicFirstAid = [
        "Cool burn under running water",
        "Do not apply ice directly",
        "Cover burn with clean cloth",
        "Avoid touching blisters",
        "Seek emergency medical care",
      ];
    }

    // ----------------------------
    // 🩸 BLEEDING
    // ----------------------------
    else if (selectedSymptoms.includes("Bleeding")) {

      severity = 78;
      warning = "Bleeding Emergency";

      matchedHospitals = [
        {
          name: "Manipal Hospital",
          distance: "2.5 km",
          time: "7 min drive",
          rating: "4.7",
          phone: "+91 9123456780",
          specialties: ["Trauma", "Emergency", "Surgery"],
          map: "https://maps.google.com",
        },
      ];

      dynamicFirstAid = [
        "Apply direct pressure on wound",
        "Use clean cloth or bandage",
        "Raise injured area if possible",
        "Do not touch deep wounds",
        "Call emergency services immediately",
      ];
    }

    // ----------------------------
    // 🦴 FRACTURE
    // ----------------------------
    else if (selectedSymptoms.includes("Fracture / Bone Pain")) {

      severity = 65;
      warning = "Orthopedic Emergency";

      matchedHospitals = [
        {
          name: "Apollo Orthopedic Center",
          distance: "4 km",
          time: "11 min drive",
          rating: "4.6",
          phone: "+91 9000011111",
          specialties: ["Orthopedics", "Bone Trauma", "Emergency"],
          map: "https://maps.google.com",
        },
      ];

      dynamicFirstAid = [
        "Do not move injured area",
        "Use support to immobilize",
        "Apply ice pack gently",
        "Avoid pressure on fracture",
        "Reach orthopedic hospital safely",
      ];
    }

    // ----------------------------
    // 🤒 FEVER / GENERAL
    // ----------------------------
    else if (
      selectedSymptoms.includes("High Fever") ||
      selectedSymptoms.includes("Severe Headache") ||
      selectedSymptoms.includes("Abdominal Pain")
    ) {

      severity = 55;
      warning = "Moderate Medical Emergency";

      matchedHospitals = hospitals;

      dynamicFirstAid = [
        "Drink plenty of water",
        "Take proper rest",
        "Monitor body temperature",
        "Avoid self-medication",
        "Consult nearby doctor",
      ];
    }

    // ----------------------------
    // 🟢 LOW
    // ----------------------------
    else {

      severity = 35;
      warning = "Low Severity Emergency";

      matchedHospitals = hospitals;

      dynamicFirstAid = [
        "Stay calm",
        "Monitor symptoms carefully",
        "Take enough rest",
        "Drink water",
        "Visit nearby clinic if symptoms increase",
      ];
    }

    // ----------------------------
    // SAVE RESULTS
    // ----------------------------

    setAnalysisData({
      severity,
      warning,
      hospitals: matchedHospitals,
      firstAid: dynamicFirstAid,
    });

    setLoading(false);
    setResult(true);

  }, 2500);
};
