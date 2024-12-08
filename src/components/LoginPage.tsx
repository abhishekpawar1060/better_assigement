import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('rememberedEmail') || '',
      password: '',
      rememberMe: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      setSuccessMessage('Login Successful');
      console.log(values);
      if (values.rememberMe) {
        localStorage.setItem('rememberedEmail', values.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    }
  });
    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
            >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <input
                id="email"
                name="email"
                type="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}

            <label className="inline-flex items-center mt-4">
                <input
                type="checkbox"
                name="rememberMe"
                className="form-checkbox text-blue-500"
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
                />
                <span className="ml-2 text-gray-700">Remember Me</span>
            </label>

            <button
                type="submit"
                className="w-full mt-4 p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
                Login
            </button>
            {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
            
            <p className="mt-4 text-sm text-center">
                New user? <Link to="/signup" className="text-blue-500 underline">Register here</Link>
            </p>
        </form>

    )
}

export default LoginPage
