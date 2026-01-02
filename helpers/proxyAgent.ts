import { HttpsProxyAgent } from "https-proxy-agent";

const proxyUrl = "YOUR PROXY";

export const agent = new HttpsProxyAgent(proxyUrl);
