import * as React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {
  position: string;
  name: string;
  profile_picture: string;
  student_id: string;
};

export function Items({ position, name, profile_picture, student_id }: Props) {


  return (
    <div>
      
      <Card className="h-[380px] w-[340px] lg:w-[400px] md:w-[270px]  hover:bg-accent">
        <CardHeader>
          <AspectRatio className="relative" ratio={12 / 9}>
            
            <Link href={`/profile/member/${student_id}`}>
              <Image
                src={`${profile_picture}`}
                alt=""
                className="rounded-xl object-cover"
                fill
              />
            </Link>
          </AspectRatio>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between">
          <CardDescription className="text-xs italic">
            Peak Position : {position}
          </CardDescription>
          <CardTitle className="text-right text-sm">{name}</CardTitle>
        </CardFooter>
      </Card>
    </div>
  );
}
