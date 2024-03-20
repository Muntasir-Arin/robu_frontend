  "use client";
  import { useState } from "react";
  import { useRouter, useSearchParams } from "next/navigation";
  import { z, ZodError } from "zod";
  import { ReloadIcon } from "@radix-ui/react-icons";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
  import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner"



  const FormSchema = z.object({
    email: z
      .string()
      .email({
        message: "Enter a valid email",
      })
      .min(2, {
        message: "Email must be at least 2 characters.",
      })
      ,

  });

  const ResetPage = () => {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: "",
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
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/users/reset_password/`, {
          email: formData.email,
        });
        
        if (response.status === 204) {
          toast.success('Success', {
            description: 'Check your email',
          })
    
        

        
      } else {
        setErrors({});
        toast.error('Incorrect Email ', {
          description: 'No user found with the provided email',
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
            toast.error('Incorrect Email ', {
              description: 'No user found with the provided email',
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
        <h1 className="text-2xl font-bold mb-4 text-primary">Forget Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-accent-foreground mb-1">
              Email:
            </label>
            <Input  type="text"
              name="email"
              value={formData.email}
              onChange={handleChange} />

            {errors.email && (
              <span className="text-destructive text-sm">{errors.email}</span>
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
        <div className="flex justify-between text-sm text-accent-foreground  mt-4">
              <Link href="/login" className="p-2 hover:underline">Login</Link>
              <Link href="/register" className="p-2 hover:underline">Register Instead?</Link>
          </div>
      </div>
    );
  };

  export default ResetPage;
