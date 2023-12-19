import {useRouterPatternContext} from "@/Components/RouterPatternProvider";
import {useLocation, useNavigate} from "react-router";
import {useCallback, useContext} from "react";
import {generatePath} from "react-router-dom";
import {NavigationParams} from "../../@types/models";

export const useRouterNavigation = () => {
    const { pattern, match } = useRouterPatternContext();

    const location = useLocation();
    const navigate = useNavigate();

    const navigateBack = useCallback(() => navigate(-1), [navigate]);

    const navigateDirectly = useCallback((pathname: string) => {
        navigate({
            pathname,
            search: location.search,
        }, {
            replace: true,
        })
    }, []);

    const navigateWithParams = useCallback((navigatePattern: string, params: NavigationParams) => {
        const generatedPath = generatePath(navigatePattern, params);

        navigate({
            pathname: generatedPath,
            search: location.search,
        }, {
            replace: true,
        });
    }, [navigate]);

    const navigateWithUpdatedParam = useCallback((parameter: string, value: string) => {
        if (!match?.params) {
            return;
        }

        const updatedParams: NavigationParams = {
            ...match.params,
            [parameter]: value,
        };

        navigateWithParams(pattern, updatedParams);
    }, [match, pattern, navigateWithParams]);

    return {
        navigateBack,
        navigateDirectly,
        navigateWithParams,
        navigateWithUpdatedParam,
    };
};
