'use client';

import { useState, useEffect } from 'react';
import Input from '@/app/components/form/input';
import Button from '@/app/components/form/button';
import Label from '@/app/components/form/label';
import Textarea from '@/app/components/form/textarea';
import { Table, TableRow, TableHead, TableCell, TableBody } from '@/app/components/table';
import ToastNotification from '@/app/components/toast_notification';

const PackagesPage = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState('');
  const [activityInput, setActivityInput] = useState('');
  const [locationToasts, setLocationToasts] = useState<string[]>([]);
  const [activityToasts, setActivityToasts] = useState<string[]>([]);
  const [packages, setPackages] = useState<any[]>([]); // State to store package data

  // Fetch packages from the API on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages/get_all_packages');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        setPackages(data.packages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  function handleAddPackage(): void {
    console.log('Activities:', activities);
    console.log('Locations:', locations);
  }

  return (
    <div className="p-6">
      {/* Title */}
      <p className="text-4xl font-semibold text-gray-100">Packages</p>

      <div className="mt-10 flex flex-col md:flex-row gap-8">
        {/* Left Section (1/4) */}
        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl font-medium text-gray-700 dark:text-gray-100">
            Add Package
          </p>
          <br />
          <form>
            {/* Package Name */}
            <div className="mb-6">
              <Label text="Package Name" htmlFor="package-name" />
              <Input
                type="text"
                placeholder="Enter package name"
                required
                className="mt-1"
              />
            </div>

            {/* Price */}
            <div className="mb-6">
              <Label text="Price" htmlFor="price" />
              <Input
                type="number"
                placeholder="Enter price"
                required
                min={0}
                className="mt-1"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <Label text="Upload Image" htmlFor="image-upload" />
              <Input type="file" required className="mt-1" accept="image/*" />
            </div>

            {/* Description */}
            <div className="mb-6">
              <Label text="Description" htmlFor="description" />
              <Textarea
                placeholder="Enter package description"
                rows={4}
                required
                className="mt-1"
              />
            </div>

            {/* Locations */}
            <div className="mb-6 relative">
              <Label text="Locations" htmlFor="locations" />
              {locationToasts.map((location, index) => (
                <ToastNotification
                  key={index}
                  message={location}
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
                required
                className="mt-1"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />
            </div>

            {/* Activities */}
            <div className="mb-6 relative">
              <Label text="Activities" htmlFor="activities" />
              {activityToasts.map((activity, index) => (
                <ToastNotification
                  key={index}
                  message={activity}
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
                required
                className="mt-1"
                value={activityInput}
                onChange={(e) => setActivityInput(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                text="Add"
                bgColor="bg-blue-600"
                hoverColor="hover:bg-blue-700"
                focusColor="focus:ring-blue-300"
                onClick={handleAddPackage}
              />
              <Button
                text="Reset"
                bgColor="bg-gray-500"
                hoverColor="hover:bg-gray-600"
                focusColor="focus:ring-gray-300"
                onClick={() => {
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

        {/* Right Section (3/4) */}
        <div className="w-full md:w-3/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl text-gray-100 mb-4">Packages</p>
          <Table>
            <TableRow className="text-gray-100 font-bold">
              <TableHead>#</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Order</TableHead>
            </TableRow>
            <TableBody>
              {packages.map((pkg, index) => (
                <TableRow key={pkg.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{pkg.id}</TableCell>
                  <TableCell>{pkg.name}</TableCell>
                  <TableCell>{pkg.price}</TableCell>
                  <TableCell>
                    <img
                      src={pkg.image_link}
                      alt={pkg.name}
                      className="w-16 h-16 object-cover"
                    />
                  </TableCell>
                  <TableCell>{pkg.description}</TableCell>
                  <TableCell>{pkg.index}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
