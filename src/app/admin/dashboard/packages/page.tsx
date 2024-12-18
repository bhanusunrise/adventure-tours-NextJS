'use client';

import { useState } from 'react';
import Input from '@/app/components/form/input';
import Button from '@/app/components/form/button';
import Label from '@/app/components/form/label';
import Textarea from '@/app/components/form/textarea';
import { Table, TableRow, TableHead } from '@/app/components/table';
import ToastNotification from '@/app/components/toast_notification';

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
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
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
        
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
