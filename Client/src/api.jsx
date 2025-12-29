const BASE_URL = `${import.meta.env.VITE_API_URL}/api/playlist`; 


export async function fetchSongs(token) {
  console.log("🔐 Token used in fetchSongs:", token);

  const response = await fetch(`${BASE_URL}/songs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch songs");
  return await response.json();
}


export async function addSong(data, token) {
  try {
    const isFormData = data instanceof FormData;

    const response = await fetch(`${BASE_URL}/songs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      body: isFormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Failed to add song");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding song:", error);
    throw error;
  }
}


export async function deleteSong(id, token) {
  const response = await fetch(`${BASE_URL}/songs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete song");
}

