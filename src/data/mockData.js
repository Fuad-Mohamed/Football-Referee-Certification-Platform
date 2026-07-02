// Mock Data for Football Referee Curriculum Platform

export const INITIAL_COURSES = [
  {
    id: "c1",
    title: "Regional Referee Certification (Tier 1)",
    description: "The starting point for all aspiring referees. Covers the basic Laws of the Game, positioning, hand signals, and basic match control.",
    tier: "Regional",
    level: 1,
    prerequisites: [],
    estimatedTime: "6 Hours",
    credits: 5,
    modules: [
      {
        id: "c1-m1",
        title: "Module 1: Laws 1 to 4 - Pitch, Ball, Players & Equipment",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Rickroll as a classic safe demo video
        readingMaterial: `
          <h3>Introduction to the Pitch & Player Equipment</h3>
          <p>As a Regional Referee, you must understand the basic field setup and safety regulations.</p>
          <h4>Key Rules:</h4>
          <ul>
            <li><strong>Law 1: The Field of Play</strong> - The field must be rectangular and marked with continuous lines. The goal line must be the same width as the goalposts.</li>
            <li><strong>Law 2: The Ball</strong> - Must be spherical, made of suitable material, and have a pressure between 0.6 and 1.1 atmospheres.</li>
            <li><strong>Law 3: The Players</strong> - A match is played by two teams, each with a maximum of 11 players, one of whom must be the goalkeeper. A match cannot start if either team has fewer than 7 players.</li>
            <li><strong>Law 4: The Players' Equipment</strong> - Compulsory equipment includes a jersey with sleeves, shorts, socks (shin guards must be covered entirely), and footwear. Undergarments must match the main color of the sleeves/shorts.</li>
          </ul>
        `,
        quiz: {
          id: "q-c1-m1",
          title: "Module 1 Assessment: Field Basics",
          questions: [
            {
              id: "q1",
              type: "multiple",
              question: "What is the minimum number of players required on one team to start a match?",
              options: ["5 players", "7 players", "9 players", "11 players"],
              correctAnswer: "7 players"
            },
            {
              id: "q2",
              type: "boolean",
              question: "Shin guards must be covered entirely by the socks.",
              correctAnswer: "True"
            },
            {
              id: "q3",
              type: "multiple",
              question: "If a ball becomes defective during the match, how is play restarted?",
              options: [
                "With a penalty kick for the home team",
                "With a dropped ball where the original ball became defective",
                "With a throw-in for the opposing team",
                "With a goal kick"
              ],
              correctAnswer: "With a dropped ball where the original ball became defective"
            }
          ]
        }
      },
      {
        id: "c1-m2",
        title: "Module 2: Law 12 - Fouls & Misconduct",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        readingMaterial: `
          <h3>Fouls and Misconduct (Law 12)</h3>
          <p>Understanding the difference between direct free kicks, indirect free kicks, and disciplinary actions (yellow/red cards).</p>
          <h4>Direct Free Kick Offences:</h4>
          <p>A direct free kick is awarded if a player commits any of the following offences against an opponent in a manner considered by the referee to be careless, reckless or using excessive force:</p>
          <ul>
            <li>Charges, jumps at, kicks or attempts to kick, pushes, strikes or attempts to strike, tackles or challenges, trips or attempts to trip.</li>
            <li>Holding an opponent, biting or spitting, or touching the ball deliberately (except the goalkeeper inside their penalty area).</li>
          </ul>
          <h4>Indirect Free Kick Offences:</h4>
          <p>An indirect free kick is awarded if a goalkeeper commits any of the following inside their penalty area:</p>
          <ul>
            <li>Controls the ball with their hands for more than 6 seconds before releasing it.</li>
            <li>Touches the ball with their hands after releasing it and before it has touched another player, or after it has been deliberately kicked/thrown to them by a teammate.</li>
          </ul>
        `,
        quiz: {
          id: "q-c1-m2",
          title: "Module 2 Assessment: Fouls",
          questions: [
            {
              id: "q1",
              type: "multiple",
              question: "How long can a goalkeeper hold the ball in their hands before releasing it?",
              options: ["4 seconds", "6 seconds", "8 seconds", "10 seconds"],
              correctAnswer: "6 seconds"
            },
            {
              id: "q2",
              type: "boolean",
              question: "A direct free kick is awarded if a player handles the ball deliberately inside their own penalty area.",
              correctAnswer: "False" // Because it results in a penalty kick, which is technically a direct free kick, but the question is tricking, or rather, direct free kick is taken from where offence occurred, unless it is a penalty. Let's make it more obvious:
            },
            {
              id: "q3",
              type: "multiple",
              question: "Which of the following always results in an indirect free kick restart?",
              options: [
                "Tripping an opponent",
                "Spitting at an opponent",
                "Playing in a dangerous manner without contact",
                "Handling the ball deliberately"
              ],
              correctAnswer: "Playing in a dangerous manner without contact"
            }
          ]
        }
      }
    ]
  },
  {
    id: "c2",
    title: "National Referee Certification (Tier 2)",
    description: "For experienced regional referees looking to officiate national leagues. Covers deep offside interpretations, match management, and athletic performance.",
    tier: "National",
    level: 2,
    prerequisites: ["c1"],
    estimatedTime: "12 Hours",
    credits: 10,
    modules: [
      {
        id: "c2-m1",
        title: "Module 1: Law 11 - Offside in Depth",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        readingMaterial: `
          <h3>The Offside Rule (Law 11)</h3>
          <p>Offside positioning and active involvement interpretation are critical at the national level.</p>
          <h4>Offside Position:</h4>
          <p>A player is in an offside position if: any part of the head, torso or feet is in the opponents' half (excluding the halfway line) AND any part of the head, torso or feet is closer to the opponents' goal line than both the ball and the second-last opponent.</p>
          <h4>Active Play Involvement:</h4>
          <p>A player in an offside position at the moment the ball is played or touched by a teammate is only penalised on becoming involved in active play by:</p>
          <ul>
            <li>Interfering with play by playing or touching a ball passed or touched by a teammate.</li>
            <li>Interfering with an opponent by preventing them from playing the ball or obstructing their line of vision.</li>
            <li>Gaining an advantage by playing the ball or interfering with an opponent when it has rebounded or been deflected off the goalpost, crossbar, or an opponent.</li>
          </ul>
        `,
        quiz: {
          id: "q-c2-m1",
          title: "Module 1 Assessment: Advanced Offside",
          questions: [
            {
              id: "q1",
              type: "multiple",
              question: "A player is in an offside position. The ball rebounds off the goalpost directly to them, and they score. What is the correct decision?",
              options: [
                "Goal stands",
                "Indirect free kick for offside offence",
                "Dropped ball restart",
                "Goal kick"
              ],
              correctAnswer: "Indirect free kick for offside offence"
            },
            {
              id: "q2",
              type: "boolean",
              question: "The hands and arms of all players, including the goalkeepers, are considered when judging offside positioning.",
              correctAnswer: "False"
            }
          ]
        }
      }
    ]
  },
  {
    id: "c3",
    title: "International FIFA Referee (Tier 3)",
    description: "The elite tier. High-stakes communication, Video Assistant Referee (VAR) protocol, managing international media, and officiating FIFA tournaments.",
    tier: "International",
    level: 3,
    prerequisites: ["c1", "c2"],
    estimatedTime: "20 Hours",
    credits: 20,
    modules: [
      {
        id: "c3-m1",
        title: "Module 1: VAR Protocol & Communication",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        readingMaterial: `
          <h3>VAR Protocol Principles</h3>
          <p>The Video Assistant Referee (VAR) system operates under the philosophy of 'minimum interference, maximum benefit'.</p>
          <h4>Four Reviewable Categories:</h4>
          <ol>
            <li><strong>Goal / No Goal</strong> - Offences leading up to the goal, ball out of play, offside, fouls.</li>
            <li><strong>Penalty / No Penalty</strong> - Incorrectly awarding or not awarding a penalty kick, offences leading up to the incident.</li>
            <li><strong>Direct Red Card</strong> - Serious foul play, violent conduct, spitting/biting, preventing an obvious goal scoring opportunity (DOGSO).</li>
            <li><strong>Mistaken Identity</strong> - When the referee cautions or sends off the wrong player.</li>
          </ol>
          <h4>The Review Process:</h4>
          <p>The referee can initiate a review, or the VAR can 'recommend' a review. The final decision is ALWAYS made by the referee on the pitch, either based on VAR information or after an On-Field Review (OFR).</p>
        `,
        quiz: {
          id: "q-c3-m1",
          title: "Module 1 Assessment: VAR",
          questions: [
            {
              id: "q1",
              type: "multiple",
              question: "Which of the following situations is NOT reviewable by VAR?",
              options: [
                "A second yellow card offence",
                "A direct red card offence",
                "A mistaken identity during a yellow card",
                "A potential penalty kick foul"
              ],
              correctAnswer: "A second yellow card offence"
            },
            {
              id: "q2",
              type: "boolean",
              question: "The VAR can make the final decision and override the referee directly without the referee's consent.",
              correctAnswer: "False"
            }
          ]
        }
      }
    ]
  }
];

