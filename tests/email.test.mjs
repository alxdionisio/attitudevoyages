import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { sendEmail } from "../functions/_lib/email.js";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

const mail = {
  to: "client@example.com",
  subject: "Sujet",
  html: "<p>Bonjour</p>",
  text: "Bonjour",
  replyTo: "contact@attitude-voyages.fr",
};

test("sendEmail appelle l'API Resend avec la clé et le bon corps", async () => {
  let call;
  globalThis.fetch = async (url, init) => {
    call = { url, init };
    return new Response(JSON.stringify({ id: "re_123" }), { status: 200 });
  };

  const res = await sendEmail(
    {
      RESEND_API_KEY: "re_test",
      RESEND_FROM_EMAIL: "Attitude Voyages <noreply@attitude-voyages.fr>",
    },
    mail
  );

  assert.deepEqual(res, { ok: true, id: "re_123" });
  assert.equal(call.url, "https://api.resend.com/emails");
  assert.equal(call.init.headers.Authorization, "Bearer re_test");
  assert.deepEqual(JSON.parse(call.init.body), {
    from: "Attitude Voyages <noreply@attitude-voyages.fr>",
    to: ["client@example.com"],
    subject: "Sujet",
    html: "<p>Bonjour</p>",
    text: "Bonjour",
    reply_to: "contact@attitude-voyages.fr",
  });
});

test("sendEmail signale l'échec de Resend sans lever d'exception", async () => {
  globalThis.fetch = async () => new Response("domain not verified", { status: 403 });
  const res = await sendEmail({ RESEND_API_KEY: "re_test" }, mail);
  assert.equal(res.ok, false);
  assert.equal(res.status, 403);
});

test("sans RESEND_API_KEY, rien n'est envoyé (simulation)", async () => {
  globalThis.fetch = async () => assert.fail("fetch ne doit pas être appelé");
  const res = await sendEmail({}, mail);
  assert.deepEqual(res, { ok: true, dryRun: true });
});
