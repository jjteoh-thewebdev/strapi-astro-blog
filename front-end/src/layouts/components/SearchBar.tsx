import React, { useRef, useState } from "react";

export type SearchItem = {
  slug: string;
  data: any;
  content: any;
};

interface Props {
  // searchList: SearchItem[];
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ placeholder, onSearch }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const handleSearch = () => {
    onSearch(inputVal);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearFilter = () => {
    setInputVal("");
    handleSearch();
  };
  // useEffect(() => {
  //   // let inputResult = inputVal.length > 2 ? [] : []; //fuse.search(inputVal) : [];
  //   // setSearchResults(inputResult);

  //   if (inputVal.length > 0) {
  //     const searchParams = new URLSearchParams(window.location.search);
  //     searchParams.set("q", inputVal);
  //     const newRelativePathQuery =
  //       window.location.pathname + "?" + searchParams.toString();
  //     history.pushState(null, "", newRelativePathQuery);
  //   } else {
  //     history.pushState(null, "", window.location.pathname);
  //   }
  // }, [inputVal]);

  return (
    <div className="w-full md:w-2/3 flex">
      {/* <div className="w-full md:w-2/3"> */}
      <input
        className="form-input w-full md:w-2/3 sm:mb-4 md:mb-0 text-left"
        placeholder={placeholder ?? "Search posts ..."}
        type="text"
        name="search"
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        autoComplete="off"
        autoFocus
        ref={inputRef}
      />
      {/* </div> */}

      <div>
        <button className="bg-white p-2 ml-4" onClick={handleClearFilter}>
          Clear filter
        </button>
      </div>

      {/* {inputVal.length > 1 && (
        <div className="my-6 text-center">
          Found {searchResults?.length}
          {searchResults?.length && searchResults?.length === 1
            ? " result"
            : " results"}{" "}
          for '{inputVal}'
        </div>
      )}

      <div className="row">
        {searchResults?.map(({ item }) => (
          <div key={item.slug} className={"col-12 mb-8 sm:col-6"}>
            {item.data.image && (
              <a
                href={`/${item.slug}`}
                className="rounded-lg block hover:text-primary overflow-hidden group"
              >
                <img
                  className="group-hover:scale-[1.03] transition duration-300 w-full"
                  src={item.data.image}
                  alt={item.data.title}
                  width={445}
                  height={230}
                />
              </a>
            )}

            <ul className="mt-6 mb-4 flex flex-wrap items-center text-text">
              <li className="mr-5 flex items-center flex-wrap font-medium">
                <BiCalendarEdit className="mr-1 h-5 w-5 text-gray-600" />
                <>{formatDate(item.data.date)}</>
              </li>
              <li className="mr-5 flex items-center flex-wrap">
                <BiCategoryAlt className="mr-1 h-[18px] w-[18px] text-gray-600" />
                <>
                  <ul>
                    {item.data.categories.map((category: string, i: number) => (
                      <li key={i} className="inline-block">
                        <a
                          href={`/categories/${slugify(category)}`}
                          className="mr-2 hover:text-primary font-medium"
                        >
                          {humanize(category)}
                          {i !== item.data.categories.length - 1 && ","}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              </li>
            </ul>

            <h3 className="mb-2">
              <a
                href={`/${item.slug}`}
                className="block hover:text-primary transition duration-300"
              >
                {item.data.title}
              </a>
            </h3>
            <p className="text-text">
              {item.content?.slice(0, Number(summary_length))}...
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
}
