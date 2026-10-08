export const getUserMedia = async (): Promise<Error> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: {} });
    stream.getTracks().forEach(track => track.stop());
  } catch (e) {
    console.error(e);
    return e;
  }
}