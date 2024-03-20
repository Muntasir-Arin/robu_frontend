"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import useAuth from "@/utils/checkauth";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string(),
  date_of_birth: z.string().nullable(),
  phone_number: z.string().nullable(),
  org: z.string(),
  blood_group: z.string().nullable(),
  gender: z.string().nullable(),
  facebook_profile: z.string().nullable(),
  insta_link: z.string().nullable(),
  linkedin_link: z.string().nullable(),
  bracu_start: z.string().nullable(),
  student_id: z.string(),
  rs_status: z.string().nullable(),
  secondary_email: z.string().nullable()
});

export default function Page() {
  const searchParams = useSearchParams()
  const redirect  = searchParams.get('redirect')
  const [toastShown, setToastShown] = useState(false);
  const showToast = () => {
    if (redirect === 'recruit' && !toastShown) {
      toast.info('Step 2/3: Fill Up Necessary Data', {
        description: 'Provide the required information for a successful registration.',
      });
      setToastShown(true);
    }
  };

  useEffect(() => {
    showToast();
  }, [redirect, toastShown]);
  
  const router = useRouter();
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  useEffect(() => {
    if (userData) {
      form.reset(userData);
    }
  }, [userData, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);

      if (data?.org && ["bracu", "brac u", "brac uni", "bracu university", "brac university"].includes(data.org.toLowerCase())) {
        data.org = "Brac University";
      }

      const accessToken = localStorage.getItem("token");

      console.log(data)

      // Ensure that localStorage is available before using it
      if (accessToken) {
        // Use Axios to send the form data to your API
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-profile/`, data, {
          headers: {
            Authorization: `JWT ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (redirect=='recruit'){router.push('/dashboard/recruit?redirect=recruit');}else{
          toast.success('Successfully updated', {
            description: 'Successfully updated',
          });}

      } else {
        console.error("Access token not found in localStorage.");
      }
      

      console.log("Successfully updated:", data);

      // Add any additional logic you need after a successful update
    } catch (error) {
      console.error("Error updating values:", error);
      // Handle the error as needed
    } finally {
      setLoading(false); // Set loading to false once the update is complete
    }
  };

  return (
    <div className="w-full">
<div className="mx-auto lg:w-2/4 w-3/4 my-10  ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter your name" {...field} />
                <FormDescription>Provide your full name.</FormDescription>
              </FormItem>
            )}
          />

{/* <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <Input
                type="file"
                onChange={(e) =>
                  field.onChange({ file: e.target.files?.[0] || null })
                }
              />
              <FormDescription>
                Upload a profile image (optional).
              </FormDescription>
            </FormItem>
          )}
        /> */}

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  placeholder="Select your date of birth"
                  {...field}
                  value={field.value || ''}
                />
                <FormDescription>
                  Please select your date of birth.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <Input placeholder="Enter your phone number" {...field} value={field.value || ''} />
                <FormDescription>
                  Provide your contact phone number.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="org"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <Input placeholder="Enter your organization" {...field} value={field.value || ''}/>
                <FormDescription>
                  Specify the organization you belong to.
                </FormDescription>
              </FormItem>
            )}
          />

{userData?.org == "Brac University" && (
        <div className="grid gap-y-6">
          
          <FormField
            control={form.control}
            name="bracu_start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bracu Joining Date</FormLabel>
                <Input
                  type="date"
                  placeholder="Select your Bracu joining date"
                  {...field}
                  value={field.value || ''}
                />
                <FormDescription>
                  Please select your Bracu joining date.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="student_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID</FormLabel>
                <Input
                  placeholder="Enter your student ID"
                  {...field}
                />
                <FormDescription>
                  Provide your student ID.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rs_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RS Status</FormLabel>
                <Input
                  placeholder="Enter your RS status"
                  {...field}
                  value={field.value || ''}
                />
                <FormDescription>
                  Specify your RS status.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondary_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gsuit Email</FormLabel>
                <Input
                  placeholder="Enter your Gsuit email"
                  {...field}
                  value={field.value || ''}
                />
                <FormDescription>
                  Provide your Gsuit email.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
      )}


          <FormField
            control={form.control}
            name="blood_group"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Group</FormLabel>
                <Input placeholder="Enter your blood group" {...field} value={field.value || ''}/>
                <FormDescription>
                  Optional: Provide your blood group if known.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Input placeholder="Enter your gender" {...field} value={field.value || ''}/>
                <FormDescription>Specify your gender.</FormDescription>
              </FormItem>
            )}
          />

          

          <FormField
            control={form.control}
            name="facebook_profile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook Link</FormLabel>
                <Input placeholder="Enter your Facebook link" {...field} value={field.value || ''}/>
                <FormDescription>
                  Provide the link to your Facebook profile.
                </FormDescription>
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="insta_link"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Instagram Link</FormLabel>
      <Input placeholder="Enter your Instagram link" {...field} value={field.value || ''} />
      <FormDescription>
        Optional: Provide the link to your Instagram profile.
      </FormDescription>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="linkedin_link"
  render={({ field }) => (
    <FormItem>
      <FormLabel>LinkedIn</FormLabel>
      <Input placeholder="Enter your LinkedIn" {...field} value={field.value || ''} />
      <FormDescription>
        Optional: Provide the link to your LinkedIn profile.
      </FormDescription>
    </FormItem>
  )}
/>





          {loading ? (
            <Button disabled className="w-full mt-2">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-2">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>

    </div>
  );
}
