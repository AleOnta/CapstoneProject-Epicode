import "./ProgramsPage.scss";
import { Card, Col, Row } from "react-bootstrap";
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
    <Card className="programs-news-card mb-3">
      <Row className="d-flex aling-items-center m-0">
        <Col
          xs={2}
          className="p-0 ps-2 d-flex align-items-center justify-content-center"
        >
          <div className="auth-credits-circle d-flex aling-items-center justify-content-center">
            <p className="m-0 d-flex align-items-center">
              {getAuthorInitials(news.author)}
            </p>
          </div>
        </Col>
        <Col xs={10} className="py-2">
          <div>
            <Card.Title className="mb-1">{news.title}</Card.Title>
            <Card.Subtitle>
              {`${formatRedactDate(news.redactDate)} - ${news.author}`}
            </Card.Subtitle>
            <Card.Text>{news.article}</Card.Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
