import React from "react";
import { Autocomplete } from "@mantine/core";
import { useRef, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

const EducationAutoComplete = (props) => {
  const [suggestedEducations, setSuggestedEducations] = useState([]);

  const useDebounce = (callback) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
      const func = () => {
        ref.current?.();
      };

      return debounce(func, 500);
    }, []);

    return debouncedCallback;
  };

  const debouncedRequest = useDebounce(() => {
    // send request to the backend
    // access to latest state here

    const encoded = encodeURIComponent(props.value);
    const url = `http://universities.hipolabs.com/search?name=${encoded}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //take the first 5 results
        const firstFive = data.slice(0, 5);
        let suggestions = [];
        firstFive.forEach((element) => {
          suggestions.push(element.name);
        });
        setSuggestedEducations(suggestions);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });

  return (
    <div>
      <Autocomplete
        withAsterisk
        label="School name"
        placeholder="Johns Hopkins University"
        data={suggestedEducations}
        limit={4}
        value={props.value}
        error={props.error}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onChange={(value) => {
          props.form.setFieldValue("school", value);
          debouncedRequest();
        }}
      />
    </div>
  );
};

export default EducationAutoComplete;
