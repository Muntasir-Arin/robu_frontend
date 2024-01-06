"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z, ZodError } from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input"



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
  }),
});

const RegisterPage = () => {

  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    organization: "",
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
      // Form data is valid, proceed with registration logic (e.g., API request)
      console.log("Form submitted:", formData);
      // Redirect or handle successful registration
      router.push("/login");
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
        <Link href="/login" className="p-2 hover:underline">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
