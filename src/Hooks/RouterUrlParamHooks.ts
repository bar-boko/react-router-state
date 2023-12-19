import {Dispatch, useCallback, useEffect, useMemo} from "react";
import {useRouterPatternContext} from "@/Components/RouterPatternProvider";
import {useRouterNavigation} from "@/Hooks/RouterNavigationHooks";
import {RouterStateHook} from "../../@types/models";

export const useRouterUrlParam = (name: string, defaultValue: string = ''): RouterStateHook => {
    const { getParamOrDefault } = useRouterPatternContext();
    const { navigateWithUpdatedParam } = useRouterNavigation();

    const value = useMemo(() => getParamOrDefault(name, defaultValue), [getParamOrDefault]);
    const setValue = useCallback((newValue: string) => {
        navigateWithUpdatedParam(name, newValue);
    }, [navigateWithUpdatedParam, name]);

    return [value, setValue];
};

export const UseRouterLocalStorageUrlParam = (name: string, defaultValue: string = ''): RouterStateHook => {
    const [value, setValue] = useRouterUrlParam(name, defaultValue);

    useEffect(() => {
        value && localStorage.setItem(name, value);
    }, [value]);

    return [value, setValue];
};
