"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams  } from "next/navigation";
import { z, ZodError } from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import axios from "axios";
import { toast } from "sonner";

const isLowercase = (value: string) => /[a-z]/.test(value);
const isUppercase = (value: string) => /[A-Z]/.test(value);
const hasDigit = (value: string) => /\d/.test(value);
const isCommonPassword = (value: string) =>
  !["12345678", "password", "letmein"].includes(value.toLowerCase());

const FormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Enter a valid email",
    })
    .min(2, {
      message: "Email must be at least 2 characters.",
    }).refine(value => !value.endsWith("g.bracu.ac.bd"), {
      message: "You cannot use gsuit as your primary mail",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(25, {
      message: "Password must be at most 25 characters.",
    })
    .refine((value) => isLowercase(value), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((value) => isUppercase(value), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((value) => hasDigit(value), {
      message: "Password must contain at least one digit.",
    })
    .refine((value) => isCommonPassword(value), {
      message: "Common passwords are not allowed.",
    }),
  organization: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }).max(25, {
    message: "Organization name must be at most 25 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(25, {
    message: "Name must be at most 25 characters.",
  }),
});

const RegisterPage = () => {


  const searchParams = useSearchParams()
  const redirect  = searchParams.get('redirect')
  const [toastShown, setToastShown] = useState(false);
  const showToast = () => {
    if (redirect === 'recruit' && !toastShown) {
      toast.info('Step 1/3: Account Creation', {
        description: 'Register using a non-GSuite email and set up your account. Make sure to select "Brac University" as your organization.',
      });
      setToastShown(true);
    }
  };


  useEffect(() => {
    showToast();
  }, [redirect, toastShown]);
  

  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    organization: "",
    name: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (["bracu", "brac u", "brac uni", "bracu uniersity", "brac university"].includes(formData.organization.toLowerCase())) {
      formData.organization = "Brac University";
    }
    e.preventDefault();
    setLoading(true);

    try {
      FormSchema.parse(formData);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/users/`, {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        org: formData.organization,
      });
      if (response.status === 201) {
        if (redirect=='recruit'){
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/jwt/create/`, {
            email: formData.email,
            password: formData.password,
          });
          if (response.status === 200) {
            // Successful login
            const auth_token = response.data?.access;
            const refreshToken = response.data?.refresh;

            if (auth_token) {
              // Store the token securely (e.g., in localStorage)
              localStorage.setItem('token', auth_token);
              localStorage.setItem('refreshToken', refreshToken);
              localStorage.setItem('lastTokenRefresh', new Date().toISOString());
    
              // Redirect to the homepage
              router.push('/dashboard/settings?redirect=recruit');}
            else{console.error('Missing auth_token in response');}
            router.refresh();}
            else {console.error('Missing auth_token in response');
            router.refresh();}

      
      }else{router.push("/login");}
      
    }
      else {
        setErrors({});

        toast.error('Network Error', {
          description: 'Unable to establish a connection. Please check your network connection and try again.',
        })
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }else {
        setErrors({});

        toast.error('Network Error', {
          description: 'Unable to establish a connection. Please check your network connection and try again.',
        })
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  return (
    <div className="mt-[8rem] max-w-md mx-auto my-8 p-6 rounded-md sm:border">
      <h1 className="text-2xl font-bold mb-4 text-primary">Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label className="block text-sm font-semibold text-accent-foreground mb-1">
            Name :
          </label>

          <Input  type="text"
            name="name"
            value={formData.name}
            onChange={handleChange} />

          
          {errors.name && (
            <span className="text-destructive text-sm">{errors.name}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-accent-foreground mb-1">
            Email:
          </label>

          <Input  type="text"
            name="email"
            value={formData.email}
            onChange={handleChange} />

          
          {/* <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md bg-input focus:outline-popover-foreground"
          /> */}
          {errors.email && (
            <span className="text-destructive text-sm">{errors.email}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-accent-foreground mb-1">
            Password:
          </label>
          {/* <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md bg-input focus:outline-popover-foreground"
          /> */}
          <Input type="password"
            name="password"
            value={formData.password}
            onChange={handleChange} />
          {errors.password && (
            <span className="text-destructive text-sm">{errors.password}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-accent-foreground mb-1">
            Organization:
          </label>
        
          {/* <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md bg-input focus:outline-popover-foreground"
          /> */}
          <Input  type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange} />

          {errors.organization && (
            <span className="text-destructive text-sm">
              {errors.organization}
            </span>
          )}
        </div>

        {isLoading ? (
          <Button disabled className="w-full">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Register
          </Button>
        )}
      </form>
      <div className="flex justify-between text-sm text-accent-foreground mt-4">
      {redirect === 'recruit' ? (
  <Link href="/login?redirect=recruit" className="p-2 hover:underline">
    Already have an account?
  </Link>
) : (
  <Link href="/login" className="p-2 hover:underline">
    Already have an account?
  </Link>
)}
      </div>
    </div>
  );
};

export default RegisterPage;
