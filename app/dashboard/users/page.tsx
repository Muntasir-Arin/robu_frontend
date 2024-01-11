'use client'
import { useTheme } from "next-themes"
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import api from "@/utils/auth";

interface User {
  id: number;
  email: string;
  name: string;
  date_of_birth: string;
  student_id: string | null;
  secondary_email: string | null;
  phone_number: string | null;
  position: string;
  department: string | null;
  org: string | null;
  avatar: string | null;
  rs_status: string | null;
  facebook_profile: string | null;
  insta_link: string | null;
  linkedin_link: string | null;
  robu_start: string | null;
  robu_end: string | null;
  bracu_start: string | null;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  gender: string | null;
  blood_group: string | null;
  robu_department: string | null;
}


const UserGrid: React.FC = () => {
  const { theme} = useTheme()
  const [rowData, setRowData] = useState<User[]>([]);

  const defaultColDef = useMemo(() => { 
    return {

          
          // make every column use 'text' filter by default
          filter: 'agTextColumnFilter',

      };
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<User[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/secure/`);
        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const columnDefs: ColDef<User, any>[] = [
    { headerName: 'ID', field: 'id', width:80  },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Date of Birth', field: 'date_of_birth' },
    { headerName: 'Student ID', field: 'student_id' },
    { headerName: 'Secondary Email', field: 'secondary_email' },
    { headerName: 'Phone Number', field: 'phone_number' },
    { headerName: 'Position', field: 'position' },
    { headerName: 'Department', field: 'department' },
    { headerName: 'Organization', field: 'org' },
    { headerName: 'Avatar', field: 'avatar' },
    { headerName: 'RS Status', field: 'rs_status' },
    { headerName: 'Facebook Profile', field: 'facebook_profile' },
    { headerName: 'Instagram Link', field: 'insta_link' },
    { headerName: 'LinkedIn Link', field: 'linkedin_link' },
    { headerName: 'Robu Start', field: 'robu_start' },
    { headerName: 'Robu End', field: 'robu_end' },
    { headerName: 'BRACU Start', field: 'bracu_start' },
    { headerName: 'Active', field: 'is_active' },
    { headerName: 'Created At', field: 'created_at' },
    { headerName: 'Updated At', field: 'updated_at' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Blood Group', field: 'blood_group' },
    { headerName: 'Robu Department', field: 'robu_department' },
  ];
  const gridClassName = theme === 'light' ? 'ag-theme-alpine' : theme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';

  return (
    <div className={`${gridClassName} p-4`}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout='autoHeight'
        defaultColDef={defaultColDef}
        rowSelection='multiple'
      />
    </div>
  );
};

export default UserGrid;
