import "./UserPage.scss";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { UserTicketCard } from "./sections/UserTicketCard";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { ITicket } from "../../interfaces/iTicket";

export const UserPageComponent = () => {
  const ticketURL = "http://localhost:8080/api/tickets";
  const [userTickets, setUserTickets] = useState<ITicket[] | null>(null);
  const userStore = useSelector((state: RootState) => state.user.logged_in);

  const getUserTickets = async () => {
    await axios
      .get(`${ticketURL}/user_id/${userStore?.id}`)
      .then((response) => {
        const data = response.data;
        setUserTickets(data);
      })
      .catch((_err) => {
        if (axios.isAxiosError(_err)) {
          console.log(_err.message);
          console.log(_err.response?.status);
        }
      });
  };

  useEffect(() => {
    getUserTickets();
  }, []);
  return (
    <Row className="mt-5 d-flex justify-content-center">
      <Col xs={11} className="mt-3 py-5 user-col-container rounded">
        <Container>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Your Tickets</Accordion.Header>
              <Accordion.Body>
                <Row className="user-ticket-container">
                  {userTickets &&
                    userTickets.map((ticket) => (
                      <UserTicketCard ticket={ticket} key={ticket.id} />
                    ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Personal Info</Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Preferences</Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </Col>
    </Row>
  );
};
