import "./Navbar.scss"
import avatar from "../../assets/imgs/avatar_placeholder.svg"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

export const UserCardComponent = () => {

    const user = useSelector((state: RootState) => state.user.data)

    return (
        <Col xs={2}>
            {user?.firstname ? (    
            <Link to={"#"}>
                <Card className="navbar-userCard p-1">
                    <Card.Body className="d-flex align-items-center justify-content-around p-0">
                        <img src={avatar} alt="user-pic" height={45} width={45} className="userCard-pic"/>
                        <div className="userCard-data">
                            <Card.Title className="userCard-title">AleOnta</Card.Title>
                            <Card.Text className="userCard-paragraphs">
                                <p>{`${user.firstname} ${user.lastname}`}</p>
                                <p>{user.email}</p>
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
            ) : 
            <div className="d-flex ">
                <h5 className="navbar-userLinks"><Link to="#">Sign-up</Link></h5>
                <h5 className="px-2 divider"> | </h5>
                <h5 className="navbar-userLinks"><Link to="#">Login</Link></h5>
            </div>
            }
        </Col>
    )
}
