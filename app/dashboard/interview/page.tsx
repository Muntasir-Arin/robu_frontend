import { InterviewStatusSubmit } from "@/components/interview";

export default function page() {
  return (
    
<div className="grid grid-cols-5 grid-rows-7 gap-3">
  <div className="col-span-5 col-start-1 row-start-1">extra</div>
        <div className="row-span-2 col-start-1 row-start-2">Avator+Name</div>
    <div className="col-span-3 row-span-6 col-start-2 row-start-2">About+ Other info</div>
    <div className="col-start-1 row-start-4">RS stats</div>
    <div className="row-span-3 col-start-1 row-start-5">blank</div>
    <div className="col-start-5 row-start-2">dept choice</div>
    <div className="col-start-5 row-start-3"><InterviewStatusSubmit/></div>
    <div className="col-start-5 row-start-4">9</div>
    
    <div className="row-span-3 col-start-5 row-start-5">blank</div>
</div>
  );
}