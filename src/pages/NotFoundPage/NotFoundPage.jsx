import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <button className={css.buttonBack} type="button">
        <Link to="/" className={css.linkBack}>
          <FaCircleArrowLeft className={css.icon} />
          Go back
        </Link>
      </button>
    </div>
  );
}
