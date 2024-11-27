import {image} from "@tauri-apps/api";

const useImage = () => {
    const parse = async (content: image.Image): Promise<ImageData> => {
        return new Promise(async (resolve, reject): Promise<void> => {

            if (content.rid) { // Check if content has rid property
                const buffer: Uint8Array = await content.rgba();
                const size: image.ImageSize = await content.size();
                resolve(new ImageData(
                    new Uint8ClampedArray(buffer),
                    size.width,
                    size.height
                ));
            } else {
                console.error('The content is not of expected structure:', content);
                reject();
            }
        });
    }

    return {
        parse
    }
}

export {useImage}