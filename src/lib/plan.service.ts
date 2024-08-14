export const postPlans = async (data: any) => {
    try {
        const response = await fetch('http://localhost:3000/api/protected/plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        return response.json();
    } catch (e) {
        console.error(e);
    }
}

export const getPlans = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/protected/plans', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const res = await response.json();
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const getPlanById = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/protected/plans/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const res = await response.json();
        return res.data;
    } catch (e) {
        console.error(e);
    }
} 

export const getPlansByUser = async (user_id: string) => {
    console.log(user_id, 'user_id');
    try {
        const response = await fetch(`http://localhost:3000/api/protected/plans/user/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const res = await response.json();
        return res.data;
    } catch (e) {
        console.error(e);
    }
}