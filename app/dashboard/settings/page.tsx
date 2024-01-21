"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FC, useEffect, useState } from "react";
import api from "@/utils/auth";
import { Input } from "@/components/ui/input";


const FormSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  phone: z.string(),
  organization: z.string(),
  bloodGroup: z.string().optional(),
  gender: z.string(),
  facebookLink: z.string(),
  instagramLink: z.string().optional(),
  linkedin: z.string().optional(),
  bracuJoiningDate: z.string().optional(),
  studentId: z.string().optional(),
  rsStatus: z.string().optional(),
  gsuitEmail: z.string().optional(),
});

export default function page() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const response = await api.patch(
        `http://127.0.0.1:8000/api/applicants/${"hello"}/interview/`,
        {
          // Add other fields as needed
        }
      );

      console.log("Successfully updated:", response.data);

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

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  placeholder="Select your date of birth"
                  {...field}
                />
                <FormDescription>
                  Please select your date of birth.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <Input placeholder="Enter your phone number" {...field} />
                <FormDescription>
                  Provide your contact phone number.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <Input placeholder="Enter your organization" {...field} />
                <FormDescription>
                  Specify the organization you belong to.
                </FormDescription>
              </FormItem>
            )}
          />

{true && (
        <div className="grid gap-y-6">
          
          <FormField
            control={form.control}
            name="bracuJoiningDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bracu Joining Date</FormLabel>
                <Input
                  type="date"
                  placeholder="Select your Bracu joining date"
                  {...field}
                />
                <FormDescription>
                  Please select your Bracu joining date.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentId"
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
            name="rsStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RS Status</FormLabel>
                <Input
                  placeholder="Enter your RS status"
                  {...field}
                />
                <FormDescription>
                  Specify your RS status.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gsuitEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gsuit Email</FormLabel>
                <Input
                  placeholder="Enter your Gsuit email"
                  {...field}
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
            name="bloodGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Group</FormLabel>
                <Input placeholder="Enter your blood group" {...field} />
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
                <Input placeholder="Enter your gender" {...field} />
                <FormDescription>Specify your gender.</FormDescription>
              </FormItem>
            )}
          />

          

          <FormField
            control={form.control}
            name="facebookLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook Link</FormLabel>
                <Input placeholder="Enter your Facebook link" {...field} />
                <FormDescription>
                  Provide the link to your Facebook profile.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagramLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram Link</FormLabel>
                <Input placeholder="Enter your Instagram link" {...field} />
                <FormDescription>
                  Optional: Provide the link to your Instagram profile.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <Input placeholder="Enter your LinkedIn" {...field} />
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
