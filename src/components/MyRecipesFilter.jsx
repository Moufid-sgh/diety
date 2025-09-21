import { firstTagFilter } from "@/lib/tagsData";
import { useEffect } from "react";

const MyRecipesFilter = ({ selected = "", onChange }) => {

 const handleCheck = (value) => {
    if (selected === value) {
      onChange(""); 
    } else {
      onChange(value); 
    }
  };


  return (
    <div className="w-full">

      <div dir="rtl" className="flex items-center flex-wrap">
        
        <label
          className={`flex items-center justify-center my-2 lg:my-4 md:my-6 ml-6 px-2 lg:px-3 py-2 text-base lg:text-lg rounded-[12px] cursor-pointer duration-300
            ${selected === "" ? "bg-blue text-white" : "bg-[#7695FF1A] text-[#262F82] hover:bg-blue hover:text-white active:bg-[#262F82]"}`}
        >
          <input
            type="radio"
            checked={selected === ""} 
            onChange={() => handleCheck("")} 
            className="hidden"
          />
          <p>كل وصفاتي❤️</p>
        </label>

        {firstTagFilter.map((el, index) => (
          <label
            key={index}
            className={`flex items-center justify-center my-2 lg:my-4 md:my-6 ml-4 lg:ml-6 px-2 lg:px-3 py-2 text-base lg:text-lg rounded-[12px] cursor-pointer duration-300
              ${(selected.includes(el.info) ||  selected === "كل وصفاتي") ? "bg-blue text-white" : "bg-[#7695FF1A] text-[#262F82] hover:bg-blue hover:text-white active:bg-[#262F82]"}`}
          >
            <input
              type="radio"
              value={el.info}
              checked={selected.includes(el.info)}
              onChange={() => handleCheck(el.info)}
              className="hidden"
            />
            <p>{el.info}</p>
            <img src={el.icon} alt="img" className="size-6 mr-3" />
          </label>
        ))}
      </div>
    </div>
  );
};

export default MyRecipesFilter;