// Development: empty string uses Create React App proxy → http://localhost:5000
// Production: set REACT_APP_API_URL to your deployed API (e.g. https://api.yoursite.com)
const getApiUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    return "";
  }
  return "http://localhost:5000";
};

export const API_URL = getApiUrl();

/** For user-facing messages */
export function getApiDisplayLabel() {
  if (API_URL) return API_URL;
  return typeof window !== "undefined"
    ? `${window.location.origin} (dev proxy → :5000)`
    : "dev proxy";
}
