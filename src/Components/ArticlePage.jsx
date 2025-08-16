import React, { useState } from "react";
import "./article.css";
import AuthorPage from "./AuthorPage";


const author = {
  name: "Humayra Binte Kazal",
  image: "/image.jpg",
  date: "17 August 2025"
};

const article = {
  title: "Human Emotions vs Machine Logic: Who Makes Better Decisions?",
  content: `
Machines rely purely on logic and data, which allows them to make quick, accurate, and unbiased decisions. This is why Artificial Intelligence is often trusted in fields like finance, healthcare, or navigation. Yet, human decisions go beyond logic—they are shaped by emotions, morality, and empathy. For example, a machine may choose the most cost-effective option, but a human may consider fairness, kindness, or long-term impact. While machine logic ensures efficiency, human emotions bring compassion and ethical judgment. Therefore, neither alone is perfect; the best decisions arise when logical analysis is supported by human values.
  `
};

const reactions = [
  { icon: "👍", label: "Like" },
  { icon: "❤️", label: "Love" },
  { icon: "😠", label: "Angry" },
  { icon: "😢", label: "Sad" }
];


const commenters = {
  Alice: {
    name: "Alice",
    image: "/alice.jpg",
    avatarColor: "#a98cf9",
    description: "Alice is a tech writer passionate about AI ethics and cognitive science.",
    posts: 12,
    followers: 430,
    reactions: 88
  },
  Bob: {
    name: "Bob",
    image: "/bob.jpg",
    avatarColor: "#f98cb5",
    description: "Bob researches decision theory and often shares succinct insights on data-driven logic.",
    posts: 20,
    followers: 210,
    reactions: 56
  },
  Carol: {
    name: "Carol",
    image: "/carol.jpg",
    avatarColor: "#8cf9b2",
    description: "Carol is an educator who bridges computer science and philosophy in her work.",
    posts: 8,
    followers: 140,
    reactions: 31
  },
  David: {
    name: "David",
    image: "/david.jpg",
    avatarColor: "#8ccff9",
    description: "David is a developer focused on ethical AI and responsible tech.",
    posts: 15,
    followers: 300,
    reactions: 77
  },
  Eve: {
    name: "Eve",
    image: "/eve.jpg",
    avatarColor: "#f9c68c",
    description: "Eve writes about technology trends, with a knack for concise analysis.",
    posts: 10,
    followers: 180,
    reactions: 49
  },
  Frank: {
    name: "Frank",
    image: "/frank.jpg",
    avatarColor: "#cf8cf9",
    description: "Frank explores the intersection of psychology and artificial intelligence.",
    posts: 6,
    followers: 98,
    reactions: 22
  }
};

const initialComments = [
  {
    id: 1,
    name: "Alice",
    date: "10 February 2025",
    text: "Balanced view of logic and empathy."
  },
  {
    id: 2,
    name: "Bob",
    date: "11 February 2025",
    text: "Strong insight on decision-making."
  },
  {
    id: 3,
    name: "Carol",
    date: "12 February 2025",
    text: "Clear and thoughtful comparison."
  },
  {
    id: 4,
    name: "David",
    date: "13 February 2025",
    text: "Highlights ethics alongside efficiency."
  },
  {
    id: 5,
    name: "Eve",
    date: "14 February 2025",
    text: "Well-structured and concise piece."
  },
  {
    id: 6,
    name: "Frank",
    date: "15 February 2025",
    text: "Important perspective on AI vs humans."
  }
];

const COMMENTS_PER_PAGE = 2;
const totalPages = Math.ceil(initialComments.length / COMMENTS_PER_PAGE);

