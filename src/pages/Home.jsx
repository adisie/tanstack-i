import {useState,useMemo} from 'react'
// icons
import { CiSearch } from "react-icons/ci";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
const Home = () => {
  // states 
  const [filtering, setFiltering] = useState('')
  const [sorting,setSorting] = useState([])
  // students
  const students = [
    {
      profile: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      first_name: "Haddis",
      last_name: "Fanta",
      email: "haddisfun@gmail.com",
      phone: "+251923996736",
      status: "married",
    },
    {
      profile: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      first_name: "Hana",
      last_name: "Teshome",
      email: "hana@gmail.com",
      phone: "+251923996731",
      status: "married",
    },
    {
      profile: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      first_name: "Menelik",
      last_name: "H/Melekot",
      email: "menelik@gmail.com",
      phone: "+251923996733",
      status: "unmarried",
    },
    {
      profile: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      first_name: "Kalkidan",
      last_name: "Mogess",
      email: "kalkid@gmail.com",
      phone: "+251919996736",
      status: "married",
    },
    {
      profile: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      first_name: "Abebe",
      last_name: "Tafere",
      email: "ababe@gmail.com",
      phone: "+251947996736",
      status: "unmarried",
    },
  ];

  // data
  const data = useMemo(()=>students,[])

  // customizing cells
  // profile cell
  const profileCell = ({ row }) => {
    const { profile } = row.original
    console.log(profile)
    return (
      <div className="w-[24px] aspect-square rounded-full overflow-hidden">
        <img className="w-full h-full object-cover object-center" src={profile} alt="" />
      </div>
    )
  }
  // student profile cell
  const studentProfileCell = ({ row }) => {
    const { profile, first_name, last_name } = row.original 
    return (
      <div className="flex items-center gap-1">
        <div className="w-[24px] aspect-square rounded-full border border-white shadow-md overflow-hidden">
          <img className="w-full h-full object-center object-cover" src={profile} alt="" />
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <span>{first_name}</span>
          <span className="hidden md:inline-flex">{ last_name}</span>
        </div>
      </div>
    )
  }


  // column defs
  // student
  const studentTableColumns = [
    {
      header: "Student",
      accessorKey: 'first_name',
      cell: studentProfileCell,
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];

  // table
  // students table
  const studentTable = useReactTable({
    columns: studentTableColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: filtering,
      sorting: sorting,
    },
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
  });

  return (
    <div className="w-full">
      <h3>Student </h3>
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center p-1 bg-black bg-opacity-10  rounded-sm">
          <CiSearch className="text-xl"/>
          <input
            className="focus:outline-none focus:ring-0 border-none bg-transparent text-sm"
            type="text"
            placeholder="search" 
            value={filtering}
            onChange={e=>setFiltering(e.target.value)}
          />
        </div>
      </div>
      <div>
        <table className="w-[85%] mx-auto">
          <thead>
            {studentTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-start cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {
              studentTable.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {
                    row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {
                          flexRender(cell.column.columnDef.cell,cell.getContext())
                        }
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
