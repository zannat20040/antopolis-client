import React, { useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../Custom Hooks/useAxiosPublic";

const CatagoryModal = () => {
  const axiosPublic = useAxiosPublic()
  const [catagory, setCatagory] = useState("Name");

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosPublic
      .put("/allCategories", {catagory})
      .then((res) => {
        console.log(res.data);
        toast.success("New Catagory added succesfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <dialog id="my_modal_1" className="modal max-w-sm mx-auto">

      <form onSubmit={handleSubmit} className="modal-box flex flex-col gap-3">
        <h3 className="mb-2 text-lg text-black">Add Catagory</h3>
        <input
          type="text"
          value={catagory}
          onChange={(e) => setCatagory(e.target.value)}
          placeholder="Name"
          className="input w-full bg-[#F2F2F2] text-black py-4 px-5"
          required
        />

        <button
          type="submit"
          className="btn btn-active bg-black text-white text-lg font-normal"
        >
          Save
        </button>
      </form>
      
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default CatagoryModal;
