import React, { useEffect, useState } from "react";
import { ImageUpload } from "../Custom Hooks/ImageUpload";
import toast from "react-hot-toast";
import useAxiosPublic from "../Custom Hooks/useAxiosPublic";

const Modal = () => {
  const axiosPublic = useAxiosPublic();
  const [animalName, setAnimalName] = useState("Animal Name");
  const [fileName, setFileName] = useState("Image");
  const [file, setFile] = useState(null);

  useEffect(() => {
    axiosPublic
      .get("/allCategories")
      .then((res) => setAllCategoryOptions(res.data.categories))
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const photo_url = await ImageUpload(file);

      const data = {
        animalName,
        photo_url,
      };

      console.log("Storing in database...", data);

      await axiosPublic
        .post("/allAnimals", data)
        .then((res) => {
          console.log(res.data);
          toast.success("New animal added successfully");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <dialog id="my_modal_2" className="modal max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="modal-box flex flex-col gap-3">
          <h3 className="mb-2 text-lg text-black">Add Animal</h3>

          <input
            type="text"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            placeholder="Animal Name"
            className="input w-full bg-[#F2F2F2] text-black py-4 px-5"
            required
          />

          <div
            className="input w-full relative bg-[#F2F2F2] flex items-center justify-between cursor-pointer py-4 px-5 pr-2"
            onClick={handleDivClick}
          >
            <span className="text-black">{fileName}</span>

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

          <button
            type="submit"
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
