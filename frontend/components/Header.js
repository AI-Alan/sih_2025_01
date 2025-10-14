// components/Header.js
import React from 'react';

export default function Header() {
    return (
        <header className="header">
            <div className="brand">CrypAI</div>
            <nav className="links small" aria-label="External links">
                <a href={process.env.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noreferrer noopener" aria-label="Open GitHub repository in a new tab">GitHub</a>
                <a href={process.env.NEXT_PUBLIC_COLAB_URL} target="_blank" rel="noreferrer noopener" aria-label="Open Colab notebook in a new tab">Colab</a>
            </nav>
        </header>
    )
}
