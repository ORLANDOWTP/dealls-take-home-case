import Slider from "../components/Slider";
import CategoryArticleLayout from "../layouts/CategoryArticleLayout";

const Home = () => {
  return (
    <div className="bg-white px-4 py-4 sm:px-6">
      <div className="flex-1 flex items-center sm:justify-start">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Latest Articles
        </h3>
      </div>
      <Slider />

      <CategoryArticleLayout></CategoryArticleLayout>
    </div>
  );
};

export default Home;
