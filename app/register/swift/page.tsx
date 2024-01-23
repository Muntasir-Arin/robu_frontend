'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'



const FormDataSchema = z.object({
  name: z.string(),
  date_of_birth: z.string(),
  phone_number: z.string(),
  org: z.string(),
  blood_group: z.string(),
  gender: z.string(),
  facebook_profile: z.string(),
  insta_link: z.string().nullable(),
  linkedin_link: z.string().nullable(),
  bracu_start: z.string(),
  student_id: z.string(),
  rs_status: z.string(),
  secondary_email: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  zip: z.string()
});


type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: [
      'name',
      'date_of_birth',
      'phone_number',
      'org',
      'blood_group',
      'gender',
      'facebook_profile',
      'insta_link',
      'linkedin_link',
      'bracu_start',
      'student_id',
      'rs_status',
      'secondary_email'
    ]
  },
  {
    id: 'Step 2',
    name: 'Address',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  { 
    id: 'Step 3',
    name: 'Complete',
    fields: []
  }
];

export default function QuickReg() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  });

  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length ) {
      if (currentStep === steps.length - 1) {
        await handleSubmit(processForm)()
      }else{setCurrentStep(step => step + 1)}
      setPreviousStep(currentStep)
      
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between px-16 py-7 md:py-12'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='flex space-x-8 space-y-0 '>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='size-[5rem] group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='size-[5rem] flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='  size-[5rem] group flex  w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm  font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-3 pb-12' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
  Personal Information
</h2>
<p className='mt-1 text-sm leading-6 text-gray-600'>
  Provide your personal details.
</p>
<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
  <div className='sm:col-span-3'>
    <label
      htmlFor='name'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      Full Name
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='name'
        required
        {...register('name')}
        className='block w-full '
      />
      {errors.name?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.name.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='date_of_birth'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      Date of Birth
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='date_of_birth'
        {...register('date_of_birth')}
        className='block w-full '
      />
      {errors.date_of_birth?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.date_of_birth.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='phone_number'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      Phone Number
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='phone_number'
        {...register('phone_number')}
        className='block w-full '
      />
      {errors.phone_number?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.phone_number.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='org'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      Organization
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='org'
        {...register('org')}
        className='block w-full '
      />
      {errors.org?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.org.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='blood_group'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      Blood Group
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='blood_group'
        {...register('blood_group')}
        className='block w-full '
      />
      {errors.blood_group?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.blood_group.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='gender'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      Gender
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='gender'
        {...register('gender')}
        className='block w-full '
      />
      {errors.gender?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.gender.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='facebook_profile'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      Facebook Profile
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='facebook_profile'
        {...register('facebook_profile')}
        className='block w-full '
      />
      {errors.facebook_profile?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.facebook_profile.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='insta_link'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      Instagram Link
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='insta_link'
        {...register('insta_link')}
        className='block w-full '
      />
      {errors.insta_link?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.insta_link.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='linkedin_link'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      LinkedIn Link
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='linkedin_link'
        {...register('linkedin_link')}
        className='block w-full '
      />
      {errors.linkedin_link?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.linkedin_link.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='bracu_start'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      BRACU Start
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='bracu_start'
        {...register('bracu_start')}
        className='block w-full '
      />
      {errors.bracu_start?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.bracu_start.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='student_id'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      Student ID
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='student_id'
        {...register('student_id')}
        className='block w-full '
      />
      {errors.student_id?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.student_id.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='rs_status'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      RS Status
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='rs_status'
        {...register('rs_status')}
        className='block w-full '
      />
      {errors.rs_status?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.rs_status.message}
        </p>
      )}
    </div>
  </div>

  <div className='sm:col-span-3'>
    <label
      htmlFor='secondary_email'
      className='block text-sm font-medium leading-6 text-gray-900'
    >
      Secondary Email
    </label>
    <div className='mt-2'>
      <Input
        type='text'
        id='secondary_email'
        {...register('secondary_email')}
        className='block w-full '
      />
      {errors.secondary_email?.message && (
        <p className='mt-2 text-sm text-red-400'>
          {errors.secondary_email.message}
        </p>
      )}
    </div>
  </div>

  {/* Add more fields for the Personal Information form */}
</div>

          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Address
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Address where you can receive mail.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Country
                </label>
                <div className='mt-2'>
                  <select
                    id='country'
                    {...register('country')}
                    autoComplete='country-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  {errors.country?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='street'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Street address
                </label>
                <div className='mt-2'>
                  <Input
                    type='text'
                    id='street'
                    {...register('street')}
                    autoComplete='street-address'
                    className='block w-full '
                  />
                  {errors.street?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  City
                </label>
                <div className='mt-2'>
                  <Input
                    type='text'
                    id='city'
                    {...register('city')}
                    autoComplete='address-level2'
                    className='block w-full '
                  />
                  {errors.city?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='state'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  State / Province
                </label>
                <div className='mt-2'>
                  <Input
                    type='text'
                    id='state'
                    {...register('state')}
                    autoComplete='address-level1'
                    className='block w-full '
                  />
                  {errors.state?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='zip'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ZIP / Postal code
                </label>
                <div className='mt-2'>
                  <Input
                    type='text'
                    id='zip'
                    {...register('zip')}
                    autoComplete='postal-code'
                    className='block w-full '
                  />
                  {errors.zip?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Complete
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Thank you for your submission.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          
          {currentStep === steps.length - 1 ? (
        <button
        type='button'
        onClick={() => handleSubmit(processForm)()}
        className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
      >
        Confirm
      </button>
      ) : (
        <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
      )}
          
        </div>
      </div>
    </section>
  )
}