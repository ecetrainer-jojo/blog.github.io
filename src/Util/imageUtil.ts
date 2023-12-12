export default async function loadImage(imageUrl: string) {
  let img:HTMLImageElement = new Image();
  const imageLoadPromise = new Promise((resolve) => {
    img = new Image();
    img.onload = resolve;
    img.src = imageUrl;
  });
  await imageLoadPromise;
  return img;
}
