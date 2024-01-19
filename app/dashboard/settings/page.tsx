"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm, Controller } from 'react-hook-form';
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
import MainNav from "@/components/MainNav";
import axios from "axios"; // Import Axios
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const postFormSchema = z.object({
  type: z.string(),
  name: z.string().min(2).max(100),
  info: z.string().min(2).max(255),
  budget: z.string(),
  avatar: z.object({ file: z.unknown().nullable() }).nullable(),
});

type postFormValues = z.infer<typeof postFormSchema>;

const defaultValues: Partial<postFormValues> = {
  // ... your default values
};

export function PostForm() {
  const form = useForm<postFormValues>();
  const router = useRouter();

  const onSubmit = async (data: postFormValues) => {
    
    try {
      const formData = new FormData();

      // Append fields to formData
      formData.append("name", data.name);
      formData.append("info", data.info);
      formData.append("budget", data.budget);

      // Append avatar if it exists
      if (data.avatar?.file instanceof File) {
        formData.append("photos", data.avatar.file);
      }

      const accessToken = localStorage.getItem("token");

      // Ensure that localStorage is available before using it
      console.log(formData)
      if (accessToken) {
        
        // Use Axios to send the form data to your API
        await axios.post(
          
          data.type === "Project"
            ? "http://127.0.0.1:8000/api/project/"
            : "http://127.0.0.1:8000/api/event/",
          formData,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        router.back();

        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      } else {
        router.refresh();
        console.error("Access token not found in localStorage.");
      }
    } catch (error) {
      router.refresh();
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating your profile.",
      });
    }
  };

  return (
    <Card className="mt-10 pt-5 w-[750px]">
      <CardHeader className="grid justify-items-center">
        <CardTitle className="text-xl">Create Project/Event</CardTitle>
        <CardDescription>
          Deploy your new project or event in one-click.
        </CardDescription>
      </CardHeader>
      <div className="p-10">
        <CardContent className="grid gap-4 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-5"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Project" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Project
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Event" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Event
                    </FormLabel>
                  </FormItem>
                  
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input
                      placeholder="Name of your project/Event"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="info"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Info</FormLabel>
                    <Textarea
                      placeholder="Project/Event information"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Amount</FormLabel>
                    <Input
                      type="number"
                      placeholder="Budget amount"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <Input
                      type="file"
                      onChange={(e) =>
                        field.onChange({ file: e.target.files?.[0] || null })
                      }
                    />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-10">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit for Approval</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </div>
    </Card>
  );
}

export default function AccountPage() {
  return (
    <div className="flex justify-center">
      <PostForm />
    </div>
  );
}
