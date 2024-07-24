import { RoutineType } from "./types/routine.type";

export const createRoutine = async (routine: RoutineType) => {
    try {
        const response = await fetch('http://localhost:3000/api/protected/routines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "credentials": "include"
            },
            body: JSON.stringify(routine)
        })
        return response.json();    
    } catch (e) {
        console.error(e);
    }
}