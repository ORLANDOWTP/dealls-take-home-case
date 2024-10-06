import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { DataItem, DataResponse } from "../models/GetAllArticleResponse"; // Adjust path based on your folder structure

const Slider = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialFetchDone = useRef(false);
  const fetchData = async (pageNum: number) => {
    if (!hasNextPage) return;

    setLoading(true);
    try {
      const response = await axios.get<DataResponse>(
        `https://fe-tech-test-api-dev-416879028044.asia-southeast2.run.app/api/v1/articles?page=${pageNum}&limit=10&sort=desc`
      );
      const { data: items, metadata } = response.data.data;

      setData((prevData) => [...prevData, ...items]);
      setHasNextPage(metadata.has_next_page);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // Load the first page immediately when the component mounts
  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchData(page);
      initialFetchDone.current = true; // Mark the first load as done
    }
  });

  // Handle touch events for swipe detection
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      container.dataset.startX = e.touches[0].clientX.toString();
      container.dataset.scrollLeft = container.scrollLeft.toString();
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      const startX = parseFloat(container.dataset.startX ?? "0");
      const scrollLeft = parseFloat(container.dataset.scrollLeft ?? "0");
      const currentX = e.touches[0].clientX;
      const distance = startX - currentX; // Calculate distance moved

      container.scrollLeft = scrollLeft + distance; // Adjust scroll position
    }
  };

  const handleTouchEnd = () => {
    const container = containerRef.current;
    if (container) {
      // Check if we scrolled to the left and update the page
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft && hasNextPage) {
        setPage((prevPage) => prevPage + 1); // Load next page when dragging right
      }
    }
  };

  // Handle mouse events for drag detection
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      container.dataset.startX = e.clientX.toString();
      container.dataset.scrollLeft = container.scrollLeft.toString();
      container.addEventListener("mousemove", handleMouseMove);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    const container = containerRef.current;
    if (container) {
      const startX = parseFloat(container.dataset.startX ?? "0");
      const scrollLeft = parseFloat(container.dataset.scrollLeft ?? "0");
      const currentX = e.clientX;
      const distance = startX - currentX; // Calculate distance moved

      container.scrollLeft = scrollLeft + distance; // Adjust scroll position
    }
  };

  const handleMouseUp = () => {
    const container = containerRef.current;
    if (container) {
      container.removeEventListener("mousemove", handleMouseMove);

      // Check if we scrolled to the left and update the page
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      console.log(
        "before " +
          container.scrollLeft +
          " " +
          maxScrollLeft +
          " " +
          page +
          " " +
          hasNextPage
      );
      if (Math.ceil(container.scrollLeft) >= maxScrollLeft && hasNextPage) {
        console.log(
          container.scrollLeft +
            " " +
            maxScrollLeft +
            " " +
            page +
            " " +
            hasNextPage
        );
        setPage((prevPage) => prevPage + 1); // Load next page when dragging right
      }
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="bg-white px-4 py-5 border my-4 border-gray-200 sm:px-6 flex overflow-x-auto cursor-grab border-solid"
    >
      {data.map((item) => (
        <ArticleCard key={item.id} {...item}></ArticleCard>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Slider;
