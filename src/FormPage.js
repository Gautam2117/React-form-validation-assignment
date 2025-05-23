import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhar: "",
};

const countries = {
  India: ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Hyderabad", "Pune", "Chennai"],
  USA: ["New York", "Los Angeles", "Chicago", "San Francisco", "Seattle"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
  UK: ["London", "Manchester", "Birmingham", "Glasgow"]
};

const FormPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validationErrors = validate(formData);
    setIsFormValid(Object.keys(validationErrors).length === 0);
    if (Object.keys(touched).length > 0) setErrors(validationErrors);
  }, [formData, touched]);

  const validate = (data) => {
    const newErrors = {};
    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!data.username.trim()) newErrors.username = "Username is required";
    if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Invalid email format";
    if (data.password.length < 6) newErrors.password = "Minimum 6 characters required";
    if (!/^\+\d{1,4}\d{10}$/.test(data.phone)) newErrors.phone = "Format: +CountryCode followed by 10 digits";
    if (!data.country) newErrors.country = "Country is required";
    if (!data.city) newErrors.city = "City is required";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pan)) newErrors.pan = "PAN should be in format: ABCDE1234F";
    if (!/^\d{12}$/.test(data.aadhar)) newErrors.aadhar = "Aadhar must be 12 numeric digits";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: formData });
    }
  };

  const renderInput = ({ name, label, type = "text", hint }) => (
    <div>
      <label className="block font-medium">{label}:</label>
      <input
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mt-1"
        placeholder={hint}
      />
      {hint && <p className="text-gray-500 text-xs italic">{hint}</p>}
      {touched[name] && errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">✨ Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {renderInput({ name: "firstName", label: "First Name" })}
        {renderInput({ name: "lastName", label: "Last Name" })}
        {renderInput({ name: "username", label: "Username" })}
        {renderInput({ name: "email", label: "Email", hint: "e.g., example@gmail.com" })}
        {renderInput({
          name: "phone",
          label: "Phone Number",
          hint: "Format: +91xxxxxxxxxx"
        })}
        {renderInput({
          name: "pan",
          label: "PAN Number",
          hint: "Format: ABCDE1234F"
        })}
        {renderInput({
          name: "aadhar",
          label: "Aadhar Number",
          hint: "12-digit numeric only"
        })}

        <div>
          <label className="block font-medium">Password:</label>
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Minimum 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 text-blue-500 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p className="text-gray-500 text-xs italic">Password must be at least 6 characters long.</p>
          {touched.password && errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">-- Select Country --</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {touched.country && errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">City:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">-- Select City --</option>
            {formData.country &&
              countries[formData.country].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {touched.city && errors.city && (
            <p className="text-red-500 text-sm">{errors.city}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 rounded font-semibold text-white text-lg transition ${
            isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
