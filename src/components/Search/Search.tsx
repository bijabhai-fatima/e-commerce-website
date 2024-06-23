import React, { useState } from "react"
import "./Search.css"
import searchIcon from "../../assets/searchIcon.png"

type SearchProp = {
    calldata: (e: string) => void
}

const Search = ({ calldata }: SearchProp) => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            calldata(searchQuery)
        }
    }
    return (
        <div className="search-section-container">
            <div className="searchIcon-container">
                <img src={searchIcon} onClick={() => calldata(searchQuery)} />
            </div>
            <div className="inputfeild-container">
                <input
                    type="text"
                    placeholder="search here.."
                    onKeyDown={(e) => handleKeypress(e)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                />
            </div>
        </div>
    )
}

export default Search
