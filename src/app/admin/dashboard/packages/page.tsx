'use client';

import { useState, useEffect } from 'react';
import Input from '@/app/components/form/input';
import Button from '@/app/components/form/button';
import Label from '@/app/components/form/label';
import Textarea from '@/app/components/form/textarea';
import { Table, TableRow, TableHead } from '@/app/components/table';
import ToastNotification from '@/app/components/toast_notification';
import Modal from '@/app/components/modal';



  // Define the type for a Package object
interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  image_link: string;
  locations: Location[];
  activities: Activity[];
}

interface Location {
  name: string;
}

interface Activity {
  name: string;
}

const PackagesPage = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState('');
  const [activityInput, setActivityInput] = useState('');
  const [locationToasts, setLocationToasts] = useState<string[]>([]);
  const [activityToasts, setActivityToasts] = useState<string[]>([]);

  const [packageName, setPackageName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<string | null>(null);

  const [packages, setPackages] = useState<Package[]>([]); // Correct type for packages


   // Handle opening and closing the modal
  const openModal = (id: string) => {
    setPackageToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPackageToDelete(null);
  };

  // Handle the delete action
  const handleDeletePackage = async () => {
    if (packageToDelete) {
      try {
        const response = await fetch(`/api/packages/delete_package?id=${packageToDelete}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setToastMessage('Package deleted successfully!');
          setPackages((prevPackages) =>
            prevPackages.filter((pkg) => pkg.id !== packageToDelete)
          );
        } else {
          const data = await response.json();
          setToastMessage(data.error || 'Error deleting package.');
        }
      } catch (error) {
        console.error('Error:', error);
        setToastMessage('An unexpected error occurred.');
      } finally {
        closeModal();
      }
    }
  };


  // Handle location input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes('/')) {
      const newLocations = value
        .split('/')
        .map((loc) => loc.trim())
        .filter((loc) => loc);
      setLocations((prevLocations) => [...prevLocations, ...newLocations]);
      setLocationToasts((prevToasts) => [...prevToasts, ...newLocations]);
      setLocationInput('');
    } else {
      setLocationInput(value);
    }
  };

  // Handle activity input change
  const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes('/')) {
      const newActivities = value
        .split('/')
        .map((act) => act.trim())
        .filter((act) => act);
      setActivities((prevActivities) => [...prevActivities, ...newActivities]);
      setActivityToasts((prevToasts) => [...prevToasts, ...newActivities]);
      setActivityInput('');
    } else {
      setActivityInput(value);
    }
  };

  // Handle package addition
  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!packageName || !price || !description || !file || locations.length === 0 || activities.length === 0) {
      setToastMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', packageName);
    formData.append('price', price);
    formData.append('index', '1'); // You can dynamically set this if needed
    formData.append('description', description);
    formData.append('file', file);
    formData.append('activities', JSON.stringify(activities));
    formData.append('locations', JSON.stringify(locations));

    try {
      const response = await fetch('/api/packages/add_package', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setToastMessage('Package added successfully!');
        // Reset form fields
        setPackageName('');
        setPrice('');
        setDescription('');
        setFile(null);
        setLocations([]);
        setActivities([]);
        setLocationToasts([]);
        setActivityToasts([]);
      } else {
        const data = await response.json();
        setToastMessage(data.error || 'Error adding package.');
      }
    } catch (error) {
      console.error('Error:', error);
      setToastMessage('An unexpected error occurred.');
    }
  };


  useEffect(() => {
  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages/get_all_packages');
      if (response.ok) {
        const data = await response.json();
        setPackages(data.packages);
      } else {
        setToastMessage('Failed to load packages.');
      }
    } catch (error) {
      console.error('Error:', error);
      setToastMessage('An unexpected error occurred while fetching packages.');
    }
  };

  fetchPackages();
}, []);

  return (
    <div className="p-6">
      <p className="text-4xl font-semibold text-gray-100">Packages</p>

      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      <div className="mt-10 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl font-medium text-gray-700 dark:text-gray-100">Add Package</p>
          <br />
          <form onSubmit={handleAddPackage}>
            <div className="mb-6">
              <Label text="Package Name" htmlFor="package-name" />
              <Input
                type="text"
                placeholder="Enter package name"
                required
                className="mt-1"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <Label text="Price" htmlFor="price" />
              <Input
                type="number"
                placeholder="Enter price"
                required
                min={0}
                className="mt-1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-6">
  <Label text="Upload Image" htmlFor="image-upload" />
  <Input
    type="file"
    required
    className="mt-1"
    accept="image/*"
    onChange={(e) => {
      const selectedFile = e.target.files?.[0] || null;
      setFile(selectedFile);
    }}
  />
  {file && (
    <div className="mt-4">
      <img
        src={URL.createObjectURL(file)}
        alt="Preview"
        className="h-24 w-24 object-cover rounded-lg"
      />
    </div>
  )}
</div>


            <div className="mb-6">
              <Label text="Description" htmlFor="description" />
              <Textarea
                placeholder="Enter package description"
                rows={4}
                required
                className="mt-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-6 relative">
              <Label text="Locations" htmlFor="locations" />
              {locationToasts.map((location, index) => (
                <ToastNotification
                  key={index}
                  message={"📍 " + location}
                  onClose={() =>
                    setLocationToasts((prevToasts) =>
                      prevToasts.filter((_, i) => i !== index)
                    )
                  }
                />
              ))}
              <Input
                type="text"
                placeholder="Enter locations separated by '/'"

                className="mt-1"
                value={locationInput}
                onChange={handleLocationChange}
              />
            </div>

            <div className="mb-6 relative">
              <Label text="Activities" htmlFor="activities" />
              {activityToasts.map((activity, index) => (
                <ToastNotification
                  key={index}
                  message={"✅ " + activity}
                  onClose={() =>
                    setActivityToasts((prevToasts) =>
                      prevToasts.filter((_, i) => i !== index)
                    )
                  }
                />
              ))}
              <Input
                type="text"
                placeholder="Enter activities separated by '/'"

                className="mt-1"
                value={activityInput}
                onChange={handleActivityChange}
              />
            </div>

            <div className="flex gap-2">
              <Button
                text="Add"
                bgColor="bg-blue-600"
                hoverColor="hover:bg-blue-700"
                focusColor="focus:ring-blue-300"
                type="submit"
              />
              <Button
                text="Reset"
                bgColor="bg-gray-500"
                hoverColor="hover:bg-gray-600"
                focusColor="focus:ring-gray-300"
                onClick={() => {
                  setPackageName('');
                  setPrice('');
                  setDescription('');
                  setFile(null);
                  setLocationInput('');
                  setActivityInput('');
                  setLocations([]);
                  setActivities([]);
                  setLocationToasts([]);
                  setActivityToasts([]);
                }}
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-3/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl font-medium text-gray-700 dark:text-gray-100">All Packages</p>
          <br />
          <Table>
  <TableRow className="text-gray-100 font-bold">
    <TableHead>#</TableHead>
    <TableHead>Name</TableHead>
    <TableHead>Price</TableHead>
    <TableHead>Image</TableHead>
    <TableHead>Description</TableHead>
    <TableHead>Locations</TableHead>
    <TableHead>Activities</TableHead>
    <TableHead>Actions</TableHead>
  </TableRow>
  {packages.map((pkg, index) => (
    <TableRow key={pkg.id} className='text-gray-300'>
            <TableHead>{index + 1}</TableHead>
            <TableHead>{pkg.name}</TableHead>
            <TableHead>{pkg.price}</TableHead>
            <TableHead>
              <img src={pkg.image_link} alt={pkg.name} className="h-12 w-12 object-cover" />
            </TableHead>
            <TableHead>{pkg.description}</TableHead>
            <TableHead>
              {pkg.locations.map((loc) => loc.name).join(', ')}
            </TableHead>
            <TableHead>
              {pkg.activities.map((act) => act.name).join(', ')}
            </TableHead>
            <TableHead>
              <Button
                text="Delete"
                bgColor="bg-red-600"
                hoverColor="hover:bg-red-700"
                focusColor="focus:ring-red-300"
                onClick={() => openModal(pkg.id)} // Open modal with the package id
              />
            </TableHead>
    </TableRow>
  ))}
</Table>

        </div>
      </div>
      {/* Modal for delete confirmation */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-100">Are you sure you want to delete this package?</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              text="Cancel"
              bgColor="bg-gray-500"
              hoverColor="hover:bg-gray-600"
              focusColor="focus:ring-gray-300"
              onClick={closeModal}
            />
            <Button
              text="Confirm"
              bgColor="bg-red-600"
              hoverColor="hover:bg-red-700"
              focusColor="focus:ring-red-300"
              onClick={handleDeletePackage}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PackagesPage;
