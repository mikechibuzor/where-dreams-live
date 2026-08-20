"use client";

import { useEffect, useState } from "react";

const ISSUE_PDF = "/magazine/where-dreams-live-issue-01.pdf";

type DownloadButtonProps = {
  className?: string;
  compact?: boolean;
};

export function DownloadButton({ className = "", compact = false }: DownloadButtonProps) {
  const [downloadCount, setDownloadCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/downloads", { headers: { accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: { count: number }) => {
        if (isMounted && Number.isFinite(payload.count)) setDownloadCount(payload.count);
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  function handleDownload() {
    fetch("/api/downloads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ issue: "issue-01" }),
      keepalive: true,
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: { count: number }) => {
        if (Number.isFinite(payload.count)) setDownloadCount(payload.count);
      })
      .catch(() => undefined);
  }

  const countLabel = downloadCount === null
    ? "Free digital edition · 18 MB"
    : `${new Intl.NumberFormat("en").format(downloadCount)} ${downloadCount === 1 ? "download" : "downloads"}`;

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
      <span className="download-count" aria-live="polite">{countLabel}</span>
    </div>
  );
}
