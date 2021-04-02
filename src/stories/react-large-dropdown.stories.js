import React, { useState, useEffect } from "react";
import ReactLargeDropdown, {
  searchByPrefix,
  createNafRev2Index,
  createSearchInNaf,
} from "../react-large-dropdown";
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

async function nafSearching(search, items) {
  const attributs = ["code", "libelle"];
  return searchByPrefix(search, items, attributs);
}

async function createNafIndex(naf) {
  return await createNafRev2Index(naf);
}

function NafItemRenderer({ item, search, index }) {
  const { code, libelle } = item;
  return (
    <div className="dropdown-custom-item-renderer">{`${code} - ${libelle}`}</div>
  );
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
        itemRenderer={NafItemRenderer}
        optionsHeight={26}
        panelMaxWidth={800}
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

export function SearchInNafStory() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(undefined);

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
        };
      });

      setData(list);
    }
    init();
  }, []);

  useEffect(
    function () {
      if (data && data.length) {
        async function launch() {
          const index = await createNafIndex(data);
          setIndex(index);
        }
        launch();
      }
    },
    [data]
  );
  // createSearchByWords
  const searchCallback = createSearchInNaf(index);
  return (
    <>
      {index ? (
        <div className="message ready">You can search in NAF.</div>
      ) : (
        <div className="message not-ready">Index not ready yet!</div>
      )}
      <p>
        La NAF, nomenclature d'activités française, est une nomenclature des
        activités économiques productives, principalement élaborée pour
        faciliter l'organisation de l'information économique et sociale. Afin de
        faciliter les comparaisons internationales, elle a la même structure que
        la nomenclature d'activités européenne NACE, elle-même dérivée de la
        nomenclature internationale CITI.
      </p>
      <ReactLargeDropdown
        className="custom-dropdown"
        labelledBy="label-chercher-dans-la-naf"
        list={data}
        writable={true}
        searching={searchCallback}
        itemRenderer={NafItemRenderer}
        optionsHeight={26}
        panelMaxWidth={800}
      />
    </>
  );
}

const STORY = {
  title: "react-large-dropdown",
  component: ReactLargeDropdown,
  argTypes: {},
};

export default STORY;
