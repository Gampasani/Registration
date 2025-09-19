import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  return (
    <div className="card shadow-sm"><div className="card-body">
      <h3 className="mb-3">Dashboard</h3>
      {user ? (<>
        <p><strong>Name:</strong> {user.full_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile_no}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <div className="d-flex gap-2">
          <Link to="/company" className="btn btn-outline-primary">Manage Company</Link>
          <button className="btn btn-outline-danger" onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
      </>) : (<p>Please login.</p>)}
    </div></div>
  );
}
