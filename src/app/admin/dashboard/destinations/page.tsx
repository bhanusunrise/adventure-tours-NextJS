"use client";

import { useState } from "react";
import Input from "@/app/components/form/input";
import Button from "@/app/components/form/button";
import Label from "@/app/components/form/label";
import { Table, TableHead, TableRow } from "@/app/components/table";

const DestinationsPage = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !file) {
      alert("Name and file are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      const response = await fetch("/api/destinations/add_destination", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Destination added successfully");
        // Optionally, reset form or fetch updated data
        setName("");
        setFile(null);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to add destination");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6">
      {/* Title */}
      <p className="text-4xl font-semibold text-gray-100">Destinations</p>

      <div className="mt-10 flex flex-col md:flex-row gap-8">
        {/* Left Section (1/4) */}
        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl text-gray-100">Add Destination</p>
          <br />
          <form onSubmit={handleSubmit}>
            {/* Text Input */}
            <div className="mb-6">
              <Label text="Name" htmlFor="name" />
              <Input
                type="text"
                required
                className="mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* File Input */}
            <div className="mb-6">
              <Label text="Upload File" htmlFor="file-upload" />
              <Input
                type="file"
                required
                className="mt-1"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-1">
              <Button
                text="Add"
                type="submit"
                bgColor="bg-blue-600"
                hoverColor="hover:bg-blue-700"
                focusColor="focus:ring-blue-300"
              />
              <Button
                text="Reset"
                type="reset"
                bgColor="bg-gray-500"
                hoverColor="hover:bg-gray-600"
                focusColor="focus:ring-gray-300"
                onClick={() => {
                  setName("");
                  setFile(null);
                }}
              />
            </div>
          </form>
        </div>

        {/* Right Section (3/4) */}
        <div className="w-full md:w-3/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl text-gray-100">Destinations</p>
          <Table>
            <TableRow className="text-gray-100 font-bold">
              <TableHead>#</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
