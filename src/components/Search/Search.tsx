import Image from "next/image";
import blackSearch from '@/assets/black_search.svg'
type SearchProps = {
    search: string;
    onChange: (searchKey: string) => void;
}

const Search:React.FC<SearchProps> = ({ search, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }
    return (
        <div className="relative w-full p-1 px-2 border-2 border-gray-800  rounded-md h-[50px] flex justify-between items-center">
            <Image src={blackSearch} alt="search" width={20} height={20} />
            <input className="w-[90%] outline-none text-black" placeholder="Search by name" value={search} onChange={handleChange} />
        </div>
    )
}
export default Search