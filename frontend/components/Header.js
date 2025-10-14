// components/Header.js
import React from 'react';

export default function Header() {
    return (
        <header className="header">
            <div className="brand">CryptoDetect</div>
            <div className="links small">
                <a href={process.env.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
                <a href={process.env.NEXT_PUBLIC_COLAB_URL} target="_blank" rel="noreferrer">Colab</a>
            </div>
        </header>
    )
}
