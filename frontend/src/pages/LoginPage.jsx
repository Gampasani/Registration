import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: "john.doe@example.com", password: "password123" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); dispatch(loginUser(form)).then((res) => { if (res.meta.requestStatus === "fulfilled") navigate("/dashboard"); }); };
  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow-sm"><div className="card-body">
          <h3 className="mb-3">Login to your account</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" name="email" value={form.email} onChange={onChange} required /></div>
            <div className="mb-3"><label className="form-label">Password</label><input type="password" className="form-control" name="password" value={form.password} onChange={onChange} required /></div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          </form>
          <p className="mt-3 mb-0">Don't have an account? <Link to="/register">Register</Link></p>
        </div></div>
      </div>
    </div>
  );
}
