import { ChromaClient } from "chromadb";

const client = new ChromaClient();

(async () => {
  const getOrCreateCollection = async () => {
    const collection = await client.getOrCreateCollection({
      name: "project_management",
    });
    return collection;
  };

  const collection = await getOrCreateCollection();
  console.log("Collection created:", collection);

  // Add some sample tasks
  await collection.add({
    documents: [
      "Complete project proposal",
      "Schedule team meeting",
      "Review client feedback",
      "Update project timeline",
      "Prepare presentation for stakeholders",
    ],
    ids: ["task1", "task2", "task3", "task4", "task5"],
    metadatas: [
      { type: "Work", priority: "High", deadline: "2023-06-15" },
      { type: "Work", priority: "Medium", deadline: "2023-06-10" },
      { type: "Work", priority: "Low", deadline: "2023-06-20" },
      { type: "Work", priority: "High", deadline: "2023-06-18" },
      { type: "Work", priority: "Medium", deadline: "2023-06-25" },
    ],
  });

  // Function to query tasks based on user input
  const queryTasks = async (userInput: string) => {
    const results = await collection.query({
      queryTexts: userInput,
      nResults: 3,
    });
    return results;
  };

  // Example usage
  const userInput = "What are my high priority tasks?";
  const taskResults = await queryTasks(userInput);
  console.log("Relevant tasks:", taskResults);

  // Function to add a new task
  const addTask = async (
    task: string,
    metadata: Record<string, string | number>
  ) => {
    await collection.add({
      documents: [task],
      ids: [`task${Date.now()}`], // Generate a unique ID
      metadatas: [metadata],
    });
    console.log("New task added:", task);
  };

  // Example usage
  await addTask("Call supplier about order status", {
    type: "Work",
    priority: "Medium",
    deadline: "2023-06-30",
  });

  // Function to update a task
  const updateTask = async (
    taskId: string,
    newData: Record<string, string | number>
  ) => {
    await collection.update({
      ids: [taskId],
      metadatas: [newData],
    });
    console.log("Task updated:", taskId);
  };

  // Example usage
  await updateTask("task1", { priority: "Medium", deadline: "2023-06-20" });
})();
