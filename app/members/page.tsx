'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Items } from './membercard';
import { Button } from '@/components/ui/button';

interface Member {
  id: number;
  student_id: string;
  name: string;
  position: string;
  avatar: string;
}

const AllMember: React.FC = () => {
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [filter, setFilter] = useState<string>(''); // State to track current filter

  useEffect(() => {
    fetchMemberList(); // Fetch all members on component mount
  }, []);

  useEffect(() => {
    if (filter) {
      fetchMemberList(filter); // Fetch member list based on filter
    }
  }, [filter]);

  const fetchMemberList = async (filter?: string) => {
    try {
      let url = 'http://127.0.0.1:8000/api/member-list/';
      if (filter) {
        url += `?filter=${filter}`;
      }
      const response = await axios.get<Member[]>(url);
      setMemberList(response.data);
    } catch (error) {
      console.error('Error fetching Member list:', error);
    }
  };

  const handleCurrentClick = () => {
    setFilter('current'); // Set filter to fetch current members
  };

  const handleAlumniClick = () => {
    setFilter('alumni'); // Set filter to fetch alumni members
  };

  return (
    <main>
      <div className='flex justify-center mt-10 '>
        <div className="flex items-center gap-3 mt-10">
          <Button variant="outline" className="rounded-full" onClick={handleCurrentClick}>
            Current Members
          </Button>
          <Button variant="outline" className="rounded-full" onClick={handleAlumniClick}>
            Alumni
          </Button>
        </div>
      </div>
      <div className="mx-[7rem] flex flex-wrap justify-center gap-2 mt-14">
        {memberList.map((member) => (
          <div key={member.id}>
            <Items
              position={member.position}
              name={member.name}
              profile_picture={member.avatar}
              student_id={member.student_id}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default AllMember;
