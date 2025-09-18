

import { GoogleGenAI } from "@google/genai";
import { Invoice, Customer, Business } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll alert and log, but not throw an error,
  // allowing the UI to function without the AI feature.
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateInvoiceNote = async (invoice: Invoice, customer: Customer | undefined, business: Business): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI features disabled. Please set your API_KEY.";
  }

  const subtotal = invoice.lines.reduce((acc, line) => acc + line.qty * line.unitPrice, 0);
  const taxTotal = invoice.lines.reduce((acc, line) => acc + line.qty * line.unitPrice * (line.gstRate / 100), 0);
  const grandTotal = subtotal + taxTotal;

  const prompt = `
    You are an expert accountant's assistant. Write a short, professional, and friendly note for a business invoice.
    
    Business Name: ${business.name}
    Customer Name: ${customer?.name || 'Valued Customer'}
    Invoice Total: ${grandTotal.toFixed(2)}
    Due Date: ${invoice.dueDate}

    Generate a brief "Notes" section for the invoice. Include a thank you, mention the total amount, and reference the due date. Keep it concise (2-3 sentences).
    
    // Fix: Removed hardcoded '$' from prompt example to make it currency-neutral and align better with the app's INR formatting.
    Example: "Thank you for your business! Please find the details of your invoice attached. The total amount of ${grandTotal.toFixed(2)} is due by ${invoice.dueDate}. We appreciate your prompt payment."
    
    Generate a note based on the provided details.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating invoice note:", error);
    return "Failed to generate AI suggestion. Please write a note manually.";
  }
};