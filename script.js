function analyzeMedia() {
  const file = document.getElementById('fileInput').files[0];
  if (file) {
    document.getElementById('uploadStatus').innerText = 'Media uploaded. Analyzing...';
    setTimeout(() => {
      window.location.href = 'results.html';
    }, 1500);
  } else {
    document.getElementById('uploadStatus').innerText = 'Please select a file first.';
  }
}
