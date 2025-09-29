const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');
const pyCode = document.getElementById('py-code');
const packageBtn = document.getElementById('package-btn');
const preview = document.getElementById('preview');

// Live preview
function updatePreview() {
    const html = htmlCode.value;
    const css = `<style>${cssCode.value}</style>`;
    const js = `<script>${jsCode.value}<\/script>`;
    preview.srcdoc = html + css + js;
}

htmlCode.addEventListener('input', updatePreview);
cssCode.addEventListener('input', updatePreview);
jsCode.addEventListener('input', updatePreview);

// Package code and send to backend
packageBtn.addEventListener('click', async () => {
    const response = await fetch('/package', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            html: htmlCode.value,
            css: cssCode.value,
            js: jsCode.value,
            py: pyCode.value
        })
    });

    if (response.ok) {
        const blob = await response.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'LivoProject.zip';
        a.click();
    } else {
        alert('Error packaging project.');
    }
});