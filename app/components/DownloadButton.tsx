"use client";

const ISSUE_PDF = "/magazine/where-dreams-live-issue-01.pdf";

type DownloadButtonProps = {
  className?: string;
  compact?: boolean;
};

export function DownloadButton({ className = "", compact = false }: DownloadButtonProps) {
  function handleDownload() {
    fetch("/api/downloads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ issue: "issue-01" }),
      keepalive: true,
    }).catch(() => undefined);
  }

  return (
    <div className={`download-control ${compact ? "download-control--compact" : ""} ${className}`.trim()}>
      <a
        className="primary-button"
        href={ISSUE_PDF}
        download="Where-Dreams-Live-Issue-01-Becoming.pdf"
        onClick={handleDownload}
      >
        <span>{compact ? "Download the issue" : "Download Issue 01"}</span>
        <span className="download-arrow" aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
