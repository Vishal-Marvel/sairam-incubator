"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "@/components/providers/context/SessionContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { projectDataColumn } from "@/components/data-table-cols/projectData-column";
import { SSTIFDetail } from "@prisma/client";
const SSTIFDetailPage = () => {
  const [sstifData, setSSTIFData] = useState<SSTIFDetail[]>([]);

  const { token } = useSession();
  const getStartUpData = async () => {
    try {
      const response = await axios.get("/api/components/sstifData");
      setSSTIFData(response.data.response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStartUpData();
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4 items-center w-full flex flex-col pb-[5%]">
        <div className="flex items-center">
          <h2
            className=" md:text-4xl text-3xl font-bold text-gray-600 transition-transform duration-500 ease-in-out hover:scale-110 py-[2%] text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
            data-splitting
          >
            SSTIF Projects
          </h2>
          <div className="absolute right-10">
            {token && (
              <Link href={"/edit?section=sstifProject"}>
                <Button
                  variant={"ghost"}
                  className="bg-green-400 w-[100px] text-white shadow-md"
                >
                  <Pencil
                    className="h-4 w-4 mr-2 fill-green-800"
                    stroke="false"
                  />
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>

        
        <DataTable
          columns={projectDataColumn}
          tableType="sstifProject"
          data={sstifData}
          title="SSTIF Project"
        />
      </div>
    </div>
  );
};

export default SSTIFDetailPage;