// Login.js
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useContext } from 'react';
import { Oval } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { togglePasswordVisibility } from '../utils/utils';
import { UserContext } from '../components/UserProvider';

export default function Login({ setRole }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access setUser from context

  const validation = yup.object({
    email: yup.string().required('Email is required').email('Email is not valid'),
    password: yup.string().required('Password is required'),
  });

  async function sendDataToLogin(values) {
    setLoading(true);
    try {
      const response = await axios.post('https://agr-backend-m85q.onrender.com/api/auth/login', values);
      const data = response.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('user', JSON.stringify(data)); // Store user data in localStorage

      toast.success('Welcome To Home Page', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      setUser(data); // Store user data in context
      setRole('user');
      navigate('/userDashboard');
    } catch (err) {
      setLoading(false);
      setError('Email or password is not valid');
      toast.error('Email or password is not valid', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: sendDataToLogin,
  });

  function changeBgLogin() {
    document.getElementById('change').classList.add('auth');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-5 md:py-0" style={{ background: 'linear-gradient(to right, #3B82F6, #4C1D95)' }}>
      <div className="container mx-auto flex justify-center items-center ">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white rounded-lg shadow-lg">
          <div className="px-8 py-8">
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">Login Now</h1>
            <form onSubmit={formik.handleSubmit}>
              {error ? <p className="text-center text-red-500 mb-4">{error}</p> : ''}
              <input
                type="email"
                className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                placeholder="Enter Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? <p className="text-red-500 mb-4">{formik.errors.email}</p> : ''}
              <div className="relative">
                <input
                  id="password-input"
                  type="password"
                  className="w-full bg-gray-200 rounded-lg py-3 px-4 mb-4"
                  placeholder="Enter Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <i onClick={() => togglePasswordVisibility()} className="absolute top-0 right-0 mt-3 mr-4 cursor-pointer fas fa-eye-slash"></i>
              </div>
              {formik.errors.password && formik.touched.password ? <p className="text-red-500 mb-4">{formik.errors.password}</p> : ''}
              <button
                onClick={() => changeBgLogin()}
                id="change"
                type="submit"
                className="w-full bg-blue-500 rounded-lg text-white py-3 font-bold transition duration-300 ease-in-out hover:bg-blue-600 mb-4"
              >
                {loading ? (
                  <div className="flex justify-center">
                    <Oval
                      height={30}
                      width={30}
                      color="#fff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#86b7fe"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  </div>
                ) : (
                  'Login'
                )}
              </button>

              <div className="text-center mb-4">
                <Link to="/forgotPassword" className="text-blue-500 hover:underline">
                  Forgot Password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="text-center text-white mt-3">
        <p>
          Need An Account?{' '}
          <Link to="/userRegister" className="font-bold hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}
