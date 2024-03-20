'use client'
import Error from 'next/error'

export default function Page() {
    return <Error title={'Verification Error'} statusCode={400} />
  }