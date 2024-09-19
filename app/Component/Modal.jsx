import React, { useEffect, useState } from "react";
import { ImageUpload } from "../Custom Hooks/ImageUpload";
import toast from "react-hot-toast";
import useAxiosPublic from "../Custom Hooks/useAxiosPublic";

const Modal = () => {
  const axiosPublic = useAxiosPublic();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fileName, setFileName] = useState("Image");
  const [file, setFile] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  useEffect(() => {
    axiosPublic
      .get("/allCategories")
      .then((res) => setCategoryOptions(res?.data?.categories))
      .catch((err) => console.log(err));
  }, [axiosPublic]);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
      setFile(event.target.files[0]);
    }
  };

  const handleLabelClick = (event) => {
    event.stopPropagation();
    document.getElementById("file").click();
  };

  const handleDivClick = () => {
    document.getElementById("file").click();
  };

  const handleCheckboxChange = (event, category) => {
    if (event.target.checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((selected) => selected !== category)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

     if (selectedCategories.length === 0) {
      setError("Please select at least one category.")
      return; 
    }


    setLoading(true);

    try {
      const animalName = event.target.animal_name.value;
      const photo_url = await ImageUpload(file);

      const data = {
        animalName,
        photo_url,
        categories: selectedCategories,
      };

      console.log("Storing in database...", data);
      await axiosPublic.post("/allAnimals", data);
      toast.success("New animal added successfully");
      event.target.reset()
      setSelectedCategories([])
      setFile(null)
      closeModal();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to add animal");
    } finally {
      setLoading(false); 
      setError('')
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_2");
    modal.close(); // Close the modal automatically after success
  };

  return (
    <div>
      <dialog id="my_modal_2" className="modal max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="modal-box flex flex-col gap-3">
          <h3 className="mb-2 text-lg text-black">Add Animal</h3>

          <input
            type="text"
            name="animal_name"
            placeholder="Animal Name"
            className="input w-full bg-[#F2F2F2] text-black py-4 px-5 placeholder:text-black "
            required
          />

          <div
            className="input w-full  relative bg-[#F2F2F2] flex items-center justify-between cursor-pointer py-4 px-5 pr-2"
            onClick={handleDivClick}
          >
            <span className="text-black  ">{fileName}</span>

            <label
              htmlFor="file"
              className="text-sm bg-[#CCCCCC] px-2 py-[6px] rounded-lg text-black cursor-pointer"
              onClick={handleLabelClick}
            >
              Upload
            </label>

            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* gett all checked value & store as a array */}
          <div className="flex gap-5 flex-wrap my-6 mb-3">
            {categoryOptions?.map((category) => (
              <div className="text-black flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox text-sm rounded"
                  onChange={(e) => handleCheckboxChange(e, category)}
                />
                <span>{category}</span>
              </div>
            ))}
          </div>

          <span className="text-xs text-red-700 font-medium">{error}</span>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-active bg-black text-white text-lg font-normal"
          >
            Create Animal
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
