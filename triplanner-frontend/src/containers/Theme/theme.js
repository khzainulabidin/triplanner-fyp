import {createMuiTheme} from "@material-ui/core";

export const theme = createMuiTheme({
    palette:{
        primary:{
            main: '#6C46BD',
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
                color: '#FBFBFB !important',
                width: '100%',
            },
            notchedOutline:{
                borderColor: '#FBFBFB !important',
            }
        },

        MuiInputLabel:{
            root:{
                color: '#FBFBFB !important',
            }
        },

        MuiSelect:{
            icon:{
                fill: '#FBFBFB !important',
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
                color: '#FBFBFB',
                marginRight: 10,
                marginTop: 10,
            },
            deleteIcon:{
                fill: '#FBFBFB',
            },
            outlined:{
                borderColor: '#FBFBFB',
            }
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
