import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function SignUpPage() {
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password must be same').required('Required'),
        }),
        onSubmit: (values) => {
            setSuccessMessage('Sign up Successfull');
            navigate('/');
            console.log(values);    
        }
    });

    const checkPasswordStrength = (password: string) => {
        if(password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)){
            return 'Strong';
        }else if(password.length >= 6){
            return 'Medium';
        }
        return 'Weak';
    };


    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign Up</h2>
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
            <div className="text-sm mt-2">Password Strength: {checkPasswordStrength(formik.values.password)}</div>

            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mt-4">
                Confirm Password
            </label>
            <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
            ) : null}

            <button
                type="submit"
                className="w-full mt-4 p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
                Sign Up
            </button>
            {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
            
            <p className="mt-4 text-sm text-center">
                Already have an account? <Link to="/" className="text-blue-500 underline">Login here</Link>
            </p>
        </form>

    )
}

export default SignUpPage
