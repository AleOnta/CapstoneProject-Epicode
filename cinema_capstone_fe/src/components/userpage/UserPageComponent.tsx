import "./UserPage.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { UserForm } from "./sections/UserForm";
import { AiOutlineHome } from "react-icons/ai";
import { ITicket } from "../../interfaces/iTicket";
import { UserTicketCard } from "./sections/UserTicketCard";
import { UserPreferences } from "./sections/UserPreferences";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";

export const UserPageComponent = () => {
  const navigate = useNavigate();
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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getUserTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="mt-5 d-flex justify-content-center">
      <Col xs={11} className="mt-3 py-5 user-col-container rounded ">
        <Container>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Personal Info</Accordion.Header>
              <Accordion.Body>
                <p>In this section you can update your account informations:</p>
                <Row>
                  <UserForm />
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
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
            <Accordion.Item eventKey="2">
              <Accordion.Header>Preferences</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <UserPreferences />
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="d-flex justify-content-center">
            <Button
              type="button"
              className="btn mt-5 btn-block btn-round user-home-button user-btn"
              onClick={() => navigate("/home")}
            >
              <span className="span-tag">Get back to homepage</span>
              <div className="icon icon-round d-flex align-items-center justify-content-center">
                <AiOutlineHome className="card-btn-icon fs-5" />
              </div>
            </Button>
          </div>
        </Container>
      </Col>
    </Row>
  );
};
