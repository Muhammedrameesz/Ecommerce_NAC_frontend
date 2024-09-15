import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Container, Grid } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'Endless field of blooming sunflowers in countryside in the evening landscape',
        imgPath:
            'https://img.freepik.com/premium-photo/endless-field-blooming-sunflowers-countryside-evening-landscape_123211-346.jpg?w=740',
    },
    {
        label: 'Colorful sunset on the bridge of dream at Koh Mak island, Trat province, Thailand.',
        imgPath:
            'https://img.freepik.com/premium-photo/colorful-sunset-bridge-dream-koh-mak-island-trat-province-thailand_46740-319.jpg?w=740   ',
    },
    {
        label: 'waterfall with trees around',
        imgPath:
            'https://img.freepik.com/free-photo/waterfall-with-trees-around_1258-41.jpg?1&w=740&t=st=1710247658~exp=1710248258~hmac=cc5337b4ac41fda32c8f230c9c153d71272606570143388137384059c7e0b0e7',
    },
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
        label: 'A bridge over a lake with a bridge in the background.',
        imgPath:
            'https://img.freepik.com/premium-photo/bridge-lake-with-bridge-background_865967-196665.jpg?w=740',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
   
];

function SwipeableTextMobileStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (

    
        <Grid container 
        sx={{ display:{ },
        mt:2,
        alignItems:'center',
        justifyContent:'center'
        }}>
        <Box sx={{ maxWidth:'100%', flexGrow: 2,alignItems:'center',justifyItems:'center' }}>
            {/* <Paper
                square
                elevation={0}
                sx={{
                    display:'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
        
            </Paper> */}
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: 150,
                                    backgroundPosition: 'center', 
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover', 
                                    height: '20vh',
                                    width: '100vw',
                                    objectFit:'contain',
                                    aspectRatio:'3/4',
                                    overflow: 'hidden',
                                    width: '100%',
                                    align: 'center',

                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
        </Grid>
     
    );
}

export default SwipeableTextMobileStepper;