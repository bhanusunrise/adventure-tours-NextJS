import Textarea from "@/app/components/form/textarea";
import Input from "@/app/components/form/input";
import Button from "@/app/components/form/button";
import Label from "@/app/components/form/label";

const AboutPage = () => {
  return (
    <div className="p-6">
      {/* Title */}
       <p className="text-4xl font-semibold text-gray-100">About</p>

      <div className="mt-10 flex flex-col md:flex-row gap-8">
        {/* Left Section (1/4) */}
        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
        <p className="text-xl text-gray-100">Add About</p>
        <br/>
          <form>
            {/* Textarea */}
            <div className="mb-6">
              <Label text="Description" htmlFor="description" />
              <Textarea
                placeholder="Enter a brief description..."
                rows={5}
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

        </div>
        
      </div>
    </div>
  );
};

export default AboutPage;
