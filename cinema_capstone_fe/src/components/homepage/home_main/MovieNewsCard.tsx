import "./HomeMain.scss";
import { Card } from "react-bootstrap";
import { INewsProps } from "../../../interfaces/CommonInterfaces";
import { Link } from "react-router-dom";

export const MovieNewsCard = ({ news }: INewsProps) => {
  const formatRedactDate = (redactDate: Date) => {
    let convertedDate = new Date(redactDate).toISOString().slice(0, 10);
    return convertedDate;
  };

  const getAuthorInitials = (author: string) => {
    const authorArray: string[] = author.split(" ");
    let toReturn: string = "";
    authorArray.forEach((str) => (toReturn += str.substring(0, 1)));
    if (toReturn.length <= 2) {
      return toReturn;
    } else {
      toReturn = toReturn.substring(0, 1) + toReturn.substring(2, 3);
      return toReturn;
    }
  };

  return (
    <Card text="dark" className=" card-newsContainer">
      <Link to="/">
        <Card.Header className="d-flex align-items-center">
          <div className="card-credits-circle rounded-circle d-flex align-items-center justify-content-center">
            <p className="m-0">{getAuthorInitials(news.author)}</p>
          </div>
          <span className="news-credits-container">
            <div className="d-flex justify-content-between news-credits">
              <Card.Text className="news-author mb-0">{news.author}</Card.Text>

              <Card.Text className="news-date">
                {formatRedactDate(news.redactDate)}
              </Card.Text>
            </div>
            <h5 className="news-title p-0 pt-1 m-0">{news.title}</h5>
          </span>
        </Card.Header>
      </Link>
      <Card.Body className="py-3">
        <Card.Text className="news-article">{news.article}</Card.Text>
      </Card.Body>
    </Card>
  );
};
