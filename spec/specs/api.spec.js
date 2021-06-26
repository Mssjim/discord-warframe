describe("API", () => {
    beforeAll(() => {
        console.log('\nAPI Specs');
    });

    const { fetcher } = require('../../src/functions');

    it("should be able to return a response", async() => {
        const response = await fetcher("http://api.warframestat.us");

        expect(response).toBeInstanceOf(Object);
        expect(response.code).toBe(200);
    });
});