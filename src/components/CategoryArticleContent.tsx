import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import { DataItem, DataResponse } from "../models/GetAllArticleResponse"; // Adjust path based on your folder structure
import ViewMoreCard from "./ViewMoreCard";

interface CategoryArticleLayoutProps {
  categoryId?: number | null; // category_id can be null or a number
  limit: number;
  isGetAll: boolean;
}

const CategoryArticleContent: React.FC<CategoryArticleLayoutProps> = ({
  categoryId,
  limit,
  isGetAll,
}) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const initialFetchDone = useRef(false);
  // Function to fetch data
  const fetchData = async (pageNum: number) => {
    setLoading(true);
    setError(null);

    try {
      // Build the base URL
      let apiUrl = `https://fe-tech-test-api-dev-416879028044.asia-southeast2.run.app/api/v1/articles?limit=${limit}&page=${pageNum}&sort=desc`;
      console.log(categoryId);
      // Conditionally append category_id if it's not null
      if (categoryId !== null && categoryId !== undefined) {
        apiUrl += `&category_id=${categoryId}`;
      }

      // Fetch data from the API
      const response = await axios.get<DataResponse>(apiUrl);
      const { data: items, metadata } = response.data.data;
      setData((prevData) => [...prevData, ...items]);
      setHasNextPage(metadata.has_next_page);
      setPage(pageNum + 1);
      // Update the state with the fetched data
    } catch (err) {
      setError("Failed to fetch articles. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts or when category_id changes
  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchData(page);
      initialFetchDone.current = true; // Mark the first load as done
    }
  }, [categoryId]);
  useEffect(() => {
    if (page > 1 && hasNextPage && isGetAll === true) {
      fetchData(page);
    }
  }, [page]);
  return (
    <div className="bg-white px-4 py-5 border my-4 border-gray-200 sm:px-6">
      {/* Handle loading and error states */}
      {loading && <p>Loading articles...</p>}
      {error && <p>{error}</p>}

      {/* Render the articles once loaded */}
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data.map((article) => (
          <li key={article.id} className="col-span-1">
            <ArticleCard {...article} />
          </li>
        ))}
        {!isGetAll && categoryId != null && (
          <li>
            <ViewMoreCard categoryId={categoryId}></ViewMoreCard>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CategoryArticleContent;
