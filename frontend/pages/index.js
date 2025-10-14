// pages/index.js
import Head from 'next/head'
import Header from '../components/Header'
import FileUploader from '../components/FileUploader'
import ResultCard from '../components/ResultCard'
import { useState } from 'react'

export default function Home() {
    const [result, setResult] = useState(null)

    return (
        <>
            <Head>
                <title>CryptoDetect UI</title>
                <meta name="description" content="AI-based crypto detection in firmware" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="container full-viewport">
                <Header />
                <div className="grid">
                    <div>
                        <FileUploader onResult={(r) => setResult(r)} />
                        <div style={{ height: 16 }} />
                        <div className="card small">
                            <strong>About</strong>
                            <p className="small" style={{ marginTop: 8 }}>
                                This UI demonstrates uploading firmware binaries for ML-based crypto detection.
                                The actual analysis runs on a separate backend — use the Colab notebook or GitHub repo links to inspect the pipeline and models.
                            </p>
                        </div>
                    </div>

                    <div>
                        <ResultCard result={result} />
                        <div style={{ height: 12 }} />
                        <div className="card small">
                            <strong>Quick Links</strong>
                            <div className="stack" style={{ marginTop: 8 }}>
                                <a className="btn secondary" href={process.env.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noreferrer">Project Repo</a>
                                <a className="btn secondary" href={process.env.NEXT_PUBLIC_COLAB_URL} target="_blank" rel="noreferrer">Colab Notebook</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
