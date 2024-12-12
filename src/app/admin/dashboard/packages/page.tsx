import Input from "@/app/components/form/input";
import Button from "@/app/components/form/button";
import Label from "@/app/components/form/label";
import Textarea from "@/app/components/form/textarea";
import { Table, TableRow, TableHead } from "@/app/components/table";

const PackagesPage = () => {
  return (
    <div className="p-6">
      {/* Title */}
      <p className="text-4xl font-semibold text-gray-100">Packages</p>

      <div className="mt-10 flex flex-col md:flex-row gap-8">
        {/* Left Section (1/4) */}
        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl font-medium text-gray-700 dark:text-gray-100">Add Package</p>
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
              <Input
                type="file"
                required
                className="mt-1"
                accept="image/*"
              />
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
            <div className="mb-6">
              <Label text="Locations" htmlFor="locations" />
              <Input
                type="text"
                placeholder="Enter locations"
                required
                className="mt-1"
              />
            </div>

            {/* Activities */}
            <div className="mb-6">
              <Label text="Activities" htmlFor="activities" />
              <Input
                type="text"
                placeholder="Enter activities"
                required
                className="mt-1"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                text="Add"
                bgColor="bg-blue-600"
                hoverColor="hover:bg-blue-700"
                focusColor="focus:ring-blue-300"
              />
              <Button
                text="Reset"
                bgColor="bg-gray-500"
                hoverColor="hover:bg-gray-600"
                focusColor="focus:ring-gray-300"
              />
            </div>
          </form>
        </div>

        {/* Right Section (3/4) */}
        <div className="w-full md:w-3/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-xl text-gray-100">Packages</p>
          <Table>
            <TableRow className="text-gray-100 font-bold">
             <TableHead>#</TableHead>
             <TableHead>ID</TableHead>
             <TableHead>Name</TableHead>
             <TableHead>Price</TableHead>
             <TableHead>Image</TableHead>
             <TableHead>Description</TableHead>
             <TableHead>Locations</TableHead>
             <TableHead>Activities</TableHead>
             <TableHead>Order</TableHead>
             <TableHead>Action</TableHead>
            </TableRow>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