export default function ArticlePage() {
  const [reactionCounts, setReactionCounts] = useState([0, 0, 0, 0]);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const [commentReactions, setCommentReactions] = useState(
    initialComments.map(() => ({
      counts: [0, 0, 0, 0],
      selected: null
    }))
  );

  const [comments, setComments] = useState(initialComments);
  const [commentInput, setCommentInput] = useState("");
  const [commentPage, setCommentPage] = useState(1);
  const [profileUser, setProfileUser] = useState(null);
  const [showAuthor, setShowAuthor] = useState(false);

  const handleReactionClick = idx => {
    setReactionCounts(prevCounts => {
      const counts = [...prevCounts];
      if (selectedReaction === idx) {
        counts[idx] = Math.max(0, counts[idx] - 1);
        setSelectedReaction(null);
      } else {
        if (selectedReaction !== null) {
          counts[selectedReaction] = Math.max(0, counts[selectedReaction] - 1);
        }
        counts[idx] = counts[idx] + 1;
        setSelectedReaction(idx);
      }
      return counts;
    });
  };

  const handleCommentReactionClick = (commentIdxOnPage, reactionIdx) => {
    const globalIdx = (commentPage - 1) * COMMENTS_PER_PAGE + commentIdxOnPage;
    setCommentReactions(prev => {
      const next = [...prev];
      const counts = [...next[globalIdx].counts];
      let selected = next[globalIdx].selected;
      if (selected === reactionIdx) {
        counts[reactionIdx] = Math.max(0, counts[reactionIdx] - 1);
        selected = null;
      } else {
        if (selected !== null) {
          counts[selected] = Math.max(0, counts[selected] - 1);
        }
        counts[reactionIdx] += 1;
        selected = reactionIdx;
      }
      next[globalIdx] = { counts, selected };
      return next;
    });
  };

  const submitComment = e => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([
        {
          id: comments.length + 1,
          name: author.name,
          date: "16 August 2025",
          text: commentInput
        },
        ...comments
      ]);
      setCommentReactions([
        { counts: [0, 0, 0, 0], selected: null },
        ...commentReactions
      ]);
      setCommentInput("");
      setCommentPage(1);
    }
  };

  const startIdx = (commentPage - 1) * COMMENTS_PER_PAGE;
  const paginatedComments = comments.slice(startIdx, startIdx + COMMENTS_PER_PAGE);
  const paginatedCommentReactions = commentReactions.slice(startIdx, startIdx + COMMENTS_PER_PAGE);

  // Showing commenter profile with custom bio here
  if (profileUser) {
    const commenterData = commenters[profileUser.name] || {
      name: profileUser.name,
      image: "/profile.jpg",
      description: "No bio available.",
      posts: 1,
      followers: 10,
      reactions: 1
    };
    return (
      <AuthorPage
        name={commenterData.name}
        image={commenterData.image}
        goBack={() => setProfileUser(null)}
        posts={commenterData.posts}
        followers={commenterData.followers}
        reactions={commenterData.reactions}
        description={commenterData.description}
      />
    );
  }

  if (showAuthor) {
    return (
      <AuthorPage
        name={author.name}
        image={author.image}
        goBack={() => setShowAuthor(false)}
        posts={12}
        followers={1250}
        reactions={890}
        description="Humayra Binte Kazal is an avid blogger sharing insights on technology, logic, and human values."
      />
    );
  }

  return (
    <div className="article-container">
      <h2 className="blog-main-title">
        “Welcome to NextGen Tech Blog – Share ideas, explore trends, and stay ahead in technology.”
      </h2>
      <img src="/cover.jpg" alt="Blog Cover" className="blog-cover-img" />
      <hr className="cover-divider" />
      <div className="article-header">
        <img src={author.image} alt={author.name} className="article-author-img" />
        <div className="article-author-info">
          <button className="article-author-name" onClick={() => setShowAuthor(true)}>
            {author.name}
          </button>
          <div className="article-author-date">{author.date}</div>
        </div>
      </div>
      <hr className="article-author-divider" />

      <h1>{article.title}</h1>
      <p>{article.content}</p>
      
      <div className="post-reactions-row">
        {reactions.map((reaction, idx) => (
          <button
            key={reaction.label}
            className={
              "post-reaction-button" +
              (selectedReaction === idx ? " selected" : "")
            }
            onClick={() => handleReactionClick(idx)}
            tabIndex={0}
            type="button"
            title={reaction.label}
          >
            <span className="post-reaction-icon">{reaction.icon}</span>
            <span className="post-reaction-label">{reaction.label}</span>
            <span className="post-reaction-count">{reactionCounts[idx]}</span>
          </button>
        ))}
      </div>

      <div className="comments-section">
        <div className="comments-header">
          <span className="comments-count">{comments.length} Comments</span>
          <hr className="comments-divider" />
        </div>
        <form className="comments-input-row" onSubmit={submitComment}>
          <input
            className="comments-input"
            type="text"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            placeholder="Write your comment.."
          />
          <button type="submit" className="comments-send-btn" aria-label="Send">
            <span className="comments-send-arrow">→</span>
          </button>
        </form>
        <div className="comments-list">
          {paginatedComments.map((comment, idxOnPage) => {
            const reactionsObj = paginatedCommentReactions[idxOnPage];
            const commenterInfo = commenters[comment.name] || {
              image: "/profile.jpg",
              avatarColor: "#2c4ccf"
            };
            return (
              <div className="comment-card-box white-bg" key={comment.id}>
                <div className="comment-card">
                  <img
                    src={commenterInfo.image}
                    alt={comment.name}
                    className="comment-avatar-img"
                    style={{
                      background: commenterInfo.avatarColor,
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      objectFit: "cover",
                      marginTop: "8px"
                    }}
                  />
                  <div className="comment-content">
                    <div className="comment-meta">
                      <button
                        className="comment-author-name"
                        onClick={() =>
                          setProfileUser({
                            name: comment.name
                          })
                        }
                      >
                        {comment.name}
                      </button>
                      <span className="comment-date">{comment.date}</span>
                      <span className="comment-report">Report</span>
                    </div>
                    <div className="comment-text">{comment.text}</div>
                    <div className="comment-reactions-row">
                      {reactions.map((reaction, rIdx) => (
                        <button
                          key={reaction.label}
                          className={
                            "comment-reaction-button" +
                            (reactionsObj.selected === rIdx ? " selected" : "")
                          }
                          type="button"
                          tabIndex={0}
                          title={reaction.label}
                          onClick={() => handleCommentReactionClick(idxOnPage, rIdx)}
                        >
                          <span className="comment-reaction-icon">{reaction.icon}</span>
                          <span className="comment-reaction-count">{reactionsObj.counts[rIdx]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="comment-pagination">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={
                commentPage === idx + 1
                  ? "comment-page-btn active"
                  : "comment-page-btn"
              }
              style={{
                background: "#fff",
                color: "#36013f"
              }}
              onClick={() => setCommentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
      <hr />
    </div>
  );
}