export const INITIAL_USERS = [
  {
    id: "u-ref",
    email: "ref@platform.com",
    name: "John Whistle",
    role: "referee",
    password: "password123",
    refereeProfile: {
      certLevel: "Regional (Tier 1)",
      expiryDate: "2026-12-31",
      ceCredits: 4,
      completedCourses: ["c1"], // Pre-complete c1 for demo convenience or leave c1 unlocked
      enrolledCourses: ["c1", "c2"],
      courseProgress: {
        "c1": 100,
        "c2": 0
      },
      quizAttempts: {
        "q-c1-m1": { score: 100, attempts: 1, passed: true },
        "q-c1-m2": { score: 100, attempts: 1, passed: true },
        "q-c2-m1": { score: 0, attempts: 0, passed: false }
      },
      certificates: [
        {
          id: "cert-001",
          courseId: "c1",
          title: "Regional Referee Certification (Tier 1)",
          issueDate: "2025-12-31",
          expiryDate: "2026-12-31",
          verificationCode: "REF-C1-879E3"
        }
      ]
    }
  },
  {
    id: "u-inst",
    email: "instructor@platform.com",
    name: "Sarah Pitch",
    role: "instructor",
    password: "password123"
  },
  {
    id: "u-admin",
    email: "admin@platform.com",
    name: "Alex Ferguson",
    role: "admin",
    password: "password123"
  }
];

