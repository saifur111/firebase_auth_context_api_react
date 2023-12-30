import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Header = () => {
    const {user,logOut}=useUserContext();
  return (
    <div className="navbar bg-primary text-primary-content">
      <Link to="/" className="">
      &nbsp; HALAL JIBIKA &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
      </Link>
      <Link className="" to="/">
      &nbsp; Home |&nbsp;
      </Link>
      <Link className="" to="/jobs">
      &nbsp; Jobs | &nbsp;
      </Link>
      {user?.email && <span>Welcome, {user.email}</span>}
      {user?.email && <span>User Id : , {user.uid}</span>}
      {user?.email ? (
        <button onClick={logOut} className="button">
          Log Out
        </button>
      ) : (
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
      )}
    </div>
  );
};

export default Header;
