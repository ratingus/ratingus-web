import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type TResolutionVariants = "isMobile" | "isDesktop";
type TMediaQueryList = Record<TResolutionVariants, MediaQueryList>;
type TUseMediaResult = Record<TResolutionVariants, boolean>;

export const getUserDeviceType = () => Cookies.get("service_information");
export const isBrowserContext = (): boolean => "undefined" !== typeof window;

const breakpoints = {
  xl: 1440,
  lg: 1024,
};

const useResolutionBase = () => {
  if (!isBrowserContext()) {
    return getServerMedia();
  }

  return getClientMedia();
};

const MIN_OFFSET = 1;
const RESOLUTIONS = {
  isMobile: `(max-width: ${breakpoints.lg - MIN_OFFSET}px)`,
  isDesktop: `(min-width: ${breakpoints.lg}px)`,
};

const useClientResolutionsData = () => {
  const initialMediaData = useResolutionBase();
  const [data, setData] = useState(initialMediaData);

  /** Подписываемся на обновления состояний при изменении размеров окна. */
  useEffect(() => {
    let mounted = true;

    const mediaQueryList = Object.entries(RESOLUTIONS).reduce<TMediaQueryList>(
      (result, [queryName, query]) => {
        result[queryName as TResolutionVariants] = window.matchMedia(query);

        return result;
      },
      {} as TMediaQueryList,
    );

    const getCurrentValue = () => {
      const mactchedQueries = Object.entries(
        mediaQueryList,
      ).reduce<TUseMediaResult>((result, [queryName, mql]) => {
        result[queryName as TResolutionVariants] = mql.matches;

        return result;
      }, {} as TUseMediaResult);

      return mactchedQueries;
    };

    const onChange = () => {
      if (!mounted) {
        return;
      }

      setData(getCurrentValue);
    };

    Object.values(mediaQueryList).forEach((mql) => {
      mql.addListener(onChange);

      return () => {
        mounted = false;
        mql.removeListener(onChange);
      };
    });
  }, []);

  return data;
};

const useResolution = () => {
  const resolutions = getServerMedia();

  const clientResolutions = useClientResolutionsData();
  const [state, setState] = useState(resolutions);

  useEffect(() => {
    Object.entries(state).forEach(([key, value]) => {
      if (
        isBrowserContext() &&
        clientResolutions[key as keyof typeof clientResolutions] !== value
      ) {
        setState(clientResolutions);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState(clientResolutions);
  }, [clientResolutions]);

  return state;
};

function getServerMedia() {
  const device = getUserDeviceType();

  return {
    isMobile: device === "mobile",
    isDesktop: device === "desktop",
  };
}

function getClientMedia() {
  return Object.entries(RESOLUTIONS).reduce<TUseMediaResult>(
    (result, [queryName, query]) => {
      result[queryName as TResolutionVariants] =
        window.matchMedia(query).matches;

      return result;
    },
    {} as TUseMediaResult,
  );
}

export default useResolution;
