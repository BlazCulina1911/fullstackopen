const {dummy, totalLikes, favouriteBlog} = require("../utils/list_helper");

test("dummy returns one", () => {
    const blogs = [];
    const result = dummy(blogs);

    expect(result).toBe(1);
});

describe("total likes", () => {
    test("of empty list is zero", () => {
        const blogs = [];
        expect(totalLikes(blogs)).toBe(0);
    });

    test("when list has only one blog equals the likes of that", () => {
        const blogs = [{
            "title": "Bukača",
            "author": "Rojs",
            "url": "http://doesntwork.com",
            "likes": 10,
            "id": "629bd9e90c6ad417a992c33d"
        }];
        expect(totalLikes(blogs)).toBe(10);
    });
    test("of a bigger list is calculated correctly", () => {
        const blogs = [
            {
                "title": "Bukača",
                "author": "Rojs",
                "url": "http://doesntwork.com",
                "likes": 10,
                "id": "629bd9e90c6ad417a992c33d"
            },
            {
                "title": "Slipo Pašče",
                "author": "Rojs",
                "url": "http://doesntwork.com",
                "likes": 15,
                "id": "629bd9f20c6ad417a992c33f"
            },
            {
                "title": "Gitak TV",
                "author": "Split",
                "url": "http://doesntwork.com",
                "likes": 25,
                "id": "629bda610c6ad417a992c344"
            }
        ];
        expect(totalLikes(blogs)).toBe(50);
    });
});

describe("favourite blog" , () => {

    test("of empty list is zero", () => {
        const blogs = [];

        expect(favouriteBlog(blogs)).toBe(0);
    });
    test("should return a blog with most likes", () => {
        const blogs = [
            {
                "title": "Bukača",
                "author": "Rojs",
                "url": "http://doesntwork.com",
                "likes": 10,
                "id": "629bd9e90c6ad417a992c33d"
            },
            {
                "title": "Slipo Pašče",
                "author": "Rojs",
                "url": "http://doesntwork.com",
                "likes": 15,
                "id": "629bd9f20c6ad417a992c33f"
            },
            {
                "title": "Gitak TV",
                "author": "Split",
                "url": "http://doesntwork.com",
                "likes": 25,
                "id": "629bda610c6ad417a992c344"
            }
        ];

        expect(favouriteBlog(blogs)).toEqual({
            "title": "Gitak TV",
            "author": "Split",
            "likes": 25,
        });
    });
});