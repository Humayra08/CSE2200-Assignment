import React from "react";
import "./article.css";

export default function AuthorPage({
  name,
  image,
  goBack,
  posts = 0,
  followers = 0,
  reactions = 0,
  description = ""
}) {
  return (
    <div>
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>
      <div className="author-container">
        <div className="author-profile">
          <img
            src={image}
            alt={name}
            className="author-img"
            style={{
              background: "#eee1ff"
            }}
          />
          <h2>{name}</h2>
          {description && (
            <p className="author-details">{description}</p>
          )}
        </div>
        <div className="author-stats-row">
          <div className="author-stat-block">
            <div className="author-stat-value">{posts}</div>
            <div className="author-stat-label">Posts</div>
          </div>
          <div className="author-stat-block">
            <div className="author-stat-value">{followers}</div>
            <div className="author-stat-label">Followers</div>
          </div>
          <div className="author-stat-block">
            <div className="author-stat-value">{reactions}</div>
            <div className="author-stat-label">Reactions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
