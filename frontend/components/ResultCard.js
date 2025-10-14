// components/ResultCard.js
import React from 'react';

export default function ResultCard({ result }) {
    if (!result) return (
        <div className="card small">
            <div className="small">No result yet. Upload a binary to analyze.</div>
        </div>
    );

    if (!result.ok) {
        return (
            <div className="card">
                <div className="result-header"><strong>Error</strong></div>
                <div className="small">{result.error}</div>
            </div>
        )
    }

    const data = result.data;
    // Expected result format: { success:true, results: [...], logs: "..." }
    const items = data?.results || [];

    return (
        <div className="card">
            <div className="result-header">
                <strong>Analysis Results</strong>
                <span className="small">Confidence scores shown</span>
            </div>

            {items.length === 0 && <div className="small">No crypto routines identified.</div>}

            {items.map((it, idx) => (
                <div key={idx} className="result-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 700 }}>{it.name || `function_${idx}`}</div>
                            <div className="small">{it.family || 'Unknown'} · {it.role || 'N/A'}</div>
                        </div>
                        <div style={{ width: 120 }}>
                            <div className="small">Confidence</div>
                            <div className="progress" style={{ marginTop: 6 }}>
                                <span style={{ width: `${Math.round((it.confidence || 0) * 100)}%` }}></span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="small" style={{ marginTop: 12 }}>Raw logs:</div>
            <pre style={{ background: '#fbfdff', padding: 8, borderRadius: 6, overflowX: 'auto', fontSize: 12 }}>{data?.logs || '—'}</pre>
        </div>
    )
}
