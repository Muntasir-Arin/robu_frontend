"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import axios from "axios"; // Import Axios
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const accountFormSchema = z.object({
  organization: z.string().min(2).max(30),
  date_of_birth: z.date(),
  avatar: z.object({ file: z.unknown().nullable() }).nullable(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  // ... your default values
};

export function AccountForm() {
  const router = useRouter();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
  });

  const onSubmit = async (data: AccountFormValues) => {
    try {
      const formData = new FormData();

      // Append fields to formData
      formData.append("organization", data.organization);
      formData.append(
        "date_of_birth",
        data.date_of_birth.toISOString().split("T")[0]
      ); // Convert date to ISO string

      // Append avatar if it exists
      if (data.avatar?.file instanceof File) {
        formData.append("avatar", data.avatar.file);
      }

      const accessToken = localStorage.getItem("token");

      // Ensure that localStorage is available before using it
      if (accessToken) {
        // Use Axios to send the form data to your API
        await axios.put("http://127.0.0.1:8000/api/update-profile/", formData, {
          headers: {
            Authorization: `JWT ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        router.back();

        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      } else {
        console.error("Access token not found in localStorage.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating your profile.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <Input placeholder="Your Organization name" {...field} />
              <FormDescription>
                This is the Organization name that will be displayed on your
                profile and in emails.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    defaultMonth={new Date(2000, 9)}
                    initialFocus
                    numberOfMonths={2} pagedNavigation
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
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
        />
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}

export default function AccountPage() {
  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <AccountForm />
      </div>
    </div>
  );
}
