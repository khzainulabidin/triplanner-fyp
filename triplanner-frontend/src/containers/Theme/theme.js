import {createMuiTheme} from "@material-ui/core";

export const theme = createMuiTheme({
    palette:{
        primary:{
            main: '#1A1A1A',
        },
        secondary:{
            main: '#04B6A9',
        },
        success:{
            main: '#FBFBFB',
        },
        action:{
            selected: '#FBFBFB',
            hover: '#FBFBFB',
            focus: '#FBFBFB',
            disabled: '#FBFBFB',
        }
    },

    shape:{
        borderRadius: 10,
    },

    overrides:{
        MuiOutlinedInput:{
            root:{
                marginBottom: 30,
                width: '100%',
            },
        },

        MuiButton:{
            root:{
                width: '30%',
                height: '40px',
                color: '#FFFFFF !important',
                textTransform: 'none',
                borderRadius: 20,
            }
        },

        MuiFormControlLabel:{
            root:{
                marginBottom: 20,
            },
            label:{
                fontSize: '0.7rem',
            }
        },

        MuiLink:{
            root:{
                color: '#04B6A9',
            }
        },

        MuiChip:{
            root:{
                marginRight: 10,
                marginTop: 10,
            },
        },

        MuiRating:{
            iconFilled: {
                color: '#585656',
            },
            iconHover: {
                color: '#585656',
            },
        }
    },

    props:{
        MuiTextField:{
            variant: 'outlined',
        },

        MuiButton:{
            variant: 'contained',
        },

        MuiFormControl:{
            variant: 'outlined',
        }
    }
});
