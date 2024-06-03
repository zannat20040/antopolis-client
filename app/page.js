"use client"
import Image from "next/image";
import Modal from "./Component/Modal";
import CatagoryModal from "./Component/CatagoryModal";
import { useEffect, useState } from "react";
import useAxiosPublic from "./Custom Hooks/useAxiosPublic";

export default function Home() {
  const axiosPublic = useAxiosPublic();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Land animal');
  const [allAnimals, setAllAnimals] = useState([]);

  useEffect(() => {
    axiosPublic.get("/allCategories")
      .then((res) => setCategoryOptions(res.data.categories))
      .catch((err) => console.log(err));

    axiosPublic.get("/allAnimals")
      .then((res) => setAllAnimals(res.data))
      .catch((err) => console.log(err));
  }, [axiosPublic]);

  const filterAnimalsByCategory = () => {
    return selectedCategory
      ? allAnimals.filter((animal) => animal.categories.includes(selectedCategory))
      : allAnimals;
  };

  return (
    <main className="container mx-auto p-10">
      <h1 className="text-white font-space text-center text-5xl">Assets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:justify-between items-start mt-20">
        <div className="flex gap-3 flex-wrap lg:col-span-2 sm:justify-start justify-center">
          {categoryOptions.map((data) => (
            <button
              key={data}
              className={`capitalize btn btn-outline rounded-full py-4 px-5 ${selectedCategory === data
                  ? 'border-green-500 text-green-500'
                  : 'border-red-500 text-red-500'
                }`}
              onClick={() => setSelectedCategory(data)}
            >
              {data}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap justify-center sm:ustify-end">
          <button
            className="btn btn-outline rounded-full text-white border-white py-4 px-5"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Add animal
          </button>
          <Modal />
          <button
            className="btn btn-outline rounded-full text-white border-white py-4 px-5"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Add category
          </button>
          <CatagoryModal />
        </div>
      </div>

      <div className="grid  grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-6 justify-between items-center mt-10">
        {filterAnimalsByCategory().map((data) => (
          <div key={data.animalName} className="h-full">
            <div className="bg-[#050505] border rounded-lg border-[#141414] h-5/6 p-4 flex gap-3 justify-center items-center">
              <Image src={data.photo_url} width={100} height={100} />
            </div>
            <p className="text-center mt-2">{data.animalName}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
