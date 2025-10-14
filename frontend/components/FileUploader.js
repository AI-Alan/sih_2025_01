// components/FileUploader.js
import React, { useState } from 'react';

export default function FileUploader({ onResult }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || '';

    async function upload(f) {
        if (!f) return;
        setLoading(true);
        const fd = new FormData();
        fd.append('file', f);
        try {
            const resp = await fetch(`${BACKEND}/analyze`, {
                method: 'POST',
                body: fd
            });
            const data = await resp.json();
            onResult({ ok: true, data });
        } catch (err) {
            onResult({ ok: false, error: err.message || 'Network error' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card uploader">
            <div className="small">Upload firmware binary for analysis</div>

            <label className="drop" htmlFor="fileInput">
                {file ? file.name : 'Click to pick a file or drag & drop here'}
            </label>

            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button className="btn" onClick={() => upload(file)} disabled={!file || loading}>
                    {loading ? 'Analyzing...' : 'Analyze'}
                </button>
                <a className="btn secondary" href={process.env.NEXT_PUBLIC_COLAB_URL} target="_blank" rel="noreferrer">Open Colab</a>
            </div>

            <div className="footer small">Tip: Use small test binaries for faster analysis.</div>
        </div>
    )
}
