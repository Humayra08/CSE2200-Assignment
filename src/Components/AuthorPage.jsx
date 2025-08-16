import React from "react";
import "./article.css";

export default function AuthorPage({ name, image, goBack }) {
  return (
    <div className="author-container">
      <button className="back-btn" onClick={goBack}>← Back to Article</button>
      <div className="author-profile">
        <img src={image} alt={name} className="author-img" />
        <h2>{name}</h2>
      </div>
      <div className="author-details">
        <p>
          Humayra08 is a curious thinker and writer, exploring the intersection of technology and humanity.
          Passionate about ethical AI, emotional intelligence, and the future of decision-making.
        </p>
      </div>
    </div>
  );
}