import { describe, expect, it, vi } from "vitest";
import { debounce } from "../../util/shared";

describe("Debounce correctly bounces", () => {
  it("Should reject duplicates calls", async () => {
    
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn("apple")
    debouncedFn("orange")
    debouncedFn("woof")
    await new Promise((ah) => setTimeout(ah, 500))
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith("woof")
  })
})