/**
 * Loads an image from the given URL asynchronously.
 *
 * @param {string} imageUrl - The URL of the image to load.
 * @param {number} [timeout=50] - The timeout in milliseconds.
 * @returns {Promise<Image>} - A promise that resolves with the loaded Image object.
 *                            If loading fails or times out, the promise is rejected.
 */
export default async function loadImage(imageUrl: string, timeout = 5000) {
  let img = new Image();

  const imageLoadPromise = new Promise<void>((resolve, reject) => {
    img.onload = () => {
      console.log(`Image loaded successfully: ${imageUrl}`);
      resolve();
    };

    img.onerror = () => {
      reject(`Failed to load image: ${imageUrl}`);
    };

    img.src = imageUrl;
  });

  const timeoutPromise = new Promise((_, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(`Loading image timed out after ${timeout}ms: ${imageUrl}`);
    }, timeout);
  });

  try {
    await Promise.race([imageLoadPromise, timeoutPromise]);
  } catch (error) {
    console.error(error);
  }

  return img;
}