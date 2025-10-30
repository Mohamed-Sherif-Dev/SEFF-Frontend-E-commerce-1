// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const Register = () => {
//   const navigate = useNavigate()
//   const [form , setForm] = useState({
//     name: "",
//     email:"",
//     phone:"",
//     password:"",
//     confirm:""
//   });
//   const [errors , setErrors] = useState({});

//   const handelChange = (e) =>{
//     setForm({...form, [e.target.name]: e.target.value})
//   };

//   const validate = () => {
//     const newErrors = {}
//     if(!form.name.trim()) newErrors.name = "Full is required";
//     if(!form.email.includes("@")) newErrors.email = "Invalid email format";
//     if(!/^[0-9]{10,15}$/.test(form.phone)) newErrors.phone = "Phone must be 10-15 digist";
//     if(!form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
//     if(!form.password !== form.confirm) newErrors.confirm = "Password do not match";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handelSubmit = (e) =>{
//     e.preventDefault();
//     if(!validate()) return;

//     const userData = {
//       name: form.name,
//       email: form.email,
//       phone: form.phone,
//       password: form.password
//     }
//     localStorage.setItem("attar-user" , JSON.stringify(userData));
//     alert("Registration successful! Please login");
//     navigate("/login")
//   };
//   return (
//     <div className='mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-12'>
//       <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
//       <p className='mt-1 text-sm text-gray-600'>
//         Please fill in your details to register.
//       </p>

//       <form action="" onSubmit={handelSubmit} className='mt-6 space-y-4'>
//         <div>
//           <label htmlFor="" className='block text-sm font-medium text-gray-700'>Full Name</label>
//           <input 
//           name='name'
//           className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900'
//           value={form.name}
//           onChange={handelChange}
//           />
//           {errors.name && <p className='text-sm text-red-600'>{errors.name}</p>}
//         </div>
//         <div>
//           <label htmlFor="" className='block text-sm font-medium text-gray-700'>Email</label>
//           <input 
//           name='email'
//           type='email'
//           className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900'
//           value={form.email}
//           onChange={handelChange}
//           />
//           {errors.email && <p className='text-sm text-red-600'>{errors.email}</p>}
//         </div>
//         <div>
//           <label htmlFor="" className='block text-sm font-medium text-gray-700'>Phone</label>
//           <input 
//           name='phone'
//           className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900'
//           value={form.phone}
//           onChange={handelChange}
//           />
//           {errors.phone && <p className='text-sm text-red-600'>{errors.phone}</p>}
//         </div>
//         <div>
//           <label htmlFor="" className='block text-sm font-medium text-gray-700'>Password</label>
//           <input 
//           name='password'
//           type='password'
//           className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900'
//           value={form.password}
//           onChange={handelChange}
//           />
//           {errors.password && <p className='text-sm text-red-600'>{errors.password}</p>}
//         </div>
//         <div>
//           <label htmlFor="" className='block text-sm font-medium text-gray-700'>Confirm Password</label>
//           <input 
//           name='confirm'
//           type='password'
//           className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900'
//           value={form.confirm}
//           onChange={handelChange}
//           />
//           {errors.confirm && <p className='text-sm text-red-600'>{errors.confirm}</p>}
//         </div>

//         <button 
//         type='submit'
//         className='w-full py-2 rounded-md bg-gray-900 text-white font-medium hover:opacity-90'
//         >Register</button>

//         <p className="text-sm text-gray-600 text-center">
//           Already have an account?{" "}
//           <Link to="/login" className='text-gray-600 font-medium underline'>
//           Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   )
// }

// export default Register

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.includes("@")) newErrors.email = "Invalid email format.";
    if (!/^[0-9]{10,15}$/.test(form.phone))
      newErrors.phone = "Phone must be 10-15 digits.";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirm)
      newErrors.confirm = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
    };

    localStorage.setItem("attar-user", JSON.stringify(userData));

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
      <p className="mt-1 text-sm text-gray-600">
        Please fill in your details to register.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 border border-gray-900 p-6 rounded-lg shadow-lg">
        <div>
          <label htmlFor="name" className="block  text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            autoComplete="new-password"
            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
            value={form.confirm}
            onChange={handleChange}
          />
          {errors.confirm && <p className="text-sm text-red-600">{errors.confirm}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-gray-900 text-white font-medium hover:opacity-90"
        >
          Register
        </button>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-900 font-medium underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;