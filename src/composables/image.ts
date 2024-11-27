import {image} from "@tauri-apps/api";

const useImage = () => {
    const parse = async (content: image.Image): Promise<ImageData> => {
        return new Promise(async (resolve, reject) => {

            if (content.rid) { // Check if content has rid property
                const buffer = await content.rgba();
                const size = await content.size();
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