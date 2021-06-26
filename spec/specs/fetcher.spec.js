describe("Fetcher", () => {
    const { fetcher } = require('../../src/functions');

    it("should be able to return a response", async() => {
        await fetcher("http://github.com");
    });

    it("should return 'undefined' when failed to bind or not valid JSON response", async() => {
        const response = await fetcher("invalid-url");
        const response2 = await fetcher("https://raw.githubusercontent.com/Mssjim");
        
        expect(response).toBeUndefined();
        expect(response2).toBeUndefined();
    });

    it("should be able to return an object", async() => {
        const response = await fetcher("https://raw.githubusercontent.com/Mssjim/discord-warframe/main/src/settings.json");

        expect(response).toBeInstanceOf(Object);
        expect(response.json).toBe("true");
    });
});