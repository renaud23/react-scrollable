import React, { useState, useEffect } from "react";
import ReactLargeDropdown, { searchByPrefix } from "../react-large-dropdown";
import { getNaf } from "./commons-stories";
import "./custom-dropdown.scss";

function LoremParagraph() {
  return (
    <p>
      Vestibulum lacinia tempor lacus. Donec dictum ut odio at efficitur.
      Suspendisse ligula ante, efficitur ut arcu quis, varius convallis dui.
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia curae; Nunc rutrum purus elementum est semper, tincidunt tincidunt
      sapien aliquet. Integer dictum tellus et elit aliquam placerat.
    </p>
  );
}

function nafSearching(search, items) {
  const attributs = ["code", "libelle"];
  return searchByPrefix(search, items, attributs);
}

export function SimpleDropdown() {
  const [data, setData] = useState([]);

  useEffect(function () {
    async function init() {
      const naf = await getNaf();
      const list = Object.values(naf).map(function (poste) {
        const { code, libelle } = poste;
        const label = `${code} - ${libelle}`;
        return {
          code,
          libelle,
          label, // needed
          value: code, // needed
          __width: label.length, // needed
          __height: 20, // needed
        };
      });
      setData(list);
    }
    init();
  }, []);

  return (
    <>
      <label id="label-chercher-dans-la-naf">Chercher dans la Naf :</label>
      <ReactLargeDropdown
        className="custom-dropdown"
        labelledBy="label-chercher-dans-la-naf"
        list={data}
        writable={true}
        searching={nafSearching}
      />
      <LoremParagraph />
      <ReactLargeDropdown
        className="custom-dropdown"
        list={data}
        writable={false}
        onSelect={(args) => console.log(args)}
      />
      <LoremParagraph />
    </>
  );
}

export default {
  title: "react-large-dropdown",
  component: ReactLargeDropdown,
  argTypes: {},
};
