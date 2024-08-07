export const createItems = async (datas: any) => {
    try{
        const res = await fetch('http://localhost:3000/api/protected/items', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "credentials": "include"
            },
            body: JSON.stringify(datas)
        })
        return res
    } catch (e) {
        console.log(e)
    }
}

export const deleteItems = async (id: string) => {
    try{
        const res = await fetch(`http://localhost:3000/api/protected/items/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "credentials": "include"
            }
        })
        return res
    } catch (e) {
        console.log(e)
    }
}

export const getItems = async () => {
    try{

    } catch (e) {
        console.log(e)
    }
}
