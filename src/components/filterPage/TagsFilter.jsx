
const TagsFilter = ({ title, data, name, selected = [], onChange }) => {

  const handleCheck = (value) => {
    if (selected.includes(value)) {
      // Retirer la valeur si déjà sélectionnée
      onChange(selected.filter((v) => v !== value));
    } else {
      // Ajouter la valeur
      onChange([...selected, value]);
    }
  };

  return (
    <div className="w-full">
      {/* title------------------------------ */}
      <div className='text-end mb-6'>
        <p className='text-[#7695FF] text-3xl mb-2'>{title}</p>
        <p className='rubriqueTitle'></p>
      </div>

      {/* tags part------------------------- */}
      <div dir="rtl" className="flex items-center flex-wrap mb-10">
        {data.map((el, index) => (
          <label
            key={index}
            className={`flex items-center justify-center my-4 md:my-6 ml-8 px-3 py-2 text-lg rounded-[12px] cursor-pointer duration-300
              ${selected.includes(el.info) ? "bg-blue text-white" : "bg-[#7695FF1A] text-[#262F82] hover:bg-blue hover:text-white active:bg-[#262F82]"}`}
          >
            <input
              type="checkbox"
              name={name}
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

export default TagsFilter;