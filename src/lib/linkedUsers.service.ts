export const postLinkedUser = async (
  data: {
    email: string;
    password: string;
  },
  id: string,
) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/protected/users/${id}/linkedUsers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const response = await res.json();
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getLinkedUsers = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/protected/users/${id}/linkedUsers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const response = await res.json();
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
