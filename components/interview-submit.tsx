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
import { Textarea } from "./ui/textarea";

const departments = [
  { label: "Editorial and Publications", value: "Editorial and Publications" },
  { label: "IT", value: "IT" },
  { label: "Arts and Design", value: "Arts and Design" },
  { label: "Human Resources", value: "Human Resources" },
  { label: "Event Management", value: "Event Management" },
  { label: "Finance and Marketing", value: "Finance and Marketing" },
  {
    label: "Research and Project Management",
    value: "Research and Project Management",
  },
  { label: "Strategic planning", value: "Strategic planning" },
] as const;

const status = [
  { label: "Selected", value: "Selected" },
  { label: "Rejected", value: "Rejected" },
  { label: "Pending", value: "Pending" },
] as const;

interface InterviewStatusSubmitProps {
  defaultValues: any;
}

const FormSchema = z.object({
  Department: z.string().optional(),
  Status: z.string(),
  Feedback: z.string(),
});

const InterviewStatusSubmit: FC<InterviewStatusSubmitProps> = ({
  defaultValues,
}) => {
  const custom_id = defaultValues?.custom_id;
  const [loading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const fetchDefaultValues = async () => {
      try {
        // Map the API response keys to the form field names
        const mappedDefaultValues = {
          Department: defaultValues.assigned_department || "",
          Status: defaultValues.status || "",
          Feedback: defaultValues.feedback || "",
        };

        form.reset(mappedDefaultValues);
      } catch (error) {
        console.error("Error fetching default values:", error);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchDefaultValues();
  }, [
    custom_id,
    form,
    defaultValues.assigned_department,
    defaultValues.status,
    defaultValues.feedback,
  ]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applicants/${custom_id}/interview/`,
        {
          assigned_department: data.Department,
          status: data.Status,
          feedback: data.Feedback,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="Status"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Interview Status</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? status.find((Status) => Status.value === field.value)
                            ?.label
                        : "Awaiting Interview"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Command className=" xl:w-[15rem] ">
                    <CommandGroup>
                      {status.map((Status) => (
                        <CommandItem
                          value={Status.label}
                          key={Status.value}
                          onSelect={() => {
                            form.setValue("Status", Status.value);
                          }}
                        >
                          {Status.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              Status.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the current status of an applicant&apos;s interview
                process.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Department"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Department</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? departments.find(
                            (Department) => Department.value === field.value
                          )?.label
                        : "Select Department"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Department..."
                      className="h-9"
                    />
                    <CommandEmpty>No department found.</CommandEmpty>
                    <CommandGroup>
                      {departments.map((Department) => (
                        <CommandItem
                          value={Department.label}
                          key={Department.value}
                          onSelect={() => {
                            form.setValue("Department", Department.value);
                          }}
                        >
                          {Department.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              Department.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This selection is based on an applicant&apos;s skills,
                preferences, and the organizational structure.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <Textarea
                placeholder="Share your feedback about the interviewee's performance and qualities."
                {...field}
              />
              <FormDescription>
                Provide info about the Interviewee (if common account: add
                interviewer name and dept. info at last)
              </FormDescription>
            </FormItem>
          )}
        />

        {loading ? (
          <Button disabled className="w-full">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default InterviewStatusSubmit;
