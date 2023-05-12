import { Col } from "react-bootstrap"

export const SearchbarComponent = () => {
    return (
        <Col xs={6} className="d-flex justify-content-center navbar-search">
            <input type="text" placeholder="Search movies by a keyword..." className="rounded-3"/>  
        </Col>
    )
}