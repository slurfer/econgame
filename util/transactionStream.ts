let interval: NodeJS.Timeout | null = null;
let controller: ReadableStreamDefaultController<Uint8Array> | null = null;
const stream = new ReadableStream({
  start(ctrl) {
    controller = ctrl;
    const encoder = new TextEncoder();

    // Pošli první zprávu
    controller.enqueue(encoder.encode(`data: Připojeno k SSE streamu\n\n`));
  },
});

export const transactionStream = stream;

export function writeToStream(data: any) {
  if (controller) {
    const encoder = new TextEncoder();
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  } else {
    throw new Error("Stream controller is not initialized");
  }
}
