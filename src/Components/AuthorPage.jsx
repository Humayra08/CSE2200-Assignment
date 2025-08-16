import React from "react";
import "./article.css";

export default function AuthorPage({ name, image, goBack, posts, reactions, followers }) {
  return (
    <>
      <button className="back-btn" onClick={goBack}>← Back to Article</button>
      <div className="author-container">
        <div className="author-profile">
          <img src={image} alt={name} className="author-img" />
          <h2>{name}</h2>
        </div>
        <div className="author-details">
          <p>
            Humayra Binte Kazal is a curious thinker and writer, exploring the intersection of technology and humanity.
            Passionate about ethical AI, emotional intelligence, and the future of decision-making.
          </p>
        </div>
        <div className="author-stats-row">
          <div className="author-stat-block">
            <div className="author-stat-value">{posts}</div>
            <div className="author-stat-label">Articles</div>
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
    </>
  );
}