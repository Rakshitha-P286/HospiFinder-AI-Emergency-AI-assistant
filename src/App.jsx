const analyzeEmergency = async () => {
  if (selectedSymptoms.length === 0) {
    alert("Please select at least one symptom");
    return;
  }

  setLoading(true);

  try {

    const response = await fetch(
      "https://hospifinder-api.onrender.com/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    let severityScore = 35;

    if (data.severity === "High") {
      severityScore = 90;
    } else if (data.severity === "Medium") {
      severityScore = 70;
    } else {
      severityScore = 40;
    }

    setAnalysisData({
      severity: severityScore,
      warning: data.severity + " Emergency",
      hospitals: data.hospitals.map((h) => ({
        name: h.name,
        distance: h.distance + " km",
        time: "Nearby",
        rating: "4.7",
        phone: "+91 9876543210",
        specialties: [h.specialist || "Emergency"],
        map: `https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}`,
      })),
      firstAid: data.firstAid,
      cprVideo: data.cprVideo,
    });

    setResult(true);

  } catch (error) {

    console.log(error);

    alert("Backend connection failed");

  } finally {

    setLoading(false);

  }
};
