"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import api from "@/utils/auth";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const FormSchema = z.object({
  about: z.string().min(30, {
    message:
      "Please provide more details. About must be at least 30 characters.",
  }),
  project: z.string(),
  dept1: z.string().min(1, {
    message: "Please choose a department for Department Choice 1.",
  }),
  dept2: z.string().min(1, {
    message: "Please choose a department for Department Choice 2.",
  }),
  dept3: z.string().min(1, {
    message: "Please choose a department for Department Choice 3.",
  }),
});

export default function InputForm() {
  const searchParams = useSearchParams()
  const redirect  = searchParams.get('redirect')
  const [toastShown, setToastShown] = useState(false);
  const showToast = () => {
    if (redirect === 'recruit' && !toastShown) {
      toast.info('Step 3/3: Department Choice and Introduction', {
        description: 'Select your preferred department and share a brief introduction about yourself.',
      });
      setToastShown(true);
    }
  };

  useEffect(() => {
    showToast();
  }, [redirect, toastShown]);

  const [applicantsData, setApplicantsData] = useState<any[]>([]);
  const [isSpring24Available, setSpring24Available] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseapplicantsData = await api.get('http://127.0.0.1:8000/api/applicants/info/');

        if (responseapplicantsData.status === 200) {
          setApplicantsData(responseapplicantsData.data);
          const isAvailable = responseapplicantsData.data.some((item: any) => item.id.includes('spring24'));
          setSpring24Available(isAvailable);
        } else {
          console.error(`Failed to fetch data. Status code: ${responseapplicantsData.status}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  

  const depts = [
    { id: "Editorial and Publications", name: "Editorial and Publications" },
    { id: "IT", name: "IT" },
    { id: "Arts and Design", name: "Arts and Design" },
    { id: "Human Resources", name: "Human Resources" },
    { id: "Event Management", name: "Event Management" },
    { id: "Finance and Marketing", name: "Finance and Marketing" },
    { id: "Research and Project Management", name: "Research and Project Management" },
    { id: "Strategic planning", name: "Strategic planning" }
  ]

  const form = useForm<z.infer<typeof FormSchema>>({
    
    resolver: zodResolver(FormSchema),
    defaultValues: {
      about: "",
      project: "",
      dept1: "",
      dept2: "",
      dept3: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (
      data.dept1 === data.dept2 ||
      data.dept2 === data.dept3 ||
      data.dept1 === data.dept3
    ) {
      const duplicateDepartments = new Set([
        data.dept1,
        data.dept2,
        data.dept3,
      ]);

      if (
        duplicateDepartments.has(data.dept1) &&
        (data.dept1 === data.dept2 || data.dept1 === data.dept3)
      ) {
        form.setError("dept1", {
          type: "manual",
          message: "Department Choice must be unique.",
        });
      }

      if (
        duplicateDepartments.has(data.dept2) &&
        (data.dept2 === data.dept1 || data.dept2 === data.dept3)
      ) {
        form.setError("dept2", {
          type: "manual",
          message: "Department Choice must be unique.",
        });
      }

      if (
        duplicateDepartments.has(data.dept3) &&
        (data.dept3 === data.dept1 || data.dept3 === data.dept2)
      ) {
        form.setError("dept3", {
          type: "manual",
          message: "Department Choice must be unique.",
        });
      }

      return;
    }

    try {
      const response = await api.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applicants/`, {
        about: data.about,
        drive_link: data.project,
        dept_choice: [data.dept1, data.dept2, data.dept3].join(','),
        semester: "spring24",
      });

      if (response.status === 201) {
        toast.message('Yayyyy', {
          description: '',
        });
      } else {
        toast.error('Network Error', {
          description: 'Unable to establish a connection. Please check your network connection and try again.',
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again later.');
    }
  };
  return (
    




<div>
      {isSpring24Available? (
        <div className="text-center mt-[10rem] px-8">
          <h2 className="text-3xl font-bold tracking-tight">You&apos;ve already applied for this semester.</h2>


          {/* {applicantsData.map((applicant) => (
            <div key={applicant.id}>{applicant.id}</div>
          ))} */}
        </div>
      ) : (
        <div>
              <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:w-1/2 w-3/4 space-y-6 mx-auto mt-8 mb-16"
      >
        <FormField
          control={form.control}
          name="dept1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Choice Department</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Choose your primary department..."
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {depts.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dept2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Second Choice Department</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Pick your second choice department..."
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {depts.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dept3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Third Choice Department</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Pick your second choice department..."
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {depts.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell us about yourself</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Introduce yourself and your interest in robotics here..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We&apos;re excited to learn more about you! Use this space to
                provide a brief introduction about yourself and your interest in
                robotics. Feel free to mention any projects, challenges, or
                experiences that highlight your passion for the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Share Your Project (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Include the link to your projects for our review..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Share the drive link to your previous robotics project so we can
                dive into the details.{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-3">
          Submit
        </Button>
      </form>
    </Form>
        </div>
      )}
    </div>
  );
}
