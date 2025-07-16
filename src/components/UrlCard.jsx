import React from "react";

const UrlCard = ({ urlData }) => {
  const { shortUrl, originalUrl, createdAt, expiresAt, location, referrer } = urlData;
  const isExpired = expiresAt && new Date() > new Date(expiresAt);

  return (
    <div className="url-card">
      <p><strong>Original URL:</strong> {originalUrl}</p>
      <p>
        <strong>Shortened URL:</strong>{" "}
        {isExpired ? (
          <span style={{ color: "red" }}>Expired</span>
        ) : (
          <a href={originalUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        )}
      </p>
      <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
      <p><strong>Expires At:</strong> {expiresAt ? new Date(expiresAt).toLocaleString() : "Never"}</p>
      <p><strong>Referrer:</strong> {referrer || "N/A"}</p>
      <p><strong>Location:</strong> {location || "Unknown"}</p>
    </div>
  );
};

export default UrlCard;
