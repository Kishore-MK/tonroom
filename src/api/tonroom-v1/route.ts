import prisma from "@/lib/prisma";
import {
  requestQueueSchema,chatRoomsSchema
} from "@/lib/validation";



export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);
    
    
    
    // Save to the database or perform further processing
    const reqq = await prisma.requestQueue.create({
      data: data
    });

    return new Response(
      JSON.stringify({ message: "Profile saved successfully", requestQueue: reqq }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// export async function PUT(req: Request) {
//   try {
//     const data = await req.json();
//     console.log("put", data);
//     const parseResult = updateNoteSchema.safeParse(data);

//     if (!parseResult.success) {
//       console.error(parseResult.error);
//       return Response.json({ error: "Invalid input" }, { status: 400 });
//     }

//     return Response.json({ updatednote }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server srror" }, { status: 500 });
//   }
// }



// export async function DELETE(req: Request) {
//   try {
//     const data = await req.json();
//     const parseResult = deleteNoteSchema.safeParse(data);

//     if (!parseResult.success) {
//       console.error(parseResult.error);
//       return Response.json({ error: "Invalid input" }, { status: 400 });
//     }

//     return Response.json({ message: "Note deleted" }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server srror" }, { status: 500 });
//   }
// }

type Person = {
  id: number;
  name: string;
  interests: string[];
  personalityTrait: string;
  relationshipGoal: string;
  zodiacSign: string;
  isActive: boolean;
  educationOrProfession: string;
  age: number;
};

type MatchScore = {
  personA: number; // Using ID for efficient storage
  personB: number;
  score: number;
};

function calculateCompatibilityScore(personA: Person, personB: Person, weights: Record<string, number>): number {
  let score = 0;

  // Interest matching
  const sharedInterests = personA.interests.filter(interest =>
    personB.interests.includes(interest)
  ).length;
  score += (sharedInterests / Math.max(personA.interests.length, 1)) * weights.interests;

  // Personality trait matching
  if (personA.personalityTrait === personB.personalityTrait) {
    score += weights.personalityTrait;
  }

  // Relationship goal matching
  if (personA.relationshipGoal === personB.relationshipGoal) {
    score += weights.relationshipGoal;
  }

  // Zodiac sign compatibility
  if (personA.zodiacSign === personB.zodiacSign) {
    score += weights.zodiacSign;
  }

  // Active status
  if (personA.isActive === personB.isActive) {
    score += weights.isActive;
  }

  // Education/profession similarity
  if (personA.educationOrProfession === personB.educationOrProfession) {
    score += weights.educationOrProfession;
  }

  // Age compatibility
  const ageDifference = Math.abs(personA.age - personB.age);
  score += (1 - Math.min(ageDifference, 10) / 10) * weights.age;

  return score;
}

function findMatchesOptimized(
  people: Person[],
  weights: Record<string, number>,
  threshold: number = 0.5
): MatchScore[] {
  const matches: MatchScore[] = [];

  // Pre-filtering: Group users by relationship goal
  const groupedUsers = people.reduce<Record<string, Person[]>>((groups, person) => {
    if (!groups[person.relationshipGoal]) {
      groups[person.relationshipGoal] = [];
    }
    groups[person.relationshipGoal].push(person);
    return groups;
  }, {});

  // Process each group independently
  for (const group of Object.values(groupedUsers)) {
    const activeUsers = group.filter(person => person.isActive);

    // Only compare active users within the same group
    for (let i = 0; i < activeUsers.length; i++) {
      for (let j = i + 1; j < activeUsers.length; j++) {
        const personA = activeUsers[i];
        const personB = activeUsers[j];

        const score = calculateCompatibilityScore(personA, personB, weights);
        if (score >= threshold) {
          matches.push({
            personA: personA.id,
            personB: personB.id,
            score,
          });
        }
      }
    }
  }

  return matches.sort((a, b) => b.score - a.score);
}
