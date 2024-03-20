"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z, ZodError } from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner"

const isLowercase = (value: string) => /[a-z]/.test(value);
const isUppercase = (value: string) => /[A-Z]/.test(value);
const hasDigit = (value: string) => /\d/.test(value);
const isCommonPassword = (value: string) =>
  !["12345678", "password", "letmein"].includes(value.toLowerCase());

const FormSchema = z.object({
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
});

const ConfirmResetPage : React.FC<{ params: any }> = ({ params }) =>  {
    console.log(params.uid, params.token)
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      FormSchema.parse(formData);
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/users/reset_password_confirm/`, {
        uid:params.uid, 
        token:params.token,
        new_password: formData.password,
        re_new_password: formData.password,
      });
      
      if (response.status === 204) {
        toast.success('Success', {
          description: 'Check your email',
        })
        router.push('/login');
  
      

      
    } else {
      setErrors({});
      toast.error('Incorrect ', {
        description: 'Incorrect',
      })
      

    }
    } catch (error: any) {
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
      }
      else {  
        if (error?.response?.status === 400) {
          toast.error('Error', {
            description: 'Error',
          })
        }
        else{
  
        toast.error('Network Error', {
          description: 'Unable to establish a connection. Please check your network connection and try again.',
        })
        }

        setErrors({});
        
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  return (
    <div className="mt-[8rem] max-w-md mx-auto my-8 p-6 rounded-md sm:border">
      <h1 className="text-2xl font-bold mb-4 text-primary">Enter new password</h1>
      <form onSubmit={handleSubmit}>
  
        <div className="mb-4">
          <label className="block text-sm font-semibold text-accent-foreground mb-1">
            Password:
          </label>

          <Input  type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}/>
          {errors.password && (
            <span className="text-destructive text-sm">{errors.password}</span>
          )}
        </div>

        {isLoading ? (
          <Button disabled className="w-full">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        )}
      </form>
    </div>
  );
};

export default ConfirmResetPage;
