import { getAccessToken } from './auth';
import { QuizScores, CoupleProfile, AnswerChoice, Question } from '../types';

export interface DriveReportFile {
  id: string;
  name: string;
  createdTime: string;
  webViewLink?: string;
  size?: string;
}

const FOLDER_NAME = 'Duck & Panda Couple Reports 🦆🐼';

/**
 * Finds or creates the dedicated folder for Duck & Panda reports in Google Drive
 */
export async function getOrCreateReportsFolder(accessToken: string): Promise<string> {
  // Check if folder already exists
  const query = encodeURIComponent(`name = '${FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`);
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!searchRes.ok) {
    const errText = await searchRes.text();
    console.error('Error searching Drive folder:', errText);
    throw new Error('Failed to find or query Google Drive folder');
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // Create folder
  const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Saved couple compatibility reports from Duck & Panda: How Cute Are We?'
    })
  });

  if (!createRes.ok) {
    throw new Error('Failed to create Duck & Panda folder in Google Drive');
  }

  const newFolder = await createRes.json();
  return newFolder.id;
}

/**
 * Upload a Duck & Panda Couple Report to Google Drive
 */
export async function saveReportToDrive(params: {
  scores: QuizScores;
  profile: CoupleProfile;
  answers: AnswerChoice[];
  questions: Question[];
}): Promise<{ id: string; name: string; webViewLink?: string }> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('No Google Drive access token found. Please sign in with Google.');
  }

  const folderId = await getOrCreateReportsFolder(accessToken);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `Duck_Panda_Report_${params.profile.title.replace(/\s+/g, '_')}_${timestamp.slice(0, 10)}.md`;

  const fileContent = `# 🦆❤️🐼 Duck & Panda: How Cute Are We?
**Official Couple Compatibility Report**
*Generated on: ${new Date().toLocaleString()}*

---

## 🏆 Verdict: ${params.profile.title}
**Badge:** ${params.profile.badge}
**Tagline:** "${params.profile.tagline}"

### ❤️ Cute Score: ${params.scores.cuteScore}% CUTE

---

## 📊 Score Breakdown
- **❤️ Love Level:** ${params.scores.loveLevel}%
- **😂 Chaos Level:** ${params.scores.chaosLevel}%
- **🥹 Softness Level:** ${params.scores.softnessLevel}%
- **👀 Teasing Level:** ${params.scores.teasingLevel}%

---

## 💬 Summary & Verdict
${params.profile.summary}

### 💌 Duck's Message to Panda:
> "${params.profile.duckMessage}"

---

## 📝 Complete Quiz Interrogation Log
${params.questions.map((q, idx) => {
  const ans = params.answers[idx];
  return `### Question ${idx + 1}: "${q.duckQuestion}"
- **🐼 Panda answered:** ${ans ? ans.text : 'N/A'}
- **🦆 Duck's reaction:** "${ans ? ans.duckReaction : 'N/A'}"
`;
}).join('\n')}

---
*Created with the "Duck & Panda: How Cute Are We?" Web Game.*
`;

  // Multipart upload to Google Drive
  const metadata = {
    name: fileName,
    parents: [folderId],
    mimeType: 'text/markdown',
    description: `Couple Compatibility Report: ${params.profile.title} (${params.scores.cuteScore}% Cute)`
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/markdown\r\n\r\n' +
    fileContent +
    closeDelimiter;

  const uploadRes = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`
      },
      body: multipartRequestBody
    }
  );

  if (!uploadRes.ok) {
    const errorText = await uploadRes.text();
    console.error('Drive upload failed:', errorText);
    throw new Error('Failed to upload couple report to Google Drive');
  }

  return await uploadRes.json();
}

/**
 * List all saved Duck & Panda reports from Google Drive
 */
export async function listReportsFromDrive(): Promise<DriveReportFile[]> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('No Google Drive access token found.');
  }

  const query = encodeURIComponent(`name contains 'Duck_Panda_Report' and trashed = false`);
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,createdTime,webViewLink,size)&orderBy=createdTime desc`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  if (!res.ok) {
    throw new Error('Failed to list files from Google Drive');
  }

  const data = await res.json();
  return data.files || [];
}

/**
 * Delete a report file from Google Drive
 */
export async function deleteReportFromDrive(fileId: string): Promise<void> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('No Google Drive access token found.');
  }

  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok && res.status !== 204) {
    throw new Error('Failed to delete file from Google Drive');
  }
}
