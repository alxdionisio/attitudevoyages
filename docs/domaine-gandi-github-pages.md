# Rattacher un domaine Gandi à GitHub Pages (HTTPS)

Ce guide permet de faire pointer un nom de domaine acheté chez Gandi vers le site déployé sur GitHub Pages, avec HTTPS.

---

## Vue d’ensemble

1. **Sur GitHub** : indiquer le domaine personnalisé (avant les DNS, pour limiter les risques).
2. **Chez Gandi** : créer les enregistrements DNS.
3. **Sur GitHub** : activer « Enforce HTTPS » une fois le DNS à jour.

Tu peux choisir :
- **Option A** : utiliser **www** (ex. `www.tondomaine.fr`) → un CNAME chez Gandi.
- **Option B** : utiliser le **domaine nu** (ex. `tondomaine.fr`) → enregistrements A (ou ALIAS si Gandi le propose).
- **Option C** : les deux (domaine nu + www) → GitHub gère la redirection entre les deux.

Pour ce dépôt, le domaine par défaut GitHub Pages est : **`bymodule.github.io`** (sans le nom du repo dans le CNAME).

---

## Étape 1 – Configurer le domaine sur GitHub (en premier)

1. Ouvre : **https://github.com/byModule/attitudevoyages/settings/pages**
2. Dans **Custom domain**, saisis ton domaine :
   - soit **www.tondomaine.fr** (recommandé, plus simple),
   - soit **tondomaine.fr** (domaine nu).
3. Clique sur **Save**.
4. Ne t’inquiète pas si un avertissement DNS s’affiche : c’est normal tant que les DNS chez Gandi ne sont pas encore configurés.

---

## Étape 2 – Configurer les DNS chez Gandi

1. Connecte-toi à **https://admin.gandi.net**
2. Va dans **Noms de domaine** → clique sur ton domaine.
3. Onglet **Zone DNS** (ou **Enregistrements DNS**).

### Si tu as choisi **www** (ex. `www.tondomaine.fr`)

| Type  | Nom  | Valeur (cible)     | TTL  |
|-------|------|--------------------|------|
| CNAME | www  | bymodule.github.io | 3600 |

- **Nom** : `www` (sans le domaine).
- **Valeur** : exactement `bymodule.github.io` (pas d’`https://`, pas de slash).

### Si tu as choisi le **domaine nu** (ex. `tondomaine.fr`)

**Méthode 1 – Enregistrements A (recommandé)**

Crée **4 enregistrements A** avec le nom `@` (ou le domaine nu) et les valeurs suivantes :

| Type | Nom | Valeur           | TTL  |
|------|-----|------------------|------|
| A    | @   | 185.199.108.153  | 3600 |
| A    | @   | 185.199.109.153  | 3600 |
| A    | @   | 185.199.110.153  | 3600 |
| A    | @   | 185.199.111.153  | 3600 |

**Méthode 2 – ALIAS (si Gandi le propose)**

- Type : **ALIAS** (ou équivalent « CNAME apex »).
- Nom : `@`.
- Valeur : `bymodule.github.io`.

### Si tu veux **domaine nu + www**

- Configure d’abord le **domaine nu** (A ou ALIAS comme ci‑dessus).
- Puis ajoute le **CNAME** pour **www** → `bymodule.github.io`.
- Sur GitHub, tu ne peux enregistrer qu’**un seul** domaine personnalisé : choisis soit `tondomaine.fr`, soit `www.tondomaine.fr`. GitHub fera la redirection entre les deux si les deux sont configurés en DNS.

---

## Étape 3 – Attendre la propagation DNS

- La propagation peut prendre **quelques minutes à 24 h**.
- Tu peux vérifier avec :
  - **www** : `dig www.tondomaine.fr CNAME +short` → doit afficher `bymodule.github.io.`
  - **domaine nu** : `dig tondomaine.fr A +short` → doit afficher les 4 IP GitHub listées ci‑dessus.

---

## Étape 4 – Activer HTTPS sur GitHub

1. Retourne sur **https://github.com/byModule/attitudevoyages/settings/pages**
2. Quand le domaine est reconnu (coche verte à côté du domaine), coche **Enforce HTTPS**.
3. GitHub délivre un certificat (Let’s Encrypt) automatiquement ; cela peut prendre quelques minutes.

Tu peux alors ouvrir **https://tondomaine.fr** (ou **https://www.tondomaine.fr**) : le site doit s’afficher en HTTPS.

---

## Optionnel – Redirection du domaine nu vers www (chez Gandi)

Si tu as mis le domaine personnalisé sur **www** dans GitHub et que tu veux que `tondomaine.fr` redirige vers `www.tondomaine.fr` :

- Gandi propose parfois une **redirection** (type « Redirection web ») du domaine nu vers `https://www.tondomaine.fr`. À configurer dans l’interface du domaine si tu veux ce comportement.

---

## Dépannage

- **« Domain’s DNS record might be incorrectly configured »** : attends la propagation ou revérifie nom/valeur des enregistrements (pas de faute de frappe, pas de `https://`).
- **« Enforce HTTPS » grisé** : le certificat n’est pas encore délivré ; réessaie plus tard ou retire/remets le domaine pour relancer la génération.
- **Page blanche sur le domaine** : le site est servi à la racine du domaine ; le code gère déjà ce cas (pas de basename à la racine). Si le problème persiste, vérifie la console du navigateur (F12) pour d’éventuelles erreurs.
