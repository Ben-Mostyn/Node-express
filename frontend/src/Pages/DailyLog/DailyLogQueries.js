const url = "http://localhost:5000/api/v1/daily-log/";
const token = localStorage.getItem("token");

export const dailyLogFetch = async (date) => {
  try {
    const response = await fetch(`${url}${date}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const dailyLogUpdate = () => {};

export const dailyLogDelete = () => {};

export const dailyLogCreate = async (payload) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        "There was an error with the response when updating the daily log"
      );
    }

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const dailyLogFetchAll = () => {};
