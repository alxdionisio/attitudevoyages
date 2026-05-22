import { jsonResponse, errorResponse, handleOptions } from "../../_lib/cors.js";
import { getAdminFromRequest } from "../../_lib/auth.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestGet = async ({ request, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);
  return jsonResponse(
    { ok: true, user: { email: admin.email, displayName: admin.displayName } },
    {},
    request
  );
};
