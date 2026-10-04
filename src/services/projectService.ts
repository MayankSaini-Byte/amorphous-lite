import type { SubmissionType } from '../types/MotifTypes';
import { UI_COPY } from '../constants/uiCopy';

export interface ProjectSubmissionPayload {
  projectId: string;
  projectTitle: string;
  submissionType: SubmissionType;
  name: string;
  email: string;
  whyContribute?: string;
  // Payload variants
  ideaTitle?: string;
  ideaDescription?: string;
  fileName?: string;
  fileSize?: number;
  fileContent?: string;
  githubUrl?: string;
}

export interface StoredSubmission extends ProjectSubmissionPayload {
  id: string;
  submittedAt: string;
}

const STORAGE_KEY = 'amorphous_project_submissions';

/**
 * Helper to fetch stored submissions from localStorage
 */
function getStoredSubmissions(): StoredSubmission[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read project submissions from localStorage:', err);
    return [];
  }
}

/**
 * Check if user with given email has already submitted for a project
 */
export function hasUserSubmitted(projectId: string, email: string): boolean {
  if (!projectId || !email) return false;
  const submissions = getStoredSubmissions();
  const normalizedEmail = email.trim().toLowerCase();
  return submissions.some(
    s => s.projectId === projectId && s.email.trim().toLowerCase() === normalizedEmail
  );
}

/**
 * Get all submission IDs submitted by user email, or all stored submission IDs if email is omitted
 */
export function getUserSubmittedProjectIds(email?: string): string[] {
  const submissions = getStoredSubmissions();
  if (!email) {
    return Array.from(new Set(submissions.map(s => s.projectId)));
  }
  const normalizedEmail = email.trim().toLowerCase();
  return Array.from(
    new Set(
      submissions
        .filter(s => s.email.trim().toLowerCase() === normalizedEmail)
        .map(s => s.projectId)
    )
  );
}

/**
 * Submit a project contribution payload.
 * Returns a Promise to emulate an async API service call.
 */
export async function submitProject(payload: ProjectSubmissionPayload): Promise<StoredSubmission> {
  // Simulate network latency (400ms)
  await new Promise(resolve => setTimeout(resolve, 400));

  const normalizedEmail = payload.email.trim().toLowerCase();

  // Check duplicate submission
  if (hasUserSubmitted(payload.projectId, normalizedEmail)) {
    throw new Error(UI_COPY.projects.duplicateSubmissionError);
  }

  const newSubmission: StoredSubmission = {
    ...payload,
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    email: normalizedEmail,
    submittedAt: new Date().toISOString(),
  };

  try {
    const existing = getStoredSubmissions();
    existing.push(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to persist submission to localStorage:', err);
  }

  return newSubmission;
}
