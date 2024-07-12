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
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "@/utils/checkauth";
import Link from "next/link";
import VideoCard from "@/components/ui/videoCard";

const FormSchema = z.object({
  about: z.string().min(30, {
    message: "Please provide more details. About must be at least 30 characters.",
  }),
  project: z.string().optional(),
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

const videoData = [
  { title: "Human Resources", description: " HR focuses on managing the human capital within an organization, ensuring effective recruitment, training, and employee relations. They seek candidates with experience in administrative tasks, proficiency in communication tools like email and spreadsheets, and a knack for problem-solving. Prospective hires undergo scenario-based assessments to gauge their conflict resolution abilities and interpersonal skills", videoUrl: "https://www.youtube.com/embed/AtpGHxjZ0Cg?si=tpS40ziV6e8LdQ4W" },
  { title: "Editorial & Publishing", description: "E&P departments are responsible for creating and managing content, whether for print or digital platforms. They look for individuals with a background in writing (both creative and academic), knowledge of current technologies, and strong communication skills. During interviews, candidates are required to demonstrate their writing abilities by completing impromptu writing tasks under time constraints.", videoUrl: "https://www.youtube.com/embed/AtpGHxjZ0Cg?si=tpS40ziV6e8LdQ4W" },
  { title: "Art & Design", description: "A&D departments encompass roles related to visual creativity and design, often involving tasks like graphic design, illustration, and crafting. They seek candidates with skills in sketching, drawing, and other creative disciplines, alongside qualities like leadership potential and effective communication. Applicants are evaluated through portfolio presentations to assess their creative capabilities and dedication to their craft.They mix their robotics skill with art to create the most visually pleasing robots and technology, proving to everyone just how well technology and creativity can co exist. ", videoUrl: "https://www.youtube.com/embed/AtpGHxjZ0Cg?si=tpS40ziV6e8LdQ4W" },
  { title: "Information Technology", description: "IT departments manage an organization's digital presence, focusing on creative digital work. They seek candidates with proficiency in design tools (like Adobe Suite), project management skills, and a proactive approach to handling sudden tasks. Potential hires are expected to demonstrate their technical skills through showcasing previous design or video projects during the interview process.", videoUrl: "https://www.youtube.com/embed/AtpGHxjZ0Cg?si=tpS40ziV6e8LdQ4W" },     
  { title: "Strategic Planning", description: "SP departments typically involve roles related to Administrative work, leadership, and event planning. They look for candidates with knowledge of robotics, electronics, and project planning. Candidates are assessed on their ability to handle management scenarios and provide technical solutions, often focusing on leadership qualities and problem-solving skills.", videoUrl: "https://www.youtube.com/embed/AtpGHxjZ0Cg?si=tpS40ziV6e8LdQ4W" },
  { title: "Finance & Marketing", description: "F&M departments oversee financial strategies and promotional activities within an organization. They seek candidates with dedication to project outcomes, experience in sponsorship or event management, and strong interpersonal skills. During interviews, candidates are evaluated based on their ability to handle hypothetical scenarios, demonstrate convincing communication, and showcase previous experiences in marketing or event organization. The people of FnM are those who know both out to make robots and sell them.", videoUrl: "https://www.youtube.com/embed/AtpGHxjZ0Cg?si=tpS40ziV6e8LdQ4W" },   
  { title: "Event Management", description: "Event Management departments specialize in planning and executing events, requiring skills in coordination, creativity, and effective team leadership. They look for candidates with prior experience in event planning, excellent communication skills, and the ability to innovate in event concepts. Potential hires undergo assessments focusing on their ability to lead teams, generate new event ideas, and work collaboratively under pressure.", videoUrl: "https://www.youtube.com/embed/AtpGHxjZ0Cg?si=tpS40ziV6e8LdQ4W" },
  { title: "Robotics & Projects Management", description: "RPM departments focus on projects involving robotics, web development, and technical innovations. They seek candidates with experience in project management, Robotics,  proficiency in web technologies (like React or Django), and a passion for learning and creativity. During interviews, candidates may be asked to demonstrate their technical skills through practical challenges or showcase their previous project work in robotics or web development.", videoUrl: "https://www.youtube.com/embed/AtpGHxjZ0Cg?si=tpS40ziV6e8LdQ4W" }

];

const VideoSection: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {videoData.map((video, index) => (
      <VideoCard key={index} title={video.title} description={video.description} videoUrl={video.videoUrl} />
    ))}
  </div>
);

export default function InputForm() {
  const { userData } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (redirect === 'recruit' && !toastShown) {
      toast.info('Step 3/3: Department Choice and Introduction', {
        description: 'Select your preferred department and share a brief introduction about yourself.',
      });
      setToastShown(true);
    }
  }, [redirect, toastShown]);

  const [applicantsData, setApplicantsData] = useState<any[]>([]);
  const [isSpringAvailable, setSpringAvailable] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applicants/info/`);

        if (response.status === 200) {
          setApplicantsData(response.data);
          const isAvailable = response.data.some((item: any) => item.id.includes('summer24'));
          setSpringAvailable(isAvailable);
        } else {
          console.error(`Failed to fetch data. Status code: ${response.status}`);
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
  ];

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
    const allDepts = [data.dept1, data.dept2, data.dept3];
    const uniqueDepts = new Set(allDepts);

    if (uniqueDepts.size !== allDepts.length) {
      form.setError("dept1", {
        type: "manual",
        message: "Department choices must be unique.",
      });
      form.setError("dept2", {
        type: "manual",
        message: "Department choices must be unique.",
      });
      form.setError("dept3", {
        type: "manual",
        message: "Department choices must be unique.",
      });
      return;
    }

    try {
      const response = await api.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applicants/`, {
        about: data.about,
        drive_link: data.project,
        dept_choice: [data.dept1, data.dept2, data.dept3].join(','),
        semester: "summer24",
      });

      if (response.status === 201) {
        toast.message('Thank you! Your submission has been successfully received', {
          description: '',
        });
        window.location.reload();
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

  if (!userData?.student_id) {
    return (
      <div className="bg-background text-foreground p-6 rounded-lg shadow-lg md:max-w-[60%] max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Update Your Student ID</h2>
        <p className="text-lg mb-4">
          It looks like your student ID is not updated in the settings. Please go to the settings page and update your student ID to access all features.
        </p>
        <Link href="/dashboard/settings?redirect=recruit">
          <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary-dark hover:text-primary-dark-foreground transition duration-300 ease-in-out">
            Go to Settings
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {isSpringAvailable ? (
        <div className="text-center mt-[10rem] px-8">
          <h2 className="text-3xl font-bold tracking-tight">You&apos;ve already applied for this semester.</h2>
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
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your primary department..." />
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
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pick your second choice department..." />
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
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your third choice department..." />
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
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Share some details about yourself..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Link (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Provide a link to your project..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4">Submit</Button>
            </form>
          </Form>
        </div>
      )}
                
                <h2 className="uppercase text-2xl font-bold tracking-tight mt-4 gap-4 mb-8 p-4 m-4">  Explore All Departments and Select Yours
</h2>

                <VideoSection />

    </div>
  );
}
