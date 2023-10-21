import React, { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useAuth"; // Import your custom hooks for login and theming
import { useColors } from "../../hooks/useColors";
import { ClassNames } from "../../utilities/util";
import { CircleSpinner } from "../../components/loading";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onLogin: () => void;
  loading: boolean;
}

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useLogin();
  const { body } = useColors();

  useEffect(() => {
    document.body.style.background = "#f3f4f6";
    return () => (document.body.style.background = body.primary);
    //eslint-disable-next-line
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Perform login with email and password
      const credentials = { email, password };
      await login(credentials);
      // Handle successful login
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center items-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
            className='mx-auto h-24 w-auto'
            src='https://res.cloudinary.com/emerging-it/image/upload/v1697923562/Growb/nbj932fhmcgeqahmn9x1.png'
            alt='Your Company'
          />
          <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onLogin={handleLogin}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  loading,
}) => {
  return (
    <div className=' px-6 py-12 shadow sm:rounded-lg sm:px-12 bg-white'>
      <form className='space-y-6' action='#' method='POST'>
        <div>
          <label
            htmlFor='email'
            className='block text-left text-sm font-medium leading-6 text-gray-900'>
            Email address
          </label>
          <div className='mt-2'>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='off'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='block w-full px-2 bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-left text-sm font-medium leading-6 text-gray-900'>
            Password
          </label>
          <div className='mt-2'>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='off'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full px-2 bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <button
            type='button'
            onClick={() => onLogin()}
            disabled={loading || !email || !password}
            className={ClassNames(
              "flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm",
              loading || !email || !password
                ? "bg-gray-300 text-gray-800"
                : " bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            )}>
            <div className='flex items-center justify-center'>
              <span className='text-sm font-semibold leading-6  mr-1'>
                {loading ? "Signing in" : "Sign in"}
              </span>
              {loading && <CircleSpinner />}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
