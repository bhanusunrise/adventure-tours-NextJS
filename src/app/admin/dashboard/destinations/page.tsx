import Input from "@/app/components/form/input";
import Button from "@/app/components/form/button";
import Label from "@/app/components/form/label";
import { Table, TableHead, TableRow } from "@/app/components/table";

const DestinationsPage = () => {
  return (
    <div className="p-6">
      {/* Title */}
       <p className="text-4xl font-semibold text-gray-100">Destinations</p>

      <div className="mt-10 flex flex-col md:flex-row gap-8">
        {/* Left Section (1/4) */}
        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
        <p className="text-xl text-gray-100">Add Destination</p>
        <br/>
          <form>
            {/* Textarea */}
            <div className="mb-6">
              <Label text="Name" htmlFor="name" />
              <Input
                type="text"
                required
                className="mt-1"
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
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-1">
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
