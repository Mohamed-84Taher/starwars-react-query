import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";
const fetchPeople = async () => {
  const data = await fetch("https://swapi.dev/api/people");
  return data.json();
};

function Planets() {
  const { data, status } = useQuery("people", fetchPeople);

  return (
    <div>
      <h2>People</h2>
      {status === "loading" && <div>loading data</div>}
      {status === "error" && <div>Error fetching data...</div>}
      {status === "success" && (
        <div>
          {data.results.map(person => (
            <Person person={person} key={person.name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Planets;
