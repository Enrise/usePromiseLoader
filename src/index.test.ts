import initHook from "jooks";
import usePromiseLoader from "./index";

describe("usePromiseLoader()", () => {
  describe("When the data is a promise", () => {
    let resolve: (data: string) => void;
    const promise = new Promise<string>((internalResolve) => {
      resolve = internalResolve;
    });

    const hook = initHook(() => usePromiseLoader(promise, "default"));

    it("Starts with the default value and is loading", async () => {
      const [data, loading] = hook.run();
      expect(data).toBe("default");
      expect(loading).toBe(true);
    });

    it("It will show the data when the promise resolves and is not loading", async () => {
      resolve("loaded");
      await hook.wait();
      const [data, loading] = hook.run();
      expect(data).toBe("loaded");
      expect(loading).toBe(false);
    });
  });

  describe("When the data is a promise and is rejected", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let reject: (error?: any) => void;
    const promise = new Promise<string>((internalResolve, internalReject) => {
      reject = internalReject;
    });

    const hook = initHook(() => usePromiseLoader(promise, "default"));

    it("It will throw the error", async () => {
      reject("error");
      await hook.wait();
      expect(() => {
        hook.run();
      }).toThrowError("error");
    });
  });

  describe("When the data is not a promise", () => {
    const hook = initHook(() => usePromiseLoader("preLoaded", "default"));

    it("Directly shows the data and is not loading", async () => {
      const [data, loading] = hook.run();
      expect(data).toBe("preLoaded");
      expect(loading).toBe(false);
    });
  });
});
