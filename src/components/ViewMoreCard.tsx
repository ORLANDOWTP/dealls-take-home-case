import { useNavigate } from "react-router-dom";
interface ViewMoreCardProps {
  categoryId: number;
}
const ViewMoreCard: React.FC<ViewMoreCardProps> = ({ categoryId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articles`, { state: { categoryId: categoryId } });
  };

  return (
    <button
      type="button"
      key={`${categoryId}`}
      onClick={handleClick}
      className="inline-flex items-center mx-3 p-5  border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-52 h-full"
    >
      View More
    </button>
  );
};

export default ViewMoreCard;
