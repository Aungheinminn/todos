export const postLinkedUser = async ({
  id,
  email,
  password,
}: {
  id: string;
  email: string;
  password: string;
}) => {
  const data = {
    email,
    password,
  };
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
    // const response = await res.json();
    return res.json();
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

export const declineLinking = async ({
  currentUserId,
  linkedUserId,
  declinedBy,
}:{
   currentUserId: string;
    linkedUserId: string;
    declinedBy: string;
  }
) => {
  const data = {
    linkedUserId,
    declinedBy,
  };
  try {
    const res = await fetch(
      `http://localhost:3000/api/protected/users/${currentUserId}/linkedUsers/decline`,
      {
        method: "DELETE",
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

export const acceptLinking = async (
  {

  currentUserId,
  linkedUserId,
  newStatus
  }: {
    currentUserId: string;
    linkedUserId: string;
    newStatus: string;
  }
) => {
  try {
    const data = {
      linkedUserId,
      newStatus,
    };
    const res = await fetch(
      `http://localhost:3000/api/protected/users/${currentUserId}/linkedUsers/accept`,
      {
        method: "PUT",
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
