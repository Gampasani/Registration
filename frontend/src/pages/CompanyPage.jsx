import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies, createCompany, updateCompany, deleteCompany } from "../features/company/companySlice";

export default function CompanyPage() {
  const dispatch = useDispatch();
  const { companies, loading, error } = useSelector((s) => s.company);
  const { user } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    id: null, company_name: "", address: "", city: "", state: "", country: "",
    postal_code: "", website: "", logo_url: "", banner_url: "",
    industry: "", founded_date: "", description: "",
  });

  useEffect(() => { dispatch(fetchCompanies()); }, [dispatch]);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const clear = () => setForm({ id: null, company_name: "", address: "", city: "", state: "", country: "", postal_code: "", website: "", logo_url: "", banner_url: "", industry: "", founded_date: "", description: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      dispatch(updateCompany(form)).then(() => clear());
    } else {
      dispatch(createCompany(form)).then(() => clear());
    }
  };

  const startEdit = (c) => setForm({
    id: c.id, company_name: c.company_name || "", address: c.address || "", city: c.city || "",
    state: c.state || "", country: c.country || "", postal_code: c.postal_code || "",
    website: c.website || "", logo_url: c.logo_url || "", banner_url: c.banner_url || "",
    industry: c.industry || "", founded_date: c.founded_date ? c.founded_date.split("T")[0] : "",
    description: c.description || "",
  });

  const remove = (id) => { if (window.confirm("Delete this company?")) dispatch(deleteCompany(id)); };

  return (
    <div className="row">
      <div className="col-md-5">
        <div className="card shadow-sm mb-3"><div className="card-body">
          <h5 className="mb-3">{form.id ? "Edit Company" : "Create Company"}</h5>
          <form onSubmit={onSubmit}>
            <div className="mb-2"><label className="form-label">Company Name</label><input className="form-control" name="company_name" value={form.company_name} onChange={onChange} required /></div>
            <div className="mb-2"><label className="form-label">Industry</label><input className="form-control" name="industry" value={form.industry} onChange={onChange} required /></div>
            <div className="mb-2"><label className="form-label">Address</label><input className="form-control" name="address" value={form.address} onChange={onChange} /></div>
            <div className="row">
              <div className="col-md-6 mb-2"><label className="form-label">City</label><input className="form-control" name="city" value={form.city} onChange={onChange} /></div>
              <div className="col-md-6 mb-2"><label className="form-label">State</label><input className="form-control" name="state" value={form.state} onChange={onChange} /></div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2"><label className="form-label">Country</label><input className="form-control" name="country" value={form.country} onChange={onChange} /></div>
              <div className="col-md-6 mb-2"><label className="form-label">Postal Code</label><input className="form-control" name="postal_code" value={form.postal_code} onChange={onChange} /></div>
            </div>
            <div className="mb-2"><label className="form-label">Website</label><input className="form-control" name="website" value={form.website} onChange={onChange} /></div>
            <div className="mb-2"><label className="form-label">Founded Date</label><input type="date" className="form-control" name="founded_date" value={form.founded_date} onChange={onChange} /></div>
            <div className="mb-2"><label className="form-label">Description</label><textarea className="form-control" name="description" value={form.description} onChange={onChange} rows="3" /></div>
            <button className="btn btn-primary" type="submit">{form.id ? "Update" : "Create"}</button>
            {form.id && <button type="button" className="btn btn-secondary ms-2" onClick={clear}>Cancel</button>}
          </form>
        </div></div>
      </div>
      <div className="col-md-7">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">All Companies</h5>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => dispatch(fetchCompanies())}>Refresh</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-responsive">
          <table className="table table-striped">
            <thead><tr><th>Name</th><th>Industry</th><th>City</th><th>Country</th><th>Actions</th></tr></thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id}>
                  <td>{c.company_name}</td><td>{c.industry}</td><td>{c.city}</td><td>{c.country}</td>
                  <td>{user && c.owner_id === user.id ? (<>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(c)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => remove(c.id)}>Delete</button>
                  </>) : (<span className="text-muted">Read Only</span>)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
