import React, { useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../Custom Hooks/useAxiosPublic";

const CatagoryModal = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const catagory = event.target.Category_Name.value
    axiosPublic
      .put("/allCategories", { catagory })
      .then((res) => {
        console.log(res.data);
        toast.success("New Catagory added succesfully");
        closeModal()
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Fail to add new catagory");
        setLoading(false);
      });
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_1");
    if (modal) {
      modal.close(); 
    }
  };

  const openModal = () => {
    const modal = document.getElementById("my_modal_1");
    if (modal) {
      modal.showModal(); 
    }
  };

  return (
    <dialog onClick={openModal} id="my_modal_1" className="modal max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="modal-box flex flex-col gap-3">
        <h3 className="mb-2 text-lg text-black">Add Catagory</h3>
        <input
          type="text"
          name="Category_Name"
          placeholder="Name"
          className="input w-full bg-[#F2F2F2] text-black py-4 px-5 placeholder:text-black"
          required
        />

        <button
          type="submit"
          disabled={loading}
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
