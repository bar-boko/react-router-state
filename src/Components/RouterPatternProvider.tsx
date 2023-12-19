import {Nullable, ParamResolver, PatternResolver} from "../../@types/models";
import {PathMatch, useLocation} from "react-router";
import {createContext, PropsWithChildren, useCallback, useContext, useMemo} from "react";
import {matchPath} from "react-router-dom";

interface RouterPatternContext {
    resolver: PatternResolver;
    pattern: string;
    match: Nullable<PathMatch<string>>;
    getParamOrDefault: ParamResolver;
}

const context = createContext({} as RouterPatternContext);

export interface RouterPatternContextProviderProps extends PropsWithChildren {
    resolver: PatternResolver;
}

const RouterPatternContextProvider = (props: RouterPatternContextProviderProps) => {
    const { resolver, children } = props;

    const location = useLocation();
    const pattern = useMemo(() => resolver(location.pathname), [resolver, location.pathname])
    const match = useMemo(() => matchPath(pattern, location.pathname), [pattern, location.pathname]);

    const getParamOrDefault = useCallback((param: string, defaultValue: string) => (
        match?.params[param] ?? defaultValue
    ), [match?.params]);

    const value: RouterPatternContext = {
        resolver,
        pattern,
        match,
        getParamOrDefault,
    };

    return (
        <context.Provider value={value}>
            { children }
        </context.Provider>
    );
};

export default RouterPatternContextProvider;

export const useRouterPatternContext = () => useContext(context);
