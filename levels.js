/**
 * levels.js — The Urinal Test
 *
 * Defines all 10 game levels. Each level encodes classic urinal etiquette
 * scenarios with scoring tiers: "perfect", "good", "okay", "wrong".
 *
 * Urinal Etiquette Rules (encoded into `scores`):
 *  1. Never pick a urinal directly adjacent to an occupied one ("wrong")
 *     — unless there is literally no other option (then it becomes "okay")
 *  2. Maximize distance from the nearest occupied urinal
 *  3. End urinals (far left / far right) are preferred when equally distant
 *  4. "perfect" = best possible choice following all rules
 *  5. "good"    = one step off from perfect (slightly less distance or not an end)
 *  6. "okay"    = acceptable but suboptimal
 *  7. "wrong"   = standing directly next to someone (bro code violation)
 */

window.LEVELS = [

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 1 — Easy warmup. 4 urinals, leftmost occupied.
  // Layout: [X][ ][ ][ ]
  // Urinal 1 is taken. Best picks are 3 or 4 (far end), urinal 2 is wrong.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "The Rookie",
    description: "Your first time at the wall. One dude on the far left. Easy mode. Don't blow it.",
    urinals: [
      { id: 1, occupied: true  },
      { id: 2, occupied: false },
      { id: 3, occupied: false },
      { id: 4, occupied: false },
    ],
    scores: {
      // 2 is directly adjacent to occupied urinal 1 → wrong
      2: "wrong",
      // 3 is two away, fine but not an end urinal → good
      3: "good",
      // 4 is the far end, maximum distance → perfect
      4: "perfect",
    },
    feedback: {
      perfect: "End urinal secured. The code is strong with this one.",
      good:    "Respectable gap, but you left the corner throne empty. Classic rookie move.",
      okay:    "Acceptable… I guess. But we need to talk about your instincts.",
      wrong:   "BRO. You stood RIGHT next to him. There were THREE other urinals. We are not the same.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 2 — Easy. 3 urinals, middle one occupied.
  // Layout: [ ][X][ ]
  // Both 1 and 3 are adjacent to the occupied urinal. But you have no choice
  // — every empty urinal is adjacent. In a 3-urinal row with middle taken,
  // the ends are equally "forced okay" (no wrong option exists when all are adjacent).
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    name: "The Ambush",
    description: "He planted himself dead center. Absolute psychopath. Now what?",
    urinals: [
      { id: 1, occupied: false },
      { id: 2, occupied: true  },
      { id: 3, occupied: false },
    ],
    scores: {
      // Both ends are adjacent but it's unavoidable — ends are equally "okay"
      // (no perfect exists; survival mode only)
      1: "okay",
      3: "okay",
    },
    feedback: {
      perfect: "Perfection doesn't exist here. But you chose wisely.",
      good:    "Not bad. Not great. The code forgives you.",
      okay:    "You had no choice. The center-stander brought this upon us all. You're absolved.",
      wrong:   "There was literally nowhere safe and you still somehow messed it up. Respect.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 3 — Easy. 4 urinals, urinal 4 (far right) occupied.
  // Layout: [ ][ ][ ][X]
  // Mirror of level 1. Perfect = urinal 1 (far left end).
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    name: "The Mirror Test",
    description: "He took the right end. The universe is asking: do you know what to do?",
    urinals: [
      { id: 1, occupied: false },
      { id: 2, occupied: false },
      { id: 3, occupied: false },
      { id: 4, occupied: true  },
    ],
    scores: {
      // 1 is the far end, maximum distance → perfect
      1: "perfect",
      // 2 is two away, not an end → good
      2: "good",
      // 3 is directly adjacent to occupied urinal 4 → wrong
      3: "wrong",
    },
    feedback: {
      perfect: "Far end claimed. The bro code flows through you like water.",
      good:    "Two-urinal gap is fine, but you ignored the sacred corner. Disappointing.",
      okay:    "You're alive. Barely.",
      wrong:   "Adjacent. To an occupied urinal. When urinal 1 was RIGHT THERE. Incredible.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 4 — Medium. 5 urinals, urinals 1 and 5 occupied (both ends).
  // Layout: [X][ ][ ][ ][X]
  // The Sandwich. Middle urinal (3) is the only one not adjacent to an occupied one.
  // Urinals 2 and 4 are adjacent → wrong. Urinal 3 is the only valid choice → perfect.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    name: "The Sandwich",
    description: "Both ends are taken. You are the filling now. Choose wisely, or become the guy.",
    urinals: [
      { id: 1, occupied: true  },
      { id: 2, occupied: false },
      { id: 3, occupied: false },
      { id: 4, occupied: false },
      { id: 5, occupied: true  },
    ],
    scores: {
      // 2 is adjacent to occupied urinal 1 → wrong
      2: "wrong",
      // 3 is center — equidistant from both occupied ends, not adjacent → perfect
      3: "perfect",
      // 4 is adjacent to occupied urinal 5 → wrong
      4: "wrong",
    },
    feedback: {
      perfect: "Dead center. Equidistant from both threats. Cold, calculated, flawless.",
      good:    "You found the gap. The code acknowledges your effort.",
      okay:    "Surviving in a sandwich scenario. Respect.",
      wrong:   "You sidled up next to someone when the CENTER was wide open. Unbelievable.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 5 — Medium. 5 urinals, urinals 2 and 4 occupied.
  // Layout: [ ][X][ ][X][ ]
  // Urinals 1, 3, 5 are empty. 3 is adjacent to both occupied urinals → wrong.
  // 1 and 5 are end urinals equidistant from one occupied urinal each → perfect.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    name: "The Minefield",
    description: "Two landmines planted in the wall. Navigate with care, soldier.",
    urinals: [
      { id: 1, occupied: false },
      { id: 2, occupied: true  },
      { id: 3, occupied: false },
      { id: 4, occupied: true  },
      { id: 5, occupied: false },
    ],
    scores: {
      // 1 is end urinal, adjacent only to occupied urinal 2 → wrong
      // Wait — 1 IS adjacent to 2. So all empty urinals are adjacent to someone.
      // Forced scenario: pick an end to minimize contact count.
      // 1 is adjacent to 1 occupied (urinal 2) → okay
      1: "okay",
      // 3 is adjacent to BOTH occupied urinals 2 and 4 → wrong (worst)
      3: "wrong",
      // 5 is adjacent to 1 occupied (urinal 4), end urinal → okay (same as 1 but end)
      5: "okay",
    },
    feedback: {
      perfect: "You found the best bad option. That's all any of us can do.",
      good:    "Smart play in a tough situation. The code respects the effort.",
      okay:    "Forced into adjacency, but you chose the lesser evil. Absolved.",
      wrong:   "You picked the urinal between TWO occupied ones. Both neighbors. What are you doing?",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 6 — Medium. 5 urinals, urinals 1 and 3 occupied.
  // Layout: [X][ ][X][ ][ ]
  // Urinals 2, 4, 5 are empty. 2 is between two occupied → wrong.
  // 4 is adjacent to occupied 3 → wrong. 5 is the far end, safe → perfect.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 6,
    name: "The Gauntlet",
    description: "Left side is a disaster zone. The open land lies to the right — if you're brave enough.",
    urinals: [
      { id: 1, occupied: true  },
      { id: 2, occupied: false },
      { id: 3, occupied: true  },
      { id: 4, occupied: false },
      { id: 5, occupied: false },
    ],
    scores: {
      // 2 is between occupied 1 and 3 → wrong (worst)
      2: "wrong",
      // 4 is adjacent to occupied 3 → wrong
      4: "wrong",
      // 5 is end urinal, two spots from nearest occupied (3) → perfect
      5: "perfect",
    },
    feedback: {
      perfect: "You saw through the chaos and sprinted to the promised land. Legend.",
      good:    "Not bad given the circumstances.",
      okay:    "Barely acceptable. But hey, the code is a spectrum.",
      wrong:   "The far end was RIGHT THERE and you posted up next to someone. Bro. BRO.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 7 — Tricky. 6 urinals, urinals 1, 3, 5 occupied (alternating).
  // Layout: [X][ ][X][ ][X][ ]
  // Empty: 2, 4, 6. Every empty urinal is adjacent to at least one occupied one.
  // 2 is between 1 and 3 → adjacent to 2 occupied → most wrong.
  // 4 is between 3 and 5 → adjacent to 2 occupied → most wrong.
  // 6 is end, adjacent only to occupied 5 → least bad → okay.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 7,
    name: "The Picket Fence",
    description: "Someone installed a human fence. Every other urinal taken. This is a puzzle now.",
    urinals: [
      { id: 1, occupied: true  },
      { id: 2, occupied: false },
      { id: 3, occupied: true  },
      { id: 4, occupied: false },
      { id: 5, occupied: true  },
      { id: 6, occupied: false },
    ],
    scores: {
      // 2 is flanked by occupied 1 and 3 → double adjacency → worst
      2: "wrong",
      // 4 is flanked by occupied 3 and 5 → double adjacency → wrong
      4: "wrong",
      // 6 is end, only adjacent to occupied 5 → single adjacency, end bonus → okay
      6: "okay",
    },
    feedback: {
      perfect: "The only survivable option. You took it. The code salutes you.",
      good:    "You navigated this nightmare with composure.",
      okay:    "One neighbor, end urinal. You played the hand you were dealt.",
      wrong:   "You walked into a double-flank when the end was open. The code weeps.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 8 — Tricky. 6 urinals, urinals 2, 4, 6 occupied.
  // Layout: [ ][X][ ][X][ ][X]
  // Empty: 1, 3, 5. 1 is adjacent to occupied 2. 3 flanked by 2 and 4. 5 flanked by 4 and 6.
  // 1 is end urinal, only one neighbor → best → okay. 3 and 5 are double-flanked → wrong.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 8,
    name: "The Wall of Shame",
    description: "They took all the even-numbered spots like absolute savages. Find the least bad option.",
    urinals: [
      { id: 1, occupied: false },
      { id: 2, occupied: true  },
      { id: 3, occupied: false },
      { id: 4, occupied: true  },
      { id: 5, occupied: false },
      { id: 6, occupied: true  },
    ],
    scores: {
      // 1 is end, adjacent only to occupied 2 → single adjacency → okay (best available)
      1: "okay",
      // 3 is flanked by occupied 2 and 4 → double adjacency → wrong
      3: "wrong",
      // 5 is flanked by occupied 4 and 6 → double adjacency → wrong
      5: "wrong",
    },
    feedback: {
      perfect: "Corner secured. You took the only dignified exit in a undignified situation.",
      good:    "Smart play. The corner saves you.",
      okay:    "End urinal, one neighbor. Not great, not terrible. The code nods.",
      wrong:   "You nestled yourself between two occupied urinals when the corner was FREE. This is why we can't have nice things.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 9 — Tricky. 6 urinals, urinals 1, 2, 5 occupied.
  // Layout: [X][X][ ][ ][X][ ]
  // Empty: 3, 4, 6. 3 is adjacent to occupied 2. 4 is adjacent to occupied 5.
  // 6 is end, adjacent to occupied 5 only. 3 and 6 both have one neighbor — 6 gets end bonus → perfect.
  // 4 is adjacent to 5 and one away from 3 (empty) — not ideal → okay (still only one occupied neighbor).
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 9,
    name: "The Cluster Chaos",
    description: "A buddy system formed on the left. Chaos reigns. The far end beckons — but is it safe?",
    urinals: [
      { id: 1, occupied: true  },
      { id: 2, occupied: true  },
      { id: 3, occupied: false },
      { id: 4, occupied: false },
      { id: 5, occupied: true  },
      { id: 6, occupied: false },
    ],
    scores: {
      // 3 is adjacent to occupied 2 → wrong
      3: "wrong",
      // 4 is adjacent to occupied 5 → wrong
      4: "wrong",
      // 6 is end, adjacent only to occupied 5 — but it's the end, forced okay
      // In context: 6 is the ONLY non-double-adjacent option with end bonus → perfect
      6: "perfect",
    },
    feedback: {
      perfect: "Far right corner. Clean. Decisive. This is the way.",
      good:    "You found the gap. Nicely done.",
      okay:    "It'll do in a pinch. The code grants conditional approval.",
      wrong:   "The far end was wide open and you squeezed into the danger zone. Unacceptable.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LEVEL 10 — The Boss. 6 urinals, urinals 1, 2, 3, 5 occupied.
  // Layout: [X][X][X][ ][X][ ]
  // Empty: 4, 6. 4 is between occupied 3 and occupied 5 → wrong (flanked).
  // 6 is end, adjacent only to occupied 5 → forced okay (only survivable pick).
  // A lesson: sometimes there are no good options, only less bad ones.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 10,
    name: "The Boss Level",
    description: "Peak hour. Stadium bathroom. Most of the wall is taken. Welcome to the real world, son.",
    urinals: [
      { id: 1, occupied: true  },
      { id: 2, occupied: true  },
      { id: 3, occupied: true  },
      { id: 4, occupied: false },
      { id: 5, occupied: true  },
      { id: 6, occupied: false },
    ],
    scores: {
      // 4 is flanked by occupied 3 and occupied 5 → double adjacency → wrong
      4: "wrong",
      // 6 is end, adjacent only to occupied 5 → single adjacency, end bonus → okay
      // (Best possible in a no-win scenario — the code calls this a moral victory)
      6: "okay",
    },
    feedback: {
      perfect: "In a world without perfect options, you found the least awful one. You have graduated.",
      good:    "Strong instincts under pressure. The code is proud.",
      okay:    "One neighbor, end urinal, no other choice. You did what you had to do. We respect it.",
      wrong:   "You picked the urinal that's flanked on BOTH sides when the end was open. At The Boss Level. After everything we've been through together.",
    },
  },

];
