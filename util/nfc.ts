let readLock = false;

export const readNfc = async (
  onRead: (message: NDEFMessage, serialNumber: any) => void,
  onError: () => void
) => {
  try {
    const ndef = new NDEFReader();
    if (readLock) return;
    readLock = true;
    await ndef.scan();

    const onScan = ({ message, serialNumber }: any) => {
      onRead(message, serialNumber);
      ndef.removeEventListener("reading", onScan);
    };

    ndef.addEventListener("reading", onScan);
    readLock = false;
  } catch (error) {
    console.error("Error reading NFC:", error);
    onError();
  }
};

let writeLock = false;

export const writeNfc = async (
  message: string,
  onDone: () => void,
  onError: () => void
) => {
  try {
    const ndef = new NDEFReader();
    if (writeLock) return;
    writeLock = true;
    await ndef.write(message);
    writeLock = false;
    onDone();
  } catch (_error) {
    onError();
  }
};

export const decodeNfcRecord = (record?: NDEFRecord) => {
  return record ? new TextDecoder(record.encoding).decode(record.data) : "";
};
