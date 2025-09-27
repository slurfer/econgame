export default async function resetGame() {
  const res = await fetch("/api/resetGame", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.ok;
}
