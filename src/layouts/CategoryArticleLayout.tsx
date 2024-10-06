import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryArticleContent from "../components/CategoryArticleContent";
import { ArticleCategory } from "../models/ArticleCategory";

// Define the interface for category data

const CategoryArticleLayout: React.FC = () => {
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from the API
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<{
        code: number;
        data: ArticleCategory[];
      }>(
        "https://fe-tech-test-api-dev-416879028044.asia-southeast2.run.app/api/v1/categories"
      );
      setCategories(response.data.data); // Store categories in state
    } catch (err) {
      setError("Failed to fetch categories.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      {/* Handle loading and error states */}
      {loading && <p>Loading categories...</p>}
      {error && <p>{error}</p>}

      {/* Render categories and pass their IDs to CategoryArticleContent */}
      {!loading &&
        !error &&
        categories.length > 0 &&
        categories.map((category) => (
          <div key={category.id}>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {category.name}
            </h3>
            <CategoryArticleContent
              categoryId={category.id}
              limit={5}
              isGetAll={false}
            />
          </div>
        ))}
    </div>
  );
};

export default CategoryArticleLayout;
