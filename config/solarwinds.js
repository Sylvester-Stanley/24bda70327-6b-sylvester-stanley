import axios from "axios";

const sendToSolarWinds = async (logEntry) => {
  const token = process.env.SOLARWINDS_TOKEN;

  if (!token) return; // silently skip if no token

  try {
    await axios.post(
      "https://logs.collector.solarwinds.com/v1/log",
      logEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("SolarWinds logging error:", error.message);
  }
};

export { sendToSolarWinds };
