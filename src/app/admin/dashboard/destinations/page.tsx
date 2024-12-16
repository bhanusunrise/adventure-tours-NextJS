"use client";

import { useState, useEffect } from "react";
import Input from "@/app/components/form/input";
import Button from "@/app/components/form/button";
import Label from "@/app/components/form/label";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/app/components/table";

type Destination = {
  id: string;
  name: string;
  image_link: string;
  index: number;
};

const DestinationsPage = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/destinations/get_all_destinations");
      if (response.ok) {
        const data = await response.json();
        setDestinations(data.destinations);
      } else {
        alert("Failed to fetch destinations");
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      alert("An error occurred while fetching destinations.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch destinations on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

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
        setName("");
        setFile(null);
        fetchDestinations(); // Refresh the destinations list
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

          {loading ? (
            <p className="text-gray-100">Loading...</p>
          ) : (
            <Table>
              <TableRow className="text-gray-100 font-bold">
                <TableHead>#</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>

              <TableBody>
                {destinations.map((destination, index) => (
                  <TableRow key={destination.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{destination.id}</TableCell>
                    <TableCell>
                      <img
                        src={destination.image_link}
                        alt={destination.name}
                        className="h-16 w-16 object-cover"
                      />
                    </TableCell>
                    <TableCell>{destination.name}</TableCell>
                    <TableCell>{destination.index}</TableCell>
                    <TableCell>
                      {/* Add action buttons here if needed */}
                      <Button
                        text="Delete"
                        bgColor="bg-red-600"
                        hoverColor="hover:bg-red-700"
                        focusColor="focus:ring-red-300"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
