// components/FileUploader.js
import React, { useState, useCallback } from 'react';

export default function FileUploader({ onResult }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || '';

    const MAX_BYTES = 10 * 1024 * 1024; // 10MB

    const reset = useCallback(() => {
        setFile(null);
        setError('');
    }, []);

    const validateFile = (f) => {
        if (!f) return 'No file selected';
        if (f.size > MAX_BYTES) return `File too large (max 10MB)`;
        // Optional: restrict extensions
        // const allowed = ['application/octet-stream'];
        // if (!allowed.includes(f.type)) return 'Unsupported file type';
        return '';
    };

    async function upload(f) {
        if (!f) return;
        const validation = validateFile(f);
        if (validation) {
            setError(validation);
            return;
        }
        setLoading(true);
        setError('');
        onResult && onResult({ loading: true });
        const fd = new FormData();
        fd.append('file', f);
        try {
            const url = `${BACKEND}/analyze`;
            const resp = await fetch(url, {
                method: 'POST',
                body: fd
            });
            if (!resp.ok) {
                const text = await resp.text();
                throw new Error(`Backend ${resp.status}: ${text?.slice(0, 300)}`);
            }
            const data = await resp.json();
            onResult && onResult({ ok: true, data });
        } catch (err) {
            const msg = err?.message || 'Network error';
            setError(msg);
            onResult && onResult({ ok: false, error: msg });
        } finally {
            setLoading(false);
        }
    }

    const onDrop = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setDragOver(false);
        const f = ev.dataTransfer?.files?.[0];
        if (f) {
            setFile(f);
            setError('');
        }
    };

    const onPick = (e) => {
        const f = e.target.files?.[0];
        setFile(f || null);
        setError('');
    };

    return (
        <div className="card uploader">
            <div className="small">Upload firmware binary for analysis</div>

            {!BACKEND && (
                <div className="alert">
                    Backend URL is not set. Define NEXT_PUBLIC_BACKEND_URL in .env.local
                </div>
            )}

            <label
                className={`drop ${dragOver ? 'drag' : ''}`}
                htmlFor="fileInput"
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
            >
                {file ? file.name : 'Click to pick a file or drag & drop here'}
            </label>

            <input
                id="fileInput"
                type="file"
                accept="*/*"
                style={{ display: 'none' }}
                onChange={onPick}
            />

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button className="btn" onClick={() => upload(file)} disabled={!file || loading || !BACKEND}>
                    {loading ? 'Analyzing...' : 'Analyze'}
                </button>
                <a className="btn secondary" href={process.env.NEXT_PUBLIC_COLAB_URL} target="_blank" rel="noreferrer">Open Colab</a>
                <button className="btn secondary" onClick={reset} disabled={loading && !file}>Clear</button>
            </div>

            {error && <div className="error small" style={{ marginTop: 8 }}>{error}</div>}

            <div className="footer small">Tip: Use small test binaries (≤10MB) for faster analysis.</div>
        </div>
    )
}

