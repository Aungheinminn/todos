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
