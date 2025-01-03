/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'

const UpdateJob = () => {
  const {user} = useContext(AuthContext);
  const {id} = useParams();
  const navigate = useNavigate()
  // const [startDate, setStartDate] = useState(new Date());

  const [job, setJob] = useState({});

  const allJobsData = async() =>{
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/job/${id}`)
    setJob(data);
    // setStartDate(new Date(data.deadline))
  }

  useEffect(()=>{
    allJobsData()
  },[])

  const handleSubmit = async e => {
    e.preventDefault();
    const title = e.target.job_title.value;
    const email = e.target.email.value;
    const deadline = e.target.deadline.value;
    const category = e.target.category.value;
    const min_price = e.target.min_price.value;
    const max_price = e.target.max_price.value;
    const description = e.target.description.value;
    // console.log(title, email, deadline, category, min_price, max_price, description);
    const addJobData = {
      title,
      buyer: {
        email,
        name: user?.displayName,
        photoUrl: user?.photoURL
      },
      deadline,
      category,
      min_price,
      max_price,
      description,
      bid_count: "0",
    }
    console.log(addJobData);
    // console.log(import.meta.env.VITE_API_URL);
    try{
      const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/update/${id}`,addJobData)
      if(data.modifiedCount > 0){
        toast.success('Add your job successfully.')
        navigate('/myPostedJobs')
      }
    }catch(err){
      toast.error(err.message);
    }
  }

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md '>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Update a Job
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='job_title'>
                Job Title
              </label>
              <input
                id='job_title'
                name='job_title'
                type='text'
                defaultValue={job.title}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                disabled
                value={job.buyer?.email}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>
              <input
                name='deadline'
                type='date'
                defaultValue={job.deadline}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

           {job.category &&(
             <div className='flex flex-col gap-2 '>
             <label className='text-gray-700 ' htmlFor='category'>
               Category
             </label>
             <select
               name='category'
               id='category'
               className='border p-2 rounded-md'
               defaultValue={job.category}
             >
               <option value='Web Development'>Web Development</option>
               <option value='Graphics Design'>Graphics Design</option>
               <option value='Digital Marketing'>Digital Marketing</option>
             </select>
           </div>
           )}
            <div>
              <label className='text-gray-700 ' htmlFor='min_price'>
                Minimum Price
              </label>
              <input
                id='min_price'
                name='min_price'
                type='number'
                defaultValue={job.min_price}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='max_price'>
                Maximum Price
              </label>
              <input
                id='max_price'
                name='max_price'
                type='number'
                defaultValue={job.max_price}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-gray-700 ' htmlFor='description'>
              Description
            </label>
            <textarea
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              id='description'
              defaultValue={job.description}
              cols='30'
            ></textarea>
          </div>
          <div className='flex justify-end mt-6'>
            <button className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default UpdateJob
