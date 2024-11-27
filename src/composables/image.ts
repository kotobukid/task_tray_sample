import {Ref} from "vue";

const useImage = () => {
    const parse = async (content: any, canvasRef: Ref<HTMLCanvasElement | null>) => {
        if (content.rid) { // Check if content has rid property
            // Use `rgba` method to get the image data and create a Blob
            const buffer = await content.rgba(); // Assuming it returns a Uint8Array or similar binary data
            const size = await content.size();

            if (canvasRef.value) {
                const ctx = canvasRef.value.getContext('2d');
                if (ctx) {
                    // Create an ImageData object from the RGBA buffer
                    const imageData = new ImageData(
                        new Uint8ClampedArray(buffer),
                        size.width,
                        size.height
                    );
                    // Draw ImageData onto the canvas
                    ctx.putImageData(imageData, 0, 0);
                }
            }
        } else {
            console.error('The content is not of expected structure:', content);
        }
    }

    return {
        parse
    }
}

export {useImage}