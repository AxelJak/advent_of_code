type Rule = [number, number];
type Update = number[];

function solvePageQueue(input: string): { partOne: number; partTwo: number } {
  // Parse input into rules and updates
  const [ruleSection, updateSection] = input.trim().split("\n\n");
  const rules: Rule[] = ruleSection.split("\n").map((rule) => {
    const [before, after] = rule.split("|").map(Number);
    return [before, after];
  });
  const updates: Update[] = updateSection.split("\n").map((update) =>
    update.split(",").map(Number)
  );

  // Build adjacency graph and in-degree map
  function buildGraph(pages: number[]): Map<number, Set<number>> {
    const graph = new Map<number, Set<number>>();
    pages.forEach((page) => graph.set(page, new Set()));

    rules.forEach(([before, after]) => {
      if (pages.includes(before) && pages.includes(after)) {
        graph.get(before)?.add(after);
      }
    });
    return graph;
  }

  // Topological sort to check order
  function isValidOrder(update: Update): boolean {
    const graph = buildGraph(update);
    const inDegree = new Map(
      Array.from(graph.keys()).map(
        (key) => [
          key,
          Array.from(graph.values()).filter((set) => set.has(key)).length,
        ],
      ),
    );

    const queue = update.filter((page) => inDegree.get(page) === 0);
    const sorted: number[] = [];

    while (queue.length) {
      const current = queue.shift()!;
      sorted.push(current);

      graph.get(current)?.forEach((neighbor) => {
        const degree = (inDegree.get(neighbor) || 0) - 1;
        inDegree.set(neighbor, degree);
        if (degree === 0) queue.push(neighbor);
      });
    }

    return sorted.length === update.length;
  }

  // Correct an invalid update
  function correctUpdate(update: Update): Update {
    const graph = buildGraph(update);
    const inDegree = new Map(
      Array.from(graph.keys()).map(
        (key) => [
          key,
          Array.from(graph.values()).filter((set) => set.has(key)).length,
        ],
      ),
    );

    const result: number[] = [];
    const visited = new Set<number>();

    while (result.length < update.length) {
      const candidates = update.filter((page) =>
        !visited.has(page) &&
        (inDegree.get(page) || 0) === 0
      );

      if (candidates.length === 0) {
        // If no candidates, find a page with the lowest in-degree
        const remainingPages = update.filter((p) => !visited.has(p));
        const nextPage = remainingPages.reduce((min, page) =>
          (inDegree.get(page) || Infinity) < (inDegree.get(min) || Infinity)
            ? page
            : min
        );
        candidates.push(nextPage);
      }

      const page = candidates[0];
      result.push(page);
      visited.add(page);

      graph.get(page)?.forEach((neighbor) => {
        const degree = (inDegree.get(neighbor) || 0) - 1;
        inDegree.set(neighbor, degree);
      });
    }

    return result;
  }

  // Part One: Find middle pages of valid updates
  const validUpdates = updates.filter(isValidOrder);
  const partOne = validUpdates.reduce((sum, update) => {
    const middleIndex = Math.floor(update.length / 2);
    return sum + update[middleIndex];
  }, 0);

  // Part Two: Correct invalid updates and sum middle pages
  const invalidUpdates = updates.filter((update) => !isValidOrder(update));
  const correctedUpdates = invalidUpdates.map(correctUpdate);
  const partTwo = correctedUpdates.reduce((sum, update) => {
    const middleIndex = Math.floor(update.length / 2);
    return sum + update[middleIndex];
  }, 0);

  return { partOne, partTwo };
}

// Example usage
const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const result = solvePageQueue(input);
console.log("Part One:", result.partOne);
console.log("Part Two:", result.partTwo);
