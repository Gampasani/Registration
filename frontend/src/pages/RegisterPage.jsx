import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ full_name: "", email: "", password: "", confirmPassword: "", gender: "m", mobile_no: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { alert("Passwords do not match"); return; }
    const payload = { full_name: form.full_name, email: form.email, password: form.password, gender: form.gender, mobile_no: form.mobile_no };
    dispatch(registerUser(payload)).then((res) => { if (res.meta.requestStatus === "fulfilled") navigate("/dashboard"); });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm"><div className="card-body">
          <h3 className="mb-3">Create your account</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3"><label className="form-label">Full Name</label><input className="form-control" name="full_name" value={form.full_name} onChange={onChange} required /></div>
            <div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" name="email" value={form.email} onChange={onChange} required /></div>
            <div className="row">
              <div className="col-md-6 mb-3"><label className="form-label">Password</label><input type="password" className="form-control" name="password" value={form.password} onChange={onChange} required /></div>
              <div className="col-md-6 mb-3"><label className="form-label">Confirm Password</label><input type="password" className="form-control" name="confirmPassword" value={form.confirmPassword} onChange={onChange} required /></div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3"><label className="form-label">Gender</label>
                <select className="form-select" name="gender" value={form.gender} onChange={onChange}>
                  <option value="m">Male</option><option value="f">Female</option><option value="o">Other</option>
                </select>
              </div>
              <div className="col-md-6 mb-3"><label className="form-label">Mobile No</label><input className="form-control" name="mobile_no" value={form.mobile_no} onChange={onChange} required /></div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
          </form>
          <p className="mt-3 mb-0">Already have an account? <Link to="/login">Login</Link></p>
        </div></div>
      </div>
    </div>
  );
}
