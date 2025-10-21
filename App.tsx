import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { CropDashboard } from './components/CropDashboard';
import type { CroppedImageMap } from './types';

declare global {
    interface Window {
        JSZip: any;
    }
}

const App: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [croppedImages, setCroppedImages] = useState<CroppedImageMap>({});
    const [error, setError] = useState<string | null>(null);

    const resetState = useCallback(() => {
        setImageUrl(null);
        setCroppedImages({});
        setError(null);
        // Also reset the file input if possible
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }, []);

    const handleFileChange = (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Please upload a valid image file (PNG, JPG, etc.).');
            return;
        }
        setError(null);
        setCroppedImages({});

        const reader = new FileReader();
        reader.onload = (e) => {
            const url = e.target?.result as string;
            setImageUrl(url);
        };
        reader.onerror = () => {
            setError('Failed to read the selected file.');
        };
        reader.readAsDataURL(file);
    };

    const handleCropComplete = (name: string, dataUrl: string) => {
        setCroppedImages(prev => ({ ...prev, [name]: dataUrl }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-sans">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">ssc-crop 2.0</h1>
                    <p className="text-lg md:text-xl text-indigo-200 mt-2">Manual Photo & Signature Cropper</p>
                </header>

                <main className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 max-w-7xl mx-auto">
                    {error && (
                         <div className="text-center bg-red-500/80 text-white p-4 rounded-lg mb-6">
                            <p className="font-bold">Oops! Something went wrong.</p>
                            <p>{error}</p>
                            <button onClick={resetState} className="mt-2 bg-white text-red-500 font-bold py-1 px-3 rounded-full hover:bg-red-100 transition-colors">
                                Try Again
                            </button>
                        </div>
                    )}

                    {!imageUrl ? (
                        <FileUpload onFileSelect={handleFileChange} />
                    ) : (
                        <CropDashboard
                            imageUrl={imageUrl}
                            croppedImages={croppedImages}
                            onCropComplete={handleCropComplete}
                            onReset={resetState}
                        />
                    )}
                </main>

                <footer className="text-center mt-8 text-indigo-200">
                    <p>&copy; {new Date().getFullYear()} ssc-crop 2.0. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
