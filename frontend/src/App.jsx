import { useState } from "react";

function App() {
const [selectedSymptoms, setSelectedSymptoms] = useState([]);
const [emergencyType, setEmergencyType] = useState("");
const [details, setDetails] = useState("");
const [listening, setListening] = useState(false);
const [loading, setLoading] = useState(false);
const [result, setResult] = useState(false);
const [ambulanceBooked, setAmbulanceBooked] = useState(false);
const [language, setLanguage] = useState("en");

const symptoms = [
"Chest Pain",
"Shortness of Breath",
"Severe Headache",
"High Fever",
"Dizziness",
"Nausea / Vomiting",
"Abdominal Pain",
"Bleeding",
"Burns",
"Fracture / Bone Pain",
"Allergic Reaction",
"Loss of Consciousness",
"Seizures",
"Difficulty Swallowing",
"Vision Problems",
"Numbness / Tingling",
];

const toggleSymptom = (symptom) => {
if (selectedSymptoms.includes(symptom)) {
setSelectedSymptoms(
selectedSymptoms.filter((s) => s !== symptom)
);
} else {
setSelectedSymptoms([...selectedSymptoms, symptom]);
}
};
const startVoiceInput = () => {
const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (!SpeechRecognition) {
alert("Speech Recognition is not supported in this browser");
return;
}

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

setListening(true);

recognition.start();

recognition.onresult = (event) => {
const transcript =
event.results[0][0].transcript;

console.log("Voice Text:", transcript);

setDetails(transcript);

setListening(false);
};

recognition.onerror = (event) => {
console.log(event.error);

alert("Voice recognition failed");

setListening(false);
};

recognition.onend = () => {
setListening(false);
};
};
const analyzeEmergency = () => {


if (selectedSymptoms.length === 0) {
alert("Please select at least one symptom");
return;
}

setLoading(true);

setTimeout(() => {
setLoading(false);
setResult(true);
}, 2500);
};

  // multi-lingual service

const translations = {
en: {
title: "Smart Emergency Guidance",
subtitle: "When Every Second Matters",
help: "Get Help Now",
call112: "Call 112",
call108: " Call 108",
analyze: "Analyze Emergency",
symptoms: "Symptoms",
emergency: "Emergency Type",
details: "Additional Emergency Details",
warning: "Critical Warning",
severity: "High Severity",
hospitals: "Nearest Hospitals",
firstAid: "First Aid Instructions",
newAnalysis: "New Analysis",
ambulance: "Request Ambulance",
callNow: "Call emergency services immediately",
},

hi: {
title: "स्मार्ट इमरजेंसी गाइडेंस",
subtitle: "जब हर सेकंड महत्वपूर्ण हो",
help: "मदद प्राप्त करें",
call112: "112 कॉल करें",
call108: "108 कॉल करें",
analyze: "आपातकाल का विश्लेषण करें",
symptoms: "लक्षण",
emergency: "आपातकाल प्रकार",
details: "अतिरिक्त जानकारी",
warning: "गंभीर चेतावनी",
severity: "उच्च गंभीरता",
hospitals: "निकटतम अस्पताल",
firstAid: "प्राथमिक उपचार निर्देश",
newAnalysis: "नया विश्लेषण",
ambulance: "एम्बुलेंस बुलाएं",
callNow: "तुरंत आपातकालीन सेवाओं को कॉल करें",
},

kn: {
title: "ಸ್ಮಾರ್ಟ್ ತುರ್ತು ಮಾರ್ಗದರ್ಶನ",
subtitle: "ಪ್ರತಿ ಕ್ಷಣವೂ ಮುಖ್ಯವಾದಾಗ",
help: "ಸಹಾಯ ಪಡೆಯಿರಿ",
call112: "112 ಕರೆ ಮಾಡಿ",
call108: "108 ಕರೆ ಮಾಡಿ",
analyze: "ತುರ್ತು ಪರಿಸ್ಥಿತಿ ವಿಶ್ಲೇಷಿಸಿ",
symptoms: "ಲಕ್ಷಣಗಳು",
emergency: "ತುರ್ತು ಪ್ರಕಾರ",
details: "ಹೆಚ್ಚುವರಿ ವಿವರಗಳು",
warning: "ಗಂಭೀರ ಎಚ್ಚರಿಕೆ",
severity: "ಹೆಚ್ಚಿನ ತುರ್ತು ಮಟ್ಟ",
hospitals: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು",
firstAid: "ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಸೂಚನೆಗಳು",
newAnalysis: "ಹೊಸ ವಿಶ್ಲೇಷಣೆ",
ambulance: "ಆಂಬುಲೆನ್ಸ್ ಕೋರಿಸಿ",
callNow: "ತಕ್ಷಣ ತುರ್ತು ಸೇವೆಗಳಿಗೆ ಕರೆ ಮಾಡಿ",
},
};
const t = translations[language];

// hospital data to display
const hospitals = [
{
name: "Narayana Hrudayalaya",
distance: "1.2 km",
time: "4 min drive",
rating: "4.8",
phone: "+91 9876543210",
specialties: ["Emergency Care", "Cardiology", "Trauma"],
map: "https://maps.google.com",
},
{
name: "Manipal Hospital",
distance: "2.8 km",
time: "8 min drive",
rating: "4.6",
phone: "+91 9123456780",
specialties: ["Emergency Care", "Neurology", "Pediatrics"],
map: "https://maps.google.com",
},
{
name: "NIMHANS",
distance: "4.1 km",
time: "12 min drive",
rating: "4.5",
phone: "+91 9988776655",
specialties: ["Emergency Care", "Orthopedics", "Surgery"],
map: "https://maps.google.com",
},
];

const firstAidSteps = [
"Call emergency services (112/108) immediately",
"Keep the patient calm and still — do not move unnecessarily",
"Check breathing and pulse; begin CPR if trained",
"Loosen tight clothing around chest and neck",
"If conscious, help patient sit upright",
"Do not give food or water",
"Stay with patient until help arrives",
];

return (
    // CSS for home page
<div
style={{
background:
"linear-gradient(to bottom, #081120, #0f172a, #111827)",
minHeight: "100vh",
color: "white",
fontFamily: "Arial",
paddingBottom: "60px",
scrollBehavior: "smooth",
}}
>
{/* HERO SECTION */}
<div
style={{
textAlign: "center",
paddingTop: "80px",
paddingBottom: "50px",
paddingLeft: "20px",
paddingRight: "20px",
}}
>
<div
style={{
position: "absolute",
top: "20px",
right: "20px",
}}
>
<select
value={language}
onChange={(e) => setLanguage(e.target.value)}
style={{
padding: "10px",
borderRadius: "10px",
background: "#111827",
color: "white",
border: "1px solid #374151",
}}
    /* planguage selection drop down */
>
<option value="en">English</option>
<option value="hi">हिन्दी</option>
<option value="kn">ಕನ್ನಡ</option>
</select>
</div>
<h1
style={{
fontSize: "58px",
fontWeight: "bold",
marginBottom: "20px",
lineHeight: "1.1",
}}
>
{t.title}
<br />
{t.subtitle}
</h1>

<p
style={{
color: "#cbd5e1",
fontSize: "20px",
maxWidth: "800px",
margin: "auto",
lineHeight: "1.7",
}}
>
AI-powered emergency analysis with hospital recommendations,
severity detection, first aid guidance, and faster response
support.
</p>


<div
style={{
marginTop: "35px",
display: "flex",
justifyContent: "center",
gap: "18px",
flexWrap: "wrap",
}}
>
<button
style={{
background:
"linear-gradient(to right,#2563eb,#1d4ed8)",
color: "white",
border: "none",
padding: "15px 28px",
borderRadius: "14px",
fontSize: "17px",
cursor: "pointer",
fontWeight: "bold",
}}
>
🚨 {t.help}
</button>

<button
onClick={() => window.open("tel:112")}
style={{
background:
"linear-gradient(to right,#dc2626,#b91c1c)",
color: "white",
border: "none",
padding: "15px 28px",
borderRadius: "14px",
fontSize: "17px",
cursor: "pointer",
fontWeight: "bold",
}}
>
📞 {t.call112}
</button>

<button
onClick={() => window.open("tel:108")}
style={{
background:
"linear-gradient(to right,#f97316,#ea580c)",
color: "white",
border: "none",
padding: "15px 28px",
borderRadius: "14px",
fontSize: "17px",
cursor: "pointer",
fontWeight: "bold",
}}
>
📞 {t.call108}
</button>
</div>
</div>

{/* FEATURE SECTION */}
<div
style={{
maxWidth: "1200px",
margin: "auto",
display: "grid",
gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
gap: "22px",
padding: "20px",
}}
>
{[
{
title: "AI Severity Analysis",
desc: "Instantly predicts emergency severity from symptoms using intelligent analysis.",
},
{
title: "Nearest Hospitals",
desc: "Find the closest hospitals with travel time and specialist matching.",
},
{
title: "First Aid Guidance",
desc: "Step-by-step first aid instructions while medical help is on the way.",
},
].map((item, index) => (
<div
key={index}
style={{
background: "rgba(255,255,255,0.05)",
padding: "28px",
borderRadius: "22px",
border: "1px solid rgba(255,255,255,0.08)",
}}
>
<h2 style={{ marginBottom: "15px" }}>{item.title}</h2>

<p style={{ color: "#d1d5db", lineHeight: "1.8" }}>
{item.desc}
</p>
</div>
))}
</div>

{/* ANALYSIS SECTION */}
<div
style={{
maxWidth: "1100px",
margin: "50px auto",
background: "rgba(255,255,255,0.05)",
borderRadius: "28px",
padding: "40px",
border: "1px solid rgba(255,255,255,0.08)",
}}
>
<h1 style={{ marginBottom: "10px" }}>
🚨 Emergency Analysis
</h1>

<p style={{ color: "#cbd5e1", marginBottom: "30px" }}>
Enter emergency details to receive AI-powered assistance.
</p>

{/* EMERGENCY TYPE */}
<div style={{ marginBottom: "25px" }}>
<h3>{t.emergency}</h3>

<select
value={emergencyType}
onChange={(e) => setEmergencyType(e.target.value)}
style={{
width: "100%",
padding: "16px",
borderRadius: "14px",
background: "#111827",
color: "white",
border: "1px solid #374151",
marginTop: "10px",
}}
>
<option value="">Select Emergency Type</option>
<option>Cardiac</option>
<option>Neurology</option>
<option>Respiratory</option>
<option>Trauma</option>
<option>Burns</option>
<option>Orthopedic</option>
</select>
</div>

{/* SYMPTOMS */}
<div>
<h3>{t.symptoms} *</h3>

<div
style={{
display: "flex",
flexWrap: "wrap",
gap: "12px",
marginTop: "20px",
}}
>
{symptoms.map((symptom, index) => (
<button
key={index}
onClick={() => toggleSymptom(symptom)}
style={{
padding: "12px 18px",
borderRadius: "30px",
border: selectedSymptoms.includes(symptom)
? "2px solid #3b82f6"
: "1px solid #374151",
background: selectedSymptoms.includes(symptom)
? "#2563eb"
: "#111827",
color: "white",
cursor: "pointer",
}}
>
{symptom}
</button>
))}
</div>
</div>

{/* EXTRA DETAILS */}
<div style={{ marginTop: "30px" }}>
<h3>{t.details}</h3>

<textarea
value={details}
onChange={(e) => setDetails(e.target.value)}
placeholder="Describe additional symptoms or emergency details..."
style={{
width: "100%",
height: "140px",
marginTop: "15px",
borderRadius: "16px",
background: "#111827",
color: "white",
border: "1px solid #374151",
padding: "18px",
resize: "none",
}}
/>

{/* VOICE BUTTON */}
<button
onClick={startVoiceInput}
style={{
marginTop: "15px",
background: listening
? "linear-gradient(to right,#dc2626,#b91c1c)"
: "linear-gradient(to right,#2563eb,#1d4ed8)",
color: "white",
border: "none",
padding: "14px 18px",
borderRadius: "14px",
cursor: "pointer",
fontSize: "16px",
}}
>
{listening
? "🎤 Listening..."
: "🎤 Speak Emergency Details"}
</button>
</div>

{/* BUTTON */}
<button
onClick={analyzeEmergency}
style={{
marginTop: "35px",
width: "100%",
padding: "18px",
borderRadius: "16px",
border: "none",
background:
"linear-gradient(to right,#2563eb,#1d4ed8)",
color: "white",
fontSize: "18px",
fontWeight: "bold",
cursor: "pointer",
}}
>
🔍 {t.analyze}
</button>

{/* LOADING */}
{loading && (
<div
style={{
marginTop: "35px",
textAlign: "center",
background: "rgba(255,255,255,0.05)",
padding: "30px",
borderRadius: "20px",
}}
>
<h2>🤖 AI analyzing symptoms...</h2>

<p style={{ color: "#cbd5e1", marginTop: "10px" }}>
Checking severity • Finding hospitals • Matching specialists
</p>
</div>
)}

{/* RESULTS */}
{result && !loading && (
<div style={{ marginTop: "40px" }}>
{/* WARNING */}
<div
style={{
background: "rgba(220,38,38,0.12)",
border: "1px solid #ef4444",
padding: "25px",
borderRadius: "20px",
marginBottom: "30px",
}}
>
<h1 style={{ color: "#f87171" }}>
🚨 {t.warning}
</h1>

<p
style={{
marginTop: "15px",
color: "#fecaca",
lineHeight: "1.8",
}}
>
This appears to be a critical emergency. Call 112
immediately if you haven't already.
</p>

<h2 style={{ marginTop: "25px" }}>
{t.severity}
</h2>

<p style={{ marginTop: "10px" }}>
<div style={{ marginTop: "20px" }}>
<p style={{ marginBottom: "10px" }}>
Severity score: 85/100
</p>

<div
style={{
width: "100%",
height: "16px",
background: "#1e293b",
borderRadius: "20px",
overflow: "hidden",
}}
>
<div
style={{
width: "85%",
height: "100%",
background:
"linear-gradient(to right,#facc15,#f97316,#dc2626)",
borderRadius: "20px",
}}
></div>
</div>
</div>
</p>
</div>

{/* HOSPITALS */}
<h1 style={{ marginBottom: "25px" }}>
🏥 {t.hospitals}
</h1>

{hospitals.map((hospital, index) => (
<div
key={index}
style={{
background: "rgba(255,255,255,0.05)",
padding: "25px",
borderRadius: "22px",
marginBottom: "20px",
border: "1px solid rgba(255,255,255,0.08)",
}}
>
<div
style={{
display: "flex",
justifyContent: "space-between",
flexWrap: "wrap",
gap: "20px",
}}
>
<div>
<h2>{hospital.name}</h2>

<p style={{ color: "#cbd5e1" }}>
{hospital.distance}
</p>

<p style={{ color: "#cbd5e1" }}>
{hospital.time}
</p>

<p style={{ color: "#cbd5e1" }}>
⭐ {hospital.rating} rating
</p>

<p style={{ color: "#cbd5e1" }}>
📞 {hospital.phone}
</p>

<div
style={{
display: "flex",
gap: "10px",
flexWrap: "wrap",
marginTop: "15px",
}}
>
{hospital.specialties.map((s, i) => (
<span
key={i}
style={{
background: "#1e293b",
padding: "8px 12px",
borderRadius: "20px",
fontSize: "14px",
}}
>
{s}
</span>
))}
</div>
</div>

<button
onClick={() =>
window.open(hospital.map, "_blank")
}
style={{
background:
"linear-gradient(to right,#2563eb,#1d4ed8)",
color: "white",
border: "none",
borderRadius: "14px",
padding: "14px 18px",
cursor: "pointer",
height: "fit-content",
}}
>
📍 View Route
</button>
</div>
</div>
))}

{/* FIRST AID */}
<div
style={{
marginTop: "40px",
background: "rgba(255,255,255,0.05)",
padding: "30px",
borderRadius: "24px",
border: "1px solid rgba(255,255,255,0.08)",
}}
>
<h1 style={{ marginBottom: "25px" }}>
🩹 {t.firstAid}
</h1>

{firstAidSteps.map((step, index) => (
<div
key={index}
style={{
display: "flex",
gap: "18px",
marginBottom: "22px",
alignItems: "flex-start",
}}
>
<div
style={{
background: "#2563eb",
width: "35px",
height: "35px",
borderRadius: "50%",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontWeight: "bold",
}}
>
{index + 1}
</div>

<p
style={{
color: "#e5e7eb",
lineHeight: "1.8",
marginTop: "2px",
}}
>
{step}
</p>
</div>
))}

<div
style={{
background: "rgba(220,38,38,0.12)",
border: "1px solid #ef4444",
padding: "20px",
borderRadius: "18px",
marginTop: "20px",
}}
>
<p style={{ color: "#fecaca" }}>
🚨 {t.callNow}
</p>
</div>

{/* FINAL BUTTONS */}
<div
style={{
display: "flex",
gap: "18px",
marginTop: "30px",
flexWrap: "wrap",
}}
>
<button
onClick={() => {
setResult(false);
setSelectedSymptoms([]);
setEmergencyType("");
setDetails("");
}}
style={{
flex: 1,
background: "#1e293b",
color: "white",
border: "none",
padding: "16px",
borderRadius: "14px",
cursor: "pointer",
fontSize: "16px",
}}
>
🔄 {t.newAnalysis}
</button>
<button
onClick={() => {
setAmbulanceBooked(true);

setTimeout(() => {
setAmbulanceBooked(false);
}, 3000);
}}
style={{
flex: 1,
background:
"linear-gradient(to right,#f97316,#ea580c)",
color: "white",
border: "none",
padding: "16px",
borderRadius: "14px",
cursor: "pointer",
fontSize: "16px",
}}
>
🚑 {t.ambulance}
</button>

{ambulanceBooked && (
<div
style={{
position: "fixed",
top: "30px",
right: "30px",
width: "340px",
background:
"linear-gradient(to bottom,#16a34a,#15803d)",
color: "white",
padding: "22px",
borderRadius: "18px",
boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
zIndex: 999,
lineHeight: "1.8",
}}
>
<h3>🚑 Emergency Alert Sent</h3>

<p style={{ marginTop: "10px" }}>
Hospitals notified successfully:
</p>

<ul style={{ paddingLeft: "18px" }}>
{hospitals.map((h, i) => (
<li key={i}>{h.name}</li>
))}
</ul>

<p style={{ marginTop: "10px" }}>
🚑 Nearest ambulance dispatched
</p>

<p>ETA: 6 minutes</p>
</div>
)}
<button
onClick={() => window.open("tel:112")}
style={{
flex: 1,
background:
"linear-gradient(to right,#dc2626,#b91c1c)",
color: "white",
border: "none",
padding: "16px",
borderRadius: "14px",
cursor: "pointer",
fontSize: "16px",
}}
>
📞 Call 112
</button>
</div>
</div>
</div>
)}
</div>
</div>
);
}

export default App;