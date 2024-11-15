import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: String,
    author: {
        name: String,
        email: String,
        profileImage: String,
        profileUrl: String
    },
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    content: String,
    relatedArticles: [
        {
            title: String,
            link: String,
            thumbnail: String
        }
    ],
    views: Number,
    likes: Number,
    coverImage: String,
    readingTime: String,
    seo: {
        metaTitle: String,
        metaDescription: String,
        metaKeywords: [String]
    },
    comments: [
        {
            commenter: String,
            commentText: String,
            commentDate: { type: Date, default: Date.now },
            likes: Number
        }
    ]
});

// Export as default
export const Blog = mongoose.model('Blog', blogSchema);

