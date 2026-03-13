// Disease-Symptom Mapping Database
// This maps symptoms to diseases with confidence scores

export const DISEASES_DATABASE = [
    {
        id: 1,
        name: "Common Cold",
        symptoms: ["cough", "sore_throat", "runny_nose", "fatigue"],
        urgency: "LOW",
        confidence: 0.8,
        homeRemedy: [
            "Rest for 7-10 days",
            "Stay hydrated - drink warm water, tea",
            "Gargle with salt water for throat",
            "Use saline nasal drops",
            "Avoid cold foods"
        ],
        whenToVisit: "If symptoms persist >2 weeks or fever >39°C"
    },
    {
        id: 2,
        name: "Influenza (Flu)",
        symptoms: ["fever", "cough", "fatigue", "body_ache", "chills"],
        urgency: "MEDIUM",
        confidence: 0.85,
        homeRemedy: [
            "Complete rest for 5-7 days",
            "Drink plenty of fluids",
            "Take paracetamol for fever (500mg, 3x daily)",
            "Gargle with warm salt water",
            "Avoid crowded places"
        ],
        whenToVisit: "If fever >39°C or breathing difficulty"
    },
    {
        id: 3,
        name: "Pneumonia",
        symptoms: ["cough", "fever", "chest_pain", "difficulty_breathing", "fatigue"],
        urgency: "HIGH",
        confidence: 0.9,
        homeRemedy: [
            "Seek immediate medical attention",
            "Rest in sitting position to ease breathing",
            "Stay warm with blankets",
            "Drink warm liquids"
        ],
        whenToVisit: "URGENT - Visit immediately if difficulty breathing"
    },
    {
        id: 4,
        name: "Asthma Attack",
        symptoms: ["difficulty_breathing", "cough", "chest_tightness", "wheezing"],
        urgency: "HIGH",
        confidence: 0.85,
        homeRemedy: [
            "Sit upright to help breathing",
            "Use inhaler if available",
            "Breathe slowly and deeply",
            "Avoid triggers (dust, pollution)"
        ],
        whenToVisit: "URGENT if breathing doesn't improve in 5 minutes"
    },
    {
        id: 5,
        name: "Allergy (Seasonal)",
        symptoms: ["itchy_eyes", "sneezing", "runny_nose", "headache"],
        urgency: "LOW",
        confidence: 0.75,
        homeRemedy: [
            "Avoid allergen exposure",
            "Take antihistamine (cetirizine 10mg daily)",
            "Use saline nasal spray",
            "Keep room clean and dust-free",
            "Wear mask when outdoors"
        ],
        whenToVisit: "If symptoms persist >1 week or worsen"
    },
    {
        id: 6,
        name: "Migraine",
        symptoms: ["headache", "nausea", "vomiting", "sensitivity_to_light"],
        urgency: "MEDIUM",
        confidence: 0.8,
        homeRemedy: [
            "Rest in dark, quiet room",
            "Apply cold compress to forehead",
            "Take paracetamol 500mg",
            "Avoid loud noises and bright lights",
            "Drink water slowly"
        ],
        whenToVisit: "If headache is severe or first-time occurrence"
    },
    {
        id: 7,
        name: "Gastroenteritis (Food Poisoning)",
        symptoms: ["nausea", "vomiting", "diarrhea", "stomach_pain", "fever"],
        urgency: "MEDIUM",
        confidence: 0.82,
        homeRemedy: [
            "Drink ORS (oral rehydration solution) frequently",
            "Avoid solid food for 4-6 hours",
            "Eat light foods: rice, banana, toast",
            "Keep toilet nearby",
            "Wash hands frequently"
        ],
        whenToVisit: "If vomiting >4 times or severe dehydration signs"
    },
    {
        id: 8,
        name: "Dengue Fever",
        symptoms: ["high_fever", "body_ache", "headache", "rash", "joint_pain"],
        urgency: "HIGH",
        confidence: 0.88,
        homeRemedy: [
            "Complete bed rest",
            "Drink plenty of water and fluids",
            "Take paracetamol (avoid aspirin)",
            "Monitor temperature 4x daily",
            "Check for warning signs"
        ],
        whenToVisit: "Visit immediately - needs blood test for confirmation"
    },
    {
        id: 9,
        name: "Measles",
        symptoms: ["high_fever", "cough", "rash", "runny_nose", "red_eyes"],
        urgency: "HIGH",
        confidence: 0.87,
        homeRemedy: [
            "Complete isolation for 4-5 days",
            "Rest and hydration",
            "Take paracetamol for fever",
            "Avoid contact with others",
            "Vitamin A supplement (if available)"
        ],
        whenToVisit: "Visit hospital immediately for isolation and monitoring"
    },
    {
        id: 10,
        name: "Jaundice (Hepatitis)",
        symptoms: ["yellow_skin", "yellow_eyes", "dark_urine", "fatigue", "stomach_pain"],
        urgency: "MEDIUM",
        confidence: 0.85,
        homeRemedy: [
            "Avoid fatty, spicy foods",
            "Drink plenty of water",
            "Take rest",
            "Avoid alcohol completely",
            "Eat fresh vegetables and fruits"
        ],
        whenToVisit: "Visit immediately - needs liver function tests"
    },
    {
        id: 11,
        name: "Chickenpox",
        symptoms: ["fever", "rash", "itching", "fatigue", "headache"],
        urgency: "MEDIUM",
        confidence: 0.83,
        homeRemedy: [
            "Stay home for 5-6 days",
            "Apply calamine lotion to rash",
            "Cut fingernails to prevent scratching",
            "Wear loose cotton clothes",
            "Take paracetamol for fever"
        ],
        whenToVisit: "If temperature >39°C or difficulty breathing"
    },
    {
        id: 12,
        name: "Typhoid Fever",
        symptoms: ["sustained_fever", "headache", "weakness", "rose_spots_rash", "constipation"],
        urgency: "HIGH",
        confidence: 0.84,
        homeRemedy: [
            "Seek immediate medical care",
            "Complete bed rest",
            "Drink boiled water only",
            "Eat light, easily digestible food",
            "Monitor temperature regularly"
        ],
        whenToVisit: "URGENT - Needs antibiotic treatment immediately"
    }
];

