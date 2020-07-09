import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  FormEvent,
  MouseEvent,
} from "react";

import TextField from "../../atoms/TextField";
import { Container, Suggestions, Suggestion } from "./styles";
import getSearchMockData from "lib/getSearchMockData";

const Search = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const [focusedIndex, setFocusedIndex] = useState(0);

  const [hideResultsBox, setHideResultsBox] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // getSearchMockData is simulating fetching data with searchValue as query
    if (searchValue.length >= 3) {
      const newSuggestions = getSearchMockData(searchValue);
      setSuggestions(newSuggestions);
    }
    if (searchValue.length === 0) {
      setSuggestions([]);
    }
  }, [searchValue]);

  const handleTextChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFocusedIndex(0);
    setHideResultsBox(false);
    setSearchValue(target.value.toLowerCase());
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 40 && focusedIndex < suggestions.length) {
      setFocusedIndex(focusedIndex + 1);
    }
    if (event.keyCode === 38 && focusedIndex > 0) {
      event.preventDefault();
      setFocusedIndex(focusedIndex - 1);
    }
    if (event.keyCode === 13) {
      handleSelectSuggestion();
      setHideResultsBox(true);
    }
  };

  const handleSelectSuggestion = () => {
    if (focusedIndex > 0) {
      setSearchValue(suggestions[focusedIndex - 1].toLowerCase());
      setFocusedIndex(0);
    }
  };

  const handleMouseEnter = (index: number) => {
    setFocusedIndex(index);
  };

  const handleOnClickOutside = (event: MouseEvent) => {
    const eventTarget = event.target as HTMLDivElement;
    if (inputRef.current?.contains(eventTarget)) {
      // inside click
      return;
    }

    setHideResultsBox(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // execute statements for submission here
  };

  return (
    <Container
      onSubmit={handleSubmit}
      onClick={handleOnClickOutside}
      data-testid="search-component"
    >
      <h3 data-testid="search-value-text">
        You are searching for{" "}
        {searchValue ? <mark>{searchValue}</mark> : "... ?"}
      </h3>
      <TextField
        placeholder="Search fruit"
        autoFocus
        data-testid="search-field"
        tabIndex={0}
        ref={inputRef}
        value={
          focusedIndex
            ? suggestions[focusedIndex - 1].toLowerCase()
            : searchValue
        }
        width={"50%"}
        height={"50px"}
        onKeyDown={handleKeyDown}
        fontSize="16px"
        onChange={handleTextChange}
      />
      {!hideResultsBox && (
        <Suggestions
          width={"50%"}
          onMouseLeave={() => handleMouseEnter(0)}
          data-testid="suggestion-box"
        >
          {suggestions.map((value, index) => {
            const splitSuggestion = value.split(searchValue, 2);
            const tabIndex = index + 1;

            return (
              <Suggestion
                data-testid={`suggestion-${tabIndex}`}
                focused={focusedIndex === tabIndex}
                onMouseEnter={() => handleMouseEnter(tabIndex)}
                onKeyDown={handleKeyDown}
                key={`${value}${index}`}
                tabIndex={tabIndex}
                onClick={handleSelectSuggestion}
              >
                {splitSuggestion[0]}
                <b>{searchValue}</b>
                {splitSuggestion[1]}
              </Suggestion>
            );
          })}
        </Suggestions>
      )}
    </Container>
  );
};

export default Search;
