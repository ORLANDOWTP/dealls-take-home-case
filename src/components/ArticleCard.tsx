import { useNavigate } from "react-router-dom";
import { DataItem } from "../models/GetAllArticleResponse";

const ArticleCard = (props: DataItem) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articles/${props.id}`);
  };

  return (
    <div
      key={`${props.id}-${props.slug}`}
      className="bg-white rounded-lg shadow mx-3 p-5 min-w-52 cursor-pointer"
      onClick={handleClick}
    >
      <h3>{props.title}</h3>
      <p>{props.slug}</p>
    </div>
  );
};

export default ArticleCard;
