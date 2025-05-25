import { useState } from 'react';

const Form = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '+1',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const countries = [
    { code: 'US', name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
    { code: 'IN', name: 'India', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'] },
    { code: 'UK', name: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool'] },
    { code: 'CA', name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'] }
  ];

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+91', country: 'India' },
    { code: '+44', country: 'UK' },
    { code: '+33', country: 'France' },
    { code: '+49', country: 'Germany' }
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return !value.trim() ? `${name === 'firstName' ? 'First' : 'Last'} name is required` : '';
      
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'password':
        if (!value.trim()) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        return '';
      
      case 'phoneNumber':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) return 'Phone number must be 10 digits';
        return '';
      
      case 'country':
        return !value ? 'Country is required' : '';
      
      case 'city':
        return !value ? 'City is required' : '';
      
      case 'panNumber':
        if (!value.trim()) return 'PAN number is required';
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) return 'PAN number format: ABCDE1234F';
        return '';
      
      case 'aadharNumber':
        if (!value.trim()) return 'Aadhar number is required';
        if (!/^\d{12}$/.test(value.replace(/\D/g, ''))) return 'Aadhar number must be 12 digits';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'panNumber') {
      processedValue = value.toUpperCase();
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        country: value,
        city: ''
      }));
    }

    if (touched[name]) {
      const error = validateField(name, processedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateAllFields = () => {
    const newErrors = {};
    const newTouched = {};
    
    Object.keys(formData).forEach(field => {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return Object.keys(formData).every(field => {
      const error = validateField(field, formData[field]);
      return !error;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateAllFields()) {
      onSuccess(formData);
    }
  };

  const getCitiesForCountry = () => {
    const selectedCountry = countries.find(c => c.code === formData.country);
    return selectedCountry ? selectedCountry.cities : [];
  };

  return (
    <div className="container">
      <div className="form">
        <h2 className="title">Registration Form</h2>
        
        <div className="row">
          <div className="input-group">
            <label className="label">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`input ${errors.firstName && touched.firstName ? 'input-error' : ''}`}
            />
            {errors.firstName && touched.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>
          
          <div className="input-group">
            <label className="label">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`input ${errors.lastName && touched.lastName ? 'input-error' : ''}`}
            />
            {errors.lastName && touched.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className="input-group">
          <label className="label">Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`input ${errors.username && touched.username ? 'input-error' : ''}`}
          />
          {errors.username && touched.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        <div className="input-group">
          <label className="label">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`input ${errors.email && touched.email ? 'input-error' : ''}`}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="input-group">
          <label className="label">Password *</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`input password-input ${errors.password && touched.password ? 'input-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="input-group">
          <label className="label">Phone Number *</label>
          <div className="phone-container">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="country-code-select"
            >
              {countryCodes.map(cc => (
                <option key={cc.code} value={cc.code}>
                  {cc.code} ({cc.country})
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="1234567890"
              className={`input phone-input ${errors.phoneNumber && touched.phoneNumber ? 'input-error' : ''}`}
            />
          </div>
          {errors.phoneNumber && touched.phoneNumber && (
            <span className="error-message">{errors.phoneNumber}</span>
          )}
        </div>

        <div className="row">
          <div className="input-group">
            <label className="label">Country *</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`input ${errors.country && touched.country ? 'input-error' : ''}`}
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && touched.country && (
              <span className="error-message">{errors.country}</span>
            )}
          </div>
          
          <div className="input-group">
            <label className="label">City *</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={!formData.country}
              className={`input ${errors.city && touched.city ? 'input-error' : ''} ${!formData.country ? 'input-disabled' : ''}`}
            >
              <option value="">Select City</option>
              {getCitiesForCountry().map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && touched.city && (
              <span className="error-message">{errors.city}</span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <label className="label">PAN Number *</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="ABCDE1234F"
              maxLength={10}
              className={`input ${errors.panNumber && touched.panNumber ? 'input-error' : ''}`}
            />
            {errors.panNumber && touched.panNumber && (
              <span className="error-message">{errors.panNumber}</span>
            )}
          </div>
          
          <div className="input-group">
            <label className="label">Aadhar Number *</label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="123456789012"
              maxLength={12}
              className={`input ${errors.aadharNumber && touched.aadharNumber ? 'input-error' : ''}`}
            />
            {errors.aadharNumber && touched.aadharNumber && (
              <span className="error-message">{errors.aadharNumber}</span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className={`submit-button ${!isFormValid() ? 'submit-button-disabled' : ''}`}
        >
          Submit Registration
        </button>
      </div>
    </div>
  );
};

export default Form;