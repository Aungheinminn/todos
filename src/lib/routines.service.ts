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
        const res = await response.json();
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const getRoutinesByPlanId = async (plan_id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/protected/routines/plan/${plan_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "credentials": "include"
            }
        })
        const res = await response.json();
        return res.data;    
    } catch (e) {
        console.error(e);
    }
}