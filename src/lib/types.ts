import { z } from 'zod';
export const brandSettingsSchema = z.object({
  logoUrl: z.string().url().optional().or(z.literal('')),
  brandColors: z.array(z.string()).min(1, "At least one brand color is required."),
  fontPairing: z.string().optional(),
});
export const productInfoSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  targetLocale: z.string().min(2, "Target locale is required."),
});
export const generationFormSchema = productInfoSchema.merge(brandSettingsSchema);
export type BrandSettings = z.infer<typeof brandSettingsSchema>;
export type ProductInfo = z.infer<typeof productInfoSchema>;
export type GenerationFormState = z.infer<typeof generationFormSchema>;
export interface GeneratedVisual {
  id: string;
  imageUrl: string;
  prompt: string;
  alt: string;
  headline: string;
  ctaText: string;
  primaryColor: string;
}
export interface ProjectSummary {
  id: string;
  title: string;
  createdAt: number;
  lastActive: number;
}
export interface Project {
  id: string;
  title: string;
  formData: GenerationFormState;
  visuals: GeneratedVisual[];
}
export const locales = [
    { value: "en-US", label: "English (United States)" },
    { value: "zh-TW", label: "Traditional Chinese (Taiwan)" },
    { value: "zh-HK", label: "Traditional Chinese (Hong Kong)" },
    { value: "en-AU", label: "English (Australia)" },
    { value: "en-HK", label: "English (Hong Kong)" },
    { value: "en-MY", label: "English (Malaysia)" },
    { value: "en-SG", label: "English (Singapore)" },
    { value: "en-IN", label: "English (India)" },
    { value: "th-TH", label: "Thai (Thailand)" },
    { value: "vi-VN", label: "Vietnamese (Vietnam)" },
    { value: "ms-MY", label: "Malay (Malaysia)" },
];

// Types for legacy/demo chat components
export interface ToolCall {
  name: string;
  result: any;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
  timestamp?: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error?: string;
  sessionId?: string;
  isProcessing?: boolean;
  model?: string;
  streamingMessage?: string;
}

export interface SessionInfo {
  id: string;
  model: string;
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
}

export interface WeatherResult {
  location: string;
  temperature: string;
  unit: 'celsius' | 'fahrenheit';
  description: string;
}

export interface MCPResult {
  mcp: string;
  description: string;
}

export interface ErrorResult {
  error: string;
}