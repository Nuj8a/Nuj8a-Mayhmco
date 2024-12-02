import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface FileUploadOptions {
  maxFiles?: number;
  allowedTypes?: string[];
  maxSizeMB?: number;
  uploadDirectory: string;
}

async function handleFileUpload(
  file: File | null,
  options: FileUploadOptions
): Promise<string | null> {
  if (!file) return null;

  const {
    // maxFiles = 1,
    allowedTypes = [],
    maxSizeMB = 5,
    uploadDirectory
  } = options;
  const extension = path.extname(file.name);
  const fileName = `${uuidv4()}${extension}`;
  const publicDirectory = path.join(process.cwd(), 'public', uploadDirectory);
  const filePath = path.join(uploadDirectory, fileName); // Relative path for database storage

  // Ensure the directory exists
  if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory, { recursive: true });
  }

  // Validate file type
  if (allowedTypes.length && !allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed.`);
  }

  // Validate file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(`File size exceeds the ${maxSizeMB}MB limit.`);
  }

  // Convert file to ArrayBuffer and save it as Uint8Array
  const fileBuffer = new Uint8Array(await file.arrayBuffer());
  fs.writeFileSync(path.join(publicDirectory, fileName), fileBuffer);

  return filePath; // Return the relative file path
}

export default handleFileUpload;
