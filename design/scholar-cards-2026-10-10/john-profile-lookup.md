# John Moraros: degree display and institutional profile lookup

Removed MPH from the visible degree in both `scholarsData.ts` and
`researchData.ts`; the trigger and card now read `John Moraros, MD, PhD`.
This is a display choice, not a correction of his qualifications.

Checked on 2026-10-10:

- ICPI current Chinese faculty directory:
  https://icpi.suda.edu.cn/ch/szjs/list.htm — live HTTP 200; no Moraros entry.
- ICPI current English faculty directory:
  https://icpi.suda.edu.cn/szjs/list.htm — live HTTP 200; no Moraros entry.
- ICPI older English faculty directory:
  https://icpi.suda.edu.cn/32143/list.htm — live HTTP 200; no Moraros entry.
- The faculty directories list John Waddington, a different person.
- ICPI current leadership directory:
  https://icpi.suda.edu.cn/ch/xrld/list.htm — no John Moraros entry.
- XJTLU's old Chinese introduction is still available in search-engine snapshots,
  but live requests to both of these exact addresses return HTTP 404:
  https://www.xjtlu.edu.cn/zh/about/people/leadership/professor-john-moraros
  https://www.xjtlu.edu.cn/en/about/people/leadership/professor-john-moraros

No usable current institutional personal homepage was confirmed. Absence from
these directories does not establish that he has no relationship with ICPI.
The card's existing role and institution are preserved; no new affiliation or
unverified Profile link has been added. Google Scholar remains unchanged.

Local validation: Yarn 3.6.1 lint and production build; visual inspection of the
updated trigger and card. No deployment.

## 2026-10-11 clarification

The user confirmed that John has left XJTLU. His card now says
`Former Dean and Professor` above the existing XJTLU School of Science line.
The iGEM supervisor entry is unchanged because it records the project-era
supervision relationship. No current affiliation has been inferred.
