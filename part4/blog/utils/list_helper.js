const dummy = (blogs) => {
    blogs.map(b => b);
    return 1;
};

const totalLikes = (blogs) => {
    const result = blogs.reduce((sum, blog) => sum + blog.likes, 0);

    return blogs.length === 0
        ? 0
        : result;
};

const favouriteBlog = (blogs) => {
  
    if (blogs.length === 0) return 0;

    const result = blogs.reduce((previous, current) => 
        previous.likes > current.likes 
            ? previous 
            : current
    );

    delete result.id;
    delete result.url;
    return result;
};

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
};