import Compressor from 'compressorjs';

export function fileCompression(files: File[], formData: FormData, compressedFiles: Promise<void>[]): void {
    const options: Compressor.Options = {
        maxHeight: 1080, maxWidth: 1920, convertSize: 500000, convertTypes: 'image/webp', quality: 0.6, mimeType: 'image/webp',
    };

    files.forEach((file) => {
        const fileName = file.name.split('.').slice(0, -1).join('.') + '.webp';
        const compressionPromise = new Promise<void>((resolve, reject) => {
            new Compressor(file, {
                ...options,
                success: (result) => {
                    formData.append('files', result, fileName);
                    resolve();
                },
                error: (err) => {
                    console.error('Error compressing file:', err);
                    reject(err);
                },
            });
        });

        compressedFiles.push(compressionPromise);
    });
}