import { jsonResponse, handleOptions } from "../../_lib/cors.js";
import {
  readSessionId,
  deleteSession,
  clearSessionCookie,
} from "../../_lib/auth.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestPost = async ({ request, env }) => {
  const sid = readSessionId(request);
  if (sid) {
    try {
      await deleteSession(env, sid);
    } catch (err) {
      console.error("[admin/logout] delete session error", err);
    }
  }
  return jsonResponse(
    { ok: true },
    { headers: { "Set-Cookie": clearSessionCookie() } },
    request
  );
};
