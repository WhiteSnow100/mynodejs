const postDao = require(`./postDao`);

describe("Test post DAO", () => {
    test("createPost Test", async () => {
        const data = {
            title: "Jest Test",
            content: "Jest Test",
            UserId: 4
        }
        const result = await postDao.createPost(data);
        expect(result.title).toBe(data.title);
    });

    test("findAll Test", async() => {
        const result = await postDao.findAll();
        expect(result); 
    });

    test("findPostById Test", async() => {
        const id = 1;
        const result = await postDao.findPostById(id);
        expect(result); 
    });

    test("updatePost", async() => {
        const id = 8;
        const data = {
            title: "Jest update test",
            content: "Jest update test"
        }
        const result = await postDao.updatePost(id, data);
        // console.log(result);
        expect(result[0]).toBe(1);
    });
});