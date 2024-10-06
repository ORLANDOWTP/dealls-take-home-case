import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleData } from "../models/ArticleData";
import HtmlContentRenderer from "../components/HTMLContentRendered";
const ArticleDetail = () => {
  const { id } = useParams(); // Destructure id from state
  const [articleData, setArticleData] = useState<ArticleData>();

  useEffect(() => {
    if (id) {
      // Fetch the article data using the id
      fetch(
        `https://fe-tech-test-api-dev-416879028044.asia-southeast2.run.app/api/v1/articles/${id}`
      )
        .then((response) => response.json())
        .then((data) => setArticleData(data.data))
        .catch((error) => console.error("Error fetching article:", error));
    }
  }, [id]);

  // Function to handle sharing the article's URL
  const handleShare = () => {
    const currentUrl = `${window.location.origin}/articles/${id}`;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying URL:", error);
      });
  };

  if (!articleData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-detail-page">
      {/* Share button */}
      <button onClick={handleShare}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
      </button>
      <h1>{articleData.title}</h1>
      <HtmlContentRenderer htmlString={articleData.content} />
      {/* Convert HTML to React elements */}
    </div>
  );
};

export default ArticleDetail;
