/* eslint-disable react/prop-types */
import { Card, CardBody, CardText } from "reactstrap";
import female from "../assets/female.png";
import male from "../assets/male.png";
import CustomLink from "./CustomLink";

export default function ProfilCard({ user }) {
  const defaultProfilPicture = user.gender === "F" ? female : male;

  return (
    <Card className="mb-3">
      <CardBody className="d-flex">
        <div>
          <img
            src={
              user.profilPicture != null
                ? user.profilPicture
                : defaultProfilPicture
            }
            alt="Profile picture"
            className="img-thumbnail-fluid rounded-circle border-dark me-2"
            style={{ width: "30px", height: "30px" }}
          />
        </div>
        <CardText>
          <CustomLink to={`/users/${user.id}`}>{user.username}</CustomLink>
        </CardText>
      </CardBody>
    </Card>
  );
}
