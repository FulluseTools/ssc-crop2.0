export enum ItemType {
  PHOTO = 'PHOTO',
  SIGNATURE = 'SIGNATURE'
}

export type CroppedImageMap = {
    [key: string]: string; // e.g., { p1: 'data:...', s1: 'data:...' }
};

// Fix: Define and export the BoundingBox type used by ExtractedData.
export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

// Fix: Define and export the ExtractedData type to fix the import error in services/geminiService.ts.
export interface ExtractedData {
    id: number;
    type: ItemType;
    boundingBox: BoundingBox;
}

// Fix: Define and export the CroppedImage type to fix the import error in components/ResultsDisplay.tsx.
export interface CroppedImage {
    id: number;
    type: ItemType;
    dataUrl: string;
}
