import {style} from "@vanilla-extract/css";

export const appLink = style({
    backgroundColor: '#0857c3',
    padding: '5px',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '5px',
    textDecoration: 'none',
    selectors: {
        '&:not(:last-child)': {
            marginRight: '10px',
        },
    },
});

export const pattern = style({
    fontSize: '20px',
    color: 'black',
    backgroundColor: '#ddd',
    padding: '10px',
    borderRadius: '10px',
});

export const routerNavbarWrapper = style({
    selectors: {
        '& > :not:(:last-child)': {
            marginBottom: '10px',
        },
    },
});

export const routesWrapper = style({
    marginTop: '10px',
});


