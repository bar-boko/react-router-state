import RouterPatternContextProvider, {useRouterPatternContext} from "@/Components/RouterPatternProvider";
import {appLink, routerNavbarWrapper, routesWrapper} from "@/Stories/RouterPatternProvider.css";
import {HashRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import {useRouterUrlParam} from "@/Hooks";
import React, {useCallback} from "react";

export default {
    title: 'Router/PatternContextProvider',
    component: RouterPatternContextProvider,
};

const RouterNavbar = () => {
    const {pattern} = useRouterPatternContext();

    return (
        <div className={routerNavbarWrapper}>
            <div className={pattern}>
                Pattern:
                &nbsp;
                { pattern }
            </div>
            <div>
                <Link className={appLink} to="/">Home</Link>
                <Link className={appLink} to="/items/5">Item 5</Link>
                <Link className={appLink} to="/bla">Unknown</Link>
            </div>
        </div>
    );
};

const ItemPage = () => {
    const [itemId, setItemId] = useRouterUrlParam('itemId');

    const navigate = useCallback(() => setItemId(`${itemId}a`), [itemId, setItemId]);

    return (
        <div>
            <button type="button" onClick={navigate}>
                Next Item
            </button>
            <span>
                Item {itemId}
            </span>
        </div>
    );
};

const resolver = (location: string): string => {
    if (location.startsWith('/items/')) {
        return '/items/:itemId';
    }

    if (location === '/') {
        return '/';
    }

    return 'NotFound';
};

export const Demo = () => {
  return (
      <HashRouter>
          <RouterPatternContextProvider resolver={resolver}>
              <RouterNavbar />
              <div className={routesWrapper}>
                  <Routes>
                      <Route path="/" element={<div>Home</div>} />
                      <Route path="/items/:itemId" element={<ItemPage />} />
                      <Route path="/NotFound" element={<div>Not Found</div>} />
                      <Route path="*" element={<Navigate to="/NotFound" replace />} />
                  </Routes>
              </div>
          </RouterPatternContextProvider>
      </HashRouter>
  )
};
