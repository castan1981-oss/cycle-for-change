# Training — the bar

Robert, Nov 23, 2026: the training tool he uses feels "almost like DOS, very blocky, not intuitive in any way".
He wants one built from the ground up: "user friendly, detail orientated, and links to everything", for him
first, then shown to his coach, then maybe other riders, and "this could be an app in the future". He asked for
a team of specialists to design the best one. This file is what that team is held to. CLAUDE.md §8 has the rules
of what is built; this has the bar.

## Who it's for, in order
1. **Robert**, on his phone, before a ride and after it.
2. **His coach** (John Benson), reading the week and saying one thing back.
3. **Another rider with a coach**, later, only on Robert's word.
4. A rider with no coach is not served by this yet. The product carries a coach's plan; it doesn't make one.

## The promises
- **Today first.** Open it and the first thing you can read is what you're doing today.
- **Nothing typed twice.** If a feed or a file knows it, the product never asks.
- **The coach's words are the coach's.** Shown as written. Never rewritten, summarised or generated.
- **Every number can be checked by hand.** Its rule is written down (`research/training/numbers.md`).
- **It links to everything**, each link where its question comes up (`research/training/links.md`).
- **Private by default.** Two invited people today. Nothing public, nothing indexed, the least kept.
- **No guilt.** A missed day is a day. No streaks, badges or scores of worth.

## It links to everything — the map today
| What | How | State |
|---|---|---|
| The coach's plan | TrainingPeaks' own calendar feed, pasted once, read on the server | built, not yet run on a real feed |
| The rides | the file off the head unit (FIT, GPX, TCX, Garmin's zip), read in the browser | built |
| The coach | a second sign-in: reads the week, writes the note | built |
| The 2027 rides | the site's calendar (`RIDING`), the next one with its days to go | built |
| The one mile count | the site's own count | built |
| A group ride in the plan → its ride page | match a planned workout to a listed ride | not built |
| A route → `/brief/` (climbs, weather where you'll be) | open the briefing on that day's route | not built |
| A workout → the head unit | a workout file the unit can run | not built; needs a decision |
| Garmin, pushed rides | the Garmin Connect Developer Program | needs Robert's application |
| Strava | a link out only (CLAUDE.md §10) | by rule |

## The core tasks (the lab times these, the critic never sees the code)
1. **What am I doing today?** From the home-screen icon to reading the workout. Target: 0 taps when signed in.
2. **What's the week?** Read all seven days and tap into one. Target: 1 tap, no legend needed.
3. **I rode. Count it.** From "done" to the day filled in. Target: 2 taps and a file pick.
4. **Connect my plan.** Paste the link once and see workouts. Target: one field, one button, a plain answer.
5. **Coach: how did the week go?** Sign in to planned against done for the athlete. Target: 0 taps after sign-in.
6. **Coach: say one thing.** Write the note and see it saved. Target: 1 field, 1 button.
7. **Get in.** First time by invite, later by password, and a wrong password that says so. No dead ends.
8. **What's next on the calendar?** The next event and how far off. Target: on the first screen's scroll, 1 tap to its page.

## The score (ten lines, 0–5 each, from screenshots alone)
1. Today in one look. 2. The week without a legend. 3. After-ride speed. 4. Words: plain, exact, few.
5. Numbers you can trust (unit, rule, nothing estimated). 6. The coach's one look. 7. Empty and broken states.
8. Phone comfort (targets, type size, one hand). 9. Finish (alignment, rhythm, nothing blocky or boxed-in).
10. Unmistakably Cycle for Change, and nothing like the tool it replaces.

A pass ships when the cold score rises with no line dropping, no core task gets slower, and the gates pass
(`privacy-security`, then `brand-ambassador`, `access-speed`, `editor`).

## The build order (each step is its own pass and its own yes from Robert)
1. **The page, for two** (PR #259): sign-in, today, the week, drop a ride, the coach's note, the next event.
2. **Run it on the real plan.** Robert's own feed; fix what the reader gets wrong; the first real teardown and score.
3. **The links that make it "everything"**: a group ride in the plan opens its ride page; a route opens `/brief/`.
4. **Installable** (home-screen icon, opens offline to the last-read week). Still no app store.
5. **Show the coach.** The three-minute demo; his list of what's missing.
6. **Other riders and coaches.** Real accounts, a database, deletion, reset. Only after `privacy-security`'s list.
7. **An app-store build**, only if installable web is measurably not enough.

## What it never does
Makes a plan or a workout. Gives medical, nutrition, weight or recovery advice. Shows another product's
trademarked score as its own. Reads Strava beyond the site's one count. Puts anything about a rider on a public
page. Uses streaks, badges, leaderboards or guilt. Adds a script or a byte to the public site's pages.

## Open, for Robert
- Whether other riders ever get accounts, and whether that's free.
- Whether he applies to the Garmin Connect Developer Program (pushed rides, and it settles the counter's source).
- Whether a workout should go to his head unit from here, or stay TrainingPeaks' job.

The team is **The Rollers** (Nov 23, 2026). Robert left the name to the team; it was the lead's pick.
