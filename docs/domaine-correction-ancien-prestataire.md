# Corriger : le domaine affiche l’ancien site au lieu de GitHub Pages

Si **www.attitude-voyages.fr** ou **attitude-voyages.fr** affiche le site de l’ancien prestataire au lieu du site hébergé sur GitHub Pages, c’est que le DNS pointe encore (ou à nouveau) vers l’ancien hébergeur.

---

## Objectif

- **attitude-voyages.fr** et **www.attitude-voyages.fr** doivent afficher le site GitHub Pages (Attitude Voyages).
- À terme : **HTTPS** activé via GitHub (Enforce HTTPS) ou via Cloudflare.

---

## Étape 1 – Remettre le DNS Gandi vers GitHub uniquement

1. Va sur **https://admin.gandi.net** → **Noms de domaine** → **attitude-voyages.fr** → onglet **Enregistrements DNS**.

2. **Supprimer tout ce qui pointe vers l’ancien hébergeur** (ex. IP `92.243.13.56`) :
   - S’il existe un enregistrement **A** pour **@** avec la valeur `92.243.13.56` → **Supprimer**.
   - S’il existe un enregistrement **A** pour **www** → **Supprimer** (www doit être un CNAME, pas un A).

3. **Vérifier / ajouter les enregistrements pour GitHub Pages :**

   **Pour le domaine nu (attitude-voyages.fr) :**
   - **4 enregistrements A** pour le nom **@** avec les valeurs :
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - S’il reste un A **@** vers une autre IP (ex. 92.243.13.56), le supprimer.

   **Pour www (www.attitude-voyages.fr) :**
   - **Un seul enregistrement CNAME** : nom **www**, valeur **bymodule.github.io**.
   - Aucun enregistrement **A** pour **www** (sinon il prend le dessus et peut pointer vers l’ancien serveur).

4. **Enregistrer** la zone (sauvegarder les modifications chez Gandi).

5. **Ne pas** créer de **Redirection Web** Gandi qui enverrait attitude-voyages.fr ou www vers une autre URL (cela court-circuite le DNS).

---

## Étape 2 – Vérifier la résolution DNS

Après 5–10 minutes (voire jusqu’à 1 h), en ligne de commande :

```bash
dig www.attitude-voyages.fr CNAME +short
```

**Résultat attendu :** `bymodule.github.io.`

```bash
dig attitude-voyages.fr A +short
```

**Résultat attendu :** les 4 IP GitHub (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153).

Si tu vois encore `92.243.13.56` ou une autre IP, la propagation n’est pas terminée ou un enregistrement incorrect est encore présent → revérifier l’étape 1.

---

## Étape 3 – GitHub : Custom domain et HTTPS

1. **https://github.com/byModule/attitudevoyages/settings/pages**
2. **Custom domain** : laisser **www.attitude-voyages.fr** (ou mettre **attitude-voyages.fr** si tu préfères le domaine nu comme URL principale) → **Save**.
3. Cliquer sur **Check again**. Tant que GitHub affiche « DNS check unsuccessful » (InvalidDNSError), **Enforce HTTPS** restera indisponible, mais le site peut déjà être servi en HTTP si le DNS pointe bien vers GitHub (étape 1–2).
4. Quand la coche verte apparaît à côté du domaine, cocher **Enforce HTTPS** pour forcer le HTTPS.

Si le check GitHub reste en échec alors que `dig` est correct, tu peux utiliser Cloudflare pour avoir le HTTPS tout de suite (voir [domaine-gandi-github-pages.md](./domaine-gandi-github-pages.md), section Dépannage, ou la proposition Cloudflare faite précédemment).

---

## Résumé des enregistrements à avoir chez Gandi

| Nom | Type  | Valeur              | À garder / À supprimer |
|-----|-------|---------------------|-------------------------|
| @   | A     | 185.199.108.153     | Garder (GitHub)         |
| @   | A     | 185.199.109.153     | Garder (GitHub)         |
| @   | A     | 185.199.110.153     | Garder (GitHub)         |
| @   | A     | 185.199.111.153     | Garder (GitHub)         |
| @   | A     | 92.243.13.56 (ou autre IP ancien hébergeur) | **Supprimer** |
| www | A     | (n’importe quelle IP) | **Supprimer**          |
| www | CNAME | bymodule.github.io  | Garder (GitHub)         |

Les enregistrements **MX**, **TXT**, **CNAME** (mail, DKIM, autodiscover, etc.) ne pas toucher si tu utilises la messagerie sur ce domaine.
