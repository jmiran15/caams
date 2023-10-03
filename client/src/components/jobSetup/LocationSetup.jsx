import React, { useContext } from "react";

import { Group, Radio, Stack } from "@mantine/core";
import { Autocomplete } from "@mantine/core";
import { useRef, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { StatusContext } from "../../context/JobStatusContext";

export default function LocationSetup({
  isRemote,
  setIsRemote,
  location,
  setLocation,
}) {
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [type, setType] = useState(isRemote ? "remote" : "specific");
  const status = useContext(StatusContext);

  // this is probably uneccesary rerenders, should change in db
  useEffect(() => {
    if (type === "remote") {
      setIsRemote(true);
    }
  }, [type, setIsRemote]);

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

    const encoded = encodeURIComponent(location);
    const url = `https://api.teleport.org/api/cities/?search=${encoded}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let new_data = [];
        data["_embedded"]["city:search-results"].forEach((item) => {
          new_data.push(item["matching_full_name"]);
        });
        setSuggestedLocations(new_data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });

  const onChange = (e) => {
    const value = e;
    setLocation(value);
    debouncedRequest();
  };

  return (
    <Stack>
      <Radio.Group
        value={type}
        onChange={setType}
        name="location"
        label="Where should candidates be located?"
        size="md"
      >
        <Group mt="xs">
          <Radio
            value="specific"
            label="Specific location"
            disabled={status?.status ? status.status !== "draft" : false}
          />
          <Radio
            value="remote"
            label="Remote"
            disabled={status?.status ? status.status !== "draft" : false}
          />
        </Group>
      </Radio.Group>

      {type === "specific" && (
        <div>
          <Autocomplete
            size="md"
            label="Job Location"
            placeholder="Start typing a location"
            data={suggestedLocations}
            limit={5}
            value={location}
            onChange={onChange}
            disabled={status?.status ? status.status !== "draft" : false}
          />
        </div>
      )}
    </Stack>
  );
}
