const url = "http://localhost:5000/api/v1/daily-log/";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("The token could not be found in getAuthHeaders");
  }

  return `Bearer ${token}`;
};

export const dailyLogFetch = async (date) => {
  try {
    const response = await fetch(`${url}${date}`, {
      headers: {
        Authorization: getAuthHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error("Could not fetch daily log", response.status);
    }

    return response.json();
  } catch (error) {
    throw new Error({ message: "Could not fetch daily log", error });
  }
};

export const dailyLogUpdate = async (id, payload) => {
  try {
    const response = await fetch(`${url}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });
    if (!response) {
      throw new Error("There was an error fetching the request");
    }

    return response.json();
  } catch (error) {
    throw new Error(error, "Error updating daily log FE");
  }
};

export const dailyLogDelete = () => {};

export const dailyLogCreate = async (payload) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        "There was an error with the response when updating the daily log",
      );
    }

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const dailyLogFetchAll = () => {};
