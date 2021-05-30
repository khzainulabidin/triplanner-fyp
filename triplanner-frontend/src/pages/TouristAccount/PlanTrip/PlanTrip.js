import PTWelcome from "./1_PTWelcome/PTWelcome";
import {useState} from "react";
import PTSourceDept from "./2_PTSourceDept/PTSourceDept";
import PTDestinations from "./3_PTDestinations/PTDestinations";
import PTBudget from "./4_PTBudget/PTBudget";
import PTStaysGuests from "./5_PTStaysGuests/PTStaysGuests";
import PTAddUsers from "./6_PTAddUsers/PTAddUsers";
import PTAddPlaces from "./8_PTAddPlaces/PTAddPlaces";
import PTAddHobbies from "./7_PTAddHobbies/PTAddHobbies";
import PTAddHotels from "./9_PTAddHotels/PTAddHotels";
import PTFinish from "./10_PTFinish/PTFinish";

const PlanTrip = () => {
    const [progress, setProgress] = useState(10);
    const [inputs, setInputs] = useState({
        source: {},
        departureTime: '',
        destinations: [],
        totalBudget: '',
        usingOwnCar: true,
        fuelAverage: '',
        availableBudget: '',
        timeDistances: [],
        fuelType: 'petrol',
        fuelCost: '',
        destinationIds: [],
        numberOfGuests: '',
        placesToStay: [],
        usersAccompanying: [],
        interests: [],
        suggestedPlacesToVisit: [],
        selectedRooms: [],
        privacy: 'private',
    });

    const clickNext = () => {
        if (progress <= 90){
            setProgress(progress + 10);
        }
    }

    const clickBack = () => {
        if (progress >= 10){
            setProgress(progress - 10);
        }
    }

    let content;
    if (progress === 20){
        content = <PTSourceDept progress={progress} action={clickNext} inputs={inputs} setInputs={setInputs} clickBack={clickBack}/>
    }
    else if (progress === 30){
        content = <PTDestinations progress={progress} action={clickNext} inputs={inputs} setInputs={setInputs} clickBack={clickBack}/>
    }
    else if (progress === 40){
        content = <PTBudget progress={progress} action={clickNext} inputs={inputs} setInputs={setInputs} clickBack={clickBack}/>
    }
    else if (progress === 50){
        content = <PTStaysGuests progress={progress} action={clickNext} inputs={inputs} setInputs={setInputs} clickBack={clickBack}/>
    }
    else if (progress === 60){
        content = <PTAddUsers progress={progress} action={clickNext} inputs={inputs} setInputs={setInputs} clickBack={clickBack}/>
    }
    else if (progress === 70){
        content = <PTAddHobbies progress={progress} action={clickNext} inputs={inputs} setInputs={setInputs} clickBack={clickBack}/>
    }
    else if (progress === 80){
        content = <PTAddPlaces progress={progress} action={clickNext} inputs={inputs} setInputs={setInputs} clickBack={clickBack}/>
    }
    else if (progress === 90){
        content = <PTAddHotels progress={progress} action={clickNext} inputs={inputs} setInputs={setInputs} clickBack={clickBack}/>
    }
    else if (progress === 100){
        content = <PTFinish progress={progress} inputs={inputs} setInputs={setInputs} clickBack={clickBack}/>
    }
    else {
        content = <PTWelcome progress={progress} action={clickNext}/>;
    }

    return content;
}

export default PlanTrip;
