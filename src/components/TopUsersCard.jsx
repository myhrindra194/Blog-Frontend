import { useEffect, useState } from "react";
import { URL_API } from "../utils/url";
import CustomSpinner from "./CustomSpinner";
import ProfilCard from "./ProfilCard";

export default function TopUsersCard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${URL_API}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  });

  return (
    <div className="col-3 d-none d-md-block">
      <h4 className="mb-4">Top users</h4>
      {users.length === 0 ? (
        <CustomSpinner />
      ) : (
        <div>
          {users
            .filter((user) => user.profilPicture != null)
            .map((user) => (
              <ProfilCard key={user.id} user={user} />
            ))}{" "}
        </div>
      )}
    </div>
  );
}
