const BASE_URL = "http://localhost:5000/api";

// ✅ FETCH SONGS
export async function fetchSongs(token) {
  console.log("🔐 Token used in fetchSongs:", token);

  const response = await fetch(`${BASE_URL}/songs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch songs");
  return await response.json();
}

// ✅ ADD SONG
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

// ✅ DELETE SONG
export async function deleteSong(id, token) {
  const response = await fetch(`${BASE_URL}/songs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete song");
}

