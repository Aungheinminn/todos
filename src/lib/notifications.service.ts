export const getNotifications = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/protected/notifications/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const response = await res.json();
    console.log("notifications", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const getPendingNotifications = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/protected/notifications/${id}/pending`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const response = await res.json();
    console.log("notifications", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
