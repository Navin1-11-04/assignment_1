import React from "react";

const Success = ({ formData, onBackToForm }) => {
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'IN', name: 'India' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' }
  ];

  const getCountryName = (countryCode) => {
    const country = countries.find(c => c.code === countryCode);
    return country ? country.name : countryCode;
  };

  return (
    <div className="container">
      <div className="success-card">
        <h2 className="success-title">Registration Successful!</h2>
        <div className="details-grid">
          <div className="detail-item">
            <strong>First Name:</strong> {formData.firstName}
          </div>
          <div className="detail-item">
            <strong>Last Name:</strong> {formData.lastName}
          </div>
          <div className="detail-item">
            <strong>Username:</strong> {formData.username}
          </div>
          <div className="detail-item">
            <strong>Email:</strong> {formData.email}
          </div>
          <div className="detail-item">
            <strong>Phone:</strong> {formData.countryCode} {formData.phoneNumber}
          </div>
          <div className="detail-item">
            <strong>Country:</strong> {getCountryName(formData.country)}
          </div>
          <div className="detail-item">
            <strong>City:</strong> {formData.city}
          </div>
          <div className="detail-item">
            <strong>PAN Number:</strong> {formData.panNumber}
          </div>
          <div className="detail-item">
            <strong>Aadhar Number:</strong> {formData.aadharNumber}
          </div>
        </div>
        <button 
          onClick={onBackToForm}
          className="back-button"
        >
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default Success;