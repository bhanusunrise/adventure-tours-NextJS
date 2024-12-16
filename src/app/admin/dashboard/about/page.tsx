'use client';

import { useState, useEffect } from 'react';
import Textarea from '@/app/components/form/textarea';
import Input from '@/app/components/form/input';
import Button from '@/app/components/form/button';
import Label from '@/app/components/form/label';
import { Table, TableHead, TableRow, TableCell } from '@/app/components/table';
import Modal from '@/app/components/modal';

// Define the type for the about item
interface About {
  id: string;
  description: string;
  image_link: string;
}

const AboutPage = () => {
  // State for the Add Form
  const [addDescription, setAddDescription] = useState('');
  const [addFile, setAddFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview

  // State for the About Data
  const [abouts, setAbouts] = useState<About[]>([]); // Define the state type here

  // State for the Update Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateFile, setUpdateFile] = useState<File | null>(null);
  const [selectedAboutId, setSelectedAboutId] = useState<string | null>(null);
  const [currentImageLink, setCurrentImageLink] = useState<string | null>(null);
  const [updateImagePreview, setUpdateImagePreview] = useState<string | null>(null); // State for update image preview

  // State for the Delete Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch all about entries on component mount
  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        const response = await fetch('/api/about/get_all_abouts');
        if (response.ok) {
          const data = await response.json();
          setAbouts(data.abouts); // Assuming data.abouts is an array of About objects
        } else {
          console.error('Failed to fetch about entries');
        }
      } catch (error) {
        console.error('Error fetching about entries:', error);
      }
    };

    fetchAbouts();
  }, []);

  // Handle Add Form Submission
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!addDescription || !addFile) {
      return;
    }

    const formData = new FormData();
    formData.append('description', addDescription);
    formData.append('file', addFile);

    try {
      const response = await fetch('/api/about/add_about', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setAddDescription('');
        setAddFile(null);
        setImagePreview(null); // Reset the image preview after adding

        // Refetch data and reload image preview
        const updatedAbouts = await fetchAbouts();
        setAbouts(updatedAbouts);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Open Update Modal and Load Selected Data
  const handleUpdateClick = (about: About) => {
    setSelectedAboutId(about.id);
    setUpdateDescription(about.description);
    setCurrentImageLink(about.image_link);
    setUpdateImagePreview(about.image_link); // Set the current image as the preview
    setIsModalOpen(true);
  };

  // Handle Update Form Submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!updateDescription) {
      return;
    }

    const formData = new FormData();
    formData.append('id', selectedAboutId as string); // Use selectedAboutId
    formData.append('description', updateDescription);
    if (updateFile) formData.append('file', updateFile);

    try {
      const response = await fetch(`/api/about/update_about?id=${selectedAboutId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        // If a new image was uploaded, delete the old image
        if (updateFile && currentImageLink) {
          await fetch(`/api/about/delete_image?image_path=${currentImageLink}`, {
            method: 'DELETE',
          });
        }

        // Close the modal and reset states
        setIsModalOpen(false);
        setUpdateDescription('');
        setUpdateFile(null);
        setSelectedAboutId(null);
        setCurrentImageLink(null);
        setUpdateImagePreview(null);

        // Refetch data and reload image preview
        const updatedAbouts = await fetchAbouts();
        setAbouts(updatedAbouts);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to fetch about entries
  const fetchAbouts = async () => {
    try {
      const response = await fetch('/api/about/get_all_abouts');
      if (response.ok) {
        const data = await response.json();
        return data.abouts;
      } else {
        console.error('Failed to fetch about entries');
        return [];
      }
    } catch (error) {
      console.error('Error fetching about entries:', error);
      return [];
    }
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setUpdateDescription('');
    setUpdateFile(null);
    setSelectedAboutId(null);
    setCurrentImageLink(null);
    setUpdateImagePreview(null);
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAboutId(null);
  };

  // Handle Delete Request
  const handleDelete = async () => {
    if (!selectedAboutId) return;

    try {
      const response = await fetch(`/api/about/delete_about?id=${selectedAboutId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted about from the state
        setAbouts(abouts.filter(about => about.id !== selectedAboutId));

        // Refetch data and reload image preview
        const updatedAbouts = await fetchAbouts();
        setAbouts(updatedAbouts);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    closeDeleteModal();
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (id: string) => {
    setSelectedAboutId(id);
    setIsDeleteModalOpen(true);
  };

  // Handle Image File Selection for Add Form
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAddFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Image File Selection for Update Form
  const handleUpdateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUpdateFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdateImagePreview(reader.result as string); // Set image preview for update
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Clear Button click for Add Form
  const handleClear = () => {
    setAddDescription('');
    setAddFile(null);
    setImagePreview(null); // Reset the image preview after clearing
  };

  return (
    <div className="p-6">
      {/* Title */}
      <p className="text-4xl font-semibold text-gray-100">About</p>

      <div className="mt-10 flex flex-col md:flex-row gap-8">
        {/* Left Section (1/4) - Add About Form */}
        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl text-gray-100">Add About</p>
          <br />
          <form onSubmit={handleAdd}>
            <div className="mb-6">
              <Label text="Description" htmlFor="add-description" />
              <Textarea
                placeholder="Enter a brief description..."
                rows={5}
                required
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <Label text="Upload File" htmlFor="add-file" />
              <Input
                type="file"
                required
                accept="image/*"
                onChange={handleFileChange} // Handle file change
              />
              {/* Display the image preview */}
              {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mt-2" />}
            </div>

            <div className="space-x-1">
              <Button
                text="Add"
                bgColor="bg-blue-600"
                hoverColor="hover:bg-blue-700"
                focusColor="focus:ring-blue-500" // Add focusColor prop
                type="submit"
              />
              <Button
                text="Clear"
                bgColor="bg-gray-500"
                hoverColor="hover:bg-gray-600"
                focusColor="focus:ring-gray-500" // Add focusColor prop
                onClick={handleClear}
              />
            </div>
          </form>
        </div>

        {/* Right Section (3/4) - About Descriptions Table */}
        <div className="w-full md:w-3/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl text-gray-100 mb-4">About Descriptions</p>
          <Table>
            <TableRow className="text-gray-100 font-bold">
              <TableHead>#</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>

            {abouts.length > 0 ? (
              abouts.map((about, index) => (
                <TableRow key={about.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{about.id}</TableCell>
                  <TableCell>
                    <img src={about.image_link} alt={about.description} className="w-32 h-32 object-cover" />
                  </TableCell>
                  <TableCell>{about.description}</TableCell>
                  <TableCell>
                    <Button
                      text="Update"
                      bgColor="bg-green-600"
                      hoverColor="hover:bg-green-700"
                      focusColor="focus:ring-green-500" // Add focusColor prop
                      onClick={() => handleUpdateClick(about)}
                    />
                    <Button
                      text="Delete"
                      bgColor="bg-red-600"
                      hoverColor="hover:bg-red-700"
                      focusColor="focus:ring-red-500" // Add focusColor prop
                      onClick={() => openDeleteModal(about.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-100">
                  No about entries found.
                </TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </div>

      {/* Update Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleUpdate}>
          <div className="mb-6">
            <Label text="Description" htmlFor="update-description" />
            <Textarea
              placeholder="Update description..."
              rows={5}
              required
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <Label text="Upload File" htmlFor="update-file" />
            <Input
              type="file"
              accept="image/*"
              onChange={handleUpdateFileChange} // Handle file change for update
            />
            {/* Display the update image preview */}
            {updateImagePreview && (
              <img
                src={updateImagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover mt-2"
              />
            )}
          </div>

          <div className="space-x-1">
            <Button
              text="Update"
              bgColor="bg-blue-600"
              hoverColor="hover:bg-blue-700"
              focusColor="focus:ring-blue-500" // Add focusColor prop
              type="submit"
            />
            <Button
              text="Cancel"
              bgColor="bg-gray-500"
              hoverColor="hover:bg-gray-600"
              focusColor="focus:ring-gray-500" // Add focusColor prop
              onClick={closeModal}
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <p className="text-gray-100">Are you sure you want to delete this about entry?</p>
        <div className="mt-4 space-x-1">
          <Button
            text="Yes"
            bgColor="bg-red-600"
            hoverColor="hover:bg-red-700"
            focusColor="focus:ring-red-500" // Add focusColor prop
            onClick={handleDelete}
          />
          <Button
            text="No"
            bgColor="bg-gray-500"
            hoverColor="hover:bg-gray-600"
            focusColor="focus:ring-gray-500" // Add focusColor prop
            onClick={closeDeleteModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AboutPage;
