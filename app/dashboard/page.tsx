"use client";
import { Progress } from "@/components/ui/progress";
import api from "@/utils/auth";
import useAuth from "@/utils/checkauth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { userData } = useAuth();
  const condition = userData?.is_verified;
  const [summaryData, setSummaryData] = useState<{
    positive_count: number;
    negative_count: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSentimentSummary = async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/extern-feedback/`
        );
        setSummaryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sentiment summary:", error);
        setLoading(false);
      }
    };

    fetchSentimentSummary();
  }, []);

  const handleVerification = async (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    event.preventDefault();

    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resend-verification/`
      );
      if (response.status === 200) {
        toast.success("Success", {
          description: "Verification email sent successfully",
        });
      } else {
        toast.error("Network Error", {
          description:
            "Unable to establish a connection. Please check your network connection and try again.",
        });
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast.error("Network Error", {
          description:
            "Unable to establish a connection. Please check your network connection and try again.",
        });
      } else {
        toast.error("Network Error", {
          description:
            "Unable to establish a connection. Please check your network connection and try again.",
        });
      }
    }
  };
  if (userData?.is_verified) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center mt-[-10rem] px-8">
          {summaryData && (
            <div>
              <p>Positive Sentiments: {summaryData?.positive_count}</p>
              <p>Negative Sentiments: {summaryData?.negative_count}</p>
              <Progress
                value={
                  (summaryData?.positive_count /
                    (summaryData?.positive_count +
                      summaryData?.negative_count)) *
                  100
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  } else if (userData) {
    return (
      <div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center mt-[-10rem] px-8 rounded-none text-3xl font-bold tracking-tight">
            Your account has not been verified. Please click{" "}
            <span onClick={handleVerification} className=" text-blue-400">
              {" "}
              <a href="#">here </a>{" "}
            </span>{" "}
            to receive a verification email.
          </div>
        </div>
      </div>
    );
  }
}
