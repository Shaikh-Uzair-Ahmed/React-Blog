import React from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {Button,Input,Logo} from '../components'
import {useForm} from 'react-hook-form'
import {login as storeLogin} from '../store/authSlice'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register,handleSubmit} = useForm()
  const [error,setError] = React.useState('')

  const create = async(data)=>{
    setError('')
    try {
      const userData = await authService.createAccount(data)
      if(userData){
        const userData = await authService.getCurrentUser()
        if(userData) dispatch(storeLogin(userData))
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%'/>
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create an Account</h2>
                 <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Log In
                        </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input 
                        label="Full Name :"
                        placeholder="Enter your Full Name"
                        type='text'
                        {...register('name',{
                            required:true,
                        })}
                        />
                        <Input
                        label="Email :"
                        placeholder="Enter your email"
                        type='email'
                        {...register('email',{
                            required:true,
                            validate: {
                                matchPattern: (value)=> /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) 
                                || 'Enter Valid email address'
                            }
                        })}
                        />
                        <Input
                        label="Password :"
                        placeholder="Enter your password"
                        type='password'
                        {...register('password',{
                            required:true,
                            validate: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value) 
                            || 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'
                        })}
                        />
                        <Button type='submit' className='w-full'>
                        Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Signup