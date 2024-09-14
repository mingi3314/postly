const apiUrl = process.env.VUE_APP_API_URL;

export async function generatePost(topic: string): Promise<string> {
  const response = await fetch(`${apiUrl}/generatePost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate post");
  }

  const data = await response.json();
  return data.result;
}
