import React, { useState, useEffect } from "react";
import ReactLargeDropdown from "../react-large-dropdown";
import { getNaf } from "./commons-stories";
import "./custom-dropdown.scss";

export function SimpleDropdown() {
  const [data, setData] = useState([]);

  useEffect(function () {
    async function init() {
      const naf = await getNaf();
      const list = Object.values(naf).map(function (poste) {
        const { code, libelle } = poste;

        return {
          code,
          libelle,
          label: `${code} - ${libelle}`,
          value: code,
          __width: libelle.length * 10,
          __height: 20,
        };
      });
      setData(list);
    }
    init();
  }, []);

  return (
    <>
      <p>ppppppppppppppppppppppppppppppppppppppp</p>
      <ReactLargeDropdown
        className="custom-dropdown"
        list={data}
        writable={true}
      />
      <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      <ReactLargeDropdown
        className="custom-dropdown"
        list={data}
        writable={false}
      />
    </>
  );
}

export default {
  title: "react-large-dropdown",
  component: ReactLargeDropdown,
  argTypes: {},
};
