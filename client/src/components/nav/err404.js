import React from "react";
import { useLocation } from "react-router-dom";

export default function Err404() {
  let location = useLocation();

  return (
    <div>
      <h3>
        Nie ma takiej strony: <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
