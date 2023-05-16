import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { INewsProps } from "../../interfaces/CommonInterfaces";

export const ProgramsNewsCard = ({ news }: INewsProps) => {
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
    <>
      <Card>
        <Card.Body className="card-block rounded pb-4">
          <div className="d-flex align-items-center mb-2 credits-container">
            <div className="card-credits-circle rounded-circle d-flex align-items-center justify-content-center me-2">
              <p className="m-0">{getAuthorInitials(news.author)}</p>
            </div>
            <span>
              <Card.Title>{news.title}</Card.Title>
              <h6 className="card-subtitle text-muted">
                {news.author + " - " + formatRedactDate(news.redactDate)}
              </h6>
            </span>
          </div>
          <Card.Text className="py-1 m-0 plot">{news.article}</Card.Text>
          <Link to="/programs" className="card-link">
            Read all
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};
