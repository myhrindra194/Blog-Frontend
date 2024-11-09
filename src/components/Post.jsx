/* eslint-disable react/prop-types */
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardText, CardTitle } from "reactstrap";

export default function Post({userId, title, body}) {
    return (
        <Card className="p-5 my-3">
            <CardTitle tag={"h4"}>{title}</CardTitle>
            <CardText>{body}</CardText>
            <CardText>
                <FontAwesomeIcon icon={faUserCircle} />
                <span className="text-muted ms-2">User {userId}</span>
            </CardText>
        </Card>
    )
}