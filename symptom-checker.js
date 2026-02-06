
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const symptom = document.querySelector('#symptom').value;
    const diagnosisResult = document.querySelector('#diagnosis-result');
    const resultContent = document.querySelector('#result-content');

    let diagnosis = '';
    let recommendation = '';
    let isCritical = false;

    switch (symptom) {
        case 'cold':
            diagnosis = 'Common Cold';
            recommendation = 'Rest, drink plenty of fluids, and take over-the-counter medication for symptoms like fever and pain.';
            break;
        case 'covid':
            diagnosis = 'Possible COVID-19';
            recommendation = 'Isolate yourself, wear a mask, and get tested for COVID-19. Consult a doctor for further advice.';
            isCritical = true;
            break;
        case 'sprain':
            diagnosis = 'Sprain';
            recommendation = 'Follow the R.I.C.E. method: Rest, Ice, Compression, and Elevation. If the pain is severe, consult a doctor.';
            break;
        case 'headache':
            diagnosis = 'Tension Headache';
            recommendation = 'Rest, drink water, and take over-the-counter pain relievers. If the headache is severe or persistent, consult a doctor.';
            break;
        case 'stomach-ache':
            diagnosis = 'Indigestion';
            recommendation = 'Avoid spicy and oily food. Drink plenty of fluids and rest. If the pain is severe or you have other symptoms like fever, consult a doctor.';
            break;
    }

    resultContent.innerHTML = `
        <p><strong>Diagnosis:</strong> ${diagnosis}</p>
        <p><strong>Recommendation:</strong> ${recommendation}</p>
    `;

    if (isCritical) {
        resultContent.innerHTML += `<div class="triage-warning"><strong>Warning:</strong> Your symptoms may be serious. Please seek immediate medical attention at a hospital or clinic.</div>`;
    }

    diagnosisResult.classList.remove('hidden');
});
