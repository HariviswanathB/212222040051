import React, { useState, useEffect } from "react";
import UrlCard from "./UrlCard";
import { nanoid } from "nanoid";

const UrlShortener = () => {
  const [urls, setUrls] = useState(Array(5).fill({ originalUrl: "", preferredCode: "", validity: "" }));
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [location, setLocation] = useState("Fetching...");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setLocation(`${data.city}, ${data.region}`))
      .catch(() => setLocation("Unknown"));
  }, []);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleShorten = () => {
    const newShortened = urls
      .filter((u) => u.originalUrl.trim() !== "")
      .map((u) => {
        const createdAt = new Date();
        const expiresAt = u.validity
          ? new Date(createdAt.getTime() + parseInt(u.validity) * 60000)
          : null;
        return {
          ...u,
          shortUrl: `https://short.ly/${u.preferredCode || nanoid(6)}`,
          createdAt,
          expiresAt,
          referrer: document.referrer,
          location,
        };
      });

    setShortenedUrls(newShortened);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>URL Shortener</h2>
      {urls.map((u, index) => (
        <div key={index} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}>
          <input
            type="text"
            placeholder="Original URL"
            value={u.originalUrl}
            onChange={(e) => handleChange(index, "originalUrl", e.target.value)}
          />
          <input
            type="text"
            placeholder="Preferred Short Code (optional)"
            value={u.preferredCode}
            onChange={(e) => handleChange(index, "preferredCode", e.target.value)}
          />
          <input
            type="number"
            placeholder="Validity (mins)"
            value={u.validity}
            onChange={(e) => handleChange(index, "validity", e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleShorten}>Shorten URLs</button>

      <hr />
      <div>
        {shortenedUrls.map((url, idx) => (
          <UrlCard key={idx} urlData={url} />
        ))}
      </div>
    </div>
  );
};

export default UrlShortener;
