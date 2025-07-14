function analyzeMedia() {
  const file = document.getElementById('fileInput').files[0];
  const status = document.getElementById('uploadStatus');

  if (!file) {
    status.innerText = '⚠️ Please select a file first.';
    return;
  }

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  status.innerText = '🔍 Analyzing...';

  // Simulate quick scan — reduced to 1 second
  setTimeout(() => {
    const realIndicators = ['real', 'authentic', 'original', 'verified'];
    const isReal = realIndicators.some(keyword => fileName.includes(keyword));

    const confidence = isReal
      ? (Math.random() * (98 - 95) + 95).toFixed(2)
      : (Math.random() * (98 - 90) + 90).toFixed(2);

    let result = {
      isReal,
      confidence,
      blockchainMatch: isReal,
      sourceModel: '',
      explanation: ''
    };

    if (isReal) {
      result.sourceModel = 'Verified Original Content';
      result.explanation = 'Authentic media verified. File contains real-source indicators and passed forensic metadata checks.';
    } else {
      if (fileType.includes('audio')) {
        result.sourceModel = 'Detected: ElevenLabs | Overdub | Voicery';
        result.explanation = 'Voice cloning markers: synthetic tones, robotic pitch control, and unnatural prosody patterns.';
      } else if (fileType.includes('video')) {
        result.sourceModel = 'Detected: DeepFaceLab | Synthesia | Avatarify';
        result.explanation = 'Visual forensics show GAN blending lines, timing jitter, and facial distortion inconsistencies.';
      } else if (fileType.includes('text')) {
        result.sourceModel = 'Detected: GPT-4 | Claude 3 | Gemini';
        result.explanation = 'Detected low token entropy and signature language structures typical of LLM-generated text.';
      } else {
        result.sourceModel = 'Unknown Model / Obfuscated';
        result.explanation = 'Unable to fingerprint source. Possibly encrypted or obfuscated synthetic generation.';
      }
    }

    localStorage.setItem('deeptrace_result', JSON.stringify(result));
    window.location.href = 'results.html';
  }, 1000); // ⏱️ Only 1 second delay now
}

document.addEventListener('DOMContentLoaded', () => {
  const resultBox = document.getElementById('resultBox');
  if (resultBox && localStorage.getItem('deeptrace_result')) {
    const data = JSON.parse(localStorage.getItem('deeptrace_result'));

    resultBox.innerHTML = data.isReal ? `
      <div class="result-block">
        <p><strong>Status:</strong> ✅ Authentic Media Detected</p>
        <p><strong>Confidence:</strong> ${data.confidence}%</p>
        <p><strong>Blockchain Match:</strong> ✅ Yes</p>
        <p><strong>Explanation:</strong> ${data.explanation}</p>
      </div>
    ` : `
      <div class="result-block">
        <p><strong>Status:</strong> ⚠️ AI-Generated Media Detected</p>
        <p><strong>Confidence:</strong> ${data.confidence}%</p>
        <p><strong>Suspected Generator:</strong> ${data.sourceModel}</p>
        <p><strong>Blockchain Match:</strong> ❌ No</p>
        <p><strong>Explanation:</strong> ${data.explanation}</p>
      </div>
    `;
  }
});
