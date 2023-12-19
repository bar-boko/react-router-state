import {Deserializer, RouterStateHook, Serializer} from "../../@types/models";
import {Dispatch, useCallback, useContext, useMemo} from "react";
import {useSearchParams} from "react-router-dom";

export interface RouterSearchParamOptions<T> {
    name: string;
    defaultValue: T;
    serializer: Serializer<T>;
    deserializer: Deserializer<T>;
}

export const useRouterSearchParam = <T>(options: RouterSearchParamOptions<T>): RouterStateHook<T> => {
    const { name, defaultValue, serializer, deserializer } = options;
    const [searchParams, setSearchParams] = useSearchParams();

    const value: T = useMemo(() => {
        const param = searchParams.get(name);

        if (!param) {
            return defaultValue;
        }

        try {
            return deserializer(param) ?? defaultValue;
        }
        catch {
            return defaultValue;
        }
    }, [searchParams, deserializer]);

    const setValue: Dispatch<T> = useCallback((newValue: T) => {
        const serializedValue = serializer(newValue);

        searchParams.set(name, serializedValue);
        setSearchParams(searchParams.toString());
    }, []);

    return [value, setValue];
};
