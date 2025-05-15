

const SearchBar = () => {

    return (
        <div dir="rtl" className="relative mt-10 lg:mt-3">
            <input
                dir="rtl"
                type="text"
                placeholder="البحث بالاسم، أو المكونات، أو الفئة"
                className="w-full md:w-96 rounded-[4px] text-[#5E5DC099] bg-[#5E5DC00F] py-2 px-10 my-3 outline-none focus:ring-[1.5px] focus:ring-blue "
            //   value={query}
            //   onChange={(e) => setQuery(e.target.value)}
            //   onKeyDown={handleKeyDown}
            />

            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-5 right-2" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="none" stroke="#5E5DC0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0" /></svg>
        </div>
    )
}

export default SearchBar