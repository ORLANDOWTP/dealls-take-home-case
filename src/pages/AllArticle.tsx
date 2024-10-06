import React from "react";
import CategoryArticleContent from "../components/CategoryArticleContent";
import { useLocation } from "react-router-dom";

const AllArticle = () => {
  const location = useLocation();
  const { categoryId } = location.state;
  return (
    <div>
      <CategoryArticleContent
        categoryId={categoryId}
        limit={10}
        isGetAll={true}
      />
    </div>
  );
};

export default AllArticle;
