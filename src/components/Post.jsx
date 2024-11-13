/* eslint-disable react/prop-types */
import { Card, CardText, CardTitle } from "reactstrap";

export default function Post({ title, content, date, children}) {
    return (
        <Card className="p-5 my-3">
            <CardTitle tag={"h4"}>{title}</CardTitle>
            <CardText>{content}</CardText>
            <CardText>{date}</CardText>
            {children}
        </Card>
    )
}