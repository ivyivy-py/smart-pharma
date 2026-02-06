
const symptomForm = document.getElementById('symptom-form');
const symptomsGroup = document.getElementById('symptoms-group');
const diagnosisResult = document.getElementById('diagnosis-result');
const resultContent = document.getElementById('result-content');

const questionSections = {
    fever: document.getElementById('fever-questions'),
    'running-nose': document.getElementById('running-nose-questions'),
    cough: document.getElementById('cough-questions'),
    'stomach-ache': document.getElementById('stomach-ache-questions'),
    sprain: document.getElementById('sprain-questions'),
};

symptomsGroup.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const symptom = e.target.value;
        if (e.target.checked) {
            if (questionSections[symptom]) {
                questionSections[symptom].classList.remove('hidden');
            }
        } else {
            if (questionSections[symptom]) {
                questionSections[symptom].classList.add('hidden');
            }
        }
    }
});

// Mock function to simulate a call to a medical diagnosis API
async function callMedicalDiagnosisAPI(symptoms, age, sex) {
    // In a real application, you would make a POST request to the API endpoint
    // with the user's symptoms, age, and sex.
    console.log('Simulating API call with:', { symptoms, age, sex });

    // Mock response based on the "common cold" rule
    const isCold = symptoms.includes('fever') &&
                   symptoms.includes('running-nose') &&
                   symptoms.includes('cough') &&
                   symptoms.includes('sore-throat');

    if (isCold) {
        return {
            conditions: [
                {
                    name: 'Common Cold',
                    probability: 0.85,
                    recommendation: 'You likely have a common cold. Rest, drink plenty of fluids, and take over-the-counter medication for symptoms.'
                },
                {
                    name: 'Influenza',
                    probability: 0.10,
                    recommendation: 'While less likely, your symptoms could also indicate the flu. Monitor your condition and consult a doctor if it worsens.'
                }
            ]
        };
    } else {
        // Default response for other symptoms
        return {
            conditions: [
                {
                    name: 'Unknown',
                    probability: 0.9,
                    recommendation: 'Your symptoms do not match a clear pattern. Please consult a doctor for a professional diagnosis.'
                }
            ]
        };
    }
}

symptomForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked')).map(cb => cb.value);

    if (!age || !sex || selectedSymptoms.length === 0) {
        alert('Please fill in all fields and select at least one symptom.');
        return;
    }

    const apiResponse = await callMedicalDiagnosisAPI(selectedSymptoms, age, sex);

    let diagnosisHtml = '';
    if (apiResponse.conditions && apiResponse.conditions.length > 0) {
        apiResponse.conditions.forEach(condition => {
            diagnosisHtml += `
                <div class="diagnosis-item">
                    <p><strong>Condition:</strong> ${condition.name}</p>
                    <p><strong>Probability:</strong> ${(condition.probability * 100).toFixed(0)}%</p>
                    <p><strong>Recommendation:</strong> ${condition.recommendation}</p>
                </div>
            `;
        });
    }

    resultContent.innerHTML = diagnosisHtml;
    resultContent.innerHTML += `<div class="disclaimer"><strong>Disclaimer:</strong> This is an informational tool and not a substitute for professional medical advice. Please consult a doctor for an accurate diagnosis.</div>`;
    diagnosisResult.classList.remove('hidden');
});
