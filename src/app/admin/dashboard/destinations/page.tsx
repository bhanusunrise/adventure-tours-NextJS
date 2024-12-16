"use client";

import { useState, useEffect } from "react";
import Input from "@/app/components/form/input";
import Button from "@/app/components/form/button";
import Label from "@/app/components/form/label";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/app/components/table";
import Modal from "@/app/components/modal";  // Import the Modal component

type Destination = {
  id: string;
  name: string;
  image_link: string;
  index: number;
};

const DestinationsPage = () => {
  const [addName, setAddName] = useState("");
  const [addFile, setAddFile] = useState<File | null>(null);
  const [updateName, setUpdateName] = useState("");
  const [updateFile, setUpdateFile] = useState<File | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false); // State for delete confirmation modal visibility
  const [editConfirmModal, setEditConfirmModal] = useState(false); // State for edit confirmation modal visibility
  const [destinationToDelete, setDestinationToDelete] = useState<string | null>(null); // State to hold the destination ID to delete
  const [destinationToUpdate, setDestinationToUpdate] = useState<Destination | null>(null); // State to hold the destination for update

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

  // Handle Add Form Submission
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!addName || !addFile) {
      alert("Name and file are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", addName);
    formData.append("file", addFile);

    try {
      const response = await fetch("/api/destinations/add_destination", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Destination added successfully");
        setAddName("");
        setAddFile(null);
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

  // Handle Update Form Submission
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!updateName) {
      alert("Name is required");
      return;
    }

    const formData = new FormData();
    formData.append("id", destinationToUpdate?.id || "");
    formData.append("name", updateName);
    if (updateFile) {
      formData.append("file", updateFile);
    }

    try {
      const response = await fetch("/api/destinations/update_destination", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Destination updated successfully");
        setUpdateName("");
        setUpdateFile(null);
        fetchDestinations(); // Refresh the destinations list
        setEditConfirmModal(false);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update destination");
      }
    } catch (error) {
      console.error("Error updating destination:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: string) => {
    setDestinationToDelete(id);
    setDeleteConfirmModal(true);
  };

  // Open update form modal
  const openUpdateModal = (destination: Destination) => {
    setDestinationToUpdate(destination);
    setUpdateName(destination.name);
    setEditConfirmModal(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteConfirmModal(false);
    setDestinationToDelete(null);
  };

  // Close edit confirmation modal
  const closeEditModal = () => {
    setEditConfirmModal(false);
    setDestinationToUpdate(null);
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!destinationToDelete) return;

    try {
      const response = await fetch(`/api/destinations/delete_destination?id=${destinationToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Destination deleted successfully");
        fetchDestinations(); // Refresh the destinations list
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete destination");
      }
    } catch (error) {
      console.error("Error deleting destination:", error);
      alert("An error occurred while deleting the destination.");
    } finally {
      closeDeleteModal();
    }
  };

  // Show image preview when file is selected
  const getImagePreview = (file: File | null) => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  return (
    <div className="p-6">
      <p className="text-4xl font-semibold text-gray-100">Destinations</p>

      <div className="mt-10 flex flex-col md:flex-row gap-8">
        {/* Left Section (Add Destination Form) */}
        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl text-gray-100">Add Destination</p>
          <br />
          <form onSubmit={handleAddSubmit}>
            <div className="mb-6">
              <Label text="Name" htmlFor="add-name" />
              <Input
                type="text"
                required
                className="mt-1"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <Label text="Upload File" htmlFor="add-file-upload" />
              <Input
                type="file"
                required
                className="mt-1"
                accept="image/*"
                onChange={(e) => setAddFile(e.target.files?.[0] || null)}
              />
            </div>

            {addFile && (
              <div className="mb-6">
                <p className="text-gray-500">Image Preview:</p>
                <img
                  src={getImagePreview(addFile)}
                  alt="Image Preview"
                  className="h-16 w-16 object-cover mt-2"
                />
              </div>
            )}

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
                  setAddName("");
                  setAddFile(null);
                }}
              />
            </div>
          </form>
        </div>

        {/* Right Section (Destinations List) */}
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
                      <Button
                        text="Edit"
                        bgColor="bg-yellow-600"
                        hoverColor="hover:bg-yellow-700"
                        focusColor="focus:ring-yellow-300"
                        onClick={() => openUpdateModal(destination)} // Open modal to update destination
                      />
                      <Button
                        text="Delete"
                        bgColor="bg-red-600"
                        hoverColor="hover:bg-red-700"
                        focusColor="focus:ring-red-300"
                        onClick={() => openDeleteModal(destination.id)} // Open modal for deletion
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Update Confirmation Modal */}
      <Modal isOpen={editConfirmModal} onClose={closeEditModal}>
        <div className="text-center">
          {destinationToUpdate && (
            <>
              <p className="text-xl text-gray-800">Edit Destination</p>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-6">
                  <Label text="Name" htmlFor="update-name" />
                  <Input
                    type="text"
                    required
                    className="mt-1"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <Label text="Upload File" htmlFor="update-file-upload" />
                  <Input
                    type="file"
                    className="mt-1"
                    accept="image/*"
                    onChange={(e) => setUpdateFile(e.target.files?.[0] || null)}
                  />
                </div>

                {updateFile && (
                  <div className="mb-6">
                    <p className="text-gray-500">Image Preview:</p>
                    <img
                      src={getImagePreview(updateFile)}
                      alt="Image Preview"
                      className="h-16 w-16 object-cover mt-2"
                    />
                  </div>
                )}

                <div className="mt-4 flex justify-center gap-4">
                  <Button
                    text="Cancel"
                    bgColor="bg-gray-500"
                    hoverColor="hover:bg-gray-600"
                    focusColor="focus:ring-gray-300"
                    onClick={closeEditModal}
                  />
                  <Button
                    text="Update"
                    bgColor="bg-blue-600"
                    hoverColor="hover:bg-blue-700"
                    focusColor="focus:ring-blue-300"
                    type="submit"
                  />
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteConfirmModal} onClose={closeDeleteModal}>
        <div className="text-center">
          <p className="text-xl text-gray-800">Are you sure you want to delete this destination?</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              text="Cancel"
              bgColor="bg-gray-500"
              hoverColor="hover:bg-gray-600"
              focusColor="focus:ring-gray-300"
              onClick={closeDeleteModal}
            />
            <Button
              text="Delete"
              bgColor="bg-red-600"
              hoverColor="hover:bg-red-700"
              focusColor="focus:ring-red-300"
              onClick={handleDelete} // Call delete when confirmed
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DestinationsPage;
