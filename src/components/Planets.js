import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import Planet from "./Planet";
const fetchPlanets = async (key, page) => {
  const data = await fetch(`https://swapi.dev/api/planets?page=${page}`);
  return data.json();
};

function Planets() {
  const [page, setPage] = useState(1);
  const { latestData, resolvedData, status } = usePaginatedQuery(
    ["planets", page],
    fetchPlanets
  );

  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && <div>loading data</div>}
      {status === "error" && <div>Error fetching data...</div>}
      {status === "success" && (
        <>
          <button onClick={() => setPage(old => Math.max(old - 1, 1))}>
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage(old => (!latestData || !latestData.next ? old : old + 1))
            }
          >
            Next Page
          </button>
          <div>
            {resolvedData.results.map(planet => (
              <Planet planet={planet} key={planet.name} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Planets;
