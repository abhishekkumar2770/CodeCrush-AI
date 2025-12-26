const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // The SDK doesn't have a direct listModels method on the client instance in all versions, 
        // but let's try a simple generation with a fallback or just use the model manager if available.
        // Actually, newer SDKs might not expose listModels easily without admin privileges context.

        // Instead, let's try 'gemini-pro' as a fallback test.
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await modelPro.generateContent("Test");
        console.log("gemini-pro works: ", result.response.text());
    } catch (error) {
        console.error("Error testing gemini-pro:", error.message);
    }

    try {
        // try gemini-1.5-flash-001
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
        const result = await modelFlash.generateContent("Test");
        console.log("gemini-1.5-flash-001 works: ", result.response.text());
    } catch (error) {
        console.error("Error testing gemini-1.5-flash-001:", error.message);
    }

    try {
        // try gemini-1.5-flash-001
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await modelFlash.generateContent("Test");
        console.log("gemini-1.5-flash works: ", result.response.text());
    } catch (error) {
        console.error("Error testing gemini-1.5-flash:", error.message);
    }
}

listModels();
