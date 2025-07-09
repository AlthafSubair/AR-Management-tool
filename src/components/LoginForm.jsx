
import { Eye, EyeOff } from 'lucide-react';
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { callCahce, Login } from '../services/services';
import useCacheStore from '../store/cacheStore';

const LoginForm = () => {

  // state for handling login data

  const [formData, setFormData] = useState({
    clinicId: 0,
    password: "",
    userName: ""
  });
  
// state for toggling password visiblity
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

   const navigate = useNavigate();

  //  Zustand store

   const {setLogin} = useAuthStore();
   const {setCache} = useCacheStore();

  //  fn for handling input change

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(errorMsg){
      setErrorMsg("")
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // form submission

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {

      // calling login fn in services.js

      const response = await Login(formData)

      const loginData = response.data?.data;

      // checking the login is success or not
     
      if(!loginData.accessToken){
         setErrorMsg("Invalid Credentails") // if not setting error msg
      }else{

        const {userId, fullName, clinicId, roles, accessToken, refreshToken} = loginData

        // setting store with login response data

        setLogin({userId, fullName, clinicId, roles, accessToken, refreshToken});

        // calling cache api from service.js
        
       const cache = await callCahce();

       const {clinicDtoList, logTypeList, payorPortalList, posList, sensitivityList, statusList, tosList, userDtoList} = cache.data?.data;

       console.log(cache.data?.data)
      
       setCache(clinicDtoList, statusList) // setting clinic data in store

        navigate('/home'); // redirecting to home 

      }
 
    } catch (error) {
      //  handling errors 
      if (error.response) {
        setErrorMsg(
          error.response.data.detail || "Invalid credentials. Please try again."
        );
      } else {
        console.log(error)
        setErrorMsg("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className=''>

    <h1 className='text-center mb-12 pt-4 sm:text-3xl text-4xl font-semibold text-slate-800'>AR Management Tool</h1>
      

     <div className='shadow-lg sm:px-10 px-4 sm:py-8 py-4 rounded-md flex flex-col gap-4 border border-slate-200 mx-4'>

      <div className='flex flex-col gap-2 sm:my-6'>
        <h1 className='text-center sm:text-4xl text-2xl text-primary font-semibold'>Welcome</h1>
        <p className='text-sm text-center text-slate-600'>Login to your account to continue</p>
      </div>

      {/* Form */}

       <form className='flex flex-col' onSubmit={onSubmit}>

        {/* Username field */}

        <div className="relative mb-6">
          <input 
          type="text" 
          id="username" 
          name='userName' 
          value={formData.userName}
          onChange={handleChange}
          placeholder=" "
          required
          pattern='^[a-zA-Z0-9_]{4,20}$'
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer ${errorMsg && "border border-red-600"}`} />
          <label 
          htmlFor="username" 
          className="floating_label"
          >
            Username
            </label>
        </div>

        {/* Password field */}

        <div className="relative w-full max-w-sm">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=" "
            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$'
            required
            className={`peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-0  ${errorMsg && 'border border-red-600'}`}
          />
          <label
            htmlFor="password"
            className="floating_label"
          >
            Password
          </label>

        {/* password visbility toggling */}

          <div className="absolute top-4 right-4 cursor-pointer">
            {showPassword ?
             <EyeOff onClick={() => setShowPassword(prev => !prev)} className='text-slate-500' size={20} /> : 
             <Eye onClick={() => setShowPassword(prev => !prev)} className='text-slate-500' size={20} />
             }
          </div>
        </div>

        {/* Error msgs while logging in */}

        <div className='pt-1'>
          {
            errorMsg && <p className='text-sm text-red-600'>{errorMsg}</p>
          }
        </div>

          {/* Login button */}

        <div className='py-6'>
          <button
           disabled={isLoading}
            className='bg-primary text-white rounded-lg w-full px-4 py-3 text-lg font-semibold hover:bg-white hover:text-primary hover:border hover:border-prtext-primary '>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>

      </form>
     
     {/* Forgot Password */}

      <div className='flex items-center justify-center flex-col gap-1'>
        <h2 className='text-slate-700'>Forgot your password?</h2>
        <small className=' text-slate-600 text-sm text-center'>Contact account manager to reset password</small>
      </div>
</div>
    </div>
  )
}

export default LoginForm