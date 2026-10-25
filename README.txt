PHASE 3 — PUBLICATION PACKAGE v3.4.0
Prepared 25 October 2026

START HERE
index.html is the app. programme.html is the complete readable programme.
review.html explains the changes, verification evidence and limitations.
All files belong at the website root. No build command, account, API key,
external fonts, paid backend or streaming video service is required.

WHAT IS NEW
• Finish training for today works even when no sets, some sets, or all sets
  are ticked. It counts a finished session without inventing completed work.
• Daily progress separates completed exercises, skipped exercises and remaining
  exercises; sets logged include actual work in earlier exercise variations.
• Skip an exercise with an optional reason, or undo the skip. Earlier logs stay.
• Resume restores your block/week/day, last opened exercise, selected swaps and
  Full/Express mode. Choosing a different session uses that session's own mode.
• Compare alternatives by equipment, movement focus and specific setup.
• All 65 coaching guides have two visual positions and three written steps.
  Step selection changes the visual reference. Enlarge images and scroll within
  them to inspect details; close returns keyboard focus to the launch button.
• Next exercise moves to the next unskipped exercise, or back to daily progress.
• Save status, offline readiness, visual download progress/retry, update checking
  and backup controls are explicit. Updates wait for old app windows to close.
• The image manifest is about 14 KB instead of a roughly 4 MB embedded script.
  92 deduplicated local visual files load separately; they download for offline
  use after the app's shell is ready. Initial offline download needs internet.
• Alternative coaching text is exercise-specific. TRX is correctly bodyweight;
  dual-cable load labels specify the weight of EACH stack.

PUBLICATION — EXISTING GITHUB PAGES WEBSITE
1. Export a backup from the current training app before updating.
2. Extract this ZIP. Do not upload the ZIP itself or put index.html inside an
   extra enclosing folder. Keep the supplied filenames unchanged.
3. Upload the 92 files beginning visual- first, to the repository root. Commit.
   The existing app does not reference these new files yet.
4. Upload/replace ALL remaining files together at the same root, including
   media.js, demos.js, offline.js, sw.js, app.js, core.js and data.js. Commit.
   The two batches keep each upload manageable on a phone. Safari's GitHub
   website upload interface is the intended route; a desktop is also suitable.
5. Wait for GitHub Pages to finish deploying the second commit. Keep the current
   Pages branch/root configuration. No hosting configuration change is needed.
6. Open the published app online, then close all old tabs/Home Screen app windows
   and reopen so the waiting service worker can activate. Do not routinely clear
   site data; this can erase local training records.
7. In More, confirm Version 3.4.0, App ready offline, and All 65 visual guides
   ready offline. If a download failed, reconnect and use the retry button.
8. Complete the on-device acceptance checks below before relying on it at the gym.

Files ending .cjs are repeatable development tests, not scripts loaded by the app.
README.txt and MEDIA_CREDITS.txt document installation and asset provenance.
The live GitHub website is not changed by receiving this package.

DAILY USE
Open a day, choose Full or Express, and log only what you actually do. Tick each
set after entering its required load/repetitions/time. RIR/RPE is optional.
Use Skip this exercise when appropriate. Skipping disables its set fields until
Undo skip; logged sets are retained. Choosing an alternative clears that slot's
skip marker and retains logs for the earlier variation.
Finish training for today at any time. A session with unticked or skipped work
is labelled accordingly in history. Reopen to continue; editing logged work or
changing session mode also reopens the session so the finished flag stays honest.
The weekly indicator counts finished strength sessions, including shorter ones.
It is not a claim that all planned exercises or sets were completed.

RESUME AND DATA
Logs stay under phase3-training-v2. The previous phase3-state-v1 key is not erased.
Legacy backups are preserved as a separate archive rather than guessed into new
exercise records. New optional skip/resume fields are included in JSON backups.
Changing a preferred swap affects future unselected slots, not an already opened
session's saved choices. Old records without saved choices may use prior defaults.

Data is local to this browser/device. It does not sync across phones, browser
profiles, website domains, Safari or a Home Screen app. Export/import to move it.
Import replaces active records only after an explicit confirmation in the app.
The set-history CSV contains set rows; use JSON backup for skip reasons, notes,
mode and resume state. No personal records or QA test logs are in this package.

There is one session per named day slot per week/block. The date is editable,
but the app does not create unlimited sessions for the same slot. Reopen to edit.
After eight weeks, the app prompts a review; it does not generate new exercises.
Starting another block repeats this programme and retains history.

OFFLINE AND UPDATES
The published app needs HTTPS for offline installation. Image caching is separate
from core app caching; written coaching and logging do not depend on streaming
video. Watch the offline status instead of assuming a download has finished.
A new app version waits until existing app windows close. Export a backup before
updating. Browser/iOS storage eviction can remove caches or local data: keep backups.
iOS may suspend a timer in the background; it catches up on return, but no locked-
screen/background alarm is guaranteed. Timers do not persist across a full reload.
Avoid editing the same session simultaneously in multiple app windows.

VERIFICATION
Run with Node 18+ from this folder:
  node verify.cjs
  node verify-finish.cjs
  node verify-media.cjs
  node verify-offline.cjs

Browser checks cover 320px and 390px layouts, finishing early, skip/undo with
retained loads, alternative selection, Express persistence, reload/resume,
finished history with skip reason, modal image enlargement/close/focus return,
and all 130 image references loading. Code checks cover prescriptions, deload,
backups, dates/history, cache lifecycle, early completion, save failure, skipped
work accounting, media integrity and interrupted-download recovery.

FINAL ON-DEVICE ACCEPTANCE — NOT CERTIFIED BY DESKTOP TESTS
• Safari > Share > Add to Home Screen; open the app from its icon.
• Let More report that the app and all visual guides are ready offline.
• Enable airplane mode, close and reopen, then open a guide not recently viewed.
• Enter values with the iPhone keyboard; check screen edges and bottom safe area.
• Finish a partial session, close/reopen and confirm its history.
• Export/import a backup through Files after preserving the existing backup.
• Check VoiceOver navigation and foreground timer behaviour.
The local preview uses HTTP, so native service-worker installation/airplane-mode
behaviour could not be exercised there. Cache behaviour was tested with controlled
network/cache simulations. Real iPhone Safari and the final GitHub deployment
still need the checks above; desktop results do not certify those environments.

SCOPE
Photographs and simplified position illustrations are included. No videos or
individual movement assessment are included. Training prescriptions are retained;
this update improves interaction and corrects guidance/labels, not rehabilitation.
