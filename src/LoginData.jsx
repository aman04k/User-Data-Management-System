import React, { useState } from 'react';
import validator from 'validator';


const locationData = {
  india: {
    states: {
      "Uttar Pradesh": ["Jaunpur", "Varanasi", "Lucknow"],
      Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"]
    }
  },
  usa: {
    states: {
      California: ["Los Angeles", "San Francisco"],
      Texas: ["Houston", "Dallas"]
    }
  }
};

const LoginData = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
    gender: '',
    date: '',
    country: '',
    state: '',
    city: '',
  });

  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(-1);

  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: name === 'image' ? files[0] : value,
      ...(name === 'country' && { state: '', city: '' }),
      ...(name === 'state' && { city: '' }),
    }));
  };

  
  const validate = () => {
    const newErrors = {};
    if (!input.name) newErrors.name = 'Name is required';
    if (!input.email) newErrors.email = 'Email is required';
    else if (!validator.isEmail(input.email)) newErrors.email = 'Invalid email';
    if (!input.password) newErrors.password = 'Password is required';
    if (!input.image && isEditing === -1) newErrors.image = 'Image is required';
    if (!input.gender) newErrors.gender = 'Gender is required';
    if (!input.date) newErrors.date = 'Date is required';
    if (!input.country) newErrors.country = 'Country is required';
    if (!input.state) newErrors.state = 'State is required';
    if (!input.city) newErrors.city = 'City is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const imageURL = input.image ? URL.createObjectURL(input.image) : null;

    if (isEditing >= 0) {
      const updatedData = data.map((item, index) =>
        index === isEditing ? { ...input, image: imageURL || item.image } : item
      );
      setData(updatedData);
      setIsEditing(-1);
    }
    else{
      setData([...data, { ...input, image: imageURL }]);
    } 
    setInput({
      name: '',
      email: '',
      password: '',
      image: null,
      gender: '',
      date: '',
      country: '',
      state: '',
      city: '',
    });
    document.getElementById('imageUpload').value = ''; 
  }; 
  const Edit = (index) => {
    const entry = data[index];
    setInput({
      name: entry.name,
      email: entry.email,
      password: entry.password,
      image: null,
      gender: entry.gender,
      date: entry.date,
      country: entry.country,
      state: entry.state,
      city: entry.city,
    });
    setIsEditing(index);
  }; 
  const Delete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    alert('Delete successful');
  };

  const states = input.country ? Object.keys(locationData[input.country].states): [];
  const cities = input.state ? locationData[input.country].states[input.state] : [];

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name:
          <input type="text" name="name" value={input.name} onChange={handleChange} placeholder="Enter your name" />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </label>
        <br /><br />

        <label>
          Email:
          <input type="email" name="email" value={input.email} onChange={handleChange} placeholder="Enter your email" />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </label>
        <br /><br />

        <label>
          Gender:
          <select name="gender" value={input.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
        </label>
        <br /><br /><br />

        <label>
          Date:
          <input type="date" name="date" value={input.date} onChange={handleChange} />
          {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
        </label>
        <br /><br /><br />

        <label>
          Country:
          <select name="country" value={input.country} onChange={handleChange}>
            <option value="">Select Country</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
          </select>
          {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
        </label>
        <br /><br />

        {states.length > 0 && (
          <label>
            State:
            <select name="state" value={input.state} onChange={handleChange}>
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}
          </label>
        )}
        <br /><br />

        {cities.length > 0 && (
          <label>
            City:
            <select name="city" value={input.city} onChange={handleChange}>
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
          </label>
        )}
        <br /><br />

        <label>
          Password:
          <input type="password" name="password" value={input.password} onChange={handleChange} placeholder="Enter your password" />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </label>
        <br /><br /><br />

        <label>
          Image Upload:
          <input type="file" id="imageUpload" name="image" accept="image/*" onChange={handleChange} />
          {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>} <br />
          {input.image && <img src={URL.createObjectURL(input.image)} alt="Preview" style={{ width: '60px', height: '60px',  borderRadius: '50%'}} />}
        </label>
        <br /><br />

        <button type="submit">{isEditing >= 0 ? 'Update' : 'Submit'}</button>
      </form>

      {data.length > 0 && (
        <table border="1" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Gender</th>
              <th>Date</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>{entry.password}</td>
                <td>{entry.gender}</td>
                <td>{entry.date}</td>
                <td>{entry.country}</td>
                <td>{entry.state}</td>
                <td>{entry.city}</td>
                <td>
                  {entry.image && <img src={entry.image} width="120" height="120" alt="Uploaded" />}
                </td>
                <td>
                  <button onClick={() => Edit(index)}>Edit</button>
                  <button onClick={() => Delete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default LoginData;