// Symptom definitions
export const SYMPTOMS = [
    { id: "fever", name: "Fever", category: "General" },
    { id: "cough", name: "Cough", category: "Respiratory" },
    { id: "sore_throat", name: "Sore Throat", category: "Respiratory" },
    { id: "runny_nose", name: "Runny Nose", category: "Respiratory" },
    { id: "fatigue", name: "Fatigue/Weakness", category: "General" },
    { id: "headache", name: "Headache", category: "General" },
    { id: "body_ache", name: "Body Ache", category: "General" },
    { id: "chills", name: "Chills", category: "General" },
    { id: "nausea", name: "Nausea", category: "Digestive" },
    { id: "vomiting", name: "Vomiting", category: "Digestive" },
    { id: "diarrhea", name: "Diarrhea", category: "Digestive" },
    { id: "stomach_pain", name: "Stomach Pain", category: "Digestive" },
    { id: "chest_pain", name: "Chest Pain", category: "Respiratory" },
    { id: "difficulty_breathing", name: "Difficulty Breathing", category: "Respiratory" },
    { id: "wheezing", name: "Wheezing", category: "Respiratory" },
    { id: "chest_tightness", name: "Chest Tightness", category: "Respiratory" },
    { id: "high_fever", name: "High Fever (>39°C)", category: "General" },
    { id: "sustained_fever", name: "Sustained Fever", category: "General" },
    { id: "rash", name: "Rash on Skin", category: "Skin" },
    { id: "itching", name: "Itching", category: "Skin" },
    { id: "itchy_eyes", name: "Itchy Eyes", category: "Eyes" },
    { id: "sneezing", name: "Sneezing", category: "Respiratory" },
    { id: "red_eyes", name: "Red Eyes", category: "Eyes" },
    { id: "sensitivity_to_light", name: "Sensitivity to Light", category: "Eyes" },
    { id: "yellow_skin", name: "Yellowing of Skin", category: "Skin" },
    { id: "yellow_eyes", name: "Yellowing of Eyes", category: "Eyes" },
    { id: "dark_urine", name: "Dark Urine", category: "Digestive" },
    { id: "joint_pain", name: "Joint Pain", category: "General" },
    { id: "rose_spots_rash", name: "Rose Spots Rash", category: "Skin" },
    { id: "constipation", name: "Constipation", category: "Digestive" },
    { id: "weakness", name: "Weakness", category: "General" }
];

// Disease Prediction Algorithm
export function predictDiseases(selectedSymptoms) {
    if (selectedSymptoms.length === 0) {
        return [];
    }

    // Score each disease based on symptom match
    const predictions = DISEASES_DATABASE.map(disease => {
        const matchedSymptoms = selectedSymptoms.filter(symptom =>
            disease.symptoms.includes(symptom)
        );

        // Calculate confidence based on match percentage
        const matchPercentage = matchedSymptoms.length / disease.symptoms.length;
        const baseConfidence = disease.confidence;
        
        // Adjust confidence based on match
        const adjustedConfidence = (baseConfidence * matchPercentage * 100).toFixed(1);

        return {
            ...disease,
            matchedSymptoms: matchedSymptoms,
            confidence: adjustedConfidence,
            matchScore: matchPercentage
        };
    });

    // Sort by confidence score (highest first)
    return predictions
        .filter(p => p.matchedSymptoms.length > 0) // Only diseases with matching symptoms
        .sort((a, b) => parseFloat(b.confidence) - parseFloat(a.confidence))
        .slice(0, 5); // Return top 5 predictions
}

// Save to Firestore
export async function saveDiseasePredictionToFirestore(db, patientUid, symptoms, predictions) {
    try {
        const { collection, addDoc, Timestamp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
        
        await addDoc(collection(db, 'symptoms'), {
            patientUid: patientUid,
            symptoms: symptoms,
            predictions: predictions.map(p => ({
                diseaseId: p.id,
                diseaseName: p.name,
                confidence: p.confidence,
                urgency: p.urgency,
                matchedSymptoms: p.matchedSymptoms,
                homeRemedy: p.homeRemedy,
                whenToVisit: p.whenToVisit
            })),
            aiDiagnosis: predictions.length > 0 ? predictions[0].name : "Unable to determine",
            urgencyScore: predictions.length > 0 ? predictions[0].urgency : "UNKNOWN",
            timestamp: Timestamp.now()
        });

        return { success: true };
    } catch (error) {
        console.error('Error saving prediction:', error);
        return { success: false, error: error.message };
    }
}
