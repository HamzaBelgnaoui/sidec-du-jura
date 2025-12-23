import axios from "axios";

const API_BASE = "http://sidec-du-jura.local/wp-json/sidec/v1";

export async function getSiteSettings() {
  const { data } = await axios.get(`${API_BASE}/site-settings`);
  return data;
}

