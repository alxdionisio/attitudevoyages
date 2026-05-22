/**
 * Audit log helper — appelé depuis chaque endpoint admin qui modifie l'état.
 * Ne lance jamais d'erreur : l'audit ne doit pas bloquer l'action principale.
 */

export async function logAdminAction(env, request, admin, action, resourceType, resourceId, metadata) {
  try {
    const ua = request.headers.get("User-Agent") || null;
    const ip = request.headers.get("CF-Connecting-IP") || null;
    const metaJson = metadata ? JSON.stringify(metadata) : null;
    await env.DB.prepare(
      `INSERT INTO admin_audit_log
         (user_id, user_email, action, resource_type, resource_id, metadata, ip_address, user_agent)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
    )
      .bind(
        admin?.userId || null,
        admin?.email || null,
        action,
        resourceType,
        resourceId ? String(resourceId) : null,
        metaJson,
        ip,
        ua
      )
      .run();
  } catch (err) {
    console.error("[audit] log failed", err);
    // Volontairement silent — l'audit ne bloque jamais l'action.
  }
}