export const INITIAL_CE_SEMINARS = [
  {
    id: "ce-1",
    title: "Advanced Offside Interpretation Seminar",
    description: "Interactive session examining deflection vs. deliberate play, obstruction of vision, and dynamic offside lines.",
    credits: 2,
    date: "2026-07-15",
    time: "18:00 - 20:00 UTC",
    instructor: "Sarah Pitch",
    enrolled: false,
    completed: false
  },
  {
    id: "ce-2",
    title: "Physical Fitness & High-Intensity Interval Training",
    description: "Designed to prepare referees for the FIFA fitness test. Details sprint drills, CODA tests, and diet plans.",
    credits: 3,
    date: "2026-08-02",
    time: "10:00 - 13:00 UTC",
    instructor: "Physical Coach Michael",
    enrolled: false,
    completed: false
  },
  {
    id: "ce-3",
    title: "Conflict Management and De-escalation",
    description: "Practical strategies for dealing with aggressive players, coaches, and managing mass confrontations on the pitch.",
    credits: 2,
    date: "2026-05-10",
    time: "14:00 - 16:30 UTC",
    instructor: "Alex Ferguson",
    enrolled: false,
    completed: true // Previously completed
  }
];

export const INITIAL_STATS = {
  totalUsers: 142,
  referees: 118,
  instructors: 16,
  admins: 8,
  coursesApproved: 3,
  coursesPending: 1,
  certificatesIssued: 94,
  renewalsDue: 12
};
