import { useState } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

export interface MediaQuery {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}

export default function useMatchMedia(): MediaQuery {
  let xs!: MediaQueryList;
  let sm!: MediaQueryList;
  let md!: MediaQueryList;
  let lg!: MediaQueryList;
  let xl!: MediaQueryList;
  if (typeof window !== "undefined") {
    xs = window.matchMedia("(max-width: 576px)");
    sm = window.matchMedia("(min-width:577px) and (max-width: 768px)");
    md = window.matchMedia("(min-width:769px) and (max-width: 992px)");
    lg = window.matchMedia("(min-width:993px) and (max-width: 1200px)");
    xl = window.matchMedia("(min-width:1201px)");
  }

  const [value, setValue] = useState<MediaQuery>({
    xs: xs && xs.matches,
    sm: sm && sm.matches,
    md: md && md.matches,
    lg: lg && lg.matches,
    xl: xl && xl.matches,
  });

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== "undefined") {
      xs.onchange = (e) => {
        if (e.matches) setValue({ xs: true });
      };
      sm.onchange = (e) => {
        if (e.matches) setValue({ sm: true });
      };
      md.onchange = (e) => {
        if (e.matches) setValue({ md: true });
      };
      lg.onchange = (e) => {
        if (e.matches) setValue({ lg: true });
      };
      xl.onchange = (e) => {
        if (e.matches) setValue({ xl: true });
      };
    }
  }, []);

  return value;
}
