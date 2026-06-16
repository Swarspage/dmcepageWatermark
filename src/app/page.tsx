"use client";

import React, { useState, useRef } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setStatus("idle");
      } else {
        setErrorMessage("Please upload a valid PDF document.");
        setStatus("error");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("idle");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStatus("processing");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("/api/pdf/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process PDF file.");
      }

      // Download processed PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `processed_${file.name}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred.");
      setStatus("error");
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <main>
      <header className="brand-section">
        <div className="logo-badge">DMCE PageX Tool</div>
        <h1>Instantly Add Watermarks</h1>
        <p className="subtitle">Append official Datta Meghe header logo and centralized watermarks to any PDF document.</p>
      </header>

      <section className="glass-card">
        <form onSubmit={handleSubmit}>
          <input
            id="pdf-input"
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {!file ? (
            <div
              className={`dropzone ${isDragActive ? "drag-active" : ""}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              id="pdf-dropzone"
            >
              <div className="upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '32px', height: '32px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              </div>
              <div>
                <p style={{ fontWeight: 500, marginBottom: '4px' }}>Click to upload or drag & drop</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>PDF documents only (max 20MB)</p>
              </div>
            </div>
          ) : (
            <div className="file-info" id="file-display">
              <div className="file-details">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatBytes(file.size)}</span>
              </div>
              <button
                type="button"
                className="remove-btn"
                onClick={removeFile}
                title="Remove file"
                id="remove-file-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="success-message" style={{ color: '#f87171', marginBottom: '24px' }} id="error-display">
              <span>⚠️ {errorMessage}</span>
            </div>
          )}

          {status === "success" && (
            <div className="success-message" style={{ marginBottom: '24px' }} id="success-display">
              <div className="success-icon">✨</div>
              <p style={{ fontWeight: 500 }}>PDF Processed Successfully!</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Check your downloads folder.</p>
            </div>
          )}

          <button
            type="submit"
            id="process-btn"
            className="action-btn primary"
            disabled={!file || status === "processing"}
          >
            {status === "processing" ? (
              <>
                <div className="spinner"></div>
                Processing PDF...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                Process PDF
              </>
            )}
          </button>
        </form>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Datta Meghe College of Engineering. All rights reserved.</p>
      </footer>
    </main>
  );
}
