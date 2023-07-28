export const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}`);
    }
    return await response.json() as T;
  };
  
export const loadImage = (src: string): Promise<HTMLImageElement> => 
 new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
    image.src = src;

    return image;
});

export const context = document.querySelector<HTMLCanvasElement>('canvas')!.getContext('2d')!;