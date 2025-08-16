import React, { useState } from "react";
import "./article.css";
import AuthorPage from "./AuthorPage";

// Dummy author data
const author = {
  name: "Humayra Binte Kazal",
  image: "/image.jpg" 
};

// Blog post content
const article = {
  title: "Human Emotions vs Machine Logic: Who Makes Better Decisions?",
  content: `
Machines rely purely on logic and data, which allows them to make quick, accurate, and unbiased decisions. This is why Artificial Intelligence is often trusted in fields like finance, healthcare, or navigation. Yet, human decisions go beyond logic—they are shaped by emotions, morality, and empathy. For example, a machine may choose the most cost-effective option, but a human may consider fairness, kindness, or long-term impact. While machine logic ensures efficiency, human emotions bring compassion and ethical judgment. Therefore, neither alone is perfect; the best decisions arise when logical analysis is supported by human values.
  `
};

const reactions = [
  { icon: "👍", label: "Like" },
  { icon: "❤️", label: "Love" },
  { icon: "🤔", label: "Thoughtful" },
  { icon: "😂", label: "Funny" }
];

// Dummy comments
const comments = [
  {
    id: 1,
    text: "Great perspective—balance is key!",
    reactions: ["👍", "❤️", "🤔", "😂"]
  },
  {
    id: 2,
    text: "I think machines are still lacking empathy.",
    reactions: ["👍", "❤️", "🤔", "😂"]
  }
];

// Dummy pagination
const totalPages = 3;

export default function ArticlePage() {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [selectedCommentReactions, setSelectedCommentReactions] = useState(comments.map(() => null));
  const [page, setPage] = useState(1);
  const [showAuthor, setShowAuthor] = useState(false);

  // Reaction handlers
  const handleReactionClick = idx => setSelectedReaction(idx);
  const handleCommentReaction = (cIdx, rIdx) => {
    setSelectedCommentReactions(
      selectedCommentReactions.map((val, idx) => (idx === cIdx ? rIdx : val))
    );
  };

  if (showAuthor) {
    return (
      <AuthorPage
        name={author.name}
        image={author.image}
        goBack={() => setShowAuthor(false)}
        posts={12}
        followers={1250}
        reactions={890}
      />
    );
  }

  return (
    <div className="article-container">
      <h1>{article.title}</h1>
      <div className="author-link">
        By:{" "}
        <button
          className="author-button"
          onClick={() => setShowAuthor(true)}
        >
          {author.name}
        </button>
      </div>
      <p>{article.content}</p>
      <div className="reactions">
        {reactions.map((reaction, idx) => (
          <span
            key={reaction.label}
            className={
              "reaction-icon" +
              (selectedReaction === idx ? " selected" : "")
            }
            onClick={() => handleReactionClick(idx)}
            title={reaction.label}
          >
            {reaction.icon}
          </span>
        ))}
      </div>
      <hr />
      <h3>Comments</h3>
      <div className="comments">
        {comments.map((comment, cIdx) => (
          <div key={comment.id} className="comment">
            <span>{comment.text}</span>
            <div className="reactions">
              {comment.reactions.map((icon, rIdx) => (
                <span
                  key={icon}
                  className={
                    "reaction-icon" +
                    (selectedCommentReactions[cIdx] === rIdx
                      ? " selected"
                      : "")
                  }
                  onClick={() => handleCommentReaction(cIdx, rIdx)}
                  title={reactions[rIdx].label}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={page === idx + 1 ? "page-btn active" : "page-btn"}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}