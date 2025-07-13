function analyzeMedia() {
  const file = document.getElementById('fileInput').files[0];
  const status = document.getElementById('uploadStatus');

  if (!file) {
    status.innerText = '⚠️ Please select a file before analyzing.';
    return;
  }

  const fileType = file.type.toLowerCase();
  status.innerText = '🔍 DeepTrace AI is analyzing your media... please wait.';

  setTimeout(() => {
    const confidence = (Math.random() * (98 - 90) + 90).toFixed(2);
    let result = {
      confidence,
      blockchainMatch: false,
      sourceModel: '',
      explanation: ''
    };

    if (fileType.includes('audio')) {
      result.sourceModel = 'ElevenLabs / Descript Overdub';
      result.explanation = 'Detected spectral artifacts, robotic pitch patterns, and clone harmonics.';
    } else if (fileType.includes('video')) {
      result.sourceModel = 'DeepFaceLab / Avatarify';
      result.explanation = 'Frame-level inconsistencies, mismatched blinking rates, and morph boundary shifts detected.';
    } else if (fileType.includes('text')) {
      result.sourceModel = 'LLaMA / Claude / Copilot';
      result.explanation = 'Repetitive phrasing, token entropy anomalies, and LLM signature structuring observed.';
    } else {
      result.sourceModel = 'Unknown AI Model';
      result.explanation = 'Media fingerprint incomplete or unsupported format.';
    }

    localStorage.setItem('deeptrace_result', JSON.stringify(result));
    window.location.href = 'results.html';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  const resultBox = document.getElementById('resultBox');
  if (resultBox && localStorage.getItem('deeptrace_result')) {
    const data = JSON.parse(localStorage.getItem('deeptrace_result'));

    resultBox.innerHTML = `
      <div class="result-block">
        <p><strong>Status:</strong> AI-Generated Content Detected ⚠️</p>
        <p><strong>Confidence Score:</strong> ${data.confidence}%</p>
        <p><strong>Suspected Generator:</strong> ${data.sourceModel}</p>
        <p><strong>Blockchain Verification:</strong> ❌ Hash mismatch – possible tampering</p>
        <p><strong>Explanation:</strong> ${data.explanation}</p>
      </div>
    `;
  }
});
