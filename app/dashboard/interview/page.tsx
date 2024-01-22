"use client";
import InterviewStatusSubmit from "@/components/interview-submit";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScanSearch } from "lucide-react";
import api from "@/utils/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const SearhSchema = z.object({
  studentID: z.string().min(2, {
    message: "studentID must be at least 2 characters.",
  }),
});

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [dValues, setdValues] = useState<{
    assigned_department: string | null;
    status: string | null;
  } | null>(null);
  const [customId, setCustomId] = useState<string | null>(null);

  useEffect(() => {
    // setCustomId('22101525_spring20699');
    const fetchDefaultValues = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applicants/${customId}/interview/`
        );
        const values = response.data;
        setdValues(values);
      } catch (error) {
        toast.error("Unable to Retrieve Applicant Information", {
          description:
            "We couldn't find information for the provided Student ID or there was a network error. Please check the ID and your network connection, and try again.",
        });

        setdValues({ assigned_department: null, status: null } as {
          assigned_department: string | null;
          status: string | null;
        });
        console.error("Error fetching default values:", error);
      } finally {
        setLoading(false);
      }
    };

    if (customId) {
      fetchDefaultValues();
    } else {
      setdValues({ assigned_department: null, status: null } as {
        assigned_department: string | null;
        status: string | null;
      });
    }
  }, [customId]);

  const form = useForm<z.infer<typeof SearhSchema>>({
    resolver: zodResolver(SearhSchema),
    defaultValues: {
      studentID: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SearhSchema>) => {
    const studentID = data.studentID;
    const semester = "spring24";
    if (studentID) {
      const newCustomId = `${studentID}_${semester}`;
      setCustomId(newCustomId);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/5 sm:w-2/3 mx-auto space-y-6 mt-6 "
        >
          <div className="flex items-center justify-center">
            <FormField
              control={form.control}
              name="studentID"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Input Student ID, like 24141109"
                      className="md:w-[30rem] sm:w-[20rem] w-[15rem] mr-2"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </div>
        </form>
      </Form>

      {customId && (dValues as any)?.user?.student_id ? (
        <div
          className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-rows-auto gap-3 "
          style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        >
          <div className=" dark:bg-transparent dark:border dark:border-accent flex flex-col items-center justify-center col-span-full md:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1 md:row-span-2 lg:row-span-2 xl:row-span-2 bg-accent rounded-md">
            <Avatar className="h-[20rem] w-[20rem] mt-1">
              <AvatarImage
                className="rounded-none"
                src={(dValues as any)?.user?.avatar}
                alt={(dValues as any)?.user?.name || "Fallback Name"}
              />
              <AvatarFallback>
                {(dValues as any)?.user?.name || "Fallback Name"}
              </AvatarFallback>
            </Avatar>

            <div className=" text-center m-6">
              <h1 className="text-3xl font-bold">
                {" "}
                {(dValues as any)?.user?.name}
              </h1>
              <p className="">
                <span className="">Student ID:</span>{" "}
                {(dValues as any)?.user?.student_id}
              </p>
              <p className=" ">
                <span className="">Application Date:</span>{" "}
                {(dValues as any)?.application_date
                  ? new Date(
                      (dValues as any).application_date
                    ).toLocaleDateString()
                  : ""}
              </p>
            </div>
          </div>
          <div className=" col-span-full md:col-span-1 lg:col-span-1 xl:col-span-1 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-200 via-blue-600 to-sky-900 rounded-md grid">
            <div className="place-self-end m-7">
              <p className="text-white italic font-semibold text-xl  mb-2 text-right ">
                RS Status: {(dValues as any)?.user?.rs_status || "None"}
              </p>
              <p className="text-white italic mb-2 text-right font-semibold text-xl">
                Joined BRACU in{" "}
                {(dValues as any)?.user?.bracu_start || "Not specified"}
              </p>
              <p className="text-white italic text-right font-semibold text-xl">
                Department:{" "}
                {(dValues as any)?.user?.department || "Not specified"}
              </p>
            </div>
          </div>

          <div className="dark:bg-transparent dark:border dark:border-accent col-span-full md:col-span-1 lg:col-span-1 xl:col-span-1 bg-accent rounded-md row-span-3">
            <div className="m-7">
              <InterviewStatusSubmit key={customId} defaultValues={dValues} />
            </div>
          </div>

          <div className=" min-h-36 -z-20 overflow-hidden dark:bg-transparent dark:border dark:border-accent col-span-full md:col-span-1 lg:col-span-1 xl:col-span-1 bg-accent rounded-md relative ">
            <div className="flex gap-3 place-self-end m-7 absolute bottom-0 right-0">
              {(dValues as any)?.dept_choice
                ?.split(",")
                .map((choice: string, index: number) => (
                  <div
                    key={index}
                    className="bg-primary-foreground py-2 px-3 rounded-md text-sm"
                  >
                    {" "}
                    {index + 1} : {choice.trim()}
                  </div>
                ))}
            </div>
            <div className="px-20 absolute h-2 -top-[20rem]  -z-10 text-stone-300 dark:text-muted font-italic uppercase font-black text-9xl whitespace-nowrap marquee-angled">
        department choices
    </div>
            <div className="px-20 absolute h-2 -top-[12rem] -z-20  text-stone-300 dark:text-muted  font-italic uppercase font-black text-9xl whitespace-nowrap marquee-angled-reversed">
        department choices
    </div>

          </div>

          <div className="dark:bg-transparent dark:border dark:border-accent sm:col-span-2 col-span-3 bg-accent rounded-md">
            <div className="m-10">
              <h1 className="text-3xl font-bold mb-4">Applicant Details</h1>
              <p className="mb-2">
                <span className="font-semibold">About:</span>{" "}
                {(dValues as any)?.about}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Drive Link:</span>{" "}
                <a
                  href={(dValues as any)?.drive_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {(dValues as any)?.drive_link}
                </a>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Date of Birth:</span>{" "}
                {(dValues as any)?.user?.date_of_birth || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Gender:</span>{" "}
                {(dValues as any)?.user?.gender || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Blood Group:</span>{" "}
                {(dValues as any)?.user?.blood_group || "N/A"}
              </p>
              <h2 className="text-2xl font-bold mt-4 mb-2">
                Contact Information
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {(dValues as any)?.user?.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">G-suit Email:</span>{" "}
                {(dValues as any)?.user?.secondary_email || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Phone Number:</span>{" "}
                {(dValues as any)?.user?.phone_number || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Facebook Profile Link:</span>{" "}
                {(dValues as any)?.user?.facebook_profile || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ height: "80vh" }}
          className="flex items-center justify-center opacity-45"
        >
          <ScanSearch size={149} absoluteStrokeWidth strokeWidth={5} />
        </div>
      )}
    </div>
  );
}
