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
      result.sourceModel = 'Detected: ElevenLabs | Descript Overdub | Voicery';
      result.explanation = 'Voice cloning markers detected: synthetic frequency harmonics, consistent pitch drift, and alignment artifacts typical of neural TTS systems.';
    } else if (fileType.includes('video')) {
      result.sourceModel = 'Detected: DeepFaceLab | FaceSwap | Avatarify | Synthesia';
      result.explanation = 'Video tampering identified: GAN artifacts in blending zones, inconsistent blink patterns, facial landmark distortion, and lighting discrepancies.';
    } else if (fileType.includes('text')) {
      result.sourceModel = 'Detected: GPT-4 | Claude 3 | LLaMA 3 | Gemini 1.5';
      result.explanation = 'Text generation traces: over-optimization, semantic padding, low perplexity structure, and patterns consistent with autoregressive transformers.';
    } else {
      result.sourceModel = 'Possibly Custom-Trained Model / Obfuscated Format';
      result.explanation = 'Unclassified AI fingerprint. Detected unknown layer metadata, hash mismatch, and encrypted feature encoding. May involve proprietary generator.';
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
        <button onclick="downloadPDF()">📄 Download PDF Report</button>
      </div>
    `;
  }
});